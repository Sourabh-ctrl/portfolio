import { Analytics } from '@vercel/analytics/react'
import Intro from './components/Intro.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import GitHubContributions from './components/GitHubContributions.jsx'
import StatCards from './components/StatCards.jsx'
import Testimonials from './components/Testimonials.jsx'
import Footer from './components/Footer.jsx'
import NavBar from './components/NavBar.jsx'
import CursorGlow from './components/CursorGlow.jsx'

function App() {
  return (
    <div className="relative min-h-screen bg-navy text-lightest-slate site-bg-pattern font-sans antialiased selection:bg-accent selection:text-navy">
      <CursorGlow />
      <NavBar />

      <div className="relative z-10 mx-auto w-full max-w-4xl bg-navy/95 shadow-boxing min-h-screen px-5 sm:px-8 lg:px-12 border-x border-lightest-navy/40">
        <main>
          <Intro />
          <GitHubContributions />
          <StatCards />
          <Experience />
          <Projects />
          <About />
          <Testimonials />
        </main>
        <Footer />
      </div>
      <Analytics />
    </div>
  )
}

export default App
