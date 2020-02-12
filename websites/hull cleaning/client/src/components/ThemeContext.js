/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"

export const jsxFix = jsx

const sansSerifFamily = `'Open Sans', sans-serif`
const serifFamily = "Merriweather, serif"

const green = "#0b0" // [0, 291, 0,]
const darkGreen = "#3a3"
const orange = "#f70"
const purple = "#ba529f"

const theme = {
  font: {
    family: {
      sansSerif: sansSerifFamily,
      serif: serifFamily,
      default: sansSerifFamily,
      heading: serifFamily
    }
  },
  colors: {
    darkGreen,
    green,
    orange,
    purple
  },
  utils: {
    toRgb: (r, g, b, a = 0) => `rgba(${r}, ${g}, ${b}, ${a})`
  },
  viewportWidthBreakpoint: 768,
  css: {
    layoutContainer: css`
      max-width: 60rem;
      margin-left: auto;
      margin-right: auto;
    `
  }
}

const ThemeContext = React.createContext(theme)
export default ThemeContext

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
)
