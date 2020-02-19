/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import useTheme from "../../../hooks/useTheme"
import React, { useState, useRef } from "react"
import useScreenSize from "../../../hooks/useScreenSize"
import ModalOverlay from "../../ModalOverlay"

export const jsxFix = jsx

const Sidebar = ({
  customCss,
  children,
  isOpen,
  isModal,
  onClose = () => {}
}) => {
  if (!isOpen) return null
  return (
    <React.Fragment>
      {isModal && (
        <ModalOverlay
          customCss={css`
            z-index: 1000;
          `}
        />
      )}
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
            z-index: 1001;
            grid-area: sidebar;
            position: relative;
          `
        ]}
        className="panel"
      >
        <button
          className="delete"
          onClick={e => {
            e.stopPropagation()
            onClose()
          }}
          aria-label="close"
          css={css`
            position: absolute;
            top: 0;
            right: 0;
          `}
        ></button>
        {children}
      </div>
    </React.Fragment>
  )
}

export default Sidebar
