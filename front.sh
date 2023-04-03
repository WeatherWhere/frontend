#!/bin/bash


echo "delete same docker image..."
docker rm -f front || true 

echo "Building Docker image..."
docker build -t front .

echo "Starting Docker container... "
docker run -it --name front -p 3000:3000 front

echo "Application started!"

