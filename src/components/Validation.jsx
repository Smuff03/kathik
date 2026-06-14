import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const STORAGE_KEY = 'kathik_vote'
const BASE_COUNTS = { yes: 8234, maybe: 2105, no: 342 }

const options = [
  { key: 'yes', emoji: '❤️', label: 'Yes, I want this!', color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)' },
  { key: 'maybe', emoji: '🤔', label: 'Maybe — tell me more', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.3)' },
  { key: 'no', emoji: '👋', label: 'Not for me', color: '#9ca3af', bg: 'rgba(156,163,175,0.06)', border: 'rgba(156,163,175,0.15)' },
]

function ProgressBar({ value, max, color, animated }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="h-1.5 rounded-full overflow-hidden bg-white/5">
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: animated ? `${pct}%` : 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
        style={{ background: color }}
      />
    </div>
  )
}

export default function Validation() {
  const [vote, setVote] = useState(null)
  const [counts, setCounts] = useState(BASE_COUNTS)
  const [showResult, setShowResult] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const data = JSON.parse(saved)
      setVote(data.vote)
      setCounts(data.counts)
      setShowResult(true)
    }
  }, [])

  const handleVote = (key) => {
    if (vote) return
    const newCounts = { ...counts, [key]: counts[key] + 1 }
    const data = { vote: key, counts: newCounts }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setVote(key)
    setCounts(newCounts)
    setTimeout(() => setShowResult(true), 300)
  }

  const total = counts.yes + counts.maybe + counts.no

  return (
    <section className="relative py-28 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/4 blur-[120px]" />
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="section-label">
            <span className="w-4 h-px bg-gold inline-block" />
            Validation
            <span className="w-4 h-px bg-gold inline-block" />
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-2 mb-4">
            Would You Use{' '}
            <span className="gradient-text">KATHIK?</span>
          </h2>
          <p className="text-ghost">Your vote helps us build the right product for you.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-gold rounded-2xl p-8"
        >
          {/* Vote buttons */}
          <AnimatePresence>
            {!vote && (
              <motion.div
                key="buttons"
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3 mb-6"
              >
                {options.map((opt, i) => (
                  <motion.button
                    key={opt.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    onClick={() => handleVote(opt.key)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: opt.bg, border: `1px solid ${opt.border}` }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 30px ${opt.color}20`}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="font-medium text-white text-sm md:text-base">{opt.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thank you message after vote */}
          {vote && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 py-3"
            >
              <p className="text-lg font-display text-white">
                {vote === 'yes' && '❤️ Thank you! You\'re one of us.'}
                {vote === 'maybe' && '🤔 We\'ll tell you more soon!'}
                {vote === 'no' && '👋 Thanks for being honest. We\'ll keep improving.'}
              </p>
              <p className="text-ghost text-sm mt-1">Your vote has been counted.</p>
            </motion.div>
          )}

          {/* Results */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-mono text-ghost">Community Response</p>
                  <p className="text-xs text-ghost">{total.toLocaleString()} votes</p>
                </div>
                {options.map(opt => {
                  const count = counts[opt.key]
                  const pct = total > 0 ? ((count / total) * 100).toFixed(1) : 0
                  const isUserVote = vote === opt.key
                  return (
                    <div key={opt.key} className={`rounded-xl p-3 transition-all ${isUserVote ? 'ring-1' : ''}`}
                      style={{ background: opt.bg, ringColor: opt.color }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span>{opt.emoji}</span>
                          <span className="text-sm text-mist">{opt.label}</span>
                          {isUserVote && <span className="text-xs text-ghost font-mono">(your vote)</span>}
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-sm font-semibold" style={{ color: opt.color }}>{count.toLocaleString()}</span>
                          <span className="text-xs text-ghost ml-1">({pct}%)</span>
                        </div>
                      </div>
                      <ProgressBar value={count} max={total} color={opt.color} animated={showResult} />
                    </div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
