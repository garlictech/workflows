#! /usr/bin/env node

const fs = require('fs-extra')
const _ = require('lodash')
const execute = require('child_process').execSync
const merge = require('merge')

var newDeps = {}

_.forEach(['package.workflow.json', 'package.shared.json'], filename => {
    let remotePjson = {}
    try {
        remotePjson = fs.readJsonSync(filename);
    } catch (err) {}
    _.assign(newDeps, remotePjson.dependencies, remotePjson.devDependencies, remotePjson.optionalDependencies, remotePjson.peerDependencies);
})

var keys = _.keys(newDeps)

if (keys.length !== 0) {
    const packages = keys.reduce((current, next) => current + ` ${next}@${newDeps[next]}`, "")
    execute(`yarn add --network-timeout 1000000 ${packages}`, {
        stdio: [0, 1, 2]
    });
}

try {
    let workflow = fs.readJsonSync("package.workflow.json")
    let pjson = fs.readJsonSync("package.json")
    pjson.scripts = merge.recursive(pjson.scripts, workflow.scripts || {})
    pjson.workspaces = [...(pjson.workspaces || []), ...(workflow.workspaces || [])]
    fs.writeJsonSync("package.json", pjson, {
        spaces: 2
    })
} catch (err) {}

try {
    let internalShared = fs.readJsonSync("_package.shared.json")
    let externalShared = fs.readJsonSync("package.shared.json")
    let mergedShared = merge.recursive(internalShared, externalShared)
    fs.writeJsonSync("_package.shared.json", mergedShared, {
        spaces: 2
    })
} catch (err) {}

try {
    let sharedPjson = fs.readJsonSync("_package.shared.json")
    let pjson = fs.readJsonSync("package.json")
    pjson.resolutions = {
        ...pjson.resolutions,
        ...sharedPjson.resolutions
    }
    fs.writeJsonSync("package.json", pjson, {
        spaces: 2
    })
} catch (err) {}

try {
    let projectPjson = fs.readJsonSync("package.project.json")
    let pjson = fs.readJsonSync("package.json")
    pjson.workspaces = projectPjson.workspaces || pjson.workspaces || []
    pjson.private = projectPjson.private || true
    fs.writeJsonSync("package.json", pjson, {
        spaces: 2
    })
} catch (err) {}

try {
    let projectPjson = fs.readJsonSync("package.project.json");
    let internalShared = fs.readJsonSync("_package.shared.json");

    ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies', 'resolutions'].forEach(field => {
        projectPjson[field] = merge.recursive(projectPjson[field], internalShared[field])
    });

    fs.writeJsonSync("package.project.json", projectPjson, {
        spaces: 2
    })
} catch (err) {}

let remainedPackages = {}

try {
    let internalPjson = fs.readJsonSync("_package.shared.json");
    let internalDeps = {}
    _.assign(internalDeps, internalPjson.dependencies, internalPjson.devDependencies, internalPjson.optionalDependencies, internalPjson.resolutions)

    let projectPjson = fs.readJsonSync('package.project.json');
    let projectDeps = {}
    _.assign(projectDeps, projectPjson.dependencies, projectPjson.devDependencies, projectPjson.optionalDependencies, projectPjson.resolutions)

    remainedPackages = _.omit(projectDeps, _.keys(internalDeps))
} catch (err) {}

if (Object.keys(remainedPackages).length !== 0) {
    let pjson = fs.readJsonSync("package.json")
    _.assign(pjson.dependencies, remainedPackages);
    fs.writeJsonSync("package.json", pjson, {
        spaces: 2
    })
    execute(`yarn --network-timeout 1000000`, {
        stdio: [0, 1, 2]
    });
}
