import { useContext } from "react"
import { PageLayoutContext } from "./components/PageLayoutProvider"

const usePageLayout = () => {
  return useContext(PageLayoutContext)
}

export default usePageLayout
