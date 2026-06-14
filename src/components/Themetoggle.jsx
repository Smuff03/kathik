import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../App.jsx'

export default function ThemeToggle({ className = '' }) {
    const { theme, toggle } = useTheme()
    const isDark = theme === 'dark'

    return (
        <motion.button
            onClick={toggle}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            whileTap={{ scale: 0.92 }}
            className={`relative w-14 h-7 rounded-full p-0.5 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet ${className}`}
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, #3b1f6b, #7c3aed)'
                    : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                boxShadow: isDark
                    ? '0 0 16px rgba(124,58,237,0.4)'
                    : '0 0 16px rgba(251,191,36,0.4)',
            }}
        >
            {/* Track */}
            <div className="relative w-full h-full">
                {/* Thumb */}
                <motion.div
                    layout
                    animate={{ x: isDark ? 0 : 28 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute top-0 left-0 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                    style={{ background: isDark ? '#1a0a3e' : '#fff' }}
                >
                    <AnimatePresence mode="wait">
                        {isDark ? (
                            <motion.span
                                key="moon"
                                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                                className="text-xs leading-none"
                            >
                                🌙
                            </motion.span>
                        ) : (
                            <motion.span
                                key="sun"
                                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                                className="text-xs leading-none"
                            >
                                ☀️
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.button>
    )
}