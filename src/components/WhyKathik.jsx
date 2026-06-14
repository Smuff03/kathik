import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    icon: '📜',
    title: 'Turn Memories Into Legacy',
    description: 'Your life story doesn\'t disappear when you close your eyes. KATHIK turns every moment into a beautifully printed chapter of who you are.',
    accent: '#c9a84c',
  },
  {
    icon: '🔮',
    title: 'AI That Feels, Not Just Reads',
    description: 'Our AI understands emotions — detecting nostalgia, joy, grief, love. It doesn\'t just format your text; it honors what you meant.',
    accent: '#a855f7',
  },
  {
    icon: '📚',
    title: 'Multiple Languages & Styles',
    description: 'Write in Hindi, Urdu, English — or a mix of all three. KATHIK generates shayari, poems, and lessons in your language.',
    accent: '#60a5fa',
  },
  {
    icon: '🎨',
    title: 'Beautifully Designed Pages',
    description: 'Every page is crafted with emotional typography, visual themes, and a premium aesthetic that makes your story look as powerful as it feels.',
    accent: '#f87171',
  },
  {
    icon: '🔒',
    title: 'Preserve Your Journey',
    description: 'Never lose another important memory. Your KATHIK book becomes a permanent record — shareable, printable, and deeply personal.',
    accent: '#34d399',
  },
  {
    icon: '💫',
    title: 'Share Your Story',
    description: 'Let family, friends, or the world experience your emotions. Every story matters. Yours deserves to be heard.',
    accent: '#c9a84c',
  },
]

function FeatureCard({ feature, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      className="group glass rounded-2xl p-6 hover:border-opacity-50 transition-all duration-500 hover:-translate-y-1"
      style={{ borderColor: `${feature.accent}20` }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 20px 60px ${feature.accent}15`
        e.currentTarget.style.borderColor = `${feature.accent}40`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = `${feature.accent}20`
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${feature.accent}15`, border: `1px solid ${feature.accent}30` }}
      >
        {feature.icon}
      </div>
      <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-gold-light transition-colors">
        {feature.title}
      </h3>
      <p className="text-ghost text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  )
}

export default function WhyKathik() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="relative py-28 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
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
            Why KATHIK
            <span className="w-4 h-px bg-gold inline-block" />
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-2 mb-4">
            More Than a Writing Tool —<br />
            <span className="gradient-text">A Living Archive</span>
          </h2>
          <p className="text-ghost text-lg max-w-xl mx-auto">
            Stories are the only things we leave behind that don't decay.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 mt-16 glass-gold rounded-2xl p-8"
        >
          {[
            { value: '12,482+', label: 'People Waiting' },
            { value: '6', label: 'Story Types' },
            { value: '∞', label: 'Stories Possible' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-1">{stat.value}</div>
              <div className="text-xs font-mono text-ghost tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
