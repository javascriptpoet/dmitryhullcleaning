import React from "react"
import GlobalStyles from "./GlobalStyles"
import { ThemeProvider } from "./ThemeContext"
import { ApolloClientProvider } from "./ApolloClientContext"
import { CurrentUserProvider } from "./CurrentUserContext"
import { Router } from "@reach/router"
import LazyRoute from "./LazyRoute"
import routes from "../routes"
import NotFoundPage from "../pages/NotFoundPage"
import "bulma/bulma.sass"

const App = () => {
  return (
    <ApolloClientProvider>
      <ThemeProvider>
        <CurrentUserProvider>
          <GlobalStyles />
          <Router>
            <NotFoundPage default />
            <LazyRoute key="index" path="/" component="HomePage" />
            {Object.entries(routes).map(([key, { path, component }]) => (
              <LazyRoute key={key} path={path} component={component} />
            ))}
          </Router>
        </CurrentUserProvider>
      </ThemeProvider>
    </ApolloClientProvider>
  )
}

export default App
