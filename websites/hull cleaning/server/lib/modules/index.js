import R from "ramda"

const moduleList = ["users", "permissions", "comments"]

const addModule = (acc, moduleName) => {
  const nameSpacedPermission = permission => `${moduleName}.${permission}`

  const nameSpacedPermissions = permissions =>
    permissions.map(nameSpacedPermission)

  const addNameSpacedScopeSpace = (acc, [name, permissions]) => ({
    [nameSpacedPermission(name)]: nameSpacedPermissions(permissions)
  })

  const nameSpacedScopeSpaces = scopeSpaces =>
    Object.entries(scopeSpaces).reduce(addNameSpacedScopeSpace, {})

  const {
    typeDefs,
    resolvers,
    permissions: { scopes = [], scopeSpaces = [] },
    controller
  } = require(`./${moduleName}`)

  return {
    resolvers: {
      Query: { ...acc.resolvers.Query, ...resolvers.Query },
      Mutation: { ...acc.resolvers.Mutation, ...resolvers.Mutation }
    },
    typeDefs: [...acc.typeDefs, typeDefs],
    permissions: {
      scopes: [...acc.permissions.scopes, ...nameSpacedPermissions(scopes)],
      scopeSpaces: {
        ...acc.permissions.scopeSpaces,
        ...nameSpacedScopeSpaces(scopeSpaces)
      }
    },
    controllers: {
      ...acc.controllers,
      [moduleName]: controller
    }
  }
}

const modules = moduleList.reduce(addModule, {
  resolvers: { Query: {}, Mutation: {} },
  typeDefs: [],
  permissions: { scopes: [], scopeSpaces: {} },
  controllers: {}
})
export default modules
