/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import { Fragment } from "react"
import MenuLink from "./MenuLink"
import SubMenu from "./SubMenu"
import React, { useState, useContext } from "react"
import { ThemeContext } from "../../AppProvider"
export const jsxFix = jsx

const MenuContext = React.createContext()
export const useMenu = () => useContext(MenuContext)

const Menu = ({
  children,
  menu,
  onCurrentChange = () => {},
  isVertical = false,
  customCss = css``
}) => {
  const { colors } = useContext(ThemeContext)
  const [isCurrent, setIsCurrent] = useState(false)
  const childrenStatus = {}

  const menuContext = {
    createChild: label => (childrenStatus[label] = { isCurrent: null }),
    destroyChild: label => delete childrenStatus[label],
    updateChild: (label, isChildCurrent) => {
      childrenStatus[label].isCurrent = isChildCurrent
      let newIsCurrent = false
      Object.entries(childrenStatus).find(
        ([label, { isCurrent }]) => isCurrent
      ) && (newIsCurrent = true)
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
          list-style: none;
          text-align: center;
          margin: 0;
        `
      ]}
    >
      <MenuContext.Provider value={menuContext}>
        {children
          ? children
          : menu.map(({ path, label, subMenu }, index) => {
              return subMenu ? (
                <SubMenu
                  label={label}
                  key={label}
                  menu={subMenu}
                  customCss={css`
                    grid-row-start: ${index + 1};
                  `}
                />
              ) : (
                <MenuLink
                  to={path}
                  label={label}
                  key={label}
                  customCss={css`
                    grid-${isVertical ? "row" : "column"}-start: ${index + 1};
                  `}
                />
              )
            })}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu
