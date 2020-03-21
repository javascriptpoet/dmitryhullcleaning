import React, { useContext } from "react"
import { Link } from "@reach/router"
import routes from "../routes"
import { CurrentUserContext } from "./AppProvider"
import LazyRoute from "./LazyRoute"
import { AuthorizationError } from "../utils/Errors"

export default ({ route }) => {
  const { isAllowed } = useContext(CurrentUserContext)
  const { scopes = [], component } = route

  if (!isAllowed(scopes)) throw new AuthorizationError("Authorization error")

  return <LazyRoute component={component} />
}
