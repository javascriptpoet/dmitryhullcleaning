/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { useState } from "react"
import LayoutContainer from "../../LayoutContainer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import mainMenu from "../mainMenu"
import PageTitle from "../components/../../PageTitle"

export const jsxFix = jsx

const PageLayout = ({ children }) => {
  return (
    <LayoutContainer customCss={css``}>
      <Header />
      <div
        css={css`
          padding-top: 71px;
          display: grid;
          grid-column-gap: 10px;
          grid-template-areas: "sidebar content";
          grid-template-columns: auto 1fr;
          grid-template-rows: auto;
        `}
      >
        <Sidebar
          customCss={css`
            grid-area: sidebar;
          `}
        />
        <div
          css={css`
            grid-area: content;
          `}
        >
          <PageTitle />
          {children}
        </div>
      </div>
    </LayoutContainer>
  )
}
export default PageLayout
