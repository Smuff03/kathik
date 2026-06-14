import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import StoryCards from '../components/StoryCards.jsx'
import Demo from '../components/Demo.jsx'
import WhyKathik from '../components/WhyKathik.jsx'
import Validation from '../components/Validation.jsx'
import EarlyAccess from '../components/EarlyAccess.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <div
      className="min-h-screen noise relative"
      style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-mist)' }}
    >
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <StoryCards />
        <Demo />
        <WhyKathik />
        <Validation />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  )
}