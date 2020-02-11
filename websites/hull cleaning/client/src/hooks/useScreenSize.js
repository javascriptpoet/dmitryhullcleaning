import verge from "verge"
import { useEffect, useState } from "react"
import useTheme from "./useTheme"

const useScreenSize = () => {
  const theme = useTheme()
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
