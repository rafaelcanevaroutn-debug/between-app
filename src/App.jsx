import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Nichos from './components/Nichos'
import Hollywood from './components/Hollywood'
import ElSet from './components/ElSet'
import ExperimentoEnVivo from './components/ExperimentoEnVivo'
import Simulador from './components/Simulador'
import BetweenGrowth from './components/BetweenGrowth'
import Planes from './components/Planes'
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
      <Nichos />
      <Simulador />
      <Hollywood />
      <ElSet />
      <ExperimentoEnVivo />
      <BetweenGrowth />
      <Planes />
      <Comunidad />
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
