import React from "react"
import GlobalStyles from "./GlobalStyles"
import AppProvider from "./AppProvider"
import { Router } from "@reach/router"
import SecureRoute from "./SecureRoute"
import routes from "../routes"
import NotFoundPage from "../pages/NotFoundPage"
import "bulma/bulma.sass"
import "react-bulma-components/dist/react-bulma-components.min.css"
import ErrorBoundary from "./ErrorBoundary"

const errorHandler = () => true

const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <GlobalStyles />
        <Router>
          <NotFoundPage default />
          {Object.entries(routes).map(([key, { path, ...restRoute }]) => (
            <SecureRoute key={key} path={path} route={{ path, ...restRoute }} />
          ))}
        </Router>
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
