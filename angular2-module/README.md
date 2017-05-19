# Angular 2 module library development

_tl;dr_
```
# Build and develop the angular module library
npm run ngx:build:dev
npm run setup
npm install
npm run ngx:start:dev
npm run ngx:unittest
npm run ngx:build:prod

# Build and develop the backend
npm run backend:build
npm run backend:start:dev
npm run backend:unittest
npm run backend:prod

# Commit changes
git add .
npm run commit
```

## Prerequistes

* The general requirements (docker, npm, etc.)
* The make tools for the backend development.

## General concepts

This workflow module is about developing an Angular >2 (ngx) module library. It is based on the [angular2-common](https://github.com/garlictech/workflows/tree/master/angular2-common) module, so first, check its documentation.
This page summarizes the differences only.

Somehow, we want to implement the "Module as Service" concept :): an angular module may bring some backend functions implemented in a "serverless" environment (AWS lambdas, etc.). Therefore, an angular module project has scaffolding for the ngx part (a module/component library) and for the backend part.

The backend, in this concept, must be something serverless. If you develop an individual server for this module, then you should do it in the framework of another project. Certainly, if the project does not use backend directly, then you don't have to touch the backend part.

Why do we organize the project in this way? Because the backend and teh frontend may use shared code: shared validators, interfaces, etc., that is much easier to develop together, in the same repo.

Generally, the npm build scripts related to the Angular part is prefixed with `ngx`, the backend [art is prefixed with `backend`.

Now, why we need two containers: frontend and backend. It has historical reasons, backend and frontend development was based on different technologies, and we did not mix them in one repo - until now, when we tend toward the serverless concept. So the two aspects are served with two docker environments: frontend and backend solutions.

Interesting fact, that the frontend bases developments rely on individual scripts in the docker folder, while the backend side ones utilize a Makefile. You have to install the make tools as well.

### Frontend technologies

They are based on webpack, karma, we support javascript, typescript and coffeescript.

### Backend technologies

Inside the docker container, we run a gulp based workflow. We support coffeescript, javascript, typescript.

### Development site

In the `dev-site` folder, you will find a fully-blown Angluar 2 web site, to try your modules in a real website. So, you can build a test web application. to showcase/test the modules. The `npm run ngx:start:dev` command starts this development site. Import your library from the sources, and start testing.

## Using/importing a package

For a reason, the prod build does not produce consummable prod package :(, we are investigating why. Until that, import the package from source (for example, `import * from "my-package/src/ngx`). Fix will be implemented soon.

## Development commands

### `npm run ngx:build:dev`

Build the development docker image for angular module development: install the dependencies, etc. Wepback, Karm, production build is run in containers, where the sources are mounted into. It is a 'light' build, it uses Docker cache, etc. It provides fast rebuild, but it cannot detect if the base docker image changes, or the versions of the dependencies change.

### `npm run ngx:build:dev:all`

It rebuilds everything: pulls the latest base container and disables the Docker cache. Use it when the bse container changes, or when you want to integrate a newer version of a dependency.

### `npm run ngx:build:prod`

Create a prod build in the `dist` folder. The system compiles your sources and created a bundle with webpack. It also copies your `assets` folder.

### `npm run ngx:unittest`

Starts a karma test runner, and executes the unit tests. Mind, that this command will execute both the frontend and the backend unit tests!

### `npm run ngx:unittest:watch`

Start the test runner in watch mode: re-run the unit tests on code changes.

### `npm run ngx:start:dev`, `npm start`

Start the development site. The short command does the same.

### `npm run ngx:stop:dev`

Stop the development site. Ctrl-C does the job, however sometimes the development container does not stop. This command kills the container.

### `npm run backend:build`

Build a development docker image for backend development, and compile the code at once. So, in backend, there are no different dev and prod builds.

### `npm run backend:build:all`

Force-build a development docker image for backend development: pull dependencies and reinstall everything.

### `npm run backend:start:dev`

Start the development build and the watchers: recompile the project on code changes and execute the unit tests automatically.

### `npm run backend:stop:dev`

If ctrl-c does not work, kill the backend development container and all the dependencies.

### `npm run backend:unittest`

Execute the backend unit tests once.
