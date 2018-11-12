#!/usr/bin/env bash
set -e
set -o pipefail

ng lint $@ | sed 's= /app/= =g'
