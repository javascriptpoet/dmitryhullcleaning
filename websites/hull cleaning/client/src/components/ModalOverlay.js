/** @jsx jsx */
import { css, jsx } from "@emotion/core"

export const jsxFix = jsx

const ModalOverlay = ({ customCss }) => {
  return (
    <div
      css={[
        customCss,
        css`
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-color: rgba(33, 33, 33, 0.85);
        `
      ]}
    ></div>
  )
}

export default ModalOverlay
