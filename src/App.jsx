import React from 'react'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  )
}