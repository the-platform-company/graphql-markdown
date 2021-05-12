'use strict'
const fs = require('fs')
const fetch = require('node-fetch')
const graphql = require('graphql')

const DEFAULT_GRAPHQL = graphql

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      filename,
      'utf8',
      (err, data) => (err ? reject(err) : resolve(data))
    )
  })
}

function schemaToJSON(schema, options) {
  options = options || {}
  const graphql = options.graphql || DEFAULT_GRAPHQL
  return graphql
    .graphql(schema, graphql.getIntrospectionQuery())
    .then(result => {
      return result.data
    })
}

function fetchSchemaJSON(url, options) {
  options = options || {}
  const graphql = options.graphql || DEFAULT_GRAPHQL
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: JSON.stringify({ query: graphql.getIntrospectionQuery() })
  })
    .then(res => res.json())
    .then(result => result.data)
}

function parseSchemaGraphQL(filename, options) {
  options = options || {}
  const graphql = options.graphql || DEFAULT_GRAPHQL
  return readFile(filename).then(data => graphql.buildSchema(data))
}

function loadSchemaJSON(schemaPath, loadOptions) {
  if (schemaPath.indexOf('://') >= 0) {
    return fetchSchemaJSON(schemaPath, loadOptions)
  } else if (schemaPath.match(/\.g(raph)?ql$/)) {
    return parseSchemaGraphQL(schemaPath).then(schemaToJSON)
  }
}

module.exports = { loadSchemaJSON, schemaToJSON }
