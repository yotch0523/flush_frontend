import { createGlobalStyle } from 'styled-components'
import { theme } from '~/modules/_common/themes'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    color: ${theme.font.baseColor};
  }

  body {
    margin: 0;
    padding: 0;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  input {
    width: ${theme.form.input.width};
    padding: 6px 0;
    &.error {
      ${({ theme }) => `border: ${theme.font.danger} 1px solid;`}
    }
  }

  textarea {
    width: ${theme.form.input.width};
    &.error {
      ${({ theme }) => `border: ${theme.font.danger} 1px solid;`}
    }
  }

  ul {
    margin: 0;
    padding-left: 0;
  }

  li {
    list-style: none;
  }

  menu {
    padding: initial;
  }

  .error {
    ${({ theme }) => `color: ${theme.font.danger};`}
  }
`

export default GlobalStyle
