import React from "react"
import { Link } from "@reach/router"
import routes from "../routes"
import useCurrentUser from "../hooks/useCurrentUser"
import LazyRoute from "./LazyRoute"

export default ({ route }) => {
  const { isAllowed } = useCurrentUser()
  const { scopes = [], component } = route

  if (!isAllowed(scopes)) {
    alert("access denied for lack of permissions")
    return null
  }

  return <LazyRoute component={component} />
}
