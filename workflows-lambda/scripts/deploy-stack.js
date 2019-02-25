#! /usr/bin/env node

const process = require('process');
const execute = require('child_process').execSync
const fs = require('fs-extra')

const packageDir = `${process.cwd()}/artifacts/dist/packaged-lambdas`
const distDir = `${process.cwd()}/artifacts/dist/lambda`
const projectDir = `${process.cwd()}/project`
const templateFile = `${projectDir}/lambda-stack-template.yaml`
const packageFile = `${packageDir}/packaged.yaml`
const lambdaJsonFile = `${projectDir}/lambdas.json`

let lambdas

execute(`mkdir -p ${packageDir}`)

try {
    lambdas = fs.readJsonSync(lambdaJsonFile)
} catch (err) {
    console.error(`The ${lambdaJsonFile} is missing or wrong, check it please!`)
    process.exit(1)
}

lambdas.lambdas.forEach(lambdaName => {
    execute(`cd ${distDir}/${lambdaName} && claudia pack --no-optional-dependencies --output ${packageDir}/${lambdaName}.zip --force`, {
        stdio: [0, 1, 2]
    });

})

execute(`sam package --template-file ${templateFile} --output-template-file ${packageFile} --s3-bucket ${process.env.LAMBDA_DEPLOY_S3_BUCKET} --region ${process.env.AWS_REGION}`, {
    stdio: [0, 1, 2]
});

Object.keys(lambdas.stacks).forEach(stackKey => {
    let command = `sam deploy --template-file ${packageFile} --capabilities CAPABILITY_IAM --stack-name ${stackKey} --region ${process.env.AWS_REGION} --parameter-overrides `

    const paramObj = lambdas.stacks[stackKey].parameters

    command = Object.keys(paramObj).reduce((cmd, key) => {
        return `${cmd} ${key}="${paramObj[key]}" `
    }, command)

    execute(command, {
        stdio: [0, 1, 2]
    });
})