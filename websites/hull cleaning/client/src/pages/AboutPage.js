import React from "react"
import Hero from "../components/Hero"
import PageTitle from "../components/PageTitle"
import PageLayout from "../components/PageLayout"

const AboutPage = () => (
  <PageLayout>
    <Hero />
    <PageTitle>About</PageTitle>
    <div>
      <p>Add page content.</p>
    </div>
  </PageLayout>
)

export default AboutPage
