import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const steps = [
  {
    number: '01',
    title: 'Write Your Story',
    subtitle: 'In your own words',
    description: 'Just write freely — a memory, a dream, a life event. No formatting needed. KATHIK reads between the lines.',
    example: {
      label: 'You write:',
      text: '"My first day at college changed my life forever. I was terrified, carrying just one bag and a hundred doubts..."',
    },
    color: 'violet',
    icon: '✍️',
  },
  {
    number: '02',
    title: 'AI Understands Emotion',
    subtitle: 'Deep analysis & empathy',
    description: 'Our AI reads your story like a wise friend — detecting feelings, themes, memories, and your unique personality.',
    example: {
      label: 'AI detects:',
      tags: ['Courage', 'Nostalgia', 'New beginnings', 'Hope', 'Self-doubt'],
    },
    color: 'azure',
    icon: '🧠',
  },
  {
    number: '03',
    title: 'Your Book Is Born',
    subtitle: 'A masterpiece, uniquely yours',
    description: 'KATHIK generates chapters, beautiful designs, poems, shayari, quotes, and life lessons from your story.',
    example: {
      label: 'Generated:',
      book: {
        chapter: 'Chapter 1: The Day I Chose to Be Brave',
        poem: '"Young feet on ancient stone,\nhearts too big for chests alone..."',
        quote: '"Every campus holds a thousand untold stories."',
      },
    },
    color: 'gold',
    icon: '📖',
  },
]

const colorMap = {
  violet: { glow: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.3)', text: '#a855f7', bg: 'rgba(124,58,237,0.08)' },
  azure: { glow: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa', bg: 'rgba(59,130,246,0.08)' },
  gold: { glow: 'rgba(201,168,76,0.15)', border: 'rgba(201,168,76,0.3)', text: '#c9a84c', bg: 'rgba(201,168,76,0.08)' },
}

function StepCard({ step, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const c = colorMap[step.color]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      className="rounded-2xl p-5 sm:p-6 h-full transition-all duration-500"
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 40px ${c.glow}`,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs" style={{ color: c.text }}>{step.number}</span>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${c.border}, transparent)` }} />
        <span className="text-xl">{step.icon}</span>
      </div>

      <h3 className="font-display font-bold text-lg sm:text-xl mb-1" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
      <p className="text-xs font-mono mb-2" style={{ color: c.text }}>{step.subtitle}</p>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-ghost)' }}>{step.description}</p>

      <div className="rounded-xl p-3 sm:p-4" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
        <p className="font-mono text-xs mb-2" style={{ color: c.text }}>{step.example.label}</p>
        {step.example.text && (
          <p className="font-display italic text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-mist)' }}>
            {step.example.text}
          </p>
        )}
        {step.example.tags && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {step.example.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {step.example.book && (
          <div className="space-y-1.5">
            <p className="font-display font-semibold text-xs sm:text-sm" style={{ color: 'var(--text-primary)' }}>
              {step.example.book.chapter}
            </p>
            <p className="font-display italic text-xs whitespace-pre-line leading-relaxed" style={{ color: 'var(--text-ghost)' }}>
              {step.example.book.poem}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-ghost)' }}>{step.example.book.quote}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="how-it-works" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="section-label">
            <span className="w-4 h-px bg-gold inline-block" />
            The Process
            <span className="w-4 h-px bg-gold inline-block" />
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-2 mb-3" style={{ color: 'var(--text-primary)' }}>
            Three Steps to Your{' '}
            <span className="gradient-text">Legacy</span>
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: 'var(--text-ghost)' }}>
            From a blank page to a bound book. The magic happens between your words and our AI.
          </p>
        </motion.div>

        {/* Mobile: vertical stack. Tablet+: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}