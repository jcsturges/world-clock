#!/bin/bash

# USAGE: `./deploy.sh [profile]`
# where [profile] is an optional AWS cred profile name (else default is used)


################################################################################
# exit on error
set -e

# constants
[[ "$#" -ge 1 ]] && AWS_PROFILE_FLAG="--profile $1" || AWS_PROFILE_FLAG=""
S3_BUCKET="sph.j16s.com"
CLOUDFRONT_DISTRO_ID="EDWUBHKRGG8CN"


################################################################################
# deploy!
echo "deploying to $S3_BUCKET"
echo " :: building..."
PUBLIC_URL=https://$S3_BUCKET/ npm run build

# TODO: smarter upload for only changed files? --size-only not safe here
echo " :: uploading files..."
aws s3 sync build/ s3://$S3_BUCKET/ \
  --delete \
  $AWS_PROFILE_FLAG

# TODO: smarter cache invalidation for only changed files?
echo " :: busting cache..."
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DISTRO_ID \
  --paths "/*" \
  $AWS_PROFILE_FLAG

echo " > done!"
