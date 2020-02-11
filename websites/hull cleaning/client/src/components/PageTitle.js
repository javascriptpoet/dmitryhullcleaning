/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useEffect } from "react"
import { Heading } from "react-bulma-components"
import routes from "../routes"

export const jsxFix = jsx

const PageTitle = () => {
  const pagePath = window.location.href.split(window.location.host)[1]
  const pageRouteEntry = Object.entries(routes).find(
    ([routeName, { path }]) => path === pagePath
  )
  if (!pageRouteEntry)
    throw new Error(
      `route record at location ${window.location.href} not found`
    ).title

  const [routeName, { title }] = pageRouteEntry
  useEffect(() => {
    if (document) {
      document.title = `${title} | Dmitry Hull Cleaning`
    }
  })

  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

export default PageTitle
