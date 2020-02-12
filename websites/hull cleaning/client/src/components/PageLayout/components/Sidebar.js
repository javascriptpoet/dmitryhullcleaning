/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import useTheme from "../../../hooks/useTheme"
import React, { useState } from "react"
import useScreenSize from "../../../hooks/useScreenSize"

export const jsxFix = jsx

const Sidebar = ({ customCss, children }) => {
  const { font, utils } = useTheme()
  const screenSize = useScreenSize()
  const [isOpen, setIsOpen] = useState(true)
  return (
    <React.Fragment>
      <div
        css={[
          customCss,
          css`
            width: ${isOpen ? "fit-content" : "0"};
            padding-right: 20px;
            padding-left: 20px;
            background-color: #fff;
            overflow: hidden;
          `
        ]}
        className="panel"
      >
        {children}
      </div>
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
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <p class="image is-4by3">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt=""
            />
          </p>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
      </div>
    </React.Fragment>
  )
}

export default Sidebar
