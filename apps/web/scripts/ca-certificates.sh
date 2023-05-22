#!/bin/bash

#
# Registers the certificates used by the node instance.
# @dev
# 1- This is fine as there is only one certificate that is being 
#    registered.
#

# TODO check if this resolves the "not found error in prod"
source .env.local 2> /dev/null

ms_grpc_client_cert_relpath="$CERTIFICATES_ABSPATH/$MS_GRPC_CLIENT_CERT_FOR_WEB_SERVER_RELPATH"

export NODE_EXTRA_CA_CERTS="$ms_grpc_client_cert_relpath/ca.crt" #1

echo "Including extra certs:"
echo $NODE_EXTRA_CA_CERTS
