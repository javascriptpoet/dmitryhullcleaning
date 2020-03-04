import Controller from "../../utils/Controller"
import { ApolloError } from "apollo-server"
import R from "ramda"

const roles = {}
const scopeSpaces = {}
const scopes = []

class PermissionsController extends Controller {
  constructor(props) {
    super({ name: "permissions", ...props })
  }

  async _resolvePermissionList(list) {
    const addScopes = async (acc, el) => {
      const type = await this._permissionType(el)

      if (el === "all") return scopes
      if (type === "scopeSpace") {
        const resolved = await this._resolvePermissionList(scopeSpaces[el])
        return [...acc, ...resolved]
      }
      if (type === "role") {
        const resolved = await this._resolvePermissionList(roles[el])
        return [...acc, ...resolved]
      }
      return [...acc, el]
    }
    const resolved = await Promise.all(R.reduce(addScopes, [], list))
    return R.uniq(resolved)
  }

  async _resolvePermissions(allowedPermissions, disallowedPermissions) {
    const resolvedAllowed = await this._resolvePermissionList(
      allowedPermissions
    )
    const resolvedDisallowed = await this._resolvePermissionList(
      disallowedPermissions
    )
    return R.compose(R.uniq, R.difference)(
      R.union(scopesFromRoles(), resolvedAllowed),
      resolvedDisallowed
    )
  }

  resolvePermissions(...args) {
    return this._publicMethod("resolveUserScopes", ...args)
  }

  _resolvePermissionTypes(permissions) {
    return Promise.all(
      R.map(name => {
        return [name, this._permissionType(name)]
      }, permissions)
    )
  }

  resolvePermissionTypes(...args) {
    return this._publicMethod("resolvePermissionTypes", ...args)
  }

  async _permissionType(name) {
    if (roles[name]) return "role"
    if (scopeSpaces[name]) return "scopeSpace"
    if (R.includes(name, scopes)) return "scope"
    return ""
  }

  async _upsertRole(name, permissionsToUpsert) {
    const oldPermissions = roles[name] || []
    const type = await this._permissionType(name)
    if (type !== "role")
      throw new ApolloError(
        `Permissions must be unique. ${name} is already a ${type}`
      )
    roles[name] = R.uniq(R.union(oldPermissions, permissionsToUpsert))
    return roles[name]
  }

  upsertRole(...args) {
    return this._publicMethod("upsertRole", ...args)
  }

  async _upsertScopeSpace(name, permissionsToUpsert) {
    const oldPermissions = scopeSpaces[name] || []
    const type = await this._permissionType(name)
    if (type !== "scopeSpace")
      throw ApolloError(
        `Permissions must be unique. ${name} is already a ${type}`
      )
    const types = await this._resolvePermissionTypes()
    if (R.find(type => type === "role", permissionsToUpsert))
      throw new ApolloError(`roles not allowed in scopeSpace as permission`)
    scopeSpaces[name] = R.unique(R.union(oldPermissions, permissionsToUpsert))
    return roles[name]
  }

  upsertScopeSpace(...args) {
    return this._publicMethod("upsertScopeSpace", ...args)
  }

  async _addScope(scope) {
    const type = await this._permissionType(name)
    if (type !== "scope")
      throw ApolloError(
        `Permissions must be unique. ${name} is already a ${type}`
      )
    scopes = R.uniq([...scopes, name])
  }

  async _deleteRole(name) {
    if (roles[name]) delete roles[name]
  }

  deleteRole(...args) {
    return this._publicMethod("deleteRole", ...args)
  }

  async _deleteScopeSpace(name) {
    if (scopeSpaces[name]) delete scopeSpaces[name]
  }

  deleteScopeSpace(...args) {
    return this._publicMethod("deleteScopeSpace", ...args)
  }

  async _registerBuiltInRoles(roles) {
    //a public method would have to check all roles first so its none or all
    const promissesToRegister = Object.entries(roles).map(this._upsertRole)
    await Promise.all(promissesToRegister)
  }

  async _registerBuiltInScopeSpaces(scopeSpaces) {
    //a public method would have to check all roles first so its none or all
    const promissesToRegister = Object.entries(scopeSpace).map(
      this._upsertScopeSpace
    )
    await Promise.all(promissesToRegister)
  }

  async _registerBuiltInScopes(scopes) {
    //a public method would have to check all roles first so its none or all
    const promissesToRegister = scopes.map(this._addScope)
    await Promise.all(promissesToRegister)
  }
}

export default props => new PermissionsController(props)
