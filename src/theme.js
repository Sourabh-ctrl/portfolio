import { createTheme } from '@mui/material/styles'

// Gazi-V2 inspired palette
const navy = '#0a192f'
const lightNavy = '#112240'
const lightestNavy = '#233554'
const slate = '#8892b0'
const lightSlate = '#a8b2d1'
const lightestSlate = '#ccd6f6'
const white = '#e6f1ff'
const green = '#64ffda'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: navy,
      paper: lightNavy,
    },
    primary: {
      main: green,
      contrastText: navy,
    },
    secondary: {
      main: lightNavy,
    },
    text: {
      primary: lightestSlate,
      secondary: slate,
    },
    divider: lightestNavy,
  },
  typography: {
    fontFamily: "'NTR', 'Segoe UI', sans-serif",
    h1: {
      fontFamily: "'Source Serif Pro', Georgia, serif",
      color: white,
    },
    h2: {
      fontFamily: "'Source Serif Pro', Georgia, serif",
      color: white,
    },
    h3: {
      fontFamily: "'Source Serif Pro', Georgia, serif",
      color: white,
    },
    h4: {
      color: lightSlate,
    },
    body1: {
      color: slate,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: navy,
        },
      },
    },
  },
})

export default theme