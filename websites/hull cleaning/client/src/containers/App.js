import React from "react"
import Header from "../components/Header"
import GlobalStyles from "../components/GlobalStyles"
import Main from "../containers/Main"
import { ThemeProvider } from "../components/ThemeContext"
import { ApolloClientProvider } from "../components/ApolloClientContext"
import { CurrentUserProvider } from "../components/CurrentUserContext"

const App = () => {
  return (
    <ApolloClientProvider>
      <ThemeProvider>
        <CurrentUserProvider>
          <GlobalStyles />
          <Header />
          <Main />
        </CurrentUserProvider>
      </ThemeProvider>
    </ApolloClientProvider>
  )
}

export default App
