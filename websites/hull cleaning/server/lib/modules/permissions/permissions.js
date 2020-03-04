const scopes = [
  "resolvePermissions",
  "upsertRole",
  "upsertScopeSpace",
  "addScope",
  "deleteRole",
  "deleteScopeSpace",
  "deleteScope",
  "resolvePermissionTypes"
]
const scopeSpaces = {
  read: ["resolvePermissions", "resolvePermissionTypes"],
  write: [
    "upsertRole",
    "upsertScopeSpace",
    "addScope",
    "deleteRole",
    "deleteScopeSpace",
    "deleteScope"
  ]
}
