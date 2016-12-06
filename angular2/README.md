# Angular 2 development

The main concepts are the same than that of the Angular 1 based development, implemented in the `webpack` container.

## General concepts

* The project is based on the [Angular Webpack Starter](https://github.com/AngularClass/angular2-webpack-starter) project, learn about the used tehchnology/dependencies there. The generated starting code implements a TODO list app that you have to turn into the real application/module.
* The code has some really good code samples, and it has 100% test coverage - we should keep this ratio.

## Build commands

Webpack, Karma, etc. run in a development Docker container. So, you must not install npm dependencies in the local development folder, doing so will cause failures. The development commands mount the source code into the continer.

Before starting, you have to build the development Docker container with some of the build commands below. Webpack, Karma, etc. all run in that container. You can define the development Docker container in `Dockerfile.dev`: extend it if you have to add something more. Don't remove sections marked as "don't remove", unless you know what you do.

## Dependencies, development build

Add your dependencies to `package.json` as usual. But mind, that you should not keep the `node_modules` folder anyway! The build process will install the dependencies in the development container. There are some packages pre-installed in the base docker container (see them in the corresponding [package.json](https://github.com/garlictech/workflows/blob/master/angular2/package.json) file). You don't have to add them to the project `package.json`, doing so will not harm (unless there is a big version clash somewhere), but it may slow down your builds.

### `npm run build:dev`

Builds the development container. It is a 'light' build, it uses Docker cache, etc. It provides fast rebuild, but it cannot detect if the base docker image changes, or the versions of the dependencies change.

### `npm run build:dev:all`

It rebuilds everything: pulls the latest base container and disables the Docker cache. Use it when the bse container changes, or when you want to integrate a newer version of a dependency.

### Webpack hook

Webpack is pre-configured in the base container. If you need, you can customize webpack further: you can access the webpack configuration object in `hooks/webpack/webpack.js`, and modify the config. The container will call this function as the last step of preparing the webpack config. 

## Unit testing

The base container preinstalls and configures the Karma test runner with Jasmine test framework and PhantomJS headless browser. Similarly to the webpack hook, you can access both the test Webpack configuraion (`hooks/webpack/webpack.test.js`) and the Karma configuration (`hooks/webpack/karma.js`).

Mind, that in Angular 1, we used Mocha, however in Angular 2, we use Jasmine. The reason is: the seed project uses Jasmine in the sample tests, in fact, the basic concepts of the two frameworks are the same.

### `npm run unittest`

Run the unit tests, and start watching. When the test/source files change, karma will re-run the tests. 

At the end of each test run, you will receive a test coverage report. Mind, that we should keep it at 100%, later, we will force build failure in CI if the coverage is less, than 100!

## Starting the project

### `npm start`

It launches a webpack dev server in the container, and start watching project source changes. Access the site at http://localhost:8081. The internal container always uses the port 8081, you can map this port to somewhere else in `docker/docker-compose.net.yml` in the project folder.

## Debugging

### Debugging the container

Log in to the container and see its actual content:

```npm run bash```

The command opens a bash session where you can directly change the development container. Mind, that those changes are not persistent, you loose them when you exit.
