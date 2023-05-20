#!/bin/bash

echo "Starting dev without telemetry…"

source scripts/ca-certificates.sh

AAA=bbb ENABLE_INSTRUMENTATION=FALSE TAMAGUI_TARGET=web yarn next dev
