#!/usr/bin/env bash
set -e
set -o pipefail

export NODE_OPTIONS=--max_old_space_size=4096 && ng lint $@ | sed 's= /app/= =g'
