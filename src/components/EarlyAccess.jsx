import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const storyTypes = [
  { id: 'life', label: 'My Life Story', emoji: '🌟' },
  { id: 'family', label: 'Family Memories', emoji: '👨‍👩‍👧' },
  { id: 'love', label: 'Love Story', emoji: '❤️' },
  { id: 'fiction', label: 'Fiction', emoji: '🔮' },
  { id: 'travel', label: 'Travel Memories', emoji: '✈️' },
  { id: 'poetry', label: 'Poetry', emoji: '🌸' },
]

function SuccessAnimation() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 text-3xl sm:text-4xl"
        style={{ background: 'rgba(168,85,247,0.15)', border: '2px solid rgba(168,85,247,0.4)' }}>
        ✨
      </motion.div>
      <h3 className="font-display font-bold text-xl sm:text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
        You're on the list!
      </h3>
      <p className="text-sm max-w-xs leading-relaxed mb-5" style={{ color: 'var(--text-ghost)' }}>
        We'll reach out the moment KATHIK launches. Your story is waiting to become a book.
      </p>
      <div className="glass-gold rounded-xl px-5 py-3">
        <p className="font-display italic text-sm text-gold-light">
          "Every great book began with someone deciding their story was worth telling."
        </p>
      </div>
    </motion.div>
  )
}

export default function EarlyAccess() {
  const [formData, setFormData] = useState({ name: '', email: '', storyTypes: [] })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const toggleStoryType = (id) => {
    setFormData(f => ({
      ...f,
      storyTypes: f.storyTypes.includes(id) ? f.storyTypes.filter(s => s !== id) : [...f.storyTypes, id],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) { setError('Please enter your name.'); return }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) { setError('Please enter a valid email.'); return }
    setError('')
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1500)
  }

  return (
    <section id="early-access" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-violet/8 blur-[80px]" />
      </div>

      <div className="max-w-lg mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 sm:mb-10">
          <span className="section-label">
            <span className="w-4 h-px bg-gold inline-block" />
            Limited Early Access
            <span className="w-4 h-px bg-gold inline-block" />
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-2 mb-3" style={{ color: 'var(--text-primary)' }}>
            Be Among the <span className="gradient-text">First</span>
          </h2>
          <p className="text-sm sm:text-base max-w-md mx-auto" style={{ color: 'var(--text-ghost)' }}>
            Join the waitlist and get early access, special pricing, and shape KATHIK's future.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          <div className="glass-violet rounded-2xl p-5 sm:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <SuccessAnimation />
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono mb-1.5 tracking-widest uppercase" style={{ color: 'var(--text-ghost)' }}>Your Name</label>
                    <input type="text" value={formData.name}
                      onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                      placeholder="What should we call you?"
                      className="themed-input w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1.5 tracking-widest uppercase" style={{ color: 'var(--text-ghost)' }}>Email Address</label>
                    <input type="email" value={formData.email}
                      onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="themed-input w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-2 tracking-widest uppercase" style={{ color: 'var(--text-ghost)' }}>
                      What stories would you create?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {storyTypes.map(type => {
                        const selected = formData.storyTypes.includes(type.id)
                        return (
                          <button type="button" key={type.id} onClick={() => toggleStoryType(type.id)}
                            className="flex items-center gap-2 p-2.5 rounded-xl text-xs text-left transition-all duration-200"
                            style={{
                              background: selected ? 'rgba(168,85,247,0.15)' : 'var(--bg-card)',
                              border: `1px solid ${selected ? 'rgba(168,85,247,0.5)' : 'var(--border-base)'}`,
                              color: selected ? 'var(--text-mist)' : 'var(--text-ghost)',
                            }}>
                            <span>{type.emoji}</span>
                            <span>{type.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {error && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs font-mono">{error}</motion.p>
                  )}

                  <button type="submit" disabled={loading}
                    className="btn-primary w-full justify-center py-3.5 text-sm sm:text-base disabled:opacity-70">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Joining...
                      </span>
                    ) : <>✦ Join KATHIK Early Access</>}
                  </button>
                  <p className="text-center text-xs font-mono" style={{ color: 'var(--text-ghost)', opacity: 0.5 }}>
                    No spam. No commitment. Just stories.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}