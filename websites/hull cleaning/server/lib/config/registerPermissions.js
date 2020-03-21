import R from "ramda"
import modules from "../modules"

const permissionsController = modules.controllers.permissions()

const registerAllModulePermissions = async () => {
  const {
    permissions: { scopes, scopeSpaces }
  } = modules
  await permissionsController._registerBuiltInScopes(scopes)
  await permissionsController._registerBuiltInScopeSpaces(scopeSpaces)
}

const registerBuiltInPermissions = async () => {
  const makeScopeSpacePermissions = scopeSpaceName =>
    Object.entries(modules).map(moduleName => `${moduleName}.${scopeSpaceName}`)

  await permissionsController._registerBuiltInScopeSpaces({
    read: makeScopeSpacePermissions("read"),
    write: makeScopeSpacePermissions("write")
  })

  await permissionsController._registerBuiltInRoles({
    admin: ["all"],
    guest: ["permissions.login", "permissions.signup"]
  })
}

export default async () => {
  await registerAllModulePermissions()
  await registerBuiltInPermissions()
}
