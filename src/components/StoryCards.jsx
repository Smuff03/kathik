import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const books = [
  {
    id: 1,
    title: 'The Boy Who Never Gave Up',
    category: 'Life Journey',
    preview: 'A young dreamer from a small town chasing his impossible dream through silence, sacrifice, and stubborn hope.',
    quote: 'Sometimes the longest roads create the strongest souls.',
    poem: null,
    pages: 142, chapters: 9,
    accent: '#a855f7', emoji: '🌟',
    tags: ['Resilience', 'Dreams', 'Youth'],
    gradient: 'from-purple-900/60 to-slate-900',
  },
  {
    id: 2,
    title: 'Letters To My Future Self',
    category: 'Self Reflection',
    preview: 'An emotional conversation between who I was and who I want to become — across years, losses, and love.',
    quote: null,
    poem: 'Years will pass,\nfaces will change,\nbut memories stay\nin the quiet corners\nyou forgot you built.',
    pages: 98, chapters: 7,
    accent: '#60a5fa', emoji: '✉️',
    tags: ['Identity', 'Growth', 'Letters'],
    gradient: 'from-blue-900/60 to-slate-900',
  },
  {
    id: 3,
    title: 'The Day Everything Changed',
    category: 'Life Event',
    preview: 'One unexpected phone call on a Tuesday morning that rewrote every plan and every version of the future.',
    quote: 'The moments that undo us are the moments that build us.',
    poem: null,
    pages: 76, chapters: 5,
    accent: '#c9a84c', emoji: '🌊',
    tags: ['Change', 'Loss', 'Reinvention'],
    gradient: 'from-yellow-900/50 to-slate-900',
  },
  {
    id: 4,
    title: 'Dil Se Dilli Tak',
    category: 'Travel & Love',
    preview: 'A love story written in train tickets, chai cups, and midnight conversations across seven cities.',
    quote: 'We did not fall in love. We stumbled — and kept walking together.',
    poem: null,
    pages: 188, chapters: 12,
    accent: '#f87171', emoji: '❤️',
    tags: ['Love', 'Travel', 'Shayari'],
    gradient: 'from-red-900/50 to-slate-900',
  },
]

function BookCard({ book, index }) {
  const [hovered, setHovered] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      className="rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${book.accent}25`,
        boxShadow: hovered ? `0 16px 48px ${book.accent}20` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Book cover visual */}
      <div className={`relative h-40 sm:h-48 bg-gradient-to-br ${book.gradient} overflow-hidden`}>
        <div className="absolute left-0 top-0 bottom-0 w-3" style={{ background: `${book.accent}30`, borderRight: `1px solid ${book.accent}40` }} />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute top-0 h-full w-px opacity-10"
            style={{ left: `${15 + i * 15}%`, background: book.accent }} />
        ))}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <span className="text-2xl mb-1">{book.emoji}</span>
          <span className="font-mono text-xs mb-1" style={{ color: book.accent }}>{book.category}</span>
          <h3 className="font-display font-bold text-white text-sm sm:text-base leading-tight">{book.title}</h3>
        </div>
        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `${book.accent}15`, backdropFilter: 'blur(4px)' }}
        >
          <span className="text-xs text-white px-3 py-1.5 rounded-full border border-white/20 bg-black/30">
            Preview →
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <p className="text-xs sm:text-sm leading-relaxed mb-3" style={{ color: 'var(--text-ghost)' }}>
          {book.preview}
        </p>

        {book.quote && (
          <div className="rounded-lg p-3 mb-3 relative overflow-hidden"
            style={{ background: `${book.accent}08`, border: `1px solid ${book.accent}20` }}>
            <p className="font-display italic text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-mist)' }}>
              "{book.quote}"
            </p>
          </div>
        )}

        {book.poem && (
          <div className="rounded-lg p-3 mb-3"
            style={{ background: `${book.accent}08`, border: `1px solid ${book.accent}20` }}>
            <p className="font-mono text-xs mb-1" style={{ color: book.accent }}>AI Poem</p>
            <p className="font-display italic text-xs leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-mist)' }}>
              {book.poem}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-1">
            {book.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-mono"
                style={{ background: `${book.accent}12`, color: book.accent, border: `1px solid ${book.accent}25` }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="text-xs text-right flex-shrink-0 ml-2" style={{ color: 'var(--text-ghost)' }}>
            <div>{book.pages}p</div>
            <div>{book.chapters}ch</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function StoryCards() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="examples" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-gold/5 blur-[60px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-violet/5 blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="section-label">
            <span className="w-4 h-px bg-gold inline-block" />
            Story Portfolio
            <span className="w-4 h-px bg-gold inline-block" />
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-2 mb-3" style={{ color: 'var(--text-primary)' }}>
            Every Life Is a{' '}
            <span className="gradient-text">Bestseller</span>
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: 'var(--text-ghost)' }}>
            Real stories. AI-crafted into books that last forever.
          </p>
        </motion.div>

        {/* 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {books.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-xs sm:text-sm"
          style={{ color: 'var(--text-ghost)' }}
        >
          These are AI-generated previews. <span className="text-gold">Your story will be unique.</span>
        </motion.p>
      </div>
    </section>
  )
}