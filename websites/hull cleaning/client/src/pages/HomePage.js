import React from "react"
import Hero from "../components/Hero"
import PageTitle from "../components/PageTitle"
import PageLayout from "../components/PageLayout"

const HomePage = () => (
  <PageLayout>
    <Hero />
    <PageTitle>Dmitry Hull Cleaning</PageTitle>
    <div>
      <p>Add page content.</p>
    </div>
  </PageLayout>
)

export default HomePage
