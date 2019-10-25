#!/bin/bash

set -e

if [[ "$(whoami)" != "ubuntu" ]]; then
  echo "This should only be run on the server."
  exit 1
fi

deploymentRoot="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null 2>&1 && pwd )"

cd $deploymentRoot/backend
yarn

cd $deploymentRoot/frontend
yarn
NODE_ENV=production yarn build

pm2 stop backend || true
rm /home/ubuntu/server/current || true
ln -s $deploymentRoot /home/ubuntu/server/current
NODE_ENV=production pm2 start --name backend /home/ubuntu/server/current/backend/bin/www

# Remove all but 10 latest deployments
cd $deploymentRoot/..
ls -1 | head -n -10 | xargs -d '\n' rm -rf --

