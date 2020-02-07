/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import useTheme from "../../../hooks/useTheme"
import Menu, { useMenu } from "./Menu"
import React, { useState, useCallback, useEffect } from "react"

export const jsxFix = jsx

const SideMenu = ({ children, menu }) => {
  return (
    <Menu
      isVertical={true}
      menu={menu}
      customCss={css`
        position: fixed;
        z-index: 10;
        background: hsla(80, 90%, 40%, 0.7);
        border: solid hsla(80, 90%, 40%, 0.5);
        border-right: none;
        padding: 0.5em 0.5em 0.5em 2.5em;
        box-shadow: 0 1px 3px black;
        right: 0;
        width: 8em;
        height: 100%;
        margin: 0;
        padding: 0;
      `}
    >
      {children}
    </Menu>
  )
}

export default SideMenu
