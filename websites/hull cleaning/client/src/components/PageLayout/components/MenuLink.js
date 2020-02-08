/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import useTheme from "../../../hooks/useTheme"
import { useState, useEffect } from "react"
import { useMenu } from "./Menu"

export const jsxFix = jsx

const MenuLink = ({ to, label, customCss = css`` }) => {
  const { colors } = useTheme()
  const [isCurrent, setIsCurrent] = useState(false)
  const parentMenuContext = useMenu()
  useEffect(() => {
    parentMenuContext.createChild(label)
    parentMenuContext.updateChild(label, isCurrent)
    return () => parentMenuContext.destroyChild(label)
  })

  return (
    <li
      css={[
        customCss,
        css`
          width: auto;
          margin: 0;
          padding: 0;
        `
      ]}
      key={label}
    >
      <Link
        to={to || "/"}
        css={[
          css`
            display: block;
            text-decoration: none;
            line-height: 70px;
            height: 60px;
            color: #000;
            font-size: 20px;
            border-bottom: 8px solid transparent;
          `,
          isCurrent
            ? css`
                & {
                  border-bottom-color: #000;
                  &:hover {
                    cursor: default;
                  }
                }
              `
            : css`
                &:hover {
                  color: ${colors.green};
                }
              `
        ]}
        link-type="default"
        getProps={({ isCurrent }) => {
          setIsCurrent(isCurrent)
          return {}
        }}
      >
        {label}
      </Link>
    </li>
  )
}

export default MenuLink
