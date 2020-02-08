/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "@reach/router"
import LayoutContainer from "../../LayoutContainer"
import useScreenSize from "../../../hooks/useScreenSize"
import useTheme from "../../../hooks/useTheme"
import mainMenu from "../mainMenu"
import Logo from "./Logo"
import Menu from "./Menu"
import logo from "../../../assets/croppedshoe.png"

export const jsxFix = jsx

const Navbar = ({ children }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      {children}
    </nav>
  )
}

const Brand = ({ children }) => {
  return <div className="navbar-brand">{children}</div>
}

const Header = ({ customCss }) => {
  const { font, utils } = useTheme()

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img
            className={"image is-64x64"}
            css={css`
              object-fit: fill;
            `}
            src={logo}
            width="112"
            height="28"
          />
        </Link>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Home</a>

          <a className="navbar-item">Documentation</a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
