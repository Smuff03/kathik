import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const books = [
  {
    id: 1,
    title: 'The Boy Who Never Gave Up',
    category: 'Life Journey',
    author: 'Aryan M.',
    preview: 'A young dreamer from a small town chasing his impossible dream through silence, sacrifice, and stubborn hope.',
    quote: 'Sometimes the longest roads create the strongest souls.',
    poem: null,
    pages: 142,
    chapters: 9,
    spine: '#1a0a3e',
    cover: 'from-violet/40 to-ink',
    accent: '#a855f7',
    tags: ['Resilience', 'Dreams', 'Youth'],
    emoji: '🌟',
  },
  {
    id: 2,
    title: 'Letters To My Future Self',
    category: 'Self Reflection',
    author: 'Priya S.',
    preview: 'An emotional conversation between who I was and who I want to become — across years, losses, and love.',
    quote: null,
    poem: 'Years will pass,\nfaces will change,\nbut memories stay\nin the quiet corners\nyou forgot you built.',
    pages: 98,
    chapters: 7,
    spine: '#0a1a3e',
    cover: 'from-azure/40 to-ink',
    accent: '#60a5fa',
    tags: ['Identity', 'Growth', 'Letters'],
    emoji: '✉️',
  },
  {
    id: 3,
    title: 'The Day Everything Changed',
    category: 'Life Event',
    author: 'Rahul K.',
    preview: 'One unexpected phone call on a Tuesday morning that rewrote every plan, every dream, every version of the future.',
    quote: 'The moments that undo us are the moments that build us.',
    poem: null,
    pages: 76,
    chapters: 5,
    spine: '#1a1a0a',
    cover: 'from-gold/30 to-ink',
    accent: '#c9a84c',
    tags: ['Change', 'Loss', 'Reinvention'],
    emoji: '🌊',
  },
  {
    id: 4,
    title: 'Dil Se Dilli Tak',
    category: 'Travel & Love',
    author: 'Meera J.',
    preview: 'A love story written in train tickets, chai cups, and midnight conversations across seven cities.',
    quote: 'We did not fall in love. We stumbled — and kept walking together.',
    poem: null,
    pages: 188,
    chapters: 12,
    spine: '#1a0a0a',
    cover: 'from-red-900/40 to-ink',
    accent: '#f87171',
    tags: ['Love', 'Travel', 'Shayari'],
    emoji: '❤️',
  },
]

function BookCard({ book, index }) {
  const [hovered, setHovered] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="book-card cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-2xl overflow-hidden h-full transition-all duration-500"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${book.accent}30`,
          boxShadow: hovered ? `0 20px 60px ${book.accent}25, 0 0 0 1px ${book.accent}40` : 'none',
        }}
      >
        {/* Book visual top */}
        <div className={`relative h-52 bg-gradient-to-br ${book.cover} overflow-hidden`}>
          {/* Decorative lines */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute top-0 h-full w-px"
                style={{ left: `${12 + i * 12}%`, background: `linear-gradient(to bottom, transparent, ${book.accent}60, transparent)` }} />
            ))}
          </div>

          {/* Spine effect */}
          <div className="absolute left-0 top-0 bottom-0 w-4" style={{ background: book.accent + '30', borderRight: `1px solid ${book.accent}40` }} />

          {/* Title on book */}
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <span className="text-3xl mb-2">{book.emoji}</span>
            <span className="font-mono text-xs mb-1" style={{ color: book.accent }}>{book.category}</span>
            <h3 className="font-display font-bold text-white text-lg leading-tight">{book.title}</h3>
          </div>

          {/* Gold accent bar */}
          <div className="absolute top-4 right-4">
            <div className="w-8 h-px mb-1.5" style={{ background: book.accent }} />
            <div className="w-5 h-px" style={{ background: book.accent + '60' }} />
          </div>

          {/* Hover reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `${book.accent}10`, backdropFilter: 'blur(4px)' }}
          >
            <span className="text-sm font-medium text-white px-4 py-2 rounded-full border border-white/20 bg-black/30">
              Read Preview →
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-ghost text-sm leading-relaxed mb-4">{book.preview}</p>

          {/* Quote or Poem */}
          {book.quote && (
            <div className="rounded-xl p-3 mb-4 relative overflow-hidden"
              style={{ background: `${book.accent}08`, border: `1px solid ${book.accent}20` }}>
              <div className="absolute top-2 left-3 text-4xl font-serif opacity-20" style={{ color: book.accent }}>"</div>
              <p className="font-display italic text-sm text-mist/80 pl-4 relative z-10">{book.quote}</p>
            </div>
          )}

          {book.poem && (
            <div className="rounded-xl p-3 mb-4"
              style={{ background: `${book.accent}08`, border: `1px solid ${book.accent}20` }}>
              <p className="font-mono text-xs mb-1.5" style={{ color: book.accent }}>AI Generated Poem</p>
              <p className="font-display italic text-sm text-mist/80 whitespace-pre-line leading-relaxed">{book.poem}</p>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {book.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{ background: `${book.accent}12`, color: book.accent, border: `1px solid ${book.accent}25` }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-xs text-ghost text-right">
              <div>{book.pages} pages</div>
              <div>{book.chapters} chapters</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function StoryCards() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="examples" className="relative py-28 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-gold/5 blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet/5 blur-[100px]" />
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
            Story Portfolio
            <span className="w-4 h-px bg-gold inline-block" />
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-2 mb-4">
            Every Life Is a{' '}
            <span className="gradient-text">Bestseller</span>
          </h2>
          <p className="text-ghost text-lg max-w-xl mx-auto">
            Real stories. AI-crafted into books that last forever.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {books.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-ghost text-sm">
            These are AI-generated previews. <span className="text-gold">Your story will be unique.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
