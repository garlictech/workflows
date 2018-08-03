# Angular workflows

## Windows

To indicate that you develop on windows, define the `HOST_PLATFORM` env variable in your environment like this:

`export HOST_PLATFORM=win`

and pass it to the dev container. Webpack will start in legacy(polling) mode.

### Polling interval

Define the poll interval in milliseconds:

`export WEBPACK_POLL_INTERVAL=2000`

and pass the env variable to the dev container. Default value is 1000.
