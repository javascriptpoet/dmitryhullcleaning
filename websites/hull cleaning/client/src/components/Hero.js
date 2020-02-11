/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import bgImg from "../assets/boats-in-water.jpg"
import { Hero, Section, Container, Image } from "react-bulma-components"

export const jsxFix = jsx

const MyHero = () => (
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <Image src={bgImg} />
      </div>
    </div>
  </section>
)

export default MyHero
