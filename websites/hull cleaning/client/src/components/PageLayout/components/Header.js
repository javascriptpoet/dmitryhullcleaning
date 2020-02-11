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
import { Navbar, Button, Form } from "react-bulma-components"
import { Fragment } from "react"
import routes from "../../../routes"
import useCurrentUser from "../../../hooks/useCurrentUser"

export const jsxFix = jsx

const MenuFromArray = ({ arr: menu }) => {
  const { isAllowed } = useCurrentUser()
  const createMenu = menu => {
    return menu.map(({ label, path, scopes: routeScopes = [], subMenu }) => {
      const element = (
        <Fragment>
          {subMenu ? (
            <Navbar.Item dropdown hoverable key={label}>
              <Navbar.Link>{label}</Navbar.Link>
              <Navbar.Dropdown>{createMenu(subMenu)}</Navbar.Dropdown>
            </Navbar.Item>
          ) : (
            <Navbar.Item renderAs={Link} to={path} key={label}>
              {label}
            </Navbar.Item>
          )}
        </Fragment>
      )
      return isAllowed(routeScopes) ? element : null
    })
  }
  return <Navbar.Container>{createMenu(menu)}</Navbar.Container>
}

const AccountLnks = () => {
  const { isLoggedin, logout } = useCurrentUser()
  const whenLoggedout = (
    <div class="field has-addons navbar-item">
      <p className="control ">
        <Link to={routes.login.path} className="button is-primary ">
          Log In
        </Link>
      </p>
      <p className="control ">
        <Link to={routes.signup.path} className="button is-lght navbar-item">
          Sign Up
        </Link>
      </p>
    </div>
  )
  const whenLoggedin = (
    <Navbar.Item>
      <Button
        color={"primary"}
        onClick={e => {
          e.stopPropagation()
          logout()
        }}
      >
        Log Out
      </Button>
    </Navbar.Item>
  )
  return isLoggedin ? whenLoggedin : whenLoggedout
}

const Header = () => {
  const theme = useTheme()
  return (
    <Navbar css={theme.css.layoutContainer}>
      <Navbar.Brand>
        <Navbar.Item renderAs={Link} to={"/"}>
          <img src={logo} alt="Dmitry Hull Cleaning" width={60} height={60} />
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <MenuFromArray arr={mainMenu} />
        </Navbar.Container>
        <Navbar.Container position="end">
          <AccountLnks />
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  )
}

export default Header
