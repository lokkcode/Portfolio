function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10"
      style={{ backgroundColor: '#0a0a0a' }}>
      
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Left — Logo */}
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-2xl">✦</span>
          <span className="text-white font-bold text-xl tracking-wide">ALOK KUMAR GUPTA</span>
        </div>

        {/* Center — Nav Links */}
        <ul className="flex gap-10 text-sm font-medium text-gray-400">
          <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
          <li><a href="#skills" className="hover:text-white transition-colors">Skills</a></li>
          <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
          <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
        </ul>

        {/* Right — CTA */}
        <a href="#contact"
          className="text-sm font-medium text-white border border-white/40 px-5 py-2 rounded-full hover:border-white hover:bg-white hover:text-black transition-all duration-300">
          Let's Talk
        </a>

      </div>
    </nav>
  )
}

export default Navbar