/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { useState } from "react"
import LayoutContainer from "../../LayoutContainer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import mainMenu from "../mainMenu"
import PageTitle from "../components/../../PageTitle"
import useScreenSize from "../../../hooks/useScreenSize"
import usePageLayout from "../usePageLayout"
import PageLayoutProvider from "./PageLayoutProvider"

export const jsxFix = jsx

const SidebarTrigger = ({ onTrigger }) => {
  return (
    <span
      class="icon"
      css={css`
        top: 50vh;
        left: 0;
        z-index: 10000;
        position: fixed;
      `}
      onClick={onTrigger}
    >
      <i class="fas fa-bars"></i>
    </span>
  )
}

const Content = ({ children }) => {
  return (
    <div
      css={css`
        grid-area: content;
        height: 100vh;
        overflow-x: auto;
      `}
    >
      <PageTitle />
      {children}
    </div>
  )
}

const PageLayout = ({ children }) => {
  const screenSize = useScreenSize()
  const [isSidebarOpen, setIsSidebarOpen] = useState(screenSize === "large")
  const { sidebarContent } = usePageLayout()

  return (
    <div
      css={css`
        height: 100vh;
        max-width: 60rem;
        width: 100vw;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
      `}
    >
      <div
        css={[
          css`
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: auto;
          `,
          css`
            grid-template-areas:
              "header  header"
              "sidebar content";
          `
        ]}
      >
        <Header />
        {!!sidebarContent && (
          <Sidebar
            isModal={screenSize === "small"}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          >
            {sidebarContent}
          </Sidebar>
        )}
        <Content>{children}</Content>
      </div>
      {!isSidebarOpen && (
        <SidebarTrigger
          css={css`
            position: absolute;
            top: 50vh;
          `}
          onTrigger={e => {
            e.stopPropagation()
            setIsSidebarOpen(state => !state)
          }}
        />
      )}
    </div>
  )
}
export default ({ children }) => (
  <PageLayoutProvider>
    <PageLayout>{children}</PageLayout>
  </PageLayoutProvider>
)
