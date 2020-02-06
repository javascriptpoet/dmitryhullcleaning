/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import { Fragment } from "react"
import LayoutContainer from "../../LayoutContainer"
import useScreenSize from "../../../hooks/useScreenSize"
import useTheme from "../../../hooks/useTheme"
import MenuLink from "./MenuLink"
import SubMenu from "./SubMenu"
import React, { useState, useContext } from "react"

export const jsxFix = jsx

const MenuContext = React.createContext()
export const useMenu = () => useContext(MenuContext)

const Menu = ({
  menu,
  onCurrentChange = () => {},
  isVertical = false,
  customCss = css``
}) => {
  const { colors } = useTheme()
  const [isCurrent, setIsCurrent] = useState(false)
  const children = {}

  const menuContext = {
    createChild: label => (children[label] = { isCurrent: null }),
    destroyChild: label => delete children[label],
    updateChild: (label, isChildCurrent) => {
      children[label].isCurrent = isChildCurrent
      let newIsCurrent = false
      Object.entries(children).find(([label, { isCurrent }]) => isCurrent) &&
        (newIsCurrent = true)
      setIsCurrent(isCurrent => {
        isCurrent !== newIsCurrent && onCurrentChange(newIsCurrent)
        return newIsCurrent
      })
    }
  }
  // const screenSize = useScreenSize()

  return (
    <ul
      css={[
        customCss,
        css`
          display: grid;
          margin: 0;
          padding: 0;
          list-style: none;
          text-align: center;
        `
      ]}
    >
      <MenuContext.Provider value={menuContext}>
        {menu.map(({ path, label, subMenu }, index) => {
          const itemCustomCss = css`
              grid-${isVertical ? "row" : "column"}-start: ${index + 1};
            `
          return subMenu ? (
            <SubMenu
              label={label}
              key={label}
              menu={subMenu}
              customCss={itemCustomCss}
            />
          ) : (
            <MenuLink
              to={path}
              label={label}
              key={label}
              customCss={itemCustomCss}
            />
          )
        })}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu
