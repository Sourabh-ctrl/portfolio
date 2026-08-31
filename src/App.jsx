import Intro from './components/Intro.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import GitHubContributions from './components/GitHubContributions.jsx'
import Footer from './components/Footer.jsx'
import NavBar from './components/NavBar.jsx'

function App() {
  return (
    <div className="min-h-screen bg-navy text-lightest-slate font-sans antialiased selection:bg-green selection:text-navy">
      <NavBar />
      <main>
        <Intro />
        <GitHubContributions />
        <About />
        <Experience />
        <Projects />
        {/* <LeetCode /> */}
      </main>
      <Footer />
    </div>
  )
}

export default App
