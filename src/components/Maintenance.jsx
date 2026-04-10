import React from 'react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-bg relative overflow-hidden flex flex-col items-center justify-center font-sans">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Main Content Card */}
      <div className="relative z-10 max-w-2xl w-full px-6 text-center animate-fade-in">
        {/* Glow Effect Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan/10 blur-[100px] rounded-full animate-siriPulse opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple/10 blur-[80px] rounded-full animate-glowPulse opacity-40" />

        <div className="bg-card border border-border p-12 rounded-3xl relative overflow-hidden group hover:border-cyan/30 transition-all duration-500 shadow-2xl">
          {/* Top Gradient Border */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan via-purple to-green" />

          {/* Logo Placeholder / Brand Name */}
          <div className="mb-8">
             <h2 className="text-4xl md:text-5xl font-heading tracking-wider mb-2">BETWEEN</h2>
             <div className="h-1 w-20 mx-auto bg-gradient-to-r from-cyan to-green rounded-full" />
          </div>

          <h1 className="text-5xl md:text-7xl font-heading text-white mb-6 tracking-tight leading-none uppercase">
            Página en <span className="gradient-text">Preparación</span>
          </h1>
          
          <p className="text-gray text-lg md:text-xl leading-relaxed max-w-lg mx-auto mb-10">
            Estamos trabajando en una nueva experiencia diseñada para potenciar tu crecimiento. 
            Volveremos a estar disponibles el <span className="text-white font-semibold">próximo lunes</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/yourwhatsapplink" 
              className="px-8 py-3 btn-gradient rounded-full text-white font-bold tracking-wide uppercase text-sm shadow-lg hover:shadow-cyan/30 flex items-center gap-2"
            >
              Contactar por WhatsApp
            </a>
            <div className="text-gray/50 text-sm font-medium">
              #BETWEENEXPERIENCE
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-gray/40 text-xs tracking-widest uppercase animate-pulse">
            Potenciando el ecosistema digital
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-green/5 blur-[120px] rounded-full" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple/5 blur-[120px] rounded-full" />
    </div>
  );
};

export default Maintenance;
