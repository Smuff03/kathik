import React, { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    const startVal = 0

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [target, duration, start])

  return count
}

export function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2000, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const count = useCountUp(value, duration, inView)

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export function HeroCounter({ count }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const animated = useCountUp(count, 2500, inView)

  return (
    <div ref={ref} className="flex items-center gap-3 mt-8">
      <div className="flex -space-x-2">
        {['#7c3aed', '#c9a84c', '#3b82f6', '#a855f7'].map((color, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full border-2 border-void flex items-center justify-center text-xs font-bold"
            style={{ background: `${color}33`, borderColor: color }}
          >
            <div className="w-4 h-4 rounded-full" style={{ background: color, opacity: 0.8 }} />
          </div>
        ))}
      </div>
      <div>
        <p className="text-sm text-ghost">
          <span className="gradient-text font-display font-semibold text-base">
            {animated.toLocaleString()}+
          </span>
          {' '}people waiting for KATHIK
        </p>
      </div>
    </div>
  )
}
