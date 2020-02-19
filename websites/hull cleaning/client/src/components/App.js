import React from "react"
import GlobalStyles from "./GlobalStyles"
import { ThemeProvider } from "./ThemeContext"
import { ApolloClientProvider } from "./ApolloClientContext"
import { CurrentUserProvider } from "./CurrentUserContext"
import { Router } from "@reach/router"
import SecureRoute from "./SecureRoute"
import routes from "../routes"
import NotFoundPage from "../pages/NotFoundPage"
import "bulma/bulma.sass"
import "react-bulma-components/dist/react-bulma-components.min.css"

const App = () => {
  return (
    <ApolloClientProvider>
      <ThemeProvider>
        <CurrentUserProvider>
          <GlobalStyles />
          <Router>
            <NotFoundPage default />
            {Object.entries(routes).map(([key, { path, ...restRoute }]) => (
              <SecureRoute
                key={key}
                path={path}
                route={{ path, ...restRoute }}
              />
            ))}
          </Router>
        </CurrentUserProvider>
      </ThemeProvider>
    </ApolloClientProvider>
  )
}

export default App
