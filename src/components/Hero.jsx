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
    <div className="font-display italic text-sm md:text-base text-violet-glow/70 typewriter min-h-[1.5em]">
      {displayText}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet/10 blur-[100px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gold/8 blur-[80px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-azure/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* Left: Text content */}
          <div className="order-2 lg:order-1">
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
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mt-3 mb-6"
            >
              <span style={{ color: "var(--text-primary)" }}>Your Story</span>
              <br />
              <span style={{ color: "var(--text-primary)" }}>Deserves To</span>
              <br />
              <span className="gradient-text">Become A Book</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-4"
            >
              <TypewriterText phrases={handwrittenPhrases} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-ghost text-base md:text-lg leading-relaxed max-w-lg mt-4 mb-8"
            >
              Write your memories, dreams, and imagination. KATHIK uses AI to transform
              your words into a beautifully designed book — complete with poems, shayari,
              emotional themes, and life lessons.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#demo" className="btn-primary">
                <span>✦</span>
                Create My Story
              </a>
              <a href="#early-access" className="btn-secondary">
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

          {/* Right: 3D Book */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="order-1 lg:order-2 relative h-[420px] md:h-[520px] lg:h-[600px]"
          >
            {/* Glow behind the book */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-violet/20 blur-[60px]" />
            </div>
            <Book3D />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-ghost tracking-widest uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-violet-glow/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
