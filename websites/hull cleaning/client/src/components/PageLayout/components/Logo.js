/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import logo from "../../../assets/croppedshoe.png"

export const jsxFix = jsx

const Logo = (customCss = css``) => {
  return (
    <Link
      to="/"
      data-alt="Dmitry Hull Cleaning logo"
      css={[customCss]}
      title="Dmitry Hull Cleaning | Home"
    >
      <img
        src={logo}
        css={css`
          object-fit: fill;
          width: 100%;
          height: 58px;
        `}
      />
    </Link>
  )
}

export default Logo
