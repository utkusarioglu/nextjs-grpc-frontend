#!/bin/bash

# This script is intented to be run on CI for testing whether the
# Created web server container successfully returns "/".
# The script exists with 0 if this succeeds.
# 
# @params
# The script requires the image ref as its only param. Example:
# utkusarioglu/web-server-nextjsgprc-projects-utkusarioglu-com:1.0.0

set +e

image_ref=$1

if [ -z "$image_ref" ]; then
  echo "Error: first param needs to be the image reference"
  exit 1
fi

CONTAINER_NAME=web-server
env_file_abspath="$(pwd)/apps/web/.env.ci"

if [ ! -z "" ]; then
  echo "Error: Cannot find $env_file_abspath"
  echo "This env file is required for docker run"
  exit 2
fi
source $env_file_abspath

echo "Will run: $image_ref"
docker run \
  -d \
  -p 3000:3000 \
  --name $CONTAINER_NAME \
  -v $(pwd)/.certs.local:$CERTIFICATES_ABSPATH \
  --env-file $env_file_abspath \
  $image_ref

echo "Sleeping for 10 seconds…"
sleep 10

echo "Making a curl request to /…"
curl localhost:3000 > /dev/null
exit_code=$?

echo "Retrieving logs…"
docker logs $CONTAINER_NAME

echo "Stopping container…"
docker stop $CONTAINER_NAME
echo "Removing container…"
docker rm $CONTAINER_NAME

echo "Exiting with code $exit_code"
exit $exit_code
