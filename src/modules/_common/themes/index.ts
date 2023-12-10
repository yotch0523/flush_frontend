import 'styled-components'

export const theme = {
  font: {
    baseColor: '#333',
    danger: '#f00',
  },
  backgroundColor: {
    main: '#1c1c1c',
    sub: '#f5f5f5',
    cream: '#fffaf0',
  },
  color: {
    white: '#fff',
  },
  media: {
    sm: '@media (min-width: 640px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1280px)',
  },
  content: {
    pc: {
      maxWidth: '1280px',
    },
  },
  form: {
    button: {
      padding: '12px',
      color: '#1c1c1c',
    },
    container: {
      padding: '10px',
    },
    input: {
      width: '200px',
    },
  },
}
