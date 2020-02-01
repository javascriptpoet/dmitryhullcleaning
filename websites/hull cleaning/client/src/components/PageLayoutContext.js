/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { useState } from "react"
import LayoutContainer from "./LayoutContainer"

export const jsxFix = jsx

export const PageLayoutContext = React.createContext()

export const PageLayoutProvider = ({ children }) => {
  const [secondaryMenuItems, setSecondaryMenuItems] = useState([])
  const pageLayout = { setSecondaryMenuItems }

  return (
    <PageLayoutContext.Provider value={pageLayout}>
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
