import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AnimatedCounter } from './Counter.jsx'

const features = [
  { icon: '📜', title: 'Turn Memories Into Legacy', description: 'Your life story doesn\'t disappear. KATHIK turns every moment into a beautifully crafted chapter of who you are.', accent: '#c9a84c' },
  { icon: '🔮', title: 'AI That Feels, Not Just Reads', description: 'Our AI understands emotions — detecting nostalgia, joy, grief. It honors what you meant, not just what you wrote.', accent: '#a855f7' },
  { icon: '📚', title: 'Multiple Languages & Styles', description: 'Write in Hindi, Urdu, English or all three. KATHIK generates shayari, poems, and lessons in your language.', accent: '#60a5fa' },
  { icon: '🎨', title: 'Beautiful Page Design', description: 'Every page is crafted with emotional typography and visual themes that make your story look as powerful as it feels.', accent: '#f87171' },
  { icon: '🔒', title: 'Preserve Your Journey', description: 'Never lose another important memory. Your KATHIK book is a permanent record — shareable, printable, personal.', accent: '#34d399' },
  { icon: '💫', title: 'Share Your Story', description: 'Let family or the world experience your emotions. Every story matters. Yours deserves to be heard.', accent: '#c9a84c' },
]

export default function WhyKathik() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 sm:mb-14">
          <span className="section-label">
            <span className="w-4 h-px bg-gold inline-block" />
            Why KATHIK
            <span className="w-4 h-px bg-gold inline-block" />
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-2 mb-3" style={{ color: 'var(--text-primary)' }}>
            More Than a Writing Tool —<br />
            <span className="gradient-text">A Living Archive</span>
          </h2>
          <p className="text-sm sm:text-base max-w-md mx-auto" style={{ color: 'var(--text-ghost)' }}>
            Stories are the only things we leave behind that don't decay.
          </p>
        </motion.div>

        {/* 2 col mobile, 3 col desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: `${feature.accent}20` }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 40px ${feature.accent}15`; e.currentTarget.style.borderColor = `${feature.accent}40` }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${feature.accent}20` }}
            >
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-2xl mb-3 sm:mb-4"
                style={{ background: `${feature.accent}15`, border: `1px solid ${feature.accent}30` }}>
                {feature.icon}
              </div>
              <h3 className="font-display font-bold text-sm sm:text-lg mb-1 sm:mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed hidden sm:block" style={{ color: 'var(--text-ghost)' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-14 glass-gold rounded-2xl p-5 sm:p-8"
        >
          {[
            { value: 12482, suffix: '+', label: 'People Waiting' },
            { value: 6, suffix: '', label: 'Story Types' },
            { value: null, label: 'Stories Possible', symbol: '∞' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-2xl sm:text-4xl gradient-text mb-1">
                {stat.symbol ? stat.symbol : <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-xs font-mono tracking-wide uppercase" style={{ color: 'var(--text-ghost)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}