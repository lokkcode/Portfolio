import alokImg from '../assets/aloknew.png'

function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-start overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Subtle radial glow in background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col gap-10 pb-24 pt-8">

      {/* Top row — Text + Photo */}
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-10">

      {/* Left — Text */}
      <div className="flex-1 animate-fadein">
        <p className="text-xl tracking-widest uppercase text-gray-500 mb-1">
          Hey, I'm Alok
        </p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
          Full-Stack<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white italic font-light text-gray-400">Developer</span><br />
        & AI Builder
        </h1>
      </div>

      {/* Right — Photo */}
      <div className="animate-fadein-delay flex items-start justify-end">
        <img
          src={alokImg}
          alt="Alok Kumar Gupta"
          className="w-80 h-80 rounded-full object-cover object-top"
        />
      </div>

      </div>

  {/* Bottom — Tagline + Buttons centered */}
  <div className="flex flex-col items-center text-center gap-6 mt-16 animate-fadein-delay">
    <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl">
      Building AI-powered web applications —
      bridging intelligent systems with
      seamless user experiences.
    </p>
    <div className="flex gap-4">
      <a href="#projects"
        className="px-6 py-3 rounded-full text-sm font-medium text-white border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300">
        View Projects
      </a>
      <a href="#contact"
        className="px-6 py-3 rounded-full text-sm font-medium text-black bg-white hover:bg-transparent hover:text-white border border-white transition-all duration-300">
        Let's Talk
      </a>
    </div>
  </div>

</div>
    </section>
    
  )
}

export default Hero