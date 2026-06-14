import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle.jsx'
import { useTheme } from '../App.jsx'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Examples', href: '#examples' },
  { label: 'Demo', href: '#demo' },
  { label: 'Early Access', href: '#early-access' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`mx-3 sm:mx-6 mt-3 rounded-2xl transition-all duration-500 px-4 sm:px-6 py-3 ${scrolled ? 'glass' : ''
          }`}
        style={scrolled && isLight ? { boxShadow: '0 4px 24px rgba(0,0,0,0.08)' } : {}}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet to-gold opacity-80" />
              <div className="absolute inset-0.5 rounded-md flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
                <span className="font-display font-bold text-xs sm:text-sm gradient-text">K</span>
              </div>
            </div>
            <span className="font-display font-bold text-base sm:text-lg tracking-wider transition-colors group-hover:text-gold-light"
              style={{ color: 'var(--text-primary)' }}>
              KATHIK
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(link => (
              <a key={link.label} href={link.href}
                className="text-sm font-body tracking-wide transition-colors duration-200 hover:text-gold"
                style={{ color: 'var(--text-ghost)' }}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: toggle + CTA (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <a href="#early-access" className="hidden sm:inline-flex btn-primary text-xs sm:text-sm px-4 py-2.5">
              Get Early Access
            </a>
            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-ghost)' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 rounded bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 rounded bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 rounded bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-3 pb-3 flex flex-col gap-1 border-t mt-3" style={{ borderColor: 'var(--border-base)' }}>
                {navLinks.map(link => (
                  <a key={link.label} href={link.href}
                    className="text-sm py-2.5 px-2 rounded-lg transition-colors hover:text-gold"
                    style={{ color: 'var(--text-ghost)' }}
                    onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <a href="#early-access" className="btn-primary text-sm text-center mt-2 justify-center"
                  onClick={() => setMenuOpen(false)}>
                  Get Early Access
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}