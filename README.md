# The Garlictech development workflows and images

This repo implements the Garlic Tech development infrastucture. The infrastructure is based on Docker containers, because:

* it provides a standardized, virtualized development environment
* you can develop services in the same environment like the production environment
* you do not have to maintain complicated production, development and CI configurations
* all the services can benefit from the optimization in the development / production processes immediately

## Pre-requistes

Before able to use the workflows, you have to 

* install docker and provision a docker machine
* ```DOCKER_USERNAME``` and ```DOCKER_PASSWORD``` environment variables must be set, in order to be able to pull images from docker.garlictech.com.

## Development process

_tl;dr_

```
npm run setup-dev
npm run build
npm run start
npm run unittest
npm run e2e-test
```

The process assumes that you either:

* generated the service boilerplate with the garlictech yeomen generator
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

### setup-dev

It creates a default ```.env``` file that sets ```NODE_ENV=development```. You should execute it once, right after cloning the repo.

### build

Builds the application-specific development Docker image. You have to build it whenever:

* you clone the github repo
* the ```garlictech-webpack``` image changes and you want to integrate the changes
* the ```package.json``` file changes

The build combines two docker_compose files in the docker folder of the project (they are also generated). See the ```docker/build.sh``` script in your application folder. The main docker file is in the root of the application folder.

### Start 

This script can be invoked without 'run':

```npm start```

or 

``` npm run start```

It launches the webpack development server and stars watching files. You can access your site in http://localhost:8081. If you change something in ```src```, then it reloads the files in the browser. 

### unittest

It launches the unit tests. How it is run is based on the content of NODE_ENV (in the ```.env``` file). If it is development, then the unittest dows not exit, it watches file changes and
re-runs the tests when something changes. If NODE_ENV is not development, it does not watch: runs the tests once then exits.

### stop

Stops the webpack dev server. Locally, you can do it with Ctrl-C, it is relevant in CI environments, for example, to stop the server programmatically.

### bash

Use bash inside the app container. It is good to inspect what is going on internally. It launches the webpack container containing your app and gives you a bash shell.

### :docker commands

Do not use them. They are used internally, inside the container.

### e2e-test

Executes the protractor bases e2e tests. It uses a different container, based on ```garlictech-protractor```. What it does:

* Builds a container implementing your tests. It uses ```e2e/Dockerfile``` to build the test container. Installs the special dependencies in ```e2e/package.json```.
* Mounts ```e2e/src``` folder and launches the container.
* Inside the container, it starts a headless Chrome based Selenium server, then start the protractor that executes the tests.

The protractor is pre-configured inside the container.

The test assumes that the application/site (the webpack server) also runs.

### gulp

We have some, mainly releasing and maintenance related tasks that we implement with gulp. A configured gulp task list also has its own container: ```garlictech-workflows-common```. Use npm to simply relay the gulp commands to the container.

For example, get all the available gulp tasks:

```npm run gulp help```

So, add the gulp commands after ```npm run gulp``` instead of ```gulp```.

## Installing packages

Well, this is a disadvantage now, to be solved. Actually, you cannot really use npm install locally. Whay you should do:

* Go to the container: ```npm run bash```
* Install the package here, as you wish: ```npm install```
* Cat the ```package.json```, and copy the added line from (dev, peer) dependencies
* Paste the line to the appropriate place in your local ```package.json```.

To be automated!




