import { intersection } from "ramda"
import { useLazyQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"
import React, { useContext } from "react"
import { defaultTo } from "ramda"
import { ApolloClientContext } from "./ApolloClientProvider"

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      createDate
      fullname
      username
      email
      phone
      commMethod
      allowed
      disallowed
      scopes
    }
  }
`
const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      void
    }
  }
`

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`

const SIGNUP = gql`
  mutation Signup($input: SignupInput) {
    signup(input: $input)
  }
`

export const CurrentUserContext = React.createContext()

const CurrentUserProvider = ({ children }) => {
  const apolloClient = useContext(ApolloClientContext)
  const [currentUserQuery, currentUserResult] = useLazyQuery(CURRENT_USER)
  const [loginMutation, loginResult] = useMutation(LOGIN)
  const [logoutMutation, logoutResult] = useMutation(LOGOUT)
  const [signupMutation, signupResult] = useMutation(SIGNUP)

  console.log("current user provider", currentUserResult)
  const { data = { currentUser: { scopes: [] } } } = currentUserResult
  const { currentUser = { scopes: [] } } = data

  const isLoggedIn = () => {
    return isAllowed(["permissions.logout"])
  }

  const logout = ({ onDone, ...restOptions }) => {
    logoutMutation(restOptions).finally(onDone)
    return logoutResult
  }

  const login = (input, { onCompleted, onDone, ...restOptions }) => {
    const options = {
      ...restOptions,
      onCompleted: () => {
        apolloClient.resetStore()
        onCompleted()
      },
      variables: input
    }
    loginMutation(options).finally(onDone)
    return loginResult
  }

  const signup = (input, options) => {
    signupMutation({ ...options, variables: input })
    return loginResult
  }

  const getCurrentUser = () => {
    currentUserQuery()
    return currentUser
  }

  const isAllowed = requiredScopes => {
    if (!currentUserResult.called) getCurrentUser()
    return (
      intersection(requiredScopes, currentUser.scopes).length ===
      requiredScopes.length
    )
  }

  const contextValue = {
    getCurrentUser,
    isAllowed,
    login,
    logout,
    isLoggedIn
  }

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserProvider
