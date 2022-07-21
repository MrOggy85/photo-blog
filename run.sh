#!/bin/bash

deno run \
  --allow-net \
  --allow-read \
  --allow-env=NODE_DEBUG,PORT,BASE_URL \
  main.ts
