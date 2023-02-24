import { createTheme } from '@mui/material/styles'

const typography = {
  fontFamily: 'Josefin Sans',
  htmlFontSize: 10,
}

const palette = {
  primary: {
    main: '#2079ad',
  },
  secondary: {
    main: '#f9a849',
  },
}

const theme = createTheme({
  typography,
  palette,
})

export default theme
