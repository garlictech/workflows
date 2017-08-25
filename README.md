# The Garlictech development workflows and images

This repo implements the Garlic Tech development infrastructure. The infrastructure is mainly based on Docker containers, because:

* it provides a standardized, virtualized development environment
* you can develop services in the same environment like the production environment
* you do not have to maintain complicated production, development and CI configurations
* all the services can benefit from the optimization in the development / production processes immediately

## Pre-requistes

Before being able to use the workflows, you have to

* install docker

If you use a private docker registry (in case of developing a dockerized server or using them):

* `DOCKER_USER` env. variable must contain the user name of the private docker registry
* `DOCKER_PASSWORD` env. variable must contain the password for the private docker registry

## General concerns

### Local development

These steps describe the development flow generally. We describe the individual differences/details in the docs of the specialized workflows. A generally valid summary:

1. Create a private fork of the Github repo you are working on
2. Clone the repo
3. Build the development docker containers: these containers execute the development tasks like compilation, testing, etc.
4. Set up the local development environment: it fetches some files that must be present in the local folder from the latest containers. For instance. the latest tslint file defining the coding styles, etc.
5. Start a watcher: it may be a development server, a gulp watcher, whatever. Generally, they mount your code into the development container, watch file changes, recompile them, they may execute the unit tests automatically, etc.
6. Test your code (lint, unit test, system test, prod build) locally
7. Commit the code using semantic versioning/[semantic release](https://github.com/semantic-release/semantic-release) and [commitizen](https://github.com/commitizen/cz-cli) - fill in the appropriate commit info.
8. Create a pull request. Travis CI will pick up your PR, builds and tests your changes. Fix any errors it reveals until all the tests pass.
9. Send a review request, and address to at least one reviewer.
10. Implement the change requests (build, test, commit, travis loop happens again)
11. Somebody approves and merges your PR to the master - Travis CI checks, builds and deploys your code.

Generally, you can develop in Javascript, Coffeescript, Typescript: the build system supports all these files, you can even mix them. At the end, you get a pure javascript production build.

### Sub-repos

Actually, the above development steps are for "deployable" repos: individual websites, servers, etc. When we really want to share code, we extract common code to individual repos. Those repos are normally not "deployable" ones, only the deployable projects use them. Now, developing the shared repos with the above method is really cumbersome: each changes should go through a Travis build and publishing process, it is quite slow.

Now, for the shared code, we utilize the excellent [git subrepo](https://github.com/ingydotnet/git-subrepo) project. Go to the web site and install the tool. So, as for subrepos:

- They have no docker, npm, whatsoever parts. As minimum, only an `index.{ts,js,coffee}` and a package.json file are required.
- We don't release them to npm, and Travis will not build/release them. They are really some "embeddable" code fragments with some external dependencies. They are build and tested as parts of the hosts projects.
- As for version management, we rely on simple commits. When you version a "host" project (a project using a subrepo), the individual version will "tag" a particular commit of the subrepo. So, when you clone a tagged host repo, the tagged subrepo commit is fetched, and not the the head.
- With subrepos, you can use forks and branches as well. So the release management of the subrepos are based on branches and "tagged" commits in the host repo.
- Don't use private forks in the subrepos, always add the upstream repo, and use branches if needed. If you use private forks for any reasons, it is OK, but merge the changes to the upstream, then update the subrepo in the host.

How to add a subrepo. We do it by an example: add the [authentication-lib](https://github.com/garlictech/authentication-lib) repo as a subrepo. Check the library code: it has no docker and other codes, it has no `projct/src` folder, etc.

```
git subrepo clone https://github.com/garlictech/authentication-lib.git -b subrepo project/subrepos/\@garlictech/authentication-lib
```

Tha above command adds the HEAD of the subrepos branch of the auth. lib repo under `project/subrepos` folder. Using the `project/subrepos` folder is mandatory, as the workflows expect this folder structure.

Then, add the following to the `dependencies` section of the `package.json`:

```
"@garlictech/authentication-lib": "file:./project/subrepos/@garlictech/authentication-lib"
```

So, you can:

- use `import { whatsoever } from '@garlictech/authentication-lib'`
- with `npm install`, you can install the subrepo dependencies as well.

The cool thing is that the subrepos are mounted into the development docker containers, so you achieved a kind of (but more effective) `npm link` that works in the container as well.

Now, the dockerized environment requires some extras:

- The Dockerfile of the development container must contain the following fragment:

```
COPY project/subrepos /app/project/subrepos/
RUN scripts/install_dependencies
```

This is because you have to install the subrepo dependencies inside the containers as well, so you need to inject the subrepo `package.json`-s as well. This is the simplest way. When you start the development container with docker-compose, it will override the `/app/project/subrepos/` folder with the mounted external code, so all the host changes in the subrepos will trigger a rebuild (in watch mode).

- So, whenever you change any package.json-s (either in the host project or in the subrepos), you have to issue `npm run build` to reflect the changes in the dev. container.
- In watch mode, the system will watch changes in the subrepos as well. It includes full unit test re-execution: all the unit tests of the subrepos are executed in this case.

#### Caveats

- With `npm install`, only the `dependencies` are installed. Sometimes the test require additional dependencies that are placed into the `devDependencies` field of the subrepo package.json. It will result test failure. Unfortunately, you have to add manually those dev dependencies to the host project `package.json` as well.
- As in the Dockerfile we copy the content of the subrepos, if you change the subrepo code, the `npm run build` command will trigger a full npm install, so the Docker cache is invalidated. Anyway, you have to re-build the development container only when either the parent image or any of the package.json-s change, so it is probably something that you can live with.

### Installing npm dependencies

Well, this has some minor inconveniences, compered to the "undockerized" development: whatever dependencies you install, you have to inject them into the development container as well. Follow these steps:

* Install the package locally, with any of the `--save*` options. The point is: the dependency must get to the `package.json` file. Technically, installing the local package is not really necessary, only writing the package file is required, because nothing runs in the host machine. However, your code editor may require the local files to check your code.
* Rebuild the development container (`npm run build`, `npm run ngx:build:dev`, depending on the nature of the project)
* Restart the watchers/dev containers in order to use your changes.

Mind, that when you execute `npm run setup`, the command will update the dependencies to the ones that the docker dev container supports!

Only the following keys are merged: `dependencies, peerDependencies, devDependencies`.

## Unit testing, coverage report

* Add the unit tests under a `test` subfolder in a module/component folder. This is necessary, the system will find the test files only there. It is also important for coverage report: the report skips all the files in the `test` folders.
* Name them like `foo.spec.ts`. The `spec.ts` part is the Jasmine standard, and it is important. Karma/glup test runners will execute spec files only.

At the end of each test run, you will receive a test coverage report. The tests fail if the coverage is below the threshold. The current values (they may increase in the future versions of the workflows):

* global: 50%: the global coverage of the project must be higher than that
* component modifier: global - 10%: all the components must be at least this coverage

You can access the coverage report in your project folder, under `reports/coverage` (open it in a browser). The system will create this folder after the very first test run.

*Some tricks*

* If a source file is not required (directly or indirectly) in at least one test file, then the coverage report will not be generated for that file. So create an umbrella test spec file that requires as many files as possible. Certainly, there are files that you should not cover, for example server startup scripts. The [requireDir](https://github.com/aseemk/requireDir) project may be big help at this stage.
* The compiled files contain sourcemaps. To see the original files in the test failure error stacks, use the [node-source-map-support](https://github.com/evanw/node-source-map-support) package. The best is: add it to the coverage umbrella file.
* An example umbrella file may be:

```
// Display the original files in the stack traces
require('source-map-support').install()
// The coverage report covers only files that are included by any of the tests.
// This file tries to import as many files as possible, until at least one test covers them.
var requireDir = require('require-dir');
requireDir('../provider-lib/', {recurse: true})
requireDir('../deepstream-rxjs/', {recurse: true})
```



## The `docker` folder

The folder contains some scripts and Docker compose files: they compose the Docker based development infrastructure. You can finetune them. The most important file is the `docker-compose.dependencies.yml` file: add all the external docker services that you need during the development, etc.

## Travis CI/CD

For CI/CD, we use Travis. You can find enevrything in the `.travis.yml` file. Keep that file as clean as possible, and use hook scripts instead, implementing a lifecycle functionality. All the hooks are in the `hooks/travis` folder.

## Common npm commands

See the rest of the scripts at the individual project descriptions.

### `npm run clean`

Clean the dist folder and the build artifacts.

### `npm run lint`

Execute the linter. Is also fixes some fixable errors in-place (mutates the files).

### `npm run prettier`

Using the [Prettier project](https://github.com/prettier/prettier), it fixes some spacing/comma errors (replaces tabs with 2 spaces, etc.).

### `npm run commit`

Commit the git changes. It will use commitizen, to create proper commit comments. You should not use `git commit` directly!

The command requires that `user.name` and `user.email` be configured, othwerwise it will complain about the missing `GH_USER` or `GH_EMAIL` environmant variables. Do it like

```
git config --global user.name "myname"
git config --global user.email "email@example.com"
```

### `npm run npm`

Basically, for internal usage: executes npm commands inside the development container.

### `npm run travis`

Used by Travis CI only.

### `npm run release`

Releses the project: tags the sources in Github, creates CHANGELOG, and publishes the project to the npm repository. Actually, you should not use it directly: Travis should release a project exclusively.


## Debugging

### Debugging the container

Log in to the container and see its actual content:

```npm run bash```

The command opens a bash session where you can directly change the development container. Mind, that those changes are not persistent, you loose them when you exit.

## Deployment

We control the deployment with Travis. So, the deployment instuctions must be implemented in the Travis hooks, in the `hooks/travis` folder. The deployment may be:

- Publish to one or more NPM registries. It is not given that we always publish to npmjs.com, so add the list of registries to the `before_install` script. Example is here.

*BELOW THIS IS THE OLD DOCMENTATION, BEING REWRITTEN!*

1. The first step is always clone your repo :) Then, build the development Docker image. The development Docker image is actually one of the workflow-... images configured for the particular project/repo.

So, build the image

`npm run build:dev`

Then, update your local files. This step ensures that your lint, tsconfig, etc. files conform the latest requirement, and updates the general dependencies in your package.json file.

```
npm run setup
```

After this step, you have a `.env` file, with some basic settings. Like `NODE_ENV`...

* `NODE_ENV`

Default: `development`.

* `DOCKER_REGISTRY`

The (private) docker registry of the project.

* `PROJECT`

The project slug. Basically, it is the repo part of the github slug.

* `TARGET_IMAGE_NAME`

The Docker image of the service. Basically, it is the repo part of the github slug.

* `SCOPE`

Your organization. The organization part of the github slug.

## Project types

Each project type (web site, angular module, etc.) has its own individual workflow implementation. Follow the links to learn about them:

* [Angular (ngx) module project](https://github.com/garlictech/workflows/tree/master/angular2-module)
* [Angular (ngx) site/webapp project](https://github.com/garlictech/workflows/tree/master/angular2-webapp)
* [Backend library project](https://github.com/garlictech/workflows/tree/master/workflows-library)

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
npm run build:dev
npm run setup
npm start
npm run unittest
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

### build

Builds the application-specific development Docker image. You have to build it whenever:

* you clone the github repo
* the workflow image changes and you want to integrate the changes
* the ```package.json``` file changes

The build combines some `docker_compose` files in the docker folder of the project (they are also generated).

You can pass docker_compose build parameters to the process like:

```npm run build -- --no-cache```

### Start 

This script can be invoked without 'run':

```npm start```

It launches the webpack development server and stars watching files. You can access your site in http://localhost:8081. If you change something in ```src```, then it reloads the files in the browser. 

### unittest

Execute the unit tests:

`npm run unittest`

Execute the unit tests in watch mode:

`npm run unittest:watch`

### stop

`npm run stop:dev`

Stops the webpack dev server. Locally, you can do it with Ctrl-C, it is relevant in CI environments, for example, to stop the server programmatically.

### bash

`npm run bash`

Use bash inside the app container. It is good to inspect what is going on internally. It launches the webpack container containing your app and gives you a bash shell.

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

### dev-site

You have to modify this folder only if your project is a module (in ```package.json```: garlic.type property is "module"). Otherwise, simply delete this folder. Actually, this is a full web site to visualize and test your component.=

## Angular 2 development

See [here](https://github.com/garlictech/workflows/tree/master/angular2).
