import { createGlobalStyle } from 'styled-components'
import { ui } from '~/consts/ui'

const GlobalStyle = createGlobalStyle`
  * {
    color: ${ui.font.baseColor};
  }

  body {
    margin: 0;
    padding: 0;
  }

  a {
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
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
`

export default GlobalStyle
