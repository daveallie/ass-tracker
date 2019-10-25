#!/bin/bash

set -e

if [[ "$(whoami)" != "ubuntu" ]]; then
  echo "This should only be run on the server."
  exit 1
fi

deploymentRoot="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null 2>&1 && pwd )"

echo "\n\n  ===  Navigating to $deploymentRoot/backend  ==="
cd $deploymentRoot/backend
echo "\n\n  ===  Installing backend dependencies  ==="
yarn

echo "\n\n  ===  Navigating to $deploymentRoot/frontend  ==="
cd $deploymentRoot/frontend
echo "\n\n  ===  Installing frontned dependencies  ==="
yarn
echo "\n\n  ===  Building production ready frontend assets  ==="
NODE_ENV=production yarn build

echo "\n\n  ===  Stopping running backend  ==="
pm2 stop backend || true
echo "\n\n  ===  Mapping current deployment to $deploymentRoot  ==="
rm /home/ubuntu/server/current || true
ln -s $deploymentRoot /home/ubuntu/server/current
echo "\n\n  ===  Starting backend  ==="
NODE_ENV=production pm2 start --name backend /home/ubuntu/server/current/backend/bin/www

echo "\n\n  ===  Cleaning up old deployments  ==="
# Remove all but 10 latest deployments
cd $deploymentRoot/..
ls -1 | head -n -10 | xargs -d '\n' rm -rf --

