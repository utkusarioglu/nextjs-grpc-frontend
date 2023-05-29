PROJECT_ROOT_ABSPATH=/utkusarioglu-com/projects/nextjs-grpc
CERTFICIATE_FOLDER_RELPATH=frontend/.certs.local
CERTFICIATE_RELPATH=mock-server/tls.crt
HASH_FUNCTION=sha256

certificate_abspath="$PROJECT_ROOT_ABSPATH/$CERTFICIATE_FOLDER_RELPATH/$CERTFICIATE_RELPATH"

digest=$(
  openssl x509 -in $certificate_abspath -noout -pubkey -noout \
  | openssl pkey -pubin -outform der \
  | openssl dgst -$HASH_FUNCTION -binary \
  | openssl enc -base64 \
)

echo "$HASH_FUNCTION/$digest"
