import React from "react"

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
  viewportWidthBreakpoint: 600
}

const ThemeContext = React.createContext(theme)
export default ThemeContext

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
)
