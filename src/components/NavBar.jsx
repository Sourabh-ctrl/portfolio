import { useEffect, useState } from 'react'
import data from '../data.js'

const navItems = [
  { href: '#work', label: 'work' },
  { href: '#experience', label: 'experience' },
  { href: '#stack', label: 'stack' },
  { href: '#activity', label: 'activity' },
  { href: '#about', label: 'about' },
]

const contact = { href: '#contact', label: "let's talk" }

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const ids = navItems.map((item) => item.href)

    const updateActive = () => {
      const line = window.innerHeight * 0.35
      let current = null
      for (const id of ids) {
        const node = document.querySelector(id)
        if (node && node.getBoundingClientRect().top <= line) current = id
      }
      setActiveId(current)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  useEffect(() => {
    const updateSolid = () => {
      const hero = document.querySelector('#home')
      const threshold = hero ? hero.offsetHeight - 96 : 0
      setSolid(window.scrollY > threshold)
    }

    updateSolid()
    window.addEventListener('scroll', updateSolid, { passive: true })
    window.addEventListener('resize', updateSolid, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateSolid)
      window.removeEventListener('resize', updateSolid)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const go = (href) => {
    setMenuOpen(false)
    const node = document.querySelector(href)
    if (!node) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  const links = [...navItems, contact]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 grid grid-cols-[minmax(0,1fr)_auto] items-center px-5 py-5 transition-colors duration-300 sm:px-8 sm:py-6 ${
        solid || menuOpen ? 'bg-background' : 'bg-transparent'
      }`}
    >
      <a
        href="#home"
        aria-label={`${data.identity.name} — back to top`}
        className="w-fit font-serif text-3xl font-medium leading-none tracking-tight text-foreground"
      >
        {data.identity.firstName}
      </a>

      <nav
        className="hidden items-center gap-7 whitespace-nowrap text-sm font-medium md:flex"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={activeId === item.href ? 'true' : undefined}
            className={`transition-colors duration-200 ${
              activeId === item.href
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {item.label}
          </a>
        ))}
        <a
          href={contact.href}
          className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          data-cursor="say hello?"
        >
          {contact.label}
        </a>
      </nav>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="relative h-10 w-10 md:hidden"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span
          className={`absolute left-1/2 top-1/2 h-[2px] w-7 -translate-x-1/2 rounded-full bg-foreground transition-all duration-300 ${
            menuOpen ? 'rotate-45' : '-translate-y-[5px]'
          }`}
        />
        <span
          className={`absolute left-1/2 top-1/2 h-[2px] w-7 -translate-x-1/2 rounded-full bg-foreground transition-all duration-300 ${
            menuOpen ? '-rotate-45' : 'translate-y-[4px]'
          }`}
        />
      </button>

      {menuOpen && (
        <nav
          className="absolute inset-x-4 top-full grid gap-1 border border-border bg-background p-3 text-lg shadow-xl md:hidden"
          aria-label="Mobile navigation"
        >
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault()
                go(item.href)
              }}
              className="p-3 text-left transition-colors hover:text-muted-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export default NavBar
