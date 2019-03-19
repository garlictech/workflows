#!/usr/bin/env bash
/app/node_modules/.bin/cypress run
EXIT=$?
chmod -R 777 /app/artifacts
exit $EXIT
