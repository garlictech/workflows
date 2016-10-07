path = require 'path'
commonConfig = require "/app/gulp_common/common"

config = _.pick commonConfig, ['GulpSrc', 'HandleError']

config.GetConfig = (c) ->
  cfg = commonConfig.GetConfig c
  cfg.serverEntry = path.join cfg.buildRoot, 'server.js'
  cfg.unittestEntry = path.join 'app', 'test', 'unit', 'index.js'
  # cfg.systemtestEntry = path.join buildRoot, 'test', 'system', 'index.js'
  return cfg

module.exports = config
