import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme.js'
import Intro from './components/Intro.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Footer from './components/Footer.jsx'
import NavBar from './components/NavBar.jsx'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <main>
        <Intro />
        <About />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default App