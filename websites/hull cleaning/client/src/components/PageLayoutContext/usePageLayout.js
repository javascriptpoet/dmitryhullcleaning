import { useContext } from "react"
import { PageLayoutContext } from "./components/PageLayoutContext"

const usePageLayout = () => {
  const pageLayout = useContext(PageLayoutContext)

  return pageLayout
}

export default usePageLayout
