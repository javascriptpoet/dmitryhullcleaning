import React, { useState } from "react"
import PageLayout from "./PageLayout"

export const PageLayoutContext = React.createContext()

const PageLayoutProvider = ({ children }) => {
  const [sidebarContent, setSidebarContent] = useState(null)
  const pageLayout = { setSidebarContent, sidebarContent }

  return (
    <PageLayoutContext.Provider value={pageLayout}>
      {children}
    </PageLayoutContext.Provider>
  )
}

export default PageLayoutProvider
