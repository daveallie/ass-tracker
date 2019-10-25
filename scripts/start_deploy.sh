#!/bin/bash

set -e

if [[ "$(whoami)" = "ubuntu" ]]; then
  echo "This should NOT be run on the server."
  exit 1
fi

deployStamp=$(date +%s)
deployPath=/home/ubuntu/server/deploys

ssh ubuntu@3.104.76.139 << EOF
  cd $deployPath
  git clone --depth 1 https://github.com/daveallie/ass-tracker.git $deployStamp
  # cd $deployStamp/scripts
  # ./deploy_on_box.sh
EOF
