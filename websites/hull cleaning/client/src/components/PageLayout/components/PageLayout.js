/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { useState } from "react"
import LayoutContainer from "../../LayoutContainer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import mainMenu from "../mainMenu"

export const jsxFix = jsx

const PageLayout = ({ children }) => {
  return (
    <LayoutContainer
      customCss={css`
        display: grid;
        max-height: 100vh;
        grid-template-rows: 60px 1fr;
        grid-template-columns: 100px 1fr;
        grid-template-areas:
          "header header"
          "sidebar content";
      `}
    >
      <Header
        customCss={css`
          grid-area: header;
        `}
      />

      <Sidebar
        css={css`
          grid-area: sidebar;
        `}
      />
      <div
        css={css`
          overflow: auto;
          grid-area: content;
        `}
      >
        {children}
      </div>
    </LayoutContainer>
  )
}
export default PageLayout
