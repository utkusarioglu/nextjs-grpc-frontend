#!/bin/bash

echo "Web Server starting…"
source scripts/ca-certificates.sh

NODE_ENV=production TAMAGUI_TARGET=web yarn next start
