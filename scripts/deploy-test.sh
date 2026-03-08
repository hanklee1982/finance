#!/bin/bash

# Finance AI System - Test Environment Deployment Script

# Configuration
SERVER_HOST="120.24.248.189"
SERVER_PORT="22"
SERVER_USER="root"
SERVER_PASSWORD="@Ljy20081209"
SERVER_WORKDIR="/opt/finance-test"

GITHUB_REPO="https://github.com/hanklee1982/finance"
BRANCH="feature/finance-ai-agent"

DOMAIN_TEST="opnai.dcool.com"
BACKEND_PORT="3000"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to execute command on server
ssh_exec() {
    sshpass -p "$SERVER_PASSWORD" ssh -p $SERVER_PORT -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "$1"
}

# Function to upload file to server
scp_upload() {
    sshpass -p "$SERVER_PASSWORD" scp -P $SERVER_PORT -o StrictHostKeyChecking=no $1 $SERVER_USER@$SERVER_HOST:$2
}

echo -e "${YELLOW}=== Finance AI System - Test Environment Deployment ===${NC}"

# 1. Connect to server and prepare environment
echo -e "${GREEN}1. Preparing server environment...${NC}"
ssh_exec "apt update && apt upgrade -y"
ssh_exec "apt install -y git nginx nodejs npm pm2"
ssh_exec "npm install -g n && n 20 && npm install -g npm"

# 2. Create deployment directory
echo -e "${GREEN}2. Creating deployment directory...${NC}"
ssh_exec "mkdir -p $SERVER_WORKDIR"

# 3. Clone code from GitHub
echo -e "${GREEN}3. Cloning repository...${NC}"
ssh_exec "cd $SERVER_WORKDIR && git clone $GITHUB_REPO"
ssh_exec "cd $SERVER_WORKDIR/finance && git checkout $BRANCH"

# 4. Install dependencies
echo -e "${GREEN}4. Installing dependencies...${NC}"
ssh_exec "cd $SERVER_WORKDIR/finance/backend && npm install"
ssh_exec "cd $SERVER_WORKDIR/finance/frontend && npm install"

# 5. Initialize database
echo -e "${GREEN}5. Initializing database...${NC}"
ssh_exec "cd $SERVER_WORKDIR/finance/backend && npx prisma migrate dev --name init"
ssh_exec "cd $SERVER_WORKDIR/finance/backend && npx prisma db seed"

# 6. Build frontend
echo -e "${GREEN}6. Building frontend...${NC}"
ssh_exec "cd $SERVER_WORKDIR/finance/frontend && npm run build"

# 7. Configure Nginx
echo -e "${GREEN}7. Configuring Nginx...${NC}"
cat > nginx_finance_test.conf << 'EOF'
server {
    listen 80;
    server_name opnai.dcool.com;
    
    # Frontend static files
    root /opt/finance-test/finance/frontend/dist;
    index index.html;
    
    # API reverse proxy
    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1/Report" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
}
EOF

scp_upload nginx_finance_test.conf /etc/nginx/sites-available/finance-test.conf
ssh_exec "ln -s /etc/nginx/sites-available/finance-test.conf /etc/nginx/sites-enabled/"
ssh_exec "rm /etc/nginx/sites-enabled/default"
ssh_exec "nginx -t && systemctl restart nginx"

# 8. Start backend with PM2
echo -e "${GREEN}8. Starting backend service...${NC}"
ssh_exec "cd $SERVER_WORKDIR/finance/backend && pm2 start npm --name finance-backend-test -- start"
ssh_exec "pm2 save && pm2 startup systemd -u root --hp /root"

# 9. Configure HTTPS with Let's Encrypt
echo -e "${GREEN}9. Configuring HTTPS...${NC}"
ssh_exec "apt install -y certbot python3-certbot-nginx"
ssh_exec "certbot --nginx -d opnai.dcool.com --non-interactive --agree-tos -m admin@dcool.com"

# 10. Verify deployment
echo -e "${GREEN}10. Verifying deployment...${NC}"
ssh_exec "curl -I http://localhost:3000/api/health"
ssh_exec "curl -I http://$DOMAIN_TEST"

echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo -e "Frontend: http://$DOMAIN_TEST"
echo -e "API: http://$DOMAIN_TEST/api"
echo -e "PM2 Status: pm2 status"
echo -e "Logs: pm2 logs finance-backend-test"

echo -e "${YELLOW}Default Accounts:${NC}"
echo -e "admin / 123456"
echo -e "finance / 123456"
echo -e "employee / 123456"

# Clean up
rm nginx_finance_test.conf