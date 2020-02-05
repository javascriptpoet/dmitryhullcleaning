/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import { Fragment } from "react"
import LayoutContainer from "../../LayoutContainer"
import useScreenSize from "../../../hooks/useScreenSize"
import useTheme from "../../../hooks/useTheme"
import MenuLink from "./MenuLink"

export const jsxFix = jsx

const Menu = ({ menu, side = "left", customCss = css`` }) => {
  const { colors } = useTheme()
  // const screenSize = useScreenSize()
  console.log(menu)

  return (
    <ul
      css={[
        customCss,
        css`
          display: grid;
          justify-items: ${side};
          margin: 0;
          padding: 0;
          place-items: top / center;
          list-style: none;
          text-align: center;
        `
      ]}
    >
      {menu.map(({ path, label }, index) => {
        return (
          <MenuLink
            to={path}
            label={label}
            customCss={css`
              grid-column-start: ${index + 1};
            `}
          />
        )
      })}
    </ul>
  )
}

export default Menu
