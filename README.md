# The Garlictech development workflows and images

This repo implements the Garlic Tech development infrastructure. The infrastructure is mainly based on Docker containers, because:

* it provides a standardized, virtualized development environment
* you can develop services in the same environment like the production environment
* you do not have to maintain complicated production, development and CI configurations
* all the services can benefit from the optimization in the development / production processes immediately

## Pre-requistes

Before able to use the workflows, you have to 

* install docker
* DOCKER_USER env. variable must contain the user name of the private docker registry
* DOCKER_PASSWORD env. variable must contain the password for the private docker registry

## General concerns

### Local development

These steps describe the development flow generally. We describe the individual differences/details in the docs of the specialized workflows. A generally valid summary:

1. Create a private fork of the Github repo you are working on
2. Clone the repo
3. Build the development docker containers: these containers execute the development tasks like compilation, testing, etc.
4. Set up the local development environment: it fetches some files that must be present in the local folder from the latest containers. For instance. the latest tslint file defining the coding styles, etc.
5. Start a watcher: it may be a development server, a gulp watcher, whatever. Generally, they mount your code into the development container, watch file changes, recompile them, they may execute the unit tests automatically, etc.
6. Test your code (lint, unit test, system test, prod build) locally
7. Commit the code using semantic versioning/[semantic release](https://github.com/semantic-release/semantic-release), fill in the appropriate commit info.
8. Create a pull request. Travis CI will pick up your PR, builds and tests your changes. Fix any errors it reveals until all the tests pass.
9. Send a review request, and address to at least one reviewer.
10. Implement the change requests (build, test, commit, travis loop happens again)
11. Somebody approves and merges your PR to the master - Travis CI checks, builds and deploys your code.

### Installing npm dependencies

Well, this has some minor inconveniences, compered to the "undockerized" development: whatever dependencies you install, you have to inject them into the development container as well. Follow these steps:

* Install the package locally, with any of the `--save*` options. The point is: the dependency must get to the `package.json` file. Technically, installing the local package is not really necessary, only writing the package file is required, because nothing runs in the host machine. However, your code editor may require the local files to check your code.
* Rebuild the development container (`npm run build`, `npm run build:dev`, depending on the nature of the project)
* Restart the watchers/dev containers in order to use your changes.




*BELOW THIS IS THE OLD DOCMENTATION, BEING REWRITTEN!*

```
npm run setup
```

Mind, that 

It creates a default ```.env``` file that sets various environment variables. Here, we list all the potential variables. Depending on your project, you may not find all of them - the missing variables are irrelevant.

Mind, that this file is created and filled in readily when you generate the project. 

* `NODE_ENV`

Default: `development`. In this case, and, when you develop frontend stuff with karma, the `npm run unittest` command does not exit, it watches file changes.

* `DOCKER_REGISTRY`

The (private) docker registry of the project.

* `PROJECT`

The project slug. Basically, it is the repo part of the github slug.

* `TARGET_IMAGE_NAME`

The Docker image of the service. Basically, it is the repo part of the github slug.

* `SCOPE`

Your organization. The organization part of the github slug.

### Installing packages



## Server side development

_tl;dr_

```
npm run setup-dev
make build
make start
make unittest
make systemtest
make smoketest
git add .
npm run commit
```

As you can see, in server side, we use Make, because it provides extreme flexibility. For the individual commands, read the makefile comments inside the file, they should be obvious.

### setup-dev

* Creates the .env file with defaults. This file is ignored from github. Contains some specific environment variables.
* Creates an empty tokens.env. If your service needs security tokens, add them here. This file is also ignored in github. Do not check it in, keep is safe!
If your tests need tokens, [encrypt the file with travis](https://docs.travis-ci.com/user/encrypting-files/), check in to github the encrypted file, add its decryption instructions to the `before_script` section in `.travis.yml`.
Mind, that tests using tokens are not available in PR-s during travis builds, for security reasons. Also mind, that this file is required anyway, even if it is empty. So, your travis build should 
create an empty one in `before_script`.

### build

Builds the development service image(s). Uses `Dockerile.dev`. The image is derived from `workflows-server`, pulled from your
organization docker registry.

### start

Start the development service. It uses `docker/docker-compose.yml`.

### unittest

Execute the unit tests once.

### System test

Execute the system tests.

### commit

We use commitizen ti create commit comments. It is important to use it, because, in Travis side, releases are created
by parsing the commit comments. If the system cannot detect that it is a change with functional improvments, then it will
not publish a new release, so the changes will not be integrated automatically into the end product. More info:

* [commtizen](https://github.com/commitizen/cz-cli)
* [semantic release](https://github.com/semantic-release/semantic-release)

## How to write tests

### Unit tests

* Add the unit tests next to the component to be tested. For example, tests for `server/stuff` should go to `server/stuff/test/stuff-unit-test.js.
Add as many fixtures, support files, `*-unit-test.js` files as you wish to such a folder.
* `js` and `coffee` files are supported for the moment.
* in `test/unit/index.js`, pull in global constructs that should be available for all the tests. But do not add tests here. 

### System tests

* Add your system tests under `test/system` folder. All the tests should go here.
* Mocha will pull in index.js and all the files following the `-system-test.{js,coffee} pattern.

### Smoke tests

TBD

### Handling and encrypting secrets

TBD


### Debugging the server

When you set the `DEBUG` environment variable to true, then all the processes (server, test, etc.) will stop at the beginning of the execution,
and will wait for a debugger. Attach the debugger and continue.

A good debugger is built in the free [Visual Studio Code](https://code.visualstudio.com/?utm_expid=101350005-28.R1T8FshdTBWEfZjY0s7XKQ.0&utm_referrer=https%3A%2F%2Fwww.google.hu%2F) tool.


### Things to consider during development

* There are some pre-installed npm packages in the server-common image. You do not have to add them to package.json, they are available readily. Actually, they are installed by installing the
[garlictech-common-server](https://github.com/garlictech/garlictech-common-server) package. See the actual list of preinstalled packages [here](https://github.com/garlictech/garlictech-common-server/blob/master/package.json).


## Client side development process

_tl;dr_

```
npm run setup-dev
npm run build
npm run start
npm run unittest
npm run e2etest
git add .
npm run commit
```

The process assumes that you either:

* generated the service boilerplate with the [garlictech yeoman generator](https://github.com/garlictech/generator-garlic-webapp/)
* or you implement the same file and folder structure manually - however, we do not recommend this approach. The generated projects automatically provide all the required configurations.

The main and generic development procedures are implemented in npm scripts. You can get a list of them by running

```npm run```

Call a script like this:

```npm run <script name> -- [OPTIONS]```

Some of the scripts can accept optional parameters, add then after the double hyphens.

The scripts start the appropriate docker containers implementing the required operation and containing the required, pre-installed, configured software required by the operation.
This approach is much superior to the local installation approach: you do not have to install all the development packages for each components.

In the ```docker```folder, you can find the basic, generated docker files and scripts. In most cases, they should be enough, but you can freely modify them, to implement some more complicated scenarios.

The next sections describe the individual scripts.

### The webpack based workflows

The webpack environment is implemented in the ```garlictech-webpack``` image. Before using webpack, you have to build a docker image based on this image and contianing the
application based logic. The build process copies ```package.json``` to into the container, installs the dependencies, and mounts the following local folders: ```src```, ```dev-site```, ```hooks```.

* ```src```: must contain the site/module code. If it is a site, then it must contain the ```index.html``` file.
* ```dev-site```: if the project is an angular module, it does not have an official ```index.html```. In this case, webpack will look for the index in this file. Use this folder during the development, 
to pull in the module and do something with the code in the browser.
* ```hooks```: you can supplement or change the webpack, karma and the travis configutration here. You have direct access to the internal configurations inside the webpack contaier. See examples later. Its usage is optional.

### build

Builds the application-specific development Docker image. You have to build it whenever:

* you clone the github repo
* the ```garlictech-webpack``` image changes and you want to integrate the changes
* the ```package.json``` file changes

The build combines two docker_compose files in the docker folder of the project (they are also generated). See the ```docker/build.sh``` script in your application folder. The main docker file is in the root of the application folder.

You can pass docker_compose build parameters to the process like:

```npm run build -- --no-cache```

### Start 

This script can be invoked without 'run':

```npm start```

or 

``` npm run start```

It launches the webpack development server and stars watching files. You can access your site in http://localhost:8081. If you change something in ```src```, then it reloads the files in the browser. 

### unittest

It launches the unit tests. How it is run is based on the content of NODE_ENV (in the ```.env``` file). If it is development, then the unittest dows not exit, it watches file changes and
re-runs the tests when something changes. If NODE_ENV is not development, it does not watch: runs the tests once then exits.

In your unit test code, you can use a global variable called `UnitTest`. They contain some utility functions, they are especially good to inject dependencies with names containing dots :)
Read their docs in the [source code](https://github.com/garlictech/workflows/blob/master/webpack/test/unit/unit-test-base.coffee). 

### stop

Stops the webpack dev server. Locally, you can do it with Ctrl-C, it is relevant in CI environments, for example, to stop the server programmatically.

### bash

Use bash inside the app container. It is good to inspect what is going on internally. It launches the webpack container containing your app and gives you a bash shell.

### :docker commands

Do not use them. They are used internally, inside the container.

### e2etest

Executes the protractor bases e2e tests. It uses a different container, based on ```garlictech-protractor```. What it does:

* Builds a container implementing your tests. It uses ```e2e/Dockerfile``` to build the test container. Installs the special dependencies in ```e2e/package.json```.
* Mounts ```e2e/src``` folder and launches the container.
* Inside the container, it starts a headless Chrome based Selenium server, then start the protractor that executes the tests.
* You can add some test-specific dependencies to the local ```package.json``` file, they are installed before running the tests.
* The protactor image pre-installs some test packages. Check them in the [Dockerfile of protractor](https://github.com/garlictech/docker-images/blob/master/protractor/Dockerfile]).

The protractor is pre-configured inside the container.

The tests start an individual webpack-dev-server with the project to be tested, and they start the required dependencies. You can use the following options as well:

```npm run e2etest stop```

The above command equals to ```docker_compose <all service files> down```, and stops all services required by the e2e test.

```npm run e2etest bash```

Starts an e2e test container with a bash session.

```npm run e2etest -- <parameters>```

Pass the parameters to the e2e test service.

#### Debugging e2e tests

It is quite difficult to figure out why your tests failed without seeing them in the browser. So, the protractor workflow image provides you a VNC session with a running Chrome browser, attached to the test.
Start the test like this:

```npm run e2etest -- --elementExplorer```

The test starts, and stops immediately, waiting for a vnc session. Download a VNC client, start it, and attach


### commit

```npm run commit```

We use [semantic release](https://github.com/semantic-release/semantic-release) and [commitizen](https://github.com/commitizen/cz-cli) to commit our code to the repos. Travis then determines the version numbering and publishes a new version to npm.

The garlictech generators prepare your project to use these features automatically. The required software and the workflow implementation are in the [workflows-common](https://github.com/garlictech/workflows/tree/master/workflows-common) docker image.

Actually, we follow the open source sw development guidelines, adapted to private environments. We suggest [this egghead tutorial](https://egghead.io/courses/how-to-write-an-open-source-javascript-library).

## How to adapt a module based on the old workflow

* Remove the following files from your old project:

__WARNING__: we do not need those files, but we may need their functionality. In case that you did not modify their content after the previous project generation,
you can safely remove the files. Otherwise, you need to re-implement their functions elsewhere. It is especially true for the content of ```webpack.common.config.js```, ```src/test```, ```e2e```.

```
PROJECTDIR=<my_project_folder>
cd "$PROJECTDIR"
rm -r webpack.common.config.js webpack.config.js karma.conf.js coffeelint.json gulpfile.coffee node_modules scripts .jshintrc src/test
```

* Generate an empty project with the garlictech generator, it will serve as reference.

```pushd /tmp
mkdir testapp
cd testapp
yo garlic-webapp --skip-install
```

* Copy the following files to your project dir:

```
cp -r docker scripts .env .travis.yml .gitignore  .npmignore Dockerfile dev-site hooks "$PROJECTDIR"
cd e2e
cp Dockerfile package.json $PROJECTDIR/e2e
```

Now, we modify some files. We assume that the angular module name of the example project is ```Garlictech.Localize```. Use your module name accordingly.

### dev-site

You have to modify this folder only if your project is a module (in ```package.json```: garlic.type property is "module"). Otherwise, simply delete this folder.

Update ```index.html``` and ```dev-app/index.coffee``` to reflect your angular module name (for example, instead of 
```Garlictech.Testapp```, write ```Garlictech.Localize``` everywhere). This is an empty "site" that ```npm start``` uses. Consider porting the content of the old
e2e tests, because formerly, the e2e test was used for ```npm start``` a module project.

### e2e

* Move your test code so ```src```:

```pushd e2e
mkdir src
mv pages/ scenarios/ src/
```
* Copy the base protractor config file here:

```
cp /tmp/testapp/e2e/src/protractor.conf.js .
popd
```

* Port your old test-app if needed

Mind that e2e tests will test the site itself. Site is what webpack starts: if it is a module project, then it will start the site in ```dev-site```, otherwise, the thing in ```src/index.html```.
So, consider porting the relevant content of ```e2e/index.html``` and ```e2e/test-app``` to ```dev-site```.

* Remove the two files

```
rm -r e2e/index.html e2e/test-app
```

### hooks

Here, add your old webpack or karma hooks here (the ones that were in ```webpack.common.config.js```, if you needed this). Tn those files, you can access the whole
webpack and karma config, after the docker container configured them. Customize them here.

Also, you can add some hooks to travis (in travis folder). The script names reflect the travis phases. Currently, only ```before_install``` is supported, add your stuff
to this script. Do not remove the existing content unless you know what your are doing. Anyway, it is under your full control, add hooks and modify 
```.travis.yml``` as you wish.

### package.json

* It must contain these parts:

```
"version": "0.0.0-semantically-released",
"scripts": {
  "start": "docker/start.sh",
  "stop": "docker/stop.sh",
  "unittest": "docker/unittest.sh",
  "build": "docker/build.sh",
  "e2etest": "docker/e2etest.sh",
  "bash": "docker/bash.sh",
  "gulp": "docker/gulp.sh",
  "setup-dev": "scripts/setup-dev.sh",
  "start:docker": "scripts/start.sh",
  "unittest:docker": "scripts/unittest.sh",
  "commit": "docker/commit.sh",
  "semantic-release": "semantic-release pre && npm publish && semantic-release post"
},
"config": {
  "commitizen": {
    "path": "/app/node_modules/cz-conventional-changelog"
  }
}
```

* Remove ```garlic.unittest``` feauture.
* Remove ```garlictech-workflows-client``` from the all of the dependencies.

### .travis.yml

Your file should look like this:

```
language: node_js
node_js:
  - '5'
sudo: required
services:
  - docker
before_install:
  - hooks/travis/before_install.sh
  - docker/login.sh
install:
  - npm run build
before_script:
  - npm start -- -d
script:
  - npm run unittest
  - npm run e2etest
after_script:
  - npm run stop
notifications:
  slack:
    rooms:
      secure: <SECRET STUFF>
cache:
  directories: node_modules
after_success:
  - '[ "${TRAVIS_PULL_REQUEST}" = "false" ] && npm run semantic-release'
branches:
  only:
    - master
    - stable
```

The ```after_success``` part pulls in the semantic releasing process.

Now, you can try the new workflow.

## Container services

### Webpack

The webpack container provides:

* webpack builds
* webpack dev server with watch
* karma unit test runner with watch

The container pre-installs ans configures several webpack loaders, karma frameworks/plugins, font-awesome, angualar, lodash, etc. So, you do not need to add those dependencies
to your package.json. This enables using consistent dependency versions across independent modules, and makes the install/build times faster. The full list of available dependencies can be found
[here](https://github.com/garlictech/workflows/blob/master/webpack/package.json).

## Angular 2 development

See [here](https://github.com/garlictech/workflows/tree/master/angular2).
