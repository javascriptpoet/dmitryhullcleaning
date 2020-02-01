/** @jsx jsx */
import { css, jsx } from "@emotion/core"

export const jsxFix = jsx

const LayoutContainer = ({
  children = null,
  customCss = css``,
  tag: Tag = "div"
}) => (
  <Tag
    css={[
      customCss,
      css`
        max-width: 60rem;
        margin-left: auto;
        margin-right: auto;
      `
    ]}
  >
    {children}
  </Tag>
)

export default LayoutContainer
