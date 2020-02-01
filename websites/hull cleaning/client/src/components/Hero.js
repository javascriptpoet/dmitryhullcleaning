/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import bgImg from "../assets/boats-in-water.jpg"

export const jsxFix = jsx

const Hero = () => (
  <img
    src={bgImg}
    alt="Boats in water"
    css={css`
      margin-top: -1rem;
      width: 100%;
    `}
  />
)

export default Hero
