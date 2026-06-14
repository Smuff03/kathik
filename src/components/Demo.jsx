import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const EXAMPLE_STORY = "Today I met my childhood friend after 10 years. We sat in the same chai shop where we used to do homework together. Neither of us spoke much. We just sat there and I realised that time doesn't erase people, it just changes the language you speak to them."

const GENERATED_OUTPUT = {
  chapter: 'Chapter 1: A Forgotten Connection',
  theme: 'Nostalgia · Friendship · Time',
  poem: `Old roads remember footsteps,\nold hearts remember names —\nwe change our shoes, our cities,\nbut the warmth remains the same.`,
  shayari: `Waqt ne faasle bana diye,\npar dil ke kone mein hain woh abhi bhi zinda,\nchai ki khushbu mein milti hai unki yaad...`,
  quote: "Some stories don't end — they wait.",
  lesson: 'The people who truly know us require no explanation. Silence with them is its own language.',
}

function LoadingAnimation() {
  const stages = ['Reading your emotions...', 'Detecting themes...', 'Crafting your chapter...', 'Writing poems & shayari...', 'Your book is ready ✨']
  const [stage, setStage] = useState(0)
  React.useEffect(() => {
    if (stage < stages.length - 1) {
      const t = setTimeout(() => setStage(s => s + 1), 700)
      return () => clearTimeout(t)
    }
  }, [stage])
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-violet/30 animate-spin" style={{ borderTopColor: '#a855f7' }} />
        <div className="absolute inset-2 rounded-full border-2 border-gold/30 animate-spin" style={{ borderTopColor: '#c9a84c', animationDirection: 'reverse', animationDuration: '0.8s' }} />
        <div className="absolute inset-0 flex items-center justify-center text-sm">✦</div>
      </div>
      <div className="space-y-1.5 text-center">
        {stages.map((s, i) => (
          <p key={s} className={`text-xs font-mono transition-all ${i === stage ? 'text-violet-glow' : i < stage ? 'text-ghost line-through' : 'text-ghost/30'}`}>
            {i < stage ? '✓ ' : i === stage ? '⟳ ' : '○ '}{s}
          </p>
        ))}
      </div>
    </div>
  )
}

function GeneratedPreview() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <div className="glass-violet rounded-xl p-3 sm:p-4">
        <p className="font-mono text-xs text-violet-glow mb-1">Chapter Generated</p>
        <h4 className="font-display font-bold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>{GENERATED_OUTPUT.chapter}</h4>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {GENERATED_OUTPUT.theme.split(' · ').map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-violet/20 text-violet-glow border border-violet/30">{t}</span>
          ))}
        </div>
      </div>
      <div className="glass rounded-xl p-3 sm:p-4 border-l-2 border-gold">
        <p className="font-mono text-xs text-gold mb-1.5">✦ AI Poem</p>
        <p className="font-display italic text-xs sm:text-sm whitespace-pre-line leading-relaxed" style={{ color: 'var(--text-mist)' }}>{GENERATED_OUTPUT.poem}</p>
      </div>
      <div className="glass rounded-xl p-3 sm:p-4 border-l-2 border-violet">
        <p className="font-mono text-xs text-violet-glow mb-1.5">✦ Shayari</p>
        <p className="font-display italic text-xs leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-mist)' }}>{GENERATED_OUTPUT.shayari}</p>
      </div>
      <div className="glass-gold rounded-xl p-3 sm:p-4">
        <p className="font-mono text-xs text-gold mb-1">✦ Quote</p>
        <p className="font-display font-semibold text-xs sm:text-sm" style={{ color: 'var(--text-primary)' }}>"{GENERATED_OUTPUT.quote}"</p>
      </div>
      <div className="rounded-xl p-3 sm:p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)' }}>
        <p className="font-mono text-xs mb-1" style={{ color: 'var(--text-ghost)' }}>✦ Life Lesson</p>
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-mist)' }}>{GENERATED_OUTPUT.lesson}</p>
      </div>
    </motion.div>
  )
}

export default function Demo() {
  const [storyText, setStoryText] = useState('')
  const [state, setState] = useState('idle')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleGenerate = () => {
    const text = storyText.trim() || EXAMPLE_STORY
    if (!storyText.trim()) setStoryText(EXAMPLE_STORY)
    setState('loading')
    setTimeout(() => setState('done'), 3500)
  }

  return (
    <section id="demo" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-violet/5 blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 sm:mb-14">
          <span className="section-label">
            <span className="w-4 h-px bg-gold inline-block" />
            Live Demo
            <span className="w-4 h-px bg-gold inline-block" />
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-2 mb-3" style={{ color: 'var(--text-primary)' }}>
            See the Magic <span className="gradient-text">Happen</span>
          </h2>
          <p className="text-sm sm:text-base max-w-lg mx-auto" style={{ color: 'var(--text-ghost)' }}>
            Type a real memory or use our example — watch KATHIK transform it.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

          {/* Input */}
          <div className="glass rounded-2xl p-4 sm:p-6 flex flex-col">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-2 font-mono text-xs" style={{ color: 'var(--text-ghost)' }}>your-story.txt</span>
            </div>

            <textarea
              className="flex-1 text-xs sm:text-sm font-body leading-relaxed resize-none outline-none min-h-[160px] sm:min-h-[200px]"
              style={{ background: 'transparent', color: 'var(--text-mist)' }}
              placeholder={"Write your story here...\n\nA memory, a dream, a moment that changed you."}
              value={storyText}
              onChange={e => { setStoryText(e.target.value); if (state === 'done') setState('idle') }}
              disabled={state === 'loading'}
            />

            {!storyText && (
              <button className="mt-2 text-xs text-left font-mono hover:text-violet-glow transition-colors"
                style={{ color: 'var(--text-ghost)' }}
                onClick={() => setStoryText(EXAMPLE_STORY)}>
                ↗ Use example story
              </button>
            )}

            <div className="mt-4 flex gap-2">
              <button onClick={handleGenerate} disabled={state === 'loading'}
                className="btn-primary flex-1 justify-center text-sm py-3 disabled:opacity-50">
                <span>✦</span>
                {state === 'idle' ? 'Generate My Book' : state === 'loading' ? 'Creating...' : 'Regenerate'}
              </button>
              {state === 'done' && (
                <button onClick={() => { setState('idle'); setStoryText('') }}
                  className="btn-secondary px-3 py-3 text-sm">Reset</button>
              )}
            </div>
            <p className="text-xs text-center mt-2 font-mono" style={{ color: 'var(--text-ghost)', opacity: 0.5 }}>
              Preview demo — full AI coming soon.
            </p>
          </div>

          {/* Output */}
          <div className="glass-violet rounded-2xl p-4 sm:p-6 min-h-[320px] overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-violet-glow">KATHIK</span>
              <span className="font-mono text-xs" style={{ color: 'var(--text-ghost)' }}>— book output</span>
              {state === 'done' && (
                <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">✓ Ready</span>
              )}
            </div>

            <AnimatePresence mode="wait">
              {state === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-48 text-center gap-2">
                  <div className="text-4xl opacity-20">📖</div>
                  <p className="text-sm" style={{ color: 'var(--text-ghost)' }}>Your book will appear here</p>
                </motion.div>
              )}
              {state === 'loading' && <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><LoadingAnimation /></motion.div>}
              {state === 'done' && <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><GeneratedPreview /></motion.div>}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}