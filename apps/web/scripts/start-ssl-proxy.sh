#!/bin/bash


source .env.local 2> /dev/null

server_certs_abspath="$PROJECT_ROOT_ABSPATH/frontend/.certs.local/mock-server"

echo "Starting local-ssl-proxy"
yarn local-ssl-proxy \
  --source 443 \
  --target 3000 \
  --key "$server_certs_abspath/tls.key" \
  --cert "$server_certs_abspath/chain.crt"
