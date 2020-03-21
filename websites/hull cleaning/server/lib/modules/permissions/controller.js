import Controller from "../../utils/Controller"
import { ApolloError, UserInputError } from "apollo-server"
import R from "ramda"

let roles = {}
let scopeSpaces = {}
let scopes = []

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
    const resolved = (list || []).reduce(async (acc, el) => {
      return await addScopes(acc, el)
    }, [])
    return R.uniq(resolved)
  }

  async _resolvePermissions(allowedPermissions, disallowedPermissions) {
    const resolvedAllowed = await this._resolvePermissionList(
      allowedPermissions
    )
    const resolvedDisallowed = await this._resolvePermissionList(
      disallowedPermissions
    )
    return R.compose(R.uniq, R.difference)(resolvedAllowed, resolvedDisallowed)
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

  _permissionType(name) {
    if (roles[name]) return "role"
    if (scopeSpaces[name]) return "scopeSpace"
    if (R.includes(name, scopes)) return "scope"
    return ""
  }

  async _upsertRole(name, permissionsToUpsert) {
    const oldPermissions = roles[name] || []
    const type = await this._permissionType(name)
    if (!!type && type !== "role")
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
    if (!!type && type !== "scopeSpace")
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
    const type = await this._permissionType(scope)
    if (!!type && type !== "scope") {
      throw new ApolloError(
        `Permissions must be unique. ${scope} is already a ${type}`
      )
    }
    scopes = R.uniq([...scopes, scope])
  }

  _deleteRole(name) {
    if (roles[name]) delete roles[name]
  }

  deleteRole(...args) {
    return this._publicMethod("deleteRole", ...args)
  }

  _deleteScopeSpace(name) {
    if (scopeSpaces[name]) delete scopeSpaces[name]
  }

  deleteScopeSpace(...args) {
    return this._publicMethod("deleteScopeSpace", ...args)
  }

  async _registerBuiltInRoles(roles) {
    //a public method would have to check all roles first so its none or all
    Object.entries(roles).forEach(async role => {
      await this._upsertRole
    })
  }

  async _registerBuiltInScopeSpaces(scopeSpaces) {
    //a public method would have to check all roles first so its none or all
    Object.entries(scopeSpaces).forEach(async scopeSpace => {
      await this._upsertScopeSpace
    })
  }

  async _registerBuiltInScopes(scopes) {
    //a public method would have to check all roles first so its none or all
    scopes.forEach(async scope => {
      return await this._addScope(scope)
    })
  }

  async _signup(newUser) {
    const usersController = this._getController("users")
    try {
      await usersController._add(newUser)
    } catch (e) {
      if (e instanceof ApolloError)
        throw new UserInputError("signup error", {
          fieldErrors: [{ name: "username", message: e.message }]
        })
      throw e
    }
  }

  signup(...args) {
    return this._publicMethod("signup", ...args)
  }

  _logout(onLogout) {
    onLogout()
  }

  logout(...args) {
    return this._publicMethod("logout", ...args)
  }

  async _login({ username, password }, onLogin) {
    const usersController = this._getController("users")
    let user
    try {
      user = await usersController._findByUsername(username)
    } catch (e) {
      console.log(e)
      if (e instanceof ApolloError)
        throw new UserInputError("login error", {
          fieldErrors: [{ name: "username", message: e.message }]
        })
      throw e
    }
    if (user.password !== password)
      throw new UserInputError("login error", {
        fieldErrors: [{ name: "password", message: "does not match" }]
      })
    onLogin(user)
  }

  login(...args) {
    return this._publicMethod("login", ...args)
  }
}

export default props => new PermissionsController(props)
