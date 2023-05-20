#!/bin/bash

echo "Starting dev with telemetry…"

source scripts/ca-certificates.sh

TAMAGUI_TARGET=web yarn next dev
