import { useState, useEffect } from 'react'
import data from '../data.js'
import { sound } from '../utils/sound.js'
import { useTheme } from '../contexts/ThemeContext.jsx'
import { Volume2, VolumeX, Menu, X, Sun, Moon } from 'lucide-react'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

function NavBar() {
  const { theme, toggleTheme } = useTheme()
  const [isMuted, setIsMuted] = useState(() => sound.isMuted())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ids = navItems.map((i) => i.href)
    const getSections = () =>
      ids
        .map((id) => document.querySelector(id))
        .filter(Boolean)

    const updateActive = () => {
      const sections = getSections()
      if (sections.length === 0) return
      const line = window.innerHeight * 0.4
      let current = sections[0]
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          current = section
        }
      }
      setActiveId(`#${current.id}`)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  const toggleSound = () => {
    const muted = sound.toggleMute()
    setIsMuted(muted)
  }

  const handleNavClick = () => {
    sound.playClick()
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full justify-center px-4 pt-3 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between w-full max-w-4xl rounded-2xl px-4 py-3 transition-all duration-300 backdrop-blur-md ${
            scrolled
              ? 'bg-navy/90 border border-lightest-navy shadow-lg shadow-black/30'
              : 'bg-navy/75 border border-lightest-navy/50'
          }`}
        >
          {/* Brand / Mini Avatar */}
          <a
            href="#home"
            onClick={handleNavClick}
            className="flex items-center gap-3 group transition-transform active:scale-95"
            aria-label="Home"
          >
            <div className="relative size-9 rounded-full overflow-hidden ring-1 ring-accent/60 group-hover:ring-accent transition-all">
              <img
                src={data.hero.portrait}
                alt={data.identity.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="font-serif font-bold text-base tracking-tight text-heading hidden sm:inline-block">
              {data.identity.name}
            </span>
            {/* Monogram lockup */}
            {/* <span
              aria-hidden="true"
              className="hidden sm:inline-flex items-center justify-center h-7 w-7 rounded-md border border-accent/50 bg-accent/10 text-accent font-mono font-bold text-[11px] tracking-tight select-none group-hover:bg-accent group-hover:text-navy transition-colors"
            >
              {data.identity.firstName?.[0] || 'S'}
              {data.identity.name.split(' ').pop()?.[0] || 'L'}
            </span> */}
          </a>

          {/* Controls & Nav Links */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeId === item.href
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative px-3.5 py-2 text-sm font-sans font-semibold tracking-wide rounded-lg transition-all hover:bg-light-navy/70 group ${
                      isActive ? 'text-accent' : 'text-slate hover:text-accent'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-1/2 -bottom-0.5 h-0.5 -translate-x-1/2 rounded-full bg-accent transition-all duration-300 ${
                        isActive ? 'w-2/3' : 'w-0 group-hover:w-2/3'
                      }`}
                    />
                  </a>
                )
              })}
            </div>

            <div className="h-5 w-px bg-lightest-navy hidden lg:block mx-1" />

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => { sound.playClick(); toggleTheme() }}
              className="relative size-9 rounded-lg flex items-center justify-center text-slate hover:text-accent hover:bg-light-navy transition-colors border border-lightest-navy/60 cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="size-4.5" />
              ) : (
                <Moon className="size-4.5" />
              )}
            </button>

            {/* Sound Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              className="relative size-9 rounded-lg flex items-center justify-center text-slate hover:text-accent hover:bg-light-navy transition-colors border border-lightest-navy/60 cursor-pointer"
              aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
              title={isMuted ? 'Sound muted' : 'Sound enabled'}
            >
              {isMuted ? (
                <VolumeX className="size-4.5 text-slate" />
              ) : (
                <Volume2 className="size-4.5 text-accent" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick()
                setMobileMenuOpen((o) => !o)
              }}
              className="lg:hidden size-9 rounded-lg flex items-center justify-center text-slate hover:text-accent hover:bg-light-navy transition-colors border border-lightest-navy/60 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-navy/80 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute top-16 inset-x-4 max-w-sm mx-auto bg-light-navy border border-lightest-navy rounded-2xl p-4 shadow-2xl flex flex-col gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`px-4 py-3 text-base font-sans font-semibold rounded-xl transition-colors ${
                  activeId === item.href
                    ? 'text-accent bg-lightest-navy/40'
                    : 'text-lightest-slate hover:text-accent hover:bg-lightest-navy/50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default NavBar
