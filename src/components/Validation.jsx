import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// ─── CONFIG ──────────────────────────────────────────────────────────────
// Real-time votes are stored in a free public JSON bin.
// We use jsonbin.io — create a free account at jsonbin.io,
// make a bin with: {"yes":0,"maybe":0,"no":0}
// then set VITE_VOTES_URL and VITE_VOTES_KEY in your .env / Vercel env vars.
//
// VITE_VOTES_URL  = https://api.jsonbin.io/v3/b/<BIN_ID>
// VITE_VOTES_KEY  = $2a$10$... (your jsonbin Master Key or Access Key)
//
// If env vars are not set we fall back to localStorage-only mode.
// ─────────────────────────────────────────────────────────────────────────

const VOTES_URL = import.meta.env.VITE_VOTES_URL || null
const VOTES_KEY = import.meta.env.VITE_VOTES_KEY || null
const LOCAL_KEY = 'kathik_vote_v2'
const POLL_MS = 8000   // re-fetch every 8 s so all visitors see live counts

const ZERO_COUNTS = { yes: 0, maybe: 0, no: 0 }

const options = [
  {
    key: 'yes',
    emoji: '❤️',
    label: 'Yes, I want this!',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.10)',
    border: 'rgba(168,85,247,0.30)',
  },
  {
    key: 'maybe',
    emoji: '🤔',
    label: 'Maybe — tell me more',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.10)',
    border: 'rgba(96,165,250,0.30)',
  },
  {
    key: 'no',
    emoji: '👋',
    label: 'Not for me',
    color: '#9ca3af',
    bg: 'rgba(156,163,175,0.06)',
    border: 'rgba(156,163,175,0.18)',
  },
]

// ─── API HELPERS ──────────────────────────────────────────────────────────

async function fetchCounts() {
  if (!VOTES_URL || !VOTES_KEY) return null
  try {
    const res = await fetch(VOTES_URL + '/latest', {
      headers: { 'X-Master-Key': VOTES_KEY },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.record   // { yes, maybe, no }
  } catch {
    return null
  }
}

async function pushCounts(newCounts) {
  if (!VOTES_URL || !VOTES_KEY) return false
  try {
    const res = await fetch(VOTES_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': VOTES_KEY,
      },
      body: JSON.stringify(newCounts),
    })
    return res.ok
  } catch {
    return false
  }
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────

function ProgressBar({ value, max, color, animate: shouldAnimate }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: shouldAnimate ? `${pct}%` : 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        style={{ background: color }}
      />
    </div>
  )
}

function LiveDot() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
      </span>
      <span className="text-xs font-mono text-green-400">LIVE</span>
    </span>
  )
}

function CountUp({ target, duration = 800 }) {
  const [display, setDisplay] = useState(0)
  const prevRef = useRef(0)

  useEffect(() => {
    const start = prevRef.current
    const diff = target - start
    if (diff === 0) return
    const startTime = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(start + diff * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
      else prevRef.current = target
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return <>{display.toLocaleString()}</>
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────

export default function Validation() {
  const [counts, setCounts] = useState(ZERO_COUNTS)
  const [vote, setVote] = useState(null)   // null | 'yes' | 'maybe' | 'no'
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isRealtime, setIsRealtime] = useState(false)

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const pollRef = useRef(null)

  // ── Restore user's previous vote from localStorage ──────────────────────
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY)
    if (saved) {
      try {
        const { vote: v } = JSON.parse(saved)
        if (v) { setVote(v); setShowResult(true) }
      } catch { /* ignore */ }
    }
  }, [])

  // ── Fetch live counts (or fall back to localStorage counts) ─────────────
  const loadCounts = useCallback(async () => {
    const remote = await fetchCounts()
    if (remote) {
      setCounts(remote)
      setIsRealtime(true)
    } else {
      // fallback: counts stored locally
      const saved = localStorage.getItem(LOCAL_KEY)
      if (saved) {
        try {
          const { counts: c } = JSON.parse(saved)
          if (c) setCounts(c)
        } catch { /* ignore */ }
      }
    }
    setLoading(false)
  }, [])

  // Initial load + live polling
  useEffect(() => {
    loadCounts()
    pollRef.current = setInterval(loadCounts, POLL_MS)
    return () => clearInterval(pollRef.current)
  }, [loadCounts])

  // ── Handle vote ─────────────────────────────────────────────────────────
  const handleVote = async (key) => {
    if (vote) return

    const newCounts = { ...counts, [key]: (counts[key] || 0) + 1 }

    // Optimistic UI update
    setCounts(newCounts)
    setVote(key)
    setTimeout(() => setShowResult(true), 250)

    // Persist locally (fallback + remember user's choice)
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ vote: key, counts: newCounts }))

    // Push to remote
    const pushed = await pushCounts(newCounts)
    if (pushed) {
      // Re-fetch to get the true server value (handles race conditions)
      setTimeout(loadCounts, 500)
    }
  }

  const total = (counts.yes || 0) + (counts.maybe || 0) + (counts.no || 0)

  return (
    <section className="relative py-28 px-6">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/4 blur-[120px]" />
      </div>

      <div className="max-w-2xl mx-auto">

        {/* ── Heading ── */}
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
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-2 mb-4" style={{ color: 'var(--text-primary)' }}>
            Would You Use{' '}
            <span className="gradient-text">KATHIK?</span>
          </h2>
          <p style={{ color: 'var(--text-ghost)' }}>
            Your vote helps us build the right product for you.
          </p>
        </motion.div>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-gold rounded-2xl p-8"
        >
          {/* Live indicator + total */}
          <div className="flex items-center justify-between mb-6">
            {isRealtime ? <LiveDot /> : (
              <span className="text-xs font-mono" style={{ color: 'var(--text-ghost)' }}>
                {loading ? 'Loading...' : 'Local mode'}
              </span>
            )}
            <span className="text-xs font-mono" style={{ color: 'var(--text-ghost)' }}>
              {loading
                ? '...'
                : <><CountUp target={total} /> vote{total !== 1 ? 's' : ''} total</>
              }
            </span>
          </div>

          {/* ── Vote buttons ── */}
          <AnimatePresence>
            {!vote && (
              <motion.div
                key="buttons"
                exit={{ opacity: 0, y: -16 }}
                className="space-y-3 mb-6"
              >
                {options.map((opt, i) => (
                  <motion.button
                    key={opt.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    onClick={() => handleVote(opt.key)}
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: opt.bg, border: `1px solid ${opt.border}` }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = `0 8px 30px ${opt.color}25` }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="font-medium text-sm md:text-base" style={{ color: 'var(--text-primary)' }}>
                      {opt.label}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Thank you message ── */}
          {vote && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 py-3"
            >
              <p className="text-lg font-display" style={{ color: 'var(--text-primary)' }}>
                {vote === 'yes' && '❤️ Thank you! You\'re one of us.'}
                {vote === 'maybe' && '🤔 We\'ll tell you more soon!'}
                {vote === 'no' && '👋 Thanks for being honest. We\'ll keep improving.'}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-ghost)' }}>
                Your vote has been counted{isRealtime ? ' and is live for everyone' : ''}.
              </p>
            </motion.div>
          )}

          {/* ── Results ── */}
          <AnimatePresence>
            {(showResult || loading === false) && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-mono" style={{ color: 'var(--text-ghost)' }}>
                    Community Response
                  </p>
                  {isRealtime && (
                    <p className="text-xs font-mono" style={{ color: 'var(--text-ghost)' }}>
                      updates every {POLL_MS / 1000}s
                    </p>
                  )}
                </div>

                {options.map(opt => {
                  const count = counts[opt.key] || 0
                  const pct = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0'
                  const isMyVote = vote === opt.key
                  return (
                    <div
                      key={opt.key}
                      className="rounded-xl p-3 transition-all duration-300"
                      style={{
                        background: opt.bg,
                        border: `1px solid ${isMyVote ? opt.color : opt.border}`,
                        boxShadow: isMyVote ? `0 0 0 1px ${opt.color}` : 'none',
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span>{opt.emoji}</span>
                          <span className="text-sm" style={{ color: 'var(--text-mist)' }}>{opt.label}</span>
                          {isMyVote && (
                            <span className="text-xs font-mono px-1.5 py-0.5 rounded-full"
                              style={{ background: `${opt.color}20`, color: opt.color }}>
                              you
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold" style={{ color: opt.color }}>
                            <CountUp target={count} duration={600} />
                          </span>
                          <span className="text-xs font-mono" style={{ color: 'var(--text-ghost)' }}>
                            {pct}%
                          </span>
                        </div>
                      </div>
                      <ProgressBar value={count} max={total} color={opt.color} animate={showResult || !vote} />
                    </div>
                  )
                })}

                {/* Grand total bar */}
                {total > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-2 text-center"
                  >
                    <p className="text-xs font-mono" style={{ color: 'var(--text-ghost)' }}>
                      <CountUp target={total} duration={800} /> people have voted
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Setup hint — only shown when no env vars are set */}
        {!VOTES_URL && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 glass rounded-xl p-4 text-center"
          >
            <p className="text-xs font-mono" style={{ color: 'var(--text-ghost)' }}>
              💡 To enable live shared counts: add <code className="text-gold">VITE_VOTES_URL</code> &amp;{' '}
              <code className="text-gold">VITE_VOTES_KEY</code> env vars (jsonbin.io).
              Currently using local-only mode.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}