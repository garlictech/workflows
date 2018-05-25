/**
 * @author: @AngularClass
 */
"use strict";

var path = require('path');

const EVENT = process.env.npm_lifecycle_event || '';

// Helper functions
var ROOT = path.resolve(__dirname, '..');
var PROJECTROOT = path.resolve(__dirname, '..');
var SITEROOT = path.resolve(__dirname, '..', 'src');
var SRCROOT = path.resolve(__dirname, '..', 'src');
var DISTROOT = path.resolve(__dirname, '..', 'dist');
var HOOKROOT = path.resolve(__dirname, '..', 'hooks');
var AOT = false;

function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1;
}

function hasNpmFlag(flag) {
    return false;
    // return EVENT.includes(flag);
}

function isWebpackDevServer() {
    return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
}

var root = path.join.bind(path, ROOT);
var projectRoot = path.join.bind(path, PROJECTROOT);
var hookRoot = path.join.bind(path, HOOKROOT);

module.exports = function(config) {
    var siteRoot = path.join.bind(path, config.SITEROOT || SITEROOT);
    var srcRoot = path.join.bind(path, config.SRCROOT || SRCROOT);
    var distRoot = path.join.bind(path, config.DISTROOT || DISTROOT);

    return {
        isCi: function() {
            return process.env.CI === 'true';
        },

        isAot: function() {
            return AOT;
        },

        devHookFile: function() {
            return hookRoot('webpack', 'webpack.dev.js');
        },

        prodHookFile: function() {
            return hookRoot('webpack', 'webpack.prod.js');
        },

        karmaHookFile: function() {
            return hookRoot('karma', 'karma.conf.js');
        },

        projectRoot: projectRoot,
        siteRoot: siteRoot,
        srcRoot: srcRoot,
        distRoot: distRoot,
        hasProcessFlag: hasProcessFlag,
        hasNpmFlag: hasNpmFlag,
        isWebpackDevServer: isWebpackDevServer,
        root: root
    }
}