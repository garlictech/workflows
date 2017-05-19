# Angular >2 (ngx) development

## General concepts

## Organizing the project, files

Generally, we use webpack to create bundles. The following file types are supported:

* Code: Javascript, Typescript, Coffeescript
* HTML: pure HTML, pug (ex-jade)
* Styles: CSS, SCSS
* Images: all the major image typoes. The system converts the small images into data URL-s, the rest will be emitted to the dist folder.
* Supported file types: (by their extension): `js, ts, jade, pug, scss, css, html, json, coffee, png, jpeg, jpg, gif, svg, woff, woff2, ttf, eot, ico`
* Static assets are stored in the `src/assets` folder. The folder is copied into the `dist` folder as is.

Unit tests: see [unit test organization](#unit-testing).

File naming conventions:

* Place all the services, components, etc. to separate folders. Name the folders after the component name.
* Use `index.ts` for the file defining the component (so, not `foo.component.ts`).
* Import the component using the folder name, and let webpack to resolve the `index.ts`.
* Don't use embedded styles and html-s. Use style and template url-s only. The template file must be `ui.{pug,html}`, the style file must be `style.{css,scss}`.

In fact, you can use the [Garlictech Webapp Generator](https://github.com/garlictech/generator-garlic-webapp) to generate components, services, modules with the above file conventions:

```
yo garlic:webapp ng2-component
yo garlic:webapp ng2-service
yo garlic:webapp ng2-module
```

Specify their root folder, their name, etc., and enjoy the scaffolding.

## Project types

There are two project types: `site` and `module`. There are individual workflows handling those cases:

* [site/webapp](https://github.com/garlictech/workflows/tree/master/angular2-webapp)
* [module](https://github.com/garlictech/workflows/tree/master/angular2-module)

## Start development

After cloning the project and building the development conteiner, do not forget setting it up:

`npm run setup`

It will create/update some important files and update the dependencies (see its background in the [general workflow description](https://github.com/garlictech/workflows#installing-npm-dependencies))

## Build commands

Webpack, Karma, etc. run in a development Docker container. So, you must not install npm dependencies in the local development folder, doing so will cause failures. The development commands mount the source code into the continer.

Before starting, you have to build the development Docker container with some of the build commands below. Webpack, Karma, etc. all run in that container. You can define the development Docker container in `Dockerfile.dev`: extend it if you have to add something more. Don't remove sections marked as "don't remove", unless you know what you do.

### Webpack hooks

Webpack is pre-configured in the base container. If you need, you can customize webpack further: you can access the webpack configuration object in `hooks/webpack/webpack.js`, and modify the config. The container will call this function as the last step of preparing the webpack config. 

## Unit testing

We use Jasmine.

The base container preinstalls and configures the Karma test runner with Jasmine test framework and PhantomJS headless browser. Similarly to the webpack hook, you can access both the test Webpack configuraion (`docker/hooks/webpack/webpack.test.js`) and the Karma configuration (`docker/hooks/webpack/karma.js`).

Run the unit tests, and start watching. When the test/source files change, karma will re-run the tests. 

In watching mode, navigate to http://localhost:9876, to see the debug output of karma. Here, you can inspect the full test code and go to the exact code lines where an error happened (in the development tools of the browser). Configure this port in `docker/docker-compose.net.yml`.

### Project organization, files

* Add the unit tests under a `test` subfolder in a module/component folder. This is just a recommendation, the system will find the test files wherever you place them.
* Name them like `foo.spec.ts`. The `spec.ts` part is the Jasmine standard, and it is important. Karma will execute spec files only.

#### Coverage report

At the end of each test run, you will receive a test coverage report. Mind, that we should keep it at 100%, later, we will force build failure in CI if the coverage is less, than 100!

You can access the coverage report in your project folder, under `reports/coverage` (open it in a browser). The system will create this folder after the very first test run.

## Common npm commands

See the rest of the scripts at the individual project descriptions.

### `npm run clean`

Clean the dist folder and the build artifacts.

### `npm run lint`

Execute the linter.

### `npm run commit`

Commit the git changes. It will use commitizen, to create proper commit comments. You should not use `git commit` directly!

### `npm run release`

Releses the project: tags the sources in Github, creates CHANGELOG, and publishes the project to the npm repository. Actually, you should not use it directly: Travis should release a project exclusively.

### `npm run npm`

Basically, for internal usage: executes npm commands inside the development container.

### `npm run travis`

Used by Travis CI only.

## Debugging

### Debugging the container

Log in to the container and see its actual content:

```npm run bash```

The command opens a bash session where you can directly change the development container. Mind, that those changes are not persistent, you loose them when you exit.

## The `docker` folder

The folder contains some scripts and Docker compose files: they compose the Docker based development infrastructure. You can finetune them. The most important file is the `docker-compose.dependencies.yml` file: add all the external docker services that you need during the development, etc.
