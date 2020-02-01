/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import { Fragment } from "react"
import LayoutContainer from "./LayoutContainer"
import useRoutes from "../hooks/useRoutes"
import useScreenSize from "../hooks/useScreenSize"
import logo from "../assets/croppedshoe.png"
import useTheme from "../hooks/useTheme"

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

const Menu = (customCss = css``) => {
  const { colors } = useTheme()
  const { getMenuLinks } = useRoutes()
  const screenSize = useScreenSize()

  return (
    <ul
      css={[
        customCss,
        css`
          display: grid;
          grid-area: menu;
          justify-items: right;
          margin: 0;
          padding: 0;
          place-items: top / center;
          list-style: none;
          text-align: center;
        `
      ]}
    >
      {getMenuLinks().map(({ key, to, label }, index) => {
        return (
          <li
            css={css`
              grid-column-start: ${index + 1};
              width: 100%;
              margin: 0;
              padding: 0;
            `}
            key={key}
          >
            <Link
              to={to}
              css={css`
                display: block;
                text-decoration: none;
                line-height: 70px;
                height: 60px;
                color: #000;
                font-size: 20px;
                border-bottom: 8px solid transparent;

                &[data-link-type="current"] {
                  border-bottom-color: #000;
                  &:hover {
                    cursor: default;
                  }
                }

                &[data-link-type="default"]:hover {
                  color: ${colors.green};
                }
              `}
              data-link-type="default"
              getProps={({ isCurrent }) =>
                isCurrent ? { "data-link-type": "current" } : {}
              }
            >
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

const Header = () => {
  const { font, utils } = useTheme()
  return (
    <Fragment>
      <header
        css={css`
          font-family: ${font.family.heading};
          background-color: #fff;
          border-bottom: 1px solid #000;
          box-shadow: 0px 0px 8px 0px ${utils.toRgb(0, 0, 0, 0.5)};
          height: 60px;
          left: 0;
          position: fixed;
          right: 0;
          top: 0;
        `}
      >
        <LayoutContainer
          tag="nav"
          customCss={css`
            bottom: 0;
            display: grid;
            grid-column-gap: 10px;
            grid-template-areas: "logo menu toggle";
            grid-template-columns: 60px 1fr 60px;
            grid-template-rows: 60px;
            left: 0;
            place-items: top / right;
            position: absolute;
            right: 0;
            top: 0;
          `}
        >
          <Logo
            customCss={css`
              grid-area: logo;
            `}
          />
          <Menu
            customCss={css`
              grid-area: menu;
            `}
          />
        </LayoutContainer>
      </header>
    </Fragment>
  )
}

export default Header
