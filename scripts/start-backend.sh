#!/bin/bash

# Start Finance AI Backend Service

# Configuration
BACKEND_DIR="/opt/finance-test/finance/backend"
PROCESS_NAME="finance-backend-test"
PORT="3000"

echo "Starting Finance AI backend service..."

# Navigate to backend directory
cd $BACKEND_DIR

# Start with PM2
pm2 start npm --name $PROCESS_NAME -- start

# Save PM2 configuration
pm2 save

# Show status
pm2 status $PROCESS_NAME

echo "Backend service started successfully!"
echo "Process name: $PROCESS_NAME"
echo "Port: $PORT"
echo "API Health Check: curl http://localhost:$PORT/api/health"
echo "Logs: pm2 logs $PROCESS_NAME"