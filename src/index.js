const { loadSchemaJSON, schemaToJSON } = require('./loadSchemaJSON')
const renderSchema = require('./renderSchema')
const updateSchema = require('./updateSchema')
const diffSchema = require('./diffSchema')

module.exports = {
  loadSchemaJSON,
  schemaToJSON,
  renderSchema,
  updateSchema,
  diffSchema
}
