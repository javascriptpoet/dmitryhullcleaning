import React, { useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import useApolloClient from "../hooks/useApolloClient"
import intersection from "../utils/array/intersection"

const initialContext = {
  login: (email, password) => false,
  logout: () => false
}

export const CurrentUserContext = React.createContext(initialContext)

export const CurrentUserProvider = ({ children }) => {
  const apolloClient = useApolloClient()
  const [user, setUser] = useState({
    scopes: [],
    isLoggedin: false
  })

  const currentUser = {
    ...user,
    isAllowed: requiredScopes => {
      return (
        intersection(requiredScopes, user.scopes).length ===
        requiredScopes.length
      )
    },
    login: (username, password) => {
      if (username === "skihappy" && password === "12Powder") {
        setUser({
          isLoggedin: true,
          scopes: ["admin"],
          firstName: "Dmitry",
          lastName: "Shust"
        })
      } else {
        setUser({
          isLoggedin: true,
          scopes: [],
          firstName: "Joe",
          lastName: "Doe"
        })
      }
      alert(user.firstName, user.lastName)
      return true
    },
    logout: () => {
      setUser({ scopes: [], isLoggedin: false })
      apolloClient.resetStore()

      return true
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  )
}
