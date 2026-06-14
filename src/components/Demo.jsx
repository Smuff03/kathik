import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const EXAMPLE_STORY = "Today I met my childhood friend after 10 years. We sat in the same chai shop where we used to do homework together. Neither of us spoke much. We just sat there and I realised that time doesn't erase people, it just changes the language you speak to them."

const GENERATED_OUTPUT = {
  chapter: 'Chapter 1: A Forgotten Connection',
  theme: 'Nostalgia · Friendship · Time',
  poem: `Old roads remember footsteps,
old hearts remember names —
we change our shoes, our cities,
but the warmth remains the same.`,
  shayari: `Waqt ne faasle bana diye,
par dil ke kone mein hain woh abhi bhi zinda,
chai ki khushbu mein milti hai unki yaad,
kuch rishte toot ke bhi hote hain paiband.`,
  quote: 'Some stories don\'t end — they wait.',
  lesson: 'The people who truly know us require no explanation. Silence with them is its own language.',
}

function GeneratedPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      {/* Chapter header */}
      <div className="glass-violet rounded-xl p-4">
        <p className="font-mono text-xs text-violet-glow mb-1">Chapter Generated</p>
        <h4 className="font-display font-bold text-lg text-white">{GENERATED_OUTPUT.chapter}</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {GENERATED_OUTPUT.theme.split(' · ').map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-violet/20 text-violet-glow border border-violet/30">{t}</span>
          ))}
        </div>
      </div>

      {/* Poem */}
      <div className="glass rounded-xl p-4 border-l-2 border-gold">
        <p className="font-mono text-xs text-gold mb-2">✦ AI Poem</p>
        <p className="font-display italic text-mist/90 text-sm whitespace-pre-line leading-relaxed">{GENERATED_OUTPUT.poem}</p>
      </div>

      {/* Shayari */}
      <div className="glass rounded-xl p-4 border-l-2 border-violet">
        <p className="font-mono text-xs text-violet-glow mb-2">✦ Shayari (Urdu)</p>
        <p className="font-display italic text-mist/80 text-sm whitespace-pre-line leading-relaxed">{GENERATED_OUTPUT.shayari}</p>
      </div>

      {/* Quote */}
      <div className="glass-gold rounded-xl p-4">
        <p className="font-mono text-xs text-gold mb-1">✦ Quote</p>
        <p className="font-display font-semibold text-white">"{GENERATED_OUTPUT.quote}"</p>
      </div>

      {/* Life lesson */}
      <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="font-mono text-xs text-ghost mb-1">✦ Life Lesson</p>
        <p className="text-mist text-sm leading-relaxed">{GENERATED_OUTPUT.lesson}</p>
      </div>
    </motion.div>
  )
}

function LoadingAnimation() {
  const stages = [
    'Reading your emotions...',
    'Detecting themes & memories...',
    'Crafting your chapter...',
    'Writing poems & shayari...',
    'Your book is ready ✨',
  ]
  const [stage, setStage] = useState(0)

  React.useEffect(() => {
    if (stage < stages.length - 1) {
      const t = setTimeout(() => setStage(s => s + 1), 700)
      return () => clearTimeout(t)
    }
  }, [stage])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-violet/30 animate-spin" style={{ borderTopColor: '#a855f7' }} />
        <div className="absolute inset-2 rounded-full border-2 border-gold/30 animate-spin" style={{ borderTopColor: '#c9a84c', animationDirection: 'reverse', animationDuration: '0.8s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl">✦</span>
        </div>
      </div>
      <div className="space-y-2 text-center">
        {stages.map((s, i) => (
          <motion.p
            key={s}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i <= stage ? 1 : 0.2, x: 0 }}
            className={`text-sm font-mono transition-all duration-300 ${i === stage ? 'text-violet-glow' : i < stage ? 'text-ghost line-through' : 'text-ghost/30'}`}
          >
            {i < stage ? '✓ ' : i === stage ? '⟳ ' : '○ '}{s}
          </motion.p>
        ))}
      </div>
    </div>
  )
}

export default function Demo() {
  const [storyText, setStoryText] = useState('')
  const [state, setState] = useState('idle') // idle | loading | done
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleGenerate = () => {
    if (!storyText.trim() && storyText !== EXAMPLE_STORY) {
      setStoryText(EXAMPLE_STORY)
      return
    }
    setState('loading')
    setTimeout(() => setState('done'), 3500)
  }

  const handleReset = () => {
    setState('idle')
    setStoryText('')
  }

  return (
    <section id="demo" className="relative py-28 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-violet/5 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">
            <span className="w-4 h-px bg-gold inline-block" />
            Live Demo
            <span className="w-4 h-px bg-gold inline-block" />
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-2 mb-4">
            See the Magic{' '}
            <span className="gradient-text">Happen</span>
          </h2>
          <p className="text-ghost text-lg max-w-lg mx-auto">
            Type a real memory or use our example — and watch KATHIK transform it into a book.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Left: Input */}
          <div className="glass rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="ml-3 font-mono text-xs text-ghost">your-story.txt</span>
            </div>

            <textarea
              className="flex-1 text-sm font-body leading-relaxed resize-none outline-none min-h-[200px]"
              style={{ background: 'transparent', color: 'var(--text-mist)' }}
              placeholder="Write your story here...&#10;&#10;A memory, a dream, a moment that changed you. Just write — don't overthink it."
              value={storyText}
              onChange={e => {
                setStoryText(e.target.value)
                if (state === 'done') setState('idle')
              }}
              disabled={state === 'loading'}
            />

            {!storyText && (
              <button
                className="mt-3 text-xs text-left font-mono text-ghost/50 hover:text-violet-glow transition-colors"
                onClick={() => setStoryText(EXAMPLE_STORY)}
              >
                ↗ Use example story
              </button>
            )}

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleGenerate}
                disabled={state === 'loading'}
                className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>✦</span>
                {state === 'idle' ? 'Generate My Book' : state === 'loading' ? 'Creating...' : 'Regenerate'}
              </button>
              {state === 'done' && (
                <button onClick={handleReset} className="btn-secondary px-4 py-3 text-sm">
                  Reset
                </button>
              )}
            </div>

            <p className="text-xs text-ghost/50 text-center mt-3 font-mono">
              This is a preview demo. Full AI generation coming soon.
            </p>
          </div>

          {/* Right: Output */}
          <div className="glass-violet rounded-2xl p-6 min-h-[400px] overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-violet-glow">KATHIK</span>
              <span className="font-mono text-xs text-ghost">— book output</span>
              {state === 'done' && (
                <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                  ✓ Ready
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              {state === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-64 text-center gap-3"
                >
                  <div className="text-5xl opacity-30">📖</div>
                  <p className="text-ghost text-sm">Your generated book will appear here</p>
                </motion.div>
              )}

              {state === 'loading' && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <LoadingAnimation />
                </motion.div>
              )}

              {state === 'done' && (
                <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <GeneratedPreview />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}