#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

function install_deps {
  cd $SCRIPT_DIR/stocks-api
  npm install
  cd $SCRIPT_DIR/stocks-frontend
  npm install
}

function run_api {
  cd $SCRIPT_DIR/stocks-api
  npm run dev
}

function run_frontend {
  cd $SCRIPT_DIR/stocks-frontend
  npm run dev
}

install_deps
(trap 'kill 0' SIGINT; run_frontend & run_api)
