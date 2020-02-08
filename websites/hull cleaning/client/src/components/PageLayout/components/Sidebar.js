/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import useTheme from "../../../hooks/useTheme"
import mainMenu from "../mainMenu"
import Menu from "./Menu"

export const jsxFix = jsx

const Sidebar = ({ customCss }) => {
  const { font, utils } = useTheme()
  return (
    <nav
      css={[
        customCss,
        css`
          width: fit-content;
          padding-right: 20px;
          font-family: ${font.family.heading};
          background-color: #fff;
          border-right: 1px solid #000;
          box-shadow: 0px 0px 8px 0px ${utils.toRgb(0, 0, 0, 0.5)};
        `
      ]}
    >
      <Menu menu={mainMenu} isVertical={true} />
    </nav>
  )
}

export default Sidebar
