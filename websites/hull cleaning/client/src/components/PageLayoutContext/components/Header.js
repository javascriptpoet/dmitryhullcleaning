/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import { Fragment } from "react"
import LayoutContainer from "../../LayoutContainer"
import useScreenSize from "../../../hooks/useScreenSize"
import useTheme from "../../../hooks/useTheme"
import mainMenu from "../mainMenu"
import Logo from "./Logo"
import Menu from "./Menu"

export const jsxFix = jsx

const Header = () => {
  const { font, utils } = useTheme()
  return (
    <Fragment>
      <header
        css={css`
          font-family: ${font.family.heading};
          background-color: #fff;
          border-bottom: 1px solid #000;
          box-shadow: 0px 0px 8px 0px ${utils.toRgb(0, 0, 0, 0.5)};
          height: 60px;
          left: 0;
          position: fixed;
          right: 0;
          top: 0;
        `}
      >
        <LayoutContainer
          tag="nav"
          customCss={css`
            bottom: 0;
            display: grid;
            grid-column-gap: 10px;
            grid-template-areas: "logo menu toggle";
            grid-template-columns: 60px 1fr 60px;
            grid-template-rows: 60px;
            left: 0;
            place-items: top / right;
            position: absolute;
            right: 0;
            top: 0;
          `}
        >
          <Logo
            customCss={css`
              grid-area: logo;
            `}
          />
          <Menu
            menu={mainMenu}
            side="right"
            customCss={css`
              grid-area: menu;
            `}
          />
        </LayoutContainer>
      </header>
    </Fragment>
  )
}

export default Header
