import verge from "verge"
import { useEffect, useState } from "react"
import { ThemeContext } from "../components/AppProvider"
import { useContext } from "react"

const useScreenSize = () => {
  const theme = useContext(ThemeContext)
  const getScreenSize = () => {
    return verge.viewportW() > theme.viewportWidthBreakpoint ? "large" : "small"
  }
  const [screenSize, setScreenSize] = useState(getScreenSize())

  const resizeListener = () => {
    const newScreenSize = getScreenSize()
    if (newScreenSize !== screenSize) setScreenSize(newScreenSize)
  }

  useEffect(() => {
    window.addEventListener("resize", resizeListener)
    return () => window.removeEventListener("resize", resizeListener)
  })

  return screenSize
}
export default useScreenSize
