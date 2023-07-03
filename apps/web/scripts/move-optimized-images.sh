#! /bin/bash

echo "
Moving optimized images from server/static to public

WARNING: 
This script should be removed as soon as images can be served from
object storage.
"

mv dist/server/static/images dist/static/
