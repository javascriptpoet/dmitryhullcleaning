/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import LayoutContainer from "../../LayoutContainer"
import useScreenSize from "../../../hooks/useScreenSize"
import useTheme from "../../../hooks/useTheme"
import mainMenu from "../mainMenu"
import Logo from "./Logo"
import Menu from "./Menu"
import logo from "../../../assets/croppedshoe.png"

export const jsxFix = jsx

const Header = ({ customCss }) => {
  const { font, utils } = useTheme()
  return (
    <header
      css={[
        customCss,
        css`
          position:fixed
          left:0
          top:0
          font-family: ${font.family.heading};
          background-color: #fff;
          border-bottom: 1px solid #000;
          box-shadow: 0px 0px 8px 0px ${utils.toRgb(0, 0, 0, 0.5)};
        `
      ]}
    >
      <nav
        css={css`
          display: grid;
          grid-column-gap: 10px;
          grid-template-areas: "logo menu toggle";
          grid-template-columns: 60px 1fr 60px;
          grid-template-rows: 60px;
        `}
      >
        <Logo
          customCss={css`
            grid-area: logo;
          `}
        />
        <Menu
          menu={mainMenu}
          customCss={css`
            grid-area: menu;
          `}
        />
      </nav>
    </header>
  )
}

export default Header
