import React from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import useApolloClient from "../hooks/useApolloClient"

const initialContext = {
  login: (email, password) => false,
  logout: () => false
}

export const CurrentUserContext = React.createContext(initialContext)

export const CurrentUserProvider = ({ children }) => {
  const apolloClient = useApolloClient()
  const { get: getUser, set: setUser } = useLocalStorage("currentUser", {
    role: "guest"
  })
  const user = getUser()

  const currentUser = {
    login: (username, password) => {
      if (user.role === "guest" && username !== "" && password !== "") {
        alert(username)
        setUser({ role: "admin" })
        return true
      }

      return false
    },
    logout: () => {
      if (user !== { role: "guest" }) {
        setUser({ role: "guest" })
        apolloClient.resetStore()
        return true
      }

      return false
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  )
}
