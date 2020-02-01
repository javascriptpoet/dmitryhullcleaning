/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useEffect } from "react"

export const jsxFix = jsx

const PageTitle = ({ children, documentTitle = children.toString() }) => {
  useEffect(() => {
    if (document) {
      document.title = `${documentTitle} | Dmitry Hull Cleaning`
    }
  }, [documentTitle])
  return (
    <h1
      css={css`
        font-size: 2.5rem;
        font-weight: 400;
      `}
    >
      {children}
    </h1>
  )
}

export default PageTitle
