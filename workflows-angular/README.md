# Angular workflows

## General development workflow

For all the build commands: `npm run`. You can find various build, lint, doc genertion, etc. commands.

An example development workflow:

```
npm run build
npm run setup
npm install
```

Start the dev. server in watch/hmr/livereload mode, with the backend servers. Access the site manually on http://localhost:8081

`npm start`

Run the unit tests

`npm run unittest`

Create the prod built, in debug mode (no optimization)

`npm run build:prod:debug`

Run the e2e tests (takes the dist from the above step)

`npm run e2e:prod`

Create the universal build

`npm run build:universal`

Start the universal build

`npm run start:universal:debug`

Commit the code with commitizen, to be able to do semantic versioning automatically. It is imporant to use your comments properly, as improperly categorized commit comments may not trigger release/deployment.

```
git add .
npm run commit
```

### Development out of the container

The `npm run setup` command installs the necessary webpack loaders and does Angular webpack mods. After that, all the `ng` commands can be used locally as well. But this part is not supported with scripts, so it is for advanved developers. Read the `package.json` and the content of the `docker` folder for this.

Mind, that the local `npm install` is only for the code editor to be able to resolve the references! The `npm run build` command installs the dependencies to the container as well, where the dev. server runs.

## Windows

To indicate that you develop on windows, define the `HOST_PLATFORM` env variable in your environment like this:

`export HOST_PLATFORM=win`

and pass it to the dev container. Webpack will start in legacy(polling) mode.

### Polling interval

Define the poll interval in milliseconds:

`export WEBPACK_POLL_INTERVAL=2000`

and pass the env variable to the dev container. Default value is 1000.
