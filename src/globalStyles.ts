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
  }

  textarea {
    width: ${theme.form.input.width};
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
`

export default GlobalStyle
