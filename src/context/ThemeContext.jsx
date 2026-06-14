import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('kathik-theme') || 'dark'
        }
        return 'dark'
    })

    useEffect(() => {
        const root = document.documentElement
        if (theme === 'light') {
            root.classList.add('light')
            root.classList.remove('dark')
        } else {
            root.classList.add('dark')
            root.classList.remove('light')
        }
        localStorage.setItem('kathik-theme', theme)
    }, [theme])

    const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}

//this is the updated code