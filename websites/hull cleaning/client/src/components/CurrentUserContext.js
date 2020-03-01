import useApolloClient from "../hooks/useApolloClient"
import intersection from "../utils/array/intersection"
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import React from "react"

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      createDate
      comments
      fullname
      username
      email
      phone
      commMethod
      roles
      allowedScopes
      disallowedScopes
      scopes
    }
  }
`

const domain =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"

const url = path => new URL(path, domain)

export const CurrentUserContext = React.createContext()

export const CurrentUserProvider = ({ children }) => {
  const apolloClient = useApolloClient()
  const { loading, error, data, refetch } = useQuery(CURRENT_USER)

  const currentUser = loading || error ? {} : data.currentUser

  const login = async (username, password) => {
    const loginFormData = new FormData()
    loginFormData.append("username", username)
    loginFormData.append("password", password)
    const response = await fetch(url("/api/login"), {
      method: "POST",
      body: new FormData(loginFormData)
    })
    if (response.statusText === "OK") {
      apolloClient.resetStore()
      refetch()
    }
  }

  const logout = async () => {
    const response = await fetch(url("/api/logout"), {
      method: "POST"
    })
    if (response.statusText === "OK") {
      apolloClient.resetStore()
      refetch()
    }
  }

  const isAllowed = requiredScopes => {
    return (
      intersection(requiredScopes, currentUser.scopes).length ===
      requiredScopes.length
    )
  }

  const currentUserController = {
    currentUser,
    isAllowed,
    login,
    logout
  }

  return (
    <CurrentUserContext.Provider value={currentUserController}>
      {children}
    </CurrentUserContext.Provider>
  )
}
