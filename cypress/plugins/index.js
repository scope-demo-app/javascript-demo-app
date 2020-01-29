const { initCypressPlugin } = require('@undefinedlabs/scope-agent/cypress/plugin')

module.exports = async (on, config) => {
  const newConfig = await initCypressPlugin(on, config)
  return newConfig
}
