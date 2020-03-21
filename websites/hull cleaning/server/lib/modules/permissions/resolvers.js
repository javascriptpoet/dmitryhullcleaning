import getAuthToken from "../../utils/getAuthToken"
import passport from "passport"
import { ApolloError } from "apollo-server"

async function resolvePermissions(
  _,
  { allowed, disallowed },
  { getController }
) {
  return await getController("permissions").resolvePermissions(
    allowed,
    disallowed
  )
}

async function upsertRole(_, { name, permissions }, { getController }) {
  return await getController("users").upsertRole(name, permissions)
}

async function upsertScopeSpace(_, { name, permissions }, { getController }) {
  return await getController("permissions").upsertScopeSpace(name, permissions)
}

async function addScope(_, { name }, { getController }) {
  return await getController("permissions").addScope(name)
}

async function deleteRole(_, { name }, { getController }) {
  return await getController("permissions").deleteRole(name)
}

async function deleteScopeSpace(_, { name }, { getController }) {
  return await getController("permissions").deleteScopeSpace(name)
}

async function deleteScope(_, { name }, { getController }) {
  return await getController("permissions").deleteScope(name)
}

async function login(_, { input }, { res, getController }) {
  console.log("login resolver")
  const onLogin = currentUser => {
    console.log("onLogin", currentUser)
    res.cookie("jwt", `${getAuthToken(currentUser.id)}`, {
      maxAge: 24 * 60 * 60,
      httpOnly: true
    })
  }
  await getController("permissions").login(input, onLogin)
}

async function signup(_, { input }, { getController }) {
  await getController("permissions").signup(input)
}

async function logout(_, __, { res }) {
  const onLogout = () => res.clearCookie("jwt")
  await getController("permissions").logout(onLogout)
}

export default {
  Mutation: {
    upsertRole,
    upsertScopeSpace,
    addScope,
    deleteRole,
    deleteScopeSpace,
    deleteScope,
    login,
    logout,
    signup
  },
  Query: {
    resolvePermissions
  }
}
