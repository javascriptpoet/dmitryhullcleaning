/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import useTheme from "../../../hooks/useTheme"

export const jsxFix = jsx

const MenuLink = ({ to, label, side = "left", customCss = css`` }) => {
  const { colors } = useTheme()

  return (
    <li
      css={css`
        width: 100%;
        margin: 0;
        padding: 0;
      `}
      key={label}
    >
      <Link
        to={to || "/"}
        css={[
          customCss,
          css`
            display: block;
            text-decoration: none;
            line-height: 70px;
            height: 60px;
            color: #000;
            font-size: 20px;
            border-bottom: 8px solid transparent;

            &[link-type="current"] {
              border-bottom-color: #000;
              &:hover {
                cursor: default;
              }
            }

            &[link-type="default"]:hover {
              color: ${colors.green};
            }
          `
        ]}
        link-type="default"
        getProps={({ isCurrent }) =>
          isCurrent ? { "link-type": "current" } : {}
        }
      >
        {label}
      </Link>
    </li>
  )
}

export default MenuLink
