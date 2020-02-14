/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import useTheme from "../../../hooks/useTheme"
import React, { useState,useRef } from "react"
import useScreenSize from "../../../hooks/useScreenSize"
import LayoutContainer from "../../LayoutContainer"

export const jsxFix = jsx

const Content = ({ customCss, children }) => {
  return (
    <div
      css={css`
        position: fixed;
        z-index: 999;
        left: 300px;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);

        opacity: 0.5;
      `}
      className="is-light"
    >
      <div
        css={[
          customCss,
          css`
            top: 0;
            bottom: 0;
            width: fit-content;
            height: 100%;
            padding-right: 20px;
            padding-left: 20px;
            background-color: #fff;
            overflow: hidden;
            z-index: 1000;
          `
        ]}
        className="panel"
      >
        {children}
      </div>
    </div>
  )
}
const Sidebar = ({ customCss, children }) => {
  const { font, utils } = useTheme()
  const screenSize = useScreenSize()
  const [isOpen, setIsOpen] = useState(true)
  const contentRef=useRef()

  return (
    <React.Fragment>
      {isOpen ? <Content customCss={customCss}>{children}</Content> : null}
      <span
        class="icon"
        css={css`
          top: 50vh;
          left: 0;
          z-index: 10000;
          position: fixed;
        `}
        onClick={e => {
          e.stopPropagation()
          console.log(isOpen)
          setIsOpen(state => !state)
        }}
      >
        <i class="fas fa-bars"></i>
      </span>
    </React.Fragment>
  )
}

export default Sidebar
