path = require 'path'
commonConfig = require "/app/gulp_common/common"

config = _.pick commonConfig, ['GulpSrc', 'HandleError']

config.GetConfig = (c) ->
  cfg = commonConfig.GetConfig c
  cfg.serverEntry = c.serverEntry or path.join cfg.buildRoot, 'server', 'server.js'
  cfg.systemtestEntry = "/app/test/system/index.js"
  cfg.unittestEntry = "/app/test/unit/index.js"
  return cfg

module.exports = config
