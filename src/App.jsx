import Intro from './components/Intro.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import GitHubContributions from './components/GitHubContributions.jsx'
import Footer from './components/Footer.jsx'
import NavBar from './components/NavBar.jsx'

function App() {
  return (
    <div className="min-h-screen bg-navy text-lightest-slate site-bg-pattern font-sans antialiased selection:bg-accent selection:text-navy">
      <NavBar />

      <div className="mx-auto w-full max-w-4xl bg-navy/95 shadow-boxing min-h-screen px-4 sm:px-8 md:px-12 border-x border-lightest-navy/40">
        <main>
          <Intro />
          <GitHubContributions />
          <Experience />
          <Projects />
          <About />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
