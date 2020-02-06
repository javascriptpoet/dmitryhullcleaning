import React from "react"
import GlobalStyles from "./GlobalStyles"
import { ThemeProvider } from "./ThemeContext"
import { ApolloClientProvider } from "./ApolloClientContext"
import { CurrentUserProvider } from "./CurrentUserContext"
import PageLayout from "./PageLayout"
import { Router } from "@reach/router"
import LazyRoute from "./LazyRoute"
import routes from "../routes"
import NotFoundPage from "../pages/NotFoundPage"

const App = () => {
  return (
    <ApolloClientProvider>
      <ThemeProvider>
        <CurrentUserProvider>
          <GlobalStyles />
          <PageLayout>
            <Router>
              <NotFoundPage default />
              <LazyRoute key="index" path="/" component="HomePage" />
              {Object.entries(routes).map(([key, { path, component }]) => (
                <LazyRoute key={key} path={path} component={component} />
              ))}
            </Router>
          </PageLayout>
        </CurrentUserProvider>
      </ThemeProvider>
    </ApolloClientProvider>
  )
}

export default App
