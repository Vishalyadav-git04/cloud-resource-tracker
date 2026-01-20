#!/bin/bash

echo "🚀 Starting Deployment Process..."

# Check Docker
if ! docker info > /dev/null 2>&1; then
  echo "❌ Error: Docker is not running."
  exit 1
fi

echo "🧹 Cleaning up old containers..."
docker-compose down

echo "🏗️ Building and Starting services..."
docker-compose up -d --build

echo "⏳ Waiting for services to initialize..."
sleep 10

echo "🏥 Performing Health Check..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/health)

if [ "$HTTP_STATUS" -eq 200 ]; then
  echo "✅ Deployment Successful! App is running on http://localhost"
else
  echo "❌ Deployment Failed! Health check returned $HTTP_STATUS"
  exit 1
fi