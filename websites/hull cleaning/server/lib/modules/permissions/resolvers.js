function resolvePermissions(
  _,
  { allowedPermissions, disallowedPermissions },
  { controllers: { permissionsController } }
) {
  return permissionsController.resolvePermissions(
    allowedPermissions,
    disallowedPermissions
  )
}

function upsertRole(
  _,
  { name, permissions },
  { controllers: { permissionsController } }
) {
  return permissionsController.upsertRole(name, permissions)
}

function upsertScopeSpace(
  _,
  { name, permissions },
  { controllers: { permissionsController } }
) {
  return permissionsController.upsertScopeSpace(name, permissions)
}

function addScope(_, { name }, { controllers: { permissionsController } }) {
  return permissionsController.addScope(name)
}

function deleteRole(_, { name }, { controllers: { permissionsController } }) {
  return permissionsController.deleteRole(name)
}

function deleteScopeSpace(
  _,
  { name },
  { controllers: { permissionsController } }
) {
  return permissionsController.deleteScopeSpace(name)
}

function deleteScope(_, { name }, { controllers: { permissionsController } }) {
  return permissionsController.deleteScope(name)
}

export default {
  mutation: {
    upsertRole,
    upsertScopeSpace,
    addScope,
    deleteRole,
    deleteScopeSpace,
    deleteScope
  },
  query: {
    resolvePermissions
  }
}
