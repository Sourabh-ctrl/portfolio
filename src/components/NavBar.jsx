import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Close from '@mui/icons-material/Close'
import GitHub from '@mui/icons-material/GitHub'
import LinkedIn from '@mui/icons-material/LinkedIn'
import Email from '@mui/icons-material/Email'
import data from '../data.js'
import './NavBar.css'

const navLinks = [
  { id: 'intro', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'footer', label: 'Contact' },
]

function LeetCodeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1.5rem" height="1.5rem" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"
      />
    </svg>
  )
}

const socialIcons = {
  GitHub: GitHub,
  LinkedIn: LinkedIn,
  LeetCode: LeetCodeIcon,
  Email: Email,
}

function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <AppBar position="sticky" color="transparent" className="navbar" elevation={0}>
      <Toolbar className="navbar-toolbar">
        <a className="navbar-brand" href="#intro">
          {data.identity.name}
        </a>
        <IconButton
          className="navbar-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close /> : <MenuIcon />}
        </IconButton>
        <nav className={`navbar-links ${open ? 'open' : ''}`}>
          <div className="navbar-nav">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="navbar-socials">
            {data.socials.map((s) => {
              const Icon = socialIcons[s.label]
              if (!Icon) return null
              return (
                <a
                  key={s.label}
                  href={s.url}
                  aria-label={s.label}
                  title={s.label}
                  {...(s.url.startsWith('mailto:')
                    ? {}
                    : { target: '_blank', rel: 'noreferrer noopener' })}
                  onClick={() => setOpen(false)}
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </nav>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar