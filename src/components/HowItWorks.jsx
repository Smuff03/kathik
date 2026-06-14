import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const steps = [
  {
    number: '01',
    title: 'Write Your Story',
    subtitle: 'In your own words',
    description: 'Just write freely — a memory, a dream, a life event, or your entire journey. No formatting needed. KATHIK reads between the lines.',
    example: {
      label: 'You write:',
      text: '"My first day at college changed my life forever. I was terrified, carrying just one bag and a hundred doubts..."',
    },
    color: 'violet',
    icon: '✍️',
  },
  {
    number: '02',
    title: 'AI Understands Your Emotion',
    subtitle: 'Deep analysis & empathy',
    description: 'Our AI reads your story like a wise friend — detecting the feelings, themes, memories, and the unique personality behind your words.',
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
    description: 'KATHIK generates a complete book — chapters, beautiful page designs, poems, shayari, quotes, and the life lessons hidden in your story.',
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

function StepCard({ step, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const colorMap = {
    violet: { glow: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.3)', text: '#a855f7', bg: 'rgba(124,58,237,0.08)' },
    azure: { glow: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa', bg: 'rgba(59,130,246,0.08)' },
    gold: { glow: 'rgba(201,168,76,0.15)', border: 'rgba(201,168,76,0.3)', text: '#c9a84c', bg: 'rgba(201,168,76,0.08)' },
  }
  const c = colorMap[step.color]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="relative"
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px"
          style={{ background: `linear-gradient(to right, ${c.border}, transparent)` }} />
      )}

      <div
        className="rounded-2xl p-6 h-full transition-all duration-500 hover:-translate-y-1"
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${c.border}`,
          boxShadow: `0 0 40px ${c.glow}`,
        }}
      >
        {/* Step number */}
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-xs" style={{ color: c.text }}>{step.number}</span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${c.border}, transparent)` }} />
          <span className="text-2xl">{step.icon}</span>
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-1">{step.title}</h3>
        <p className="text-xs font-mono mb-3" style={{ color: c.text }}>{step.subtitle}</p>
        <p className="text-ghost text-sm leading-relaxed mb-5">{step.description}</p>

        {/* Example box */}
        <div className="rounded-xl p-4 text-sm" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
          <p className="font-mono text-xs mb-2" style={{ color: c.text }}>{step.example.label}</p>
          {step.example.text && (
            <p className="text-mist/80 font-display italic text-sm leading-relaxed">{step.example.text}</p>
          )}
          {step.example.tags && (
            <div className="flex flex-wrap gap-2 mt-1">
              {step.example.tags.map(tag => (
                <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          {step.example.book && (
            <div className="space-y-2">
              <p className="font-display font-semibold text-white text-sm">{step.example.book.chapter}</p>
              <p className="font-display italic text-mist/70 text-xs whitespace-pre-line">{step.example.book.poem}</p>
              <p className="text-ghost text-xs">{step.example.book.quote}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="how-it-works" className="relative py-28 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-violet/30 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">
            <span className="w-4 h-px bg-gold inline-block" />
            The Process
            <span className="w-4 h-px bg-gold inline-block" />
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-2 mb-4">
            Three Steps to Your{' '}
            <span className="gradient-text">Legacy</span>
          </h2>
          <p className="text-ghost text-lg max-w-xl mx-auto">
            From a blank page to a bound book. The magic happens in the space between your words and our AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
