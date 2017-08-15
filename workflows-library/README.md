# Backend library development

_tl;dr_
```
# Build and develop the library
npm run build
npm run setup
npm install
npm start
npm run unittest
npm run build:prod

# Commit changes
git add .
npm run commit
```

## Prerequistes

* The general requirements (docker, npm, etc.)
* The make tools must be installed

## General concepts

Use this workflow when you develop any backend code, or code that you want to share with frontend projects. The workflow provides compilations, some watchers, unit test execution environment, etc. All the development stuff run in docker containers.

We support coffeescript, javascript (ES6), typescript. Internally, we have configured Typescript and babel transcribers, Jasmine unit testing environment, etc.

So, you don't have to add gulp, babel, whatsoever to your `package.json`, only the packages that the project really uses.

The workflow actually extends the [basic workflow concepts](https://github.com/garlictech/workflows/blob/master/README.md) - so you should also read it before proceeding.

### Development workflow

* Build the development containers
* Update some local files to conform with the workflow requirements
* Start watchers
* Write your code, enjoy live recompilation and unit test execution
* Commit to git, using commitizen
* Create a PR - Travis CI will check your code
* Merge to master - Travis CI will build ann release/deploy your work.

Your compiled/production code will be in the `dist` folder.

## Development commands

### `npm run build`

Build the development docker image: install the dependencies, etc. Gulp, Jasmine, etc. run in containers, where the sources are mounted into. It is a 'light' build, it uses Docker cache whenever it can. It provides fast rebuild, but it cannot detect if the base docker image changes, or the versions of the dependencies change.

After successful image build, it compiles your code and produces the `dist` folder.

### `npm run build:all`

It rebuilds everything: pulls the latest base container and disables the Docker cache. Use it when the bse container changes, or when you want to integrate a newer version of a dependency.

### `npm run setup`

Updates some of your local files to a required content: tslint, tsconfig, package.json are updated. There are some required dependency versions that you must respect: even if you update them in the package.json, internally, the required versions will be installed! So, after each `npm install`, you should issue an `npm run setup` to ensure that no such dependencies are overwritten.

### `npm start`

Start the watchers: on code change, the system will recompile the changed code, and re-executes the unit tests. It does NOT create coverage report on purpose.

If you have docekerized dependencies, the command also starts them.

### `npm run unittest`

Run the unit tests once. It creates the coverage report - find it in the `reports/coverage` folder.

### `npm run stop`

Stop the development site. Ctrl-C does the job, however sometimes the development container does not stop. This command kills the container.

### make commands

Actually, there are more commands in the makefile - the majority of the npm scripts are simple make commands. See the makefile for those exotic features, they might speed up your development.