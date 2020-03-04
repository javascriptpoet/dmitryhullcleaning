import R from "ramda"
import modules from "../modules"

const permissionsController = modules.controllers.permissions()

const namespacedPermission = (permission, moduleName) =>
  `${moduleName}.${permission}`

const namespacedPermissions = (permissions, moduleName) =>
  permissions.map(namespacePermission)

const namespacedScopeSpace = (name, permissions, moduleName) => ({
  [`${namespacedPermission(name, moduleName)}`]: namespacedPermissions(
    permissions,
    moduleName
  )
})

const namespacedScopeSpaces = (scopeSpaces, moduleName) =>
  R.reduce(
    (acc, name, permissions) => ({
      ...acc,
      ...namespacedScopeSpace(name, permissions, moduleName)
    }),
    {},
    scopeSpaces
  )

const registerAllModulePermissions = async () => {
  const registerModulePermissions = async (moduleName, module) => {
    const namespacedScopes = namespacedPermissions(
      module.permissions.scopes,
      moduleName
    )
    await permissionsController._registerBuiltInScopes(namespacedScopes)

    const namespacedScopeSpaces = namespacedScopeSpaces(
      module.permissions.scopeSpaces,
      moduleName
    )
    await permissionsController._registerBuiltInScopeSpaces(
      namespacedScopeSpaces
    )
  }
  const promisesToRegisterModules = Object.entries(modules).map(
    registerModulePermissions
  )
  await Promise.all(promisesToRegisterModules)
}

const registerBuiltInPermissions = async () => {
  const makeScopeSpacePermissions = scopeSpaceName =>
    Object.entries(modules).map(moduleName =>
      namespacedPermission(scopeSpaceName, moduleName)
    )

  await permissionsController._registerBuiltInScopeSpaces({
    read: makeScopeSpacePermissions("read"),
    write: makeScopeSpacePermissions("write")
  })

  await permissionsController._registerBuiltInRoles({
    admin: ["all"]
  })
}

export default async () => {
  await registerAllModulePermissions()
  await registerBuiltInPermissions()
}
