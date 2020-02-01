/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core'
import useTheme from '../hooks/useTheme'

export const jsxFix = jsx

const GlobalStyles = () => {
  const { font, colors } = useTheme()

  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        html {
          font-size: 16px;
        }
        @media screen and (min-width: 320px) {
          html {
            font-size: calc(16px + 6 * ((100vw - 320px) / 680));
          }
        }
        @media screen and (min-width: 1000px) {
          html {
            font-size: 22px;
          }
        }

        body {
          font-family: ${font.family.default};
          overflow-y: scroll;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${font.family.heading};
        }

        button {
          background-color: ${colors.green};
          color: white;
          padding: 0.5rem;
          border: 0;
          &:hover,
          &:focus {
            background-color: ${colors.darkGreen};
            cursor: pointer;
          }
        }

        input {
          border: 2px solid #bbb;
          line-height: 1.5;
          &:hover {
            border-color: #000;
          }
          &:focus {
            border-color: ${colors.darkGreen};
          }
        }

        a {
          color: ${colors.darkGreen};
          font-weight: 700;
          text-decoration: none;

          &:hover {
            color: ${colors.green};
            text-decoration: underline;
          }
        }

        img,
        video,
        iframe {
          max-width: 100%;
        }
      `}
    />
  )
}

export default GlobalStyles
