import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NichosAuthority from './components/NichosAuthority'
import Hollywood from './components/Hollywood'
import StorySeries from './components/StorySeries'
import SeriesSystem from './components/SeriesSystem'
import ProductionBase from './components/ProductionBase'
import SystemImpact from './components/SystemImpact'
import Planes from './components/Planes'
import MissionTimeline from './components/MissionTimeline'
import Comunidad from './components/Comunidad'
import QuienesSomos from './components/QuienesSomos'
import CTAFinal from './components/CTAFinal'
import CalendlySection from './components/CalendlySection'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function Landing() {
  return (
    <>
      <Hero />
      <NichosAuthority />
      <Hollywood />
      <SeriesSystem />
      <ProductionBase />
      <MissionTimeline />
      <SystemImpact />
      <Planes />
      <CalendlySection />
      <CTAFinal />
      <Footer />
    </>
  )
}

function QuienSoyPage() {
  return (
    <>
      <QuienesSomos />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-bg text-white font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quien-soy" element={<QuienSoyPage />} />
        </Routes>
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  )
}
