import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Book3D from './Book3D.jsx'
import { HeroCounter } from './Counter.jsx'

const handwrittenPhrases = [
  '"I remember the day everything changed..."',
  '"A dream that refused to die..."',
  '"She smiled and the world shifted..."',
  '"Every scar has a story worth telling..."',
]

function TypewriterText({ phrases }) {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const phrase = phrases[currentPhrase]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < phrase.length) {
          setDisplayText(phrase.slice(0, charIndex + 1))
          setCharIndex(c => c + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(phrase.slice(0, charIndex - 1))
          setCharIndex(c => c - 1)
        } else {
          setIsDeleting(false)
          setCurrentPhrase(p => (p + 1) % phrases.length)
        }
      }
    }, isDeleting ? 30 : 60)
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentPhrase, phrases])

  return (
    <div className="font-display italic text-sm text-violet-glow/70 typewriter min-h-[1.5em]">
      {displayText}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full bg-violet/10 blur-[80px] md:blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-80 h-48 md:h-80 rounded-full bg-gold/8 blur-[60px] md:blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">

        {/* Mobile: stack vertically. Desktop: side by side */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 items-center">

          {/* 3D Book — TOP on mobile, RIGHT on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full lg:order-2"
            style={{ height: '280px' }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-40 h-40 rounded-full bg-violet/20 blur-[50px]" />
            </div>
            <Book3D />
          </motion.div>

          {/* Text — BOTTOM on mobile, LEFT on desktop */}
          <div className="w-full lg:order-1 mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="section-label">
                <span className="w-4 h-px bg-gold inline-block" />
                AI Storytelling Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight mt-2 mb-4"
            >
              <span style={{ color: 'var(--text-primary)' }}>Your Story</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>Deserves To</span>
              <br />
              <span className="gradient-text">Become A Book</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-3"
            >
              <TypewriterText phrases={handwrittenPhrases} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-sm sm:text-base leading-relaxed max-w-lg mt-3 mb-6"
              style={{ color: 'var(--text-ghost)' }}
            >
              Write your memories, dreams, and imagination. KATHIK uses AI to transform
              your words into a beautifully designed book — complete with poems, shayari,
              emotional themes, and life lessons.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a href="#demo" className="btn-primary justify-center sm:justify-start">
                <span>✦</span>
                Create My Story
              </a>
              <a href="#early-access" className="btn-secondary text-center sm:text-left">
                I Want Early Access
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <HeroCounter count={12482} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — hidden on small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase font-mono" style={{ color: 'var(--text-ghost)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-violet-glow/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}