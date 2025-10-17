#!/bin/bash

echo "Starting the Notes Application..."

docker-compose up -d --build

echo "Application is running!"
echo "Frontend available at: http://localhost:5173"
echo "Backend API available at: http://localhost:8080"