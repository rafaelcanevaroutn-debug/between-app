import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ElProblema from './components/ElProblema'
import ComoFuncionaV2 from './components/ComoFuncionaV2'
import ParaQuienEs from './components/ParaQuienEs'
import EcosystemNodes from './components/EcosystemNodes'
import PredictiveDashboard from './components/PredictiveDashboard'
import QuienesSomos from './components/QuienesSomos'
import CTAFinal from './components/CTAFinal'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Terms from './components/Terms'
import Policy from './components/Policy'

function Landing() {
  return (
    <>
      <Hero />
      <ElProblema />
      <ComoFuncionaV2 />
      <ParaQuienEs />
      <EcosystemNodes />
      <PredictiveDashboard />
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
          <Route path="/terms" element={<Terms />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  )
}
