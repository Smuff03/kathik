import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const socialLinks = [
  { label: 'Twitter', href: '#', icon: '𝕏' },
  { label: 'Instagram', href: '#', icon: '◎' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
]

const footerLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <footer className="relative py-12 sm:py-16 px-4 sm:px-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-20 bg-violet/8 blur-[50px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet to-gold opacity-80" />
              <div className="absolute inset-0.5 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
                <span className="font-display font-bold gradient-text text-sm">K</span>
              </div>
            </div>
            <span className="font-display font-bold text-lg tracking-wider" style={{ color: 'var(--text-primary)' }}>KATHIK</span>
          </div>

          <p className="font-display italic text-sm max-w-xs leading-relaxed mb-5" style={{ color: 'var(--text-ghost)' }}>
            "Every person has a story. We help you preserve it."
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(link => (
              <a key={link.label} href={link.href} aria-label={link.label}
                className="w-8 h-8 glass rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 hover:text-gold"
                style={{ color: 'var(--text-ghost)' }}>
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono" style={{ color: 'var(--text-ghost)', opacity: 0.5 }}>
            © {new Date().getFullYear()} KATHIK. Built with love for storytellers.
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.map(link => (
              <a key={link.label} href={link.href}
                className="text-xs font-mono transition-colors hover:text-ghost"
                style={{ color: 'var(--text-ghost)', opacity: 0.5 }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Big watermark */}
        <div className="mt-8 sm:mt-12 overflow-hidden">
          <p className="font-display font-black text-center select-none pointer-events-none footer-watermark"
            style={{
              fontSize: 'clamp(2.5rem, 12vw, 9rem)',
              lineHeight: 1,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            KATHIK
          </p>
        </div>
      </div>
    </footer>
  )
}