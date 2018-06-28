/* tslint:disable: variable-name max-line-length */
/**
 * Try to not make your own edits to this file, use the constants folder instead.
 * If more constants should be added file an issue or create PR.
 */
const fs = require('fs');

import {
  DEV_PORT,
  PROD_PORT,
  UNIVERSAL_PORT,
  EXCLUDE_SOURCE_MAPS,
  HOST,
  USE_DEV_SERVER_PROXY,
  DEV_SERVER_PROXY_CONFIG,
  DEV_SERVER_WATCH_OPTIONS,
  DEV_SOURCE_MAPS,
  PROD_SOURCE_MAPS,
  STORE_DEV_TOOLS,
  SHOW_WEBPACK_BUNDLE_ANALYZER,
  myConstants as MY_CONSTANTS
} from './constants';

const { DefinePlugin, DllPlugin, DllReferencePlugin, NoEmitOnErrorsPlugin } = require('webpack');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

import { WebpackConfig } from './webpack';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const nodeExternals = require('webpack-node-externals');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const { getAotPlugin } = require('./webpack.aot');

const { hasProcessFlag, includeClientPackages, root, testDll, webpackHook } = require('./helpers.js');

const EVENT = process.env.npm_lifecycle_event || '';
const BRANCH = JSON.stringify(process.env.TRAVIS_BRANCH || process.env.BRANCH || 'staging');
const AOT = EVENT.includes('aot');
const DEV_SERVER = EVENT.includes('webdev');
const DLL = EVENT.includes('dll');
const HMR = hasProcessFlag('hot');
const PROD = EVENT.includes('prod');
const DEBUG = EVENT.includes('debug');
const SERVER = EVENT.includes('server');
const WATCH = hasProcessFlag('watch');
const UNIVERSAL = EVENT.includes('universal');

let port: number;
if (!UNIVERSAL) {
  if (PROD) {
    port = PROD_PORT;
  } else {
    port = DEV_PORT;
  }
} else {
  port = UNIVERSAL_PORT;
}

const PORT = port;

console.log('PRODUCTION BUILD: ', PROD);
console.log('AOT: ', AOT);
if (DEV_SERVER) {
  testDll();
  console.log(`Starting dev server on: http://${HOST}:${PORT}`);
}

const CONSTANTS = {
  AOT: AOT,
  DEV_SERVER: DEV_SERVER,
  ENV: PROD ? JSON.stringify('production') : JSON.stringify('development'),
  BRANCH: BRANCH,
  HMR: HMR,
  HOST: JSON.stringify(HOST),
  PORT: PORT,
  STORE_DEV_TOOLS: JSON.stringify(STORE_DEV_TOOLS),
  UNIVERSAL: UNIVERSAL || SERVER,
  // This is for debug package, otherwise it crashes in browser.
  // TODO: add configurable process.env variables
  DEBUG_COLORS: false
};

let myConstants = MY_CONSTANTS;

if (fs.existsSync(webpackHook('constants.js'))) {
  let myProjectConstants = require(webpackHook('constants.js')).myConstants;
  let myValidKeys = Object.keys(myProjectConstants).filter(key => !!myProjectConstants[key]);

  for (let key of myValidKeys) {
    myConstants[key] = [...myConstants[key], ...myProjectConstants[key]];
  }
}

console.log('MY CONSTANTS: ', JSON.stringify(myConstants, null, 2));

const DLL_VENDORS = [
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/platform-server',
  '@angular/router',
  '@angular/animations',
  'rxjs',
  'zone.js',
  'ng2-logger',
  '@ngrx/effects',
  '@ngrx/entity',
  '@ngrx/router-store',
  '@ngrx/store',
  'ngrx-store-freeze',
  'ngrx-store-logger',
  '@ngx-translate/core',
  '@ngx-translate/http-loader',
  'lodash',
  'primeng/primeng',
  ...myConstants.MY_VENDOR_DLLS
];

const FULL_EXCLUDE_SOURCE_MAPS = [...EXCLUDE_SOURCE_MAPS, ...myConstants.MY_EXCLUDE_SOURCE_MAPS];

const COPY_FOLDERS = [
  { from: 'src/assets', to: 'assets' },
  { from: 'node_modules/hammerjs/hammer.min.js' },
  { from: 'node_modules/hammerjs/hammer.min.js.map' },
  ...myConstants.MY_COPY_FOLDERS
];

if (DEV_SERVER) {
  COPY_FOLDERS.push({ from: 'artifacts/dll' });
}

const commonConfig = (function webpackConfig(): WebpackConfig {
  let config: WebpackConfig = Object.assign({});

  config.mode = 'development';

  config.module = {
    rules: [
      { test: /\.js$/, loader: 'source-map-loader', exclude: [FULL_EXCLUDE_SOURCE_MAPS] },
      {
        test: /\.ts$/,
        loaders:
          !DLL && !DEV_SERVER
            ? ['@ngtools/webpack']
            : [
                '@angularclass/hmr-loader',
                'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}',
                'angular2-template-loader',
                'angular-router-loader?loader=system&genDir=compiled&aot=' + AOT
              ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      },
      { test: /\.(jade|pug)$/, loaders: ['html-loader', { loader: 'pug-html-loader', options: { doctype: 'html' } }] },
      { test: /\.html/, loader: 'html-loader', exclude: [root('src/index.html')] },
      {
        test: /\.scss$/,
        loaders: ['to-string-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
        exclude: [root('src/app/styles')]
      },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'], exclude: [root('src/app/styles')] },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=5000&name=assets/[name].[hash].[ext]'
      },
      ...myConstants.MY_CLIENT_RULES
    ]
  };

  config.plugins = [
    new CheckerPlugin(),
    new DefinePlugin({ ...CONSTANTS, 'process.env': CONSTANTS }),
    new NamedModulesPlugin(),
    new LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [root('node_modules/normalize-scss/sass'), root('node_modules/compass-mixins/lib/compass')]
        }
      }
    }),
    ...myConstants.MY_CLIENT_PLUGINS
  ];

  if (process.env.CI) {
    config.plugins.push(new SimpleProgressWebpackPlugin({ format: 'expanded' }));
  } else {
    config.plugins.push(new SimpleProgressWebpackPlugin({ format: 'compact' }));
  }

  if (DEV_SERVER) {
    config.plugins.push(
      new DllReferencePlugin({
        context: '.',
        manifest: require(`./artifacts/dll/polyfill-manifest.json`)
      }),
      new DllReferencePlugin({
        context: '.',
        manifest: require(`./artifacts/dll/vendor-manifest.json`)
      })
    );

    config.module.rules.push({
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader',
        'postcss-loader?sourceMap',
        'resolve-url-loader',
        'sass-loader?sourceMap'
      ],
      include: [root('src/app/styles')]
    });

    config.module.rules.push({
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader?sourceMap'],
      include: [root('src/app/styles')]
    });
  }

  if (DLL) {
    config.plugins.push(
      new DllPlugin({
        name: '[name]',
        path: root('artifacts/dll/[name]-manifest.json')
      })
    );
  } else {
    config.plugins.push(
      new HtmlWebpackPlugin({ template: 'src/index.html', inject: 'head', chunksSortMode: 'dependency' }),
      new CopyWebpackPlugin(COPY_FOLDERS, { ignore: ['*dist_root/*'] }),
      new CopyWebpackPlugin([{ from: 'src/assets/dist_root' }])
    );
  }

  if (PROD) {
    if (!DEBUG) {
      config.mode = 'production';
    }
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader?sourceMap',
        'resolve-url-loader',
        'sass-loader?sourceMap'
      ],
      include: [root('src/app/styles')]
    });

    config.module.rules.push({
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader?sourceMap'],
      include: [root('src/app/styles')]
    });

    config.plugins.push(
      new NoEmitOnErrorsPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css'
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      ...myConstants.MY_CLIENT_PRODUCTION_PLUGINS,
      new ImageminPlugin({
        disable: !PROD,
        test: /\.(jpe?g|png|gif|svg)$/i,
        cacheFolder: '/app/artifacts/cache',
        minFileSize: 10000, // Only apply this one to files over 10kb
        jpegtran: { progressive: true },
        optipng: {},
        gifsicle: {},
        svgo: {},
        pngquant: {}
      })
    );

    if (!WATCH && !UNIVERSAL && SHOW_WEBPACK_BUNDLE_ANALYZER) {
      config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 5000 }));
    }
  } else {
    config.mode = 'development';
  }

  return config;
})();

// type definition for WebpackConfig at the bottom
const clientConfig = (function webpackConfig(): WebpackConfig {
  let config: WebpackConfig = Object.assign({});

  config.cache = true;
  config.target = 'web';
  PROD ? (config.devtool = PROD_SOURCE_MAPS) : (config.devtool = DEV_SOURCE_MAPS);
  config.plugins = [getAotPlugin('client', AOT)];

  if (UNIVERSAL || SERVER) {
    config.plugins.push(
      new ScriptExtPlugin({
        defaultAttribute: 'defer'
      })
    );
  }

  config.optimization = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (DLL) {
    config.entry = {
      app_assets: ['./src/main.browser'],
      polyfill: [
        'sockjs-client',
        '@angularclass/hmr',
        'ts-helpers',
        'zone.js',
        'core-js/client/shim.js',
        'core-js/es6/reflect.js',
        'core-js/es7/reflect.js',
        'querystring-es3',
        'strip-ansi',
        'url',
        'punycode',
        'events',
        'webpack-dev-server/client/socket.js',
        'webpack/hot/emitter.js',
        'zone.js/dist/long-stack-trace-zone.js',
        'rxjs-compat',
        ...myConstants.MY_POLYFILL_DLLS
      ],
      vendor: [...DLL_VENDORS]
    };
  } else {
    config.entry = {
      index: root('./src/main.browser.ts'),
      css: root('./src/app/styles/styles.scss')
    };
  }

  if (DLL) {
    config.output = {
      path: root('artifacts/dll'),
      filename: '[name].dll.js',
      library: '[name]'
    };
  } else if (UNIVERSAL || SERVER) {
    config.output = {
      path: root('artifacts/dist'),
      filename: '[name].js'
    };
  } else {
    config.output = {
      path: root('artifacts/dist'),
      sourceMapFilename: '[name].[hash].map',
      filename: '[name].[hash].js'
    };
  }

  config.devServer = {
    contentBase: AOT ? './artifacts/compiled' : './src',
    port: CONSTANTS.PORT,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    host: '0.0.0.0',
    watchOptions: DEV_SERVER_WATCH_OPTIONS
  };

  if (USE_DEV_SERVER_PROXY) {
    Object.assign(config.devServer, {
      proxy: DEV_SERVER_PROXY_CONFIG
    });
  }

  config.performance = {
    hints: false
  };

  config.node = {
    global: true,
    process: true,
    Buffer: true,
    crypto: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    clearTimeout: true,
    setTimeout: true,
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  };

  return config;
})();

const serverConfig: WebpackConfig = {
  target: 'node',
  externals: [nodeExternals()],
  entry: AOT ? root('./src/server.aot.ts') : root('./src/server.ts'),
  output: {
    filename: 'server.js',
    path: root('artifacts/dist')
  },
  plugins: [getAotPlugin('server', AOT)],
  module: {
    rules: []
  }
};

const defaultConfig = {
  resolve: {
    extensions: ['.ts', '.js', '.json', '.pug', '.scss', '.css'],
    modules: [root('src'), root('node_modules')]
  }
};

if (!UNIVERSAL && !SERVER) {
  DLL ? console.log('BUILDING DLLs') : console.log('BUILDING APP');
  module.exports = webpackMerge({}, defaultConfig, commonConfig, clientConfig);
} else if (SERVER) {
  module.exports = webpackMerge({}, defaultConfig, commonConfig, serverConfig);
} else {
  console.log('BUILDING UNIVERSAL');
  module.exports = [
    webpackMerge({}, defaultConfig, commonConfig, clientConfig),
    webpackMerge({}, defaultConfig, commonConfig, serverConfig)
  ];
}
