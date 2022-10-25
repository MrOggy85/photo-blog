#!/bin/bash

export REALM="Access to localhost"
export USER="user"
export PASSWORD="password"

deno run \
  --watch \
  --allow-net \
  --allow-read \
  --allow-env=NODE_DEBUG,PORT,BASE_URL,REALM,USER,PASSWORD \
  main.ts
