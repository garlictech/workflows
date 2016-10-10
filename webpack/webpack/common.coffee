path = require 'path'
_ = require 'lodash'
webpack = require 'webpack'
plugins = require('webpack-load-plugins') {config: '/app/package_internal.json'}

#related to this bug: https://github.com/jtangelder/sass-loader/issues/100
process.env.UV_THREADPOOL_SIZE = 100
IsDev = process.env.NODE_ENV is 'development'
IsCI = process.env.CI is 'true'

module.exports = (dirname) ->
  packageConfig = require('./package-config') dirname
  PATHS = packageConfig.PATHS

  conf =
    context: dirname
    debug: false
    devtool: 'source-map'

    module:
      preLoaders: [
        {test: /\.coffee$/, loader: 'coffeelint', exclude: 'node_modules'}
      ]
      loaders: [
        {test: /\.js$/, loader: 'jshint!ng-annotate?add=true', exclude: /node_modules|bower_components|vendor|dist\/|~/}
        {test: /\.scss$/, loader: plugins.extractText.extract('style-loader', "css?sourceMap!postcss!sass?sourceMap")}
        {test: /\.less$/, loader: plugins.extractText.extract('style-loader', 'css?sourceMap!postcss|less?sourceMap')}
        {test: /\.css$/, loader: plugins.extractText.extract("style-loader", "css!postcss")}
        {test: /\.coffee$/, loader: 'ng-annotate?add=true!coffee'}
        {test: /\.jade$/, loader: "html!jade-html"}
        {test: /\.html$/, loader: 'html'}
        {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&minetype=application/font-woff"}
        {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000"}
        {test: /\.jpg$/, loader: 'url?mimetype=image/jpg&limit=10000'}
        {test: /\.gif$/, loader: 'url?mimetype=image/gif&limit=10000'}
        {test: /\.png$/, loader: 'url?mimetype=image/png&limit=10000'}
        {test: /\.json$/, loader: 'json'}
        {test: /\.(yaml|yml)$/, loader: 'json!yaml'}
        {test: /foundation\..*\.js$/, loader: 'babel', query: {presets: ['react', 'es2015']}}
      ]
      postLoaders: [
        # {test: /\.coffee/, loader: 'istanbul-instrumenter', exclude: 'node_modules|unit'}
      ]
      noParse: []

    postcss: -> [ require('precss'), require('postcss-normalize'),
      require('autoprefixer')({browsers: ['last 2 versions', 'safari 5','ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']})
    ]

    sassLoader: {
      includePaths: [
        path.join(PATHS.node, 'normalize-scss', 'sass'),
        path.join(PATHS.node, 'foundation-sites', 'scss')
      ]
    },
    
    plugins: [
      new plugins.html
        inject: true
        template: packageConfig.template

      new plugins.extractText "style.css",
        allChunks: true

      new webpack.ResolverPlugin (new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin "bower.json", ["main"])
    ]
    
    resolve:
      extensions: ["", ".webpack.js", ".web.js", ".js", ".coffee", ".jade", ".html", ".scss", '.css', '.json']
      
      root: [
        PATHS.workflow_node
      ]
      
      modulesDirectories: [
        'src',
        'node_modules',
        'bower_components'
      ]

      unsafeCache: true

    # See: http://bit.ly/1sL05tL
    # This was necessary because I do not want to install all the loaders with all the packages. I keep and maintain loaders it under workflows.
    resolveLoader:
      root: PATHS.workflow_node

  if not IsDev
    conf.plugins = _.concat conf.plugins, [
      # new webpack.optimize.UglifyJsPlugin
      #   minimize: true
      #   compress:
      #     warnings: false
      
      # TODO Dedupe pugin causes error, "https://github.com/webpack/karma-webpack/issues/41"
      # new webpack.optimize.DedupePlugin()
    ]

  if not IsCI
    conf.plugins.push new plugins.progressBar()

  conf.PATHS = PATHS
  conf.packageConfig = packageConfig
  return conf
