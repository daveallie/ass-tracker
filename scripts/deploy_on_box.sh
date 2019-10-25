#!/bin/bash

set -e

if [[ "$(whoami)" != "ubuntu" ]]; then
  echo "This should only be run on the server."
  exit 1
fi

outputLogHeader () {
  echo ""
  echo "  ===  $1  ==="
}

deploymentRoot="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null 2>&1 && pwd )"

outputLogHeader "Navigating to $deploymentRoot/backend"
cd $deploymentRoot/backend
outputLogHeader "Installing backend dependencies"
yarn
ln -s $deploymentRoot/../../shared/.env .env

outputLogHeader "Navigating to $deploymentRoot/frontend"
cd $deploymentRoot/frontend
outputLogHeader "Installing frontned dependencies"
yarn
outputLogHeader "Building production ready frontend assets"
NODE_ENV=production yarn build

outputLogHeader "Stopping backend"
pm2 stop backend || true

outputLogHeader "Mapping current deployment to $deploymentRoot"
rm /home/ubuntu/server/current || true
ln -s $deploymentRoot /home/ubuntu/server/current

outputLogHeader "Starting backend"
NODE_ENV=production pm2 start --name backend /home/ubuntu/server/current/backend/bin/www

outputLogHeader "Cleaning up old deployments"
# Remove all but 10 latest deployments
cd $deploymentRoot/..
ls -1 | head -n -10 | xargs -d '\n' rm -rf --

outputLogHeader "DEPLOYMENT DONE"
