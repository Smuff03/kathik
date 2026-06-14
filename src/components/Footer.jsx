import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const socialLinks = [
  { label: 'Twitter', href: '#', icon: '𝕏' },
  { label: 'Instagram', href: '#', icon: '◎' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
]

const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <footer className="relative py-16 px-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-violet/8 blur-[60px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-12"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet to-gold opacity-80" />
              <div className="absolute inset-0.5 rounded-lg bg-void flex items-center justify-center">
                <span className="font-display font-bold gradient-text">K</span>
              </div>
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">KATHIK</span>
          </div>

          <p className="font-display italic text-ghost max-w-sm leading-relaxed">
            "Every person has a story. We help you preserve it."
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4 mt-6">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-ghost hover:text-mist hover:border-violet/40 transition-all duration-200 text-sm font-bold"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ghost/50 font-mono">
            © {new Date().getFullYear()} KATHIK. Built with love for storytellers.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-ghost/50 hover:text-ghost transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Big watermark text */}
        <div className="mt-12 overflow-hidden">
          <p
            className="font-display font-black text-center select-none pointer-events-none footer-watermark"
            style={{
              fontSize: 'clamp(3rem, 12vw, 9rem)',
              lineHeight: 1,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            KATHIK
          </p>
        </div>
      </div>
    </footer>
  )
}