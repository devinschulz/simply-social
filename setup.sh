#!/bin/sh

cd "$(dirname "$0")"

node=`which node 2>&1`
if [ $? -ne 0 ]; then
  echo "Please install NodeJS."
  echo "http://nodejs.org/"
  exit 1
fi

npm=`which npm 2>&1`
if [ $? -ne 0 ]; then
  echo "Please install NPM."
fi

if [ ! gem spec sass > /dev/null 2>&1 && ! gem spec scss-lint > /dev/null 2>&1 ];
  then
    echo "Installing Ruby Gems"
    bundle install
fi

if [ ! -d node_modules ];
  then
    echo "Installing Node Dependencies"
    npm install
fi

if [ ! -d app/vendors ];
  then
    echo "Installing Bower"
    npm install bower
    bower install
fi

echo "Everything looks good, running Gulp!"

gulp