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

  async _isRole(name) {
    return R.includes(name, roles)
  }
  async _isScopeSpace(name) {
    return R.includes(name, ScopeSPaces)
  }
  async _isScope(name) {
    return R.includes(name, scopes)
  }
  async _resolveScopeSpace(scopeSpaceName) {
    const scopeSpace = scopeSpaces[scopeSpaceName] || []

    const addScopes = (acc, el) => {
      const isScopeSpace=await this._isScopeSpace(el)
      if(isScopeSpace){
        const resolved=await this._resolveScopeSpace(el)
        return R.concat(acc,resolved)
      }
      return  R.concat(acc,[el])
    }
    return R.reduce(addScopes, [], scopeSpace)
  }

  async _resolveRole(roleName) {
    const roleElements = roles[roleName] || []

    const addScopes = (acc, el) => {
      const isScopeSpace=await this._isScopeSpace(el)
      if (isScopeSpace){
        const resolved=await this._resolveScopeSpace(el)
        return R.concat(acc,resolved )
      }
      const isRole=await this._isRole(el)
      if (isRole) {
        const resolved=await this._resolveRole(el)
        return R.concat(acc,resolved )
      }
      return R.concat(acc,[el])
    }

    return R.reduce(addScopes, [], roleElements)
  }

  async _resolveUserScopes(user) {
    const {
      roles: userRoles = [],
      allowedScopes = [],
      disallowedScopes = []
    } = user

    const scopesFromRoles=()=>{
      const addScopes = (acc, roleName) => {
        const resolved=await this._resolveRole(roleName)
        return R.concat(acc, resolved)
      }
      return R.reduce(addScopes, [], userRoles)
    }
    const resolvePermissionList=(list)=>{
      const addScopes=(acc,el)=>{
        const isScopeSpace=await this._isScopeSpace(el)
        if(isScopeSpace){
          const resolved=await this._resolveScopeSpace(el)
          return R.concat(acc, resolved)
        }
        return R.concat(acc,[el])
      }

      return R.reduce(addScopes,[],list)
    }
    const resolvedAllowed=resolvePermissionList(allowedScopes)
    const resolvedDisallowed=resolvePermissionList(disallowedScopes)
    return R.difference(R.union(scopesFromRoles(),resolvedAllowed),resolvedDisallowed)
  }

  async resolveUserScopes(user) {
    const scopes = await this._publicMethod("resolveUserScopes", user)
    return scopes
  }
  
}
export default props => new PermissionsController(props)
