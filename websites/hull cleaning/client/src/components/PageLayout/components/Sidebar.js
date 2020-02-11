/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import useTheme from "../../../hooks/useTheme"

export const jsxFix = jsx

const Sidebar = ({ customCss, children }) => {
  const { font, utils } = useTheme()
  return <div css={[customCss]}>{children}</div>
}

export default Sidebar
