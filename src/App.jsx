import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import Experience from './components/Experience.jsx'
import Activity from './components/Activity.jsx'
import Skills from './components/Skills.jsx'
import About from './components/About.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import NavBar from './components/NavBar.jsx'
import CursorComment from './components/CursorComment.jsx'

function App() {
  return (
    <div className="relative min-h-screen bg-background font-sans antialiased">
      <CursorComment />
      <NavBar />

      <main className="relative z-10">
        <Hero />
        <Work />
        <Experience />
        <Activity />
        <Skills />
        <About />
        <Testimonials />
        <Contact />
      </main>
    </div>
  )
}

export default App
