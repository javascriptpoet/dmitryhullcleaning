/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import useTheme from "../../../hooks/useTheme"
import Menu, { useMenu } from "./Menu"
import React, { useState, useCallback, useEffect } from "react"

export const jsxFix = jsx

const SubMenu = ({ children, label, menu, customCss = css`` }) => {
  const { colors } = useTheme()
  const [isCurrent, setIsCurrent] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const parentMenuContext = useMenu()
  const onCurrentChange = isCurrent => {
    setIsCurrent(isCurrent)
    parentMenuContext.updateChild(label, isCurrent)
  }

  useEffect(() => {
    parentMenuContext.createChild(label)
    return () => parentMenuContext.destroyChild(label)
  })

  useEffect(() => {
    const listener = () => {
      if (isOpen) setIsOpen(false)
    }
    window.onclick = listener
    //   return () => window.removeEventListener("onclick", listener)
  })

  return (
    <li css={[customCss]} key={label}>
      <div
        css={[
          css`
            display: block;
            text-decoration: none;
            line-height: 70px;
            height: auto;
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
      >
        <label
          role={`for menu ${label}`}
          onClick={e => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
        >
          <strong>{label}</strong>
        </label>
        <Menu
          menu={menu}
          isVertical={true}
          onCurrentChange={onCurrentChange}
          customCss={css`
            position: absolute;
            background-color: #f1f1f1;
            min-width: 160px;
            overflow: auto;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1;
            visibility: ${isOpen ? "visible" : "hidden"};
          `}
        >
          {children}
        </Menu>
      </div>
    </li>
  )
}

export default SubMenu
