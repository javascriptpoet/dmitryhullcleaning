import ApolloClientProvider, {
  ApolloClientContext
} from "./ApolloClientProvider"
import CurrentUserProvider, { CurrentUserContext } from "./CurrentUserProvider"
import ThemeProvider, { ThemeContext } from "./ThemeProvider"
import React from "react"

const AppProvider = ({ children }) => {
  return (
    <ApolloClientProvider>
      <ThemeProvider>
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </ThemeProvider>
    </ApolloClientProvider>
  )
}
export default AppProvider

export { ApolloClientContext, CurrentUserContext, ThemeContext }
