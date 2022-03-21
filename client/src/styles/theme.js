import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
  palette: {
    primary: {
      main: '#7986cb',
      light: '#aab6fe',
      dark: '#49599a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4db6ac',
      light: '#82e9de',
      dark: '#00867d',
      contrastText: '#fff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#e1e2e1',
          // backgroundColor: '#F5F5F6',
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
