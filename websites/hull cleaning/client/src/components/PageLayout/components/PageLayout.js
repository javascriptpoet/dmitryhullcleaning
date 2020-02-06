/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { useState, useContext } from "react"
import LayoutContainer from "../../LayoutContainer"
import Header from "./Header"

export const jsxFix = jsx

const PageLayoutContext = React.createContext()
export const usePageLayout = () => {
  const pageLayout = useContext(PageLayoutContext)

  return pageLayout
}

const PageLayout = ({ children }) => {
  const [secondaryMenuItems, setSecondaryMenuItems] = useState([])
  const pageLayout = { setSecondaryMenuItems }

  return (
    <PageLayoutContext.Provider value={pageLayout}>
      <Header />
      <LayoutContainer
        tag="main"
        customCss={css`
          padding: calc(60px + 0.5rem) 60px 2.5rem;
        `}
      >
        {children}
      </LayoutContainer>
    </PageLayoutContext.Provider>
  )
}
export default PageLayout
