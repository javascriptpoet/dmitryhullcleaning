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
      css={[
        customCss,
        css`
          background-image: url(${logo});
          background-repeat: no-repeat;
          background-size: contain;
          display: block;
          height: 80px;
          margin-left: -20px;
          overflow: hidden;
          width: 80px;
          // grid-area: logo;
        `
      ]}
      title="Dmitry Hull Cleaning | Home"
    >
      <span
        css={css`
          padding-left: 80px;
        `}
      >
        Dmitry Hull Cleaning
      </span>
    </Link>
  )
}

export default Logo
