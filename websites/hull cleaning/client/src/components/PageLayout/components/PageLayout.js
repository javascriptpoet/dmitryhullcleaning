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
          display: flex;
          flex-direction: row;
          overflow: hidden;
        `}
      >
        <span
          class="icon"
          css={css`
            top: 50vh;
            left: 0;
            z-index: 10000;
            position: fixed;
          `}
        >
          <i class="fas fa-bars"></i>
        </span>
        <Sidebar customCss={css``}>lasdjclsj</Sidebar>
        <div
          css={css`
            flex: 1;
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
