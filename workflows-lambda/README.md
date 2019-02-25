# The AWS lambda development/deployment workflows

## tl;dr

```bash
# Build the development docker image
yarn run build
# Update the recommended dependencies, settings, lint, etc.
# You must do it only once per changing the workflow version - only if you do it.
# If you clone the repo, then this step was already executed at the workflow upgrade.
yarn run setup
# Start the code build watchers. Upon code change it rebuilds the sources and re-run the unit tests.
yarn start
# Run the unit tests explicitly
yarn run unittest
# Run the unit tests in watch mode
yarn run unittest:watch
# We use semantic versioning and semantic release (https://github.com/semantic-release/semantic-release) - this is how you must commit the code.
git add .
yarn run commit
# deploy the stack(s)
yarn run deploy
```

## General concerns

The required package manager is `yarn`, as we use bitsrc. With npm, it won't work.

**IMPORTANT**: if you `yarn add` something, you have to run `yarn run build` again, to inject the new dependency to the development docker image, then `yarn start` again.

## Code organization

As we use bitsrc, the content of `project/src` reflects the bitsrc namespaces:

`project/src/{namespace}/{name}`

Currently, all the code is from `garlictech.nodejs` context, and we have two namespaces:

- `backend-libs`: the general-purpose libraries
- `lambda`: the lambda functions themselves. Export all the lambdas to bitsrc separately! The `{name}` part will be the lambda function name.

## Deployment

**Prerequistes**:

- The deployment bucket exists. If it does not exist, you must create it once:

`yarn run create-bucket`

It will use a company-wide deployment bucket name that is currently `garlictech-lambda-deployment`. The bucket name is hard-coded in the `workflow-lambda` docker workflow. So, this should normally be ready, except after a Big Cleanup. To print the environment/settings that the conteiner uses:

`yarn run print-environment`

- Your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` must be defined as environment variables. The workflow container requires it, docker compose will pass it to the container.

**Configuration**

- Create the CloudFormation stack template in the file `project/lambda-stack-template.yml`. The name cannot be changed!
- Create the project-specific stack configurations in the file `project/lambdas.json`. The name cannot be changed! This is a "proprietary" file that only the container understands :) Example:

```json
{
  "lambdas": [
    "passwordless-pre-sign-up",
    "passwordless-verify-auth-challenge-response",
    "passwordless-define-auth-challenge",
    "passwordless-create-auth-challenge"
  ],
  "stacks": {
    "gtrack-lambda-dev": {
      "parameters": {
        "SESFromAddress": "noreply@gtracksport.com",
        "UserPoolName": "gt-dev-1",
        "PasswordlessCallbackURI": "foobar"
      }
    }
  }
}
```

- `lambdas`: The lambda names. Remember, the `project/lambda/{name}` determines the lambda name, it will be simply `{name}`. In this array, simply list these names (sub-directories) that you want to deploy to the stack.
- `stacks`: You can define multiple copies of the same stack template. For example, one for development, one for staging, etc. The object key will be the stack name (in the example, `gtrack-lambda-dev`). The `parameters` dictionary specifies the individual values of the template configuration, so the `Parameters` part of the stack template. If you deploy the stack from the AWS console, these values should be in the configuration form. That means you can deploy multiple stack in one deployment step.

**Deployment**

`yarn run deploy`

The deployment process assumes the above file structure. They are defined in the `workflows-lambda`. Some technical background:

- We utilize Claudia for packaging the lambdas (`claudia pack`). The packages are created in `artifacts/dist/packaged-lambdas` along with the generated cloudformation package descriptor.
- We use AWS SAM to upload the packages to a deployment bucket (`garlictech-lambda-deployment` is the bucket name).
- Then, we use AWS SAM to deploy the stack.
- The workflow container handles all these steps in one go.

## Testing

The workflows have unit test and system test support, both use Jasmine. However, currently, only the unit test execution has been integrated, system tests are coming soon. Add your unit tests next to the tested functionality, under "test" subfolder, and use "spec.ts" postfix. The test executor picks up all the files following this pattern.
