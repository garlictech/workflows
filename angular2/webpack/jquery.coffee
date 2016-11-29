module.exports = (config) ->
  config.plugin.push new webpack.ProvidePlugin
    $: "jquery"
    jQuery: "jquery"
    "window.jQuery": "jquery"
