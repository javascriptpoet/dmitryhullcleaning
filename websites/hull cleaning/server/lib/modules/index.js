import R from "ramda"

const moduleList = ["users", "permissions"]

const moduleExport = (exportName, moduleName) => {
  const moduleExport = require(`./${moduleName}/${exportName}`)
  return moduleExport
}

const addModule = (acc, moduleName) => {
  const moduleResolvers = moduleExport("resolvers", moduleName)
  const moduleTypeDefs = moduleExport("typeDefs", moduleName)

  const {
    scopes: moduleScopes = [],
    scopeSpaces: moduleScopeSpaces = []
  } = moduleExport("permissions", moduleName)

  return {
    resolvers: {
      query: { ...acc.resolvers.query, ...moduleResolvers.query },
      mutation: { ...acc.resolvers.mutation, ...moduleResolvers.mutation }
    },
    typeDefs: [...acc.typeDefs, ...moduleTypeDefs],
    permissions: {
      scopes: [...acc.permissions.scopes, ...moduleScopes],
      scopeSpaces: {
        ...acc.permissions.scopeSpaces,
        ...moduleScopes
      }
    },
    controllers: {
      ...acc.controllers,
      [moduleName]: moduleExport("controller", moduleName)
    }
  }
}

export default R.reduce(
  addModule,
  {
    resolvers: { query: {}, mutation: {} },
    typeDefs: [],
    permissions: { scopes: [], scopeSpaces: {} },
    controllers: {}
  },
  moduleList
)
