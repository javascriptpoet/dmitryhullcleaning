import { Router } from "@reach/router"
import React from "react"
import LazyRoute from "../components/LazyRoute"
import useRoutes from "../hooks/useRoutes"
import NotFoundPage from "../components/NotFoundPage"
import { PageLayoutProvider } from "../components/PageLayoutContext"

const Main = () => {
  const { getRoutes } = useRoutes()

  return (
    <PageLayoutProvider>
      <Router>
        <NotFoundPage default />
        <LazyRoute key="index" path="/" component="HomePage" />
        {getRoutes().map(({ key, path, component }) => (
          <LazyRoute key={key} path={path} component={component} />
        ))}
      </Router>
    </PageLayoutProvider>
  )
}

export default Main
