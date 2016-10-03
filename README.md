# The Garlictech development workflows and images

This repo implements the Garlic Tech development infrastucture. The infrastructure is based on Docker containers, because:

* it provides a standardized, virtualized development environment
* you can develop services in the same environment like the production environment
* you do not have to maintain complicated production, development and CI configurations
* all the services can benefit from the optimization in the development / production processes immediately

## Development process

tl;dr

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

### Start 

This script can be invoked without 'run':

```npm start```

or 

``` npm run start```

It launches the webpack development server and stars watching files. You can access your site in http://localhost:8081. If you change something in ```src```, then it reloads the files in the browser. If you want a different folder.


