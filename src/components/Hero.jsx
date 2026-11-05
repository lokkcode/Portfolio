import { useEffect, useRef, useState } from 'react'
import cutout from '../assets/alok.png'

// Titles that flip on the card. Edit this list to change them.
const roles = ['Full-Stack Developer', 'AI Builder', 'MERN Developer']

function Hero() {
  const ref = useRef(null)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2800)
    return () => clearInterval(id)
  }, [])

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  return (
    <section id="hero" ref={ref} onMouseMove={move} className="relative flex min-h-screen flex-col overflow-hidden pt-28">
      <div className="glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 lg:flex-row lg:items-center">
        <div className="relative z-10 pb-10 lg:w-3/5 lg:pb-24">
          <p className="flex items-center gap-2 text-sm text-dim animate-fadein">
            <span className="size-1.5 rounded-full bg-signal" />Open to internships and entry-level roles
          </p>
          <h1 className="mt-4 animate-fadein text-[clamp(3rem,8.5vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight">Hi, I'm Alok.</h1>
          <p className="animate-fadein-delay text-[clamp(2rem,5vw,4rem)] font-bold leading-tight text-bone/40">I am a</p>

          <div className="animate-fadein-delay relative mt-4 inline-block max-w-full -rotate-2 [perspective:900px]">
            <div className="absolute inset-x-3 -bottom-2 top-3 rounded-2xl bg-black/60" />
            <div className="absolute inset-x-1 -bottom-1 top-2 rounded-2xl bg-[#d9d0c8]" />
            <div className="relative rounded-2xl bg-[#f3ece6] px-5 pb-6 pt-8 text-[#14080b] shadow-xl sm:px-7">
              <div className="absolute inset-x-4 -top-2 flex justify-between" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => <span key={i} className="h-4 w-1.5 rounded-full border-2 border-[#8d8987] bg-[#c9c4c1]" />)}
              </div>
              <span className="sr-only">{roles.join(', ')}</span>
              <span className="grid text-[clamp(1.75rem,4.6vw,3.75rem)] font-extrabold leading-none tracking-tight" aria-hidden="true">
                {roles.map((r, i) => (
                  <span key={`${r}-${i === idx}`} className={`col-start-1 row-start-1 whitespace-nowrap ${i === idx ? 'flip-in' : 'invisible'}`}>{r}</span>
                ))}
              </span>
              <span className="absolute bottom-1.5 right-4 text-[10px] tracking-widest text-[#14080b]/40">
                {String(idx + 1).padStart(2, '0')} / {String(roles.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="animate-fadein-delay mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="flex items-center gap-3 rounded-full bg-signal py-2 pl-6 pr-2 font-medium text-ink transition-transform hover:-translate-y-1">
              See my projects <span className="grid size-9 place-items-center rounded-full bg-ink text-bone">→</span>
            </a>
            <a href="#contact" className="rounded-full border border-bone/30 px-6 py-3.5 font-medium transition-colors hover:border-signal hover:text-signal">Send a message</a>
          </div>
        </div>

        <div className="relative mx-auto mt-auto w-72 sm:w-96 lg:absolute lg:bottom-0 lg:right-0 lg:mx-0 lg:w-[44%]">
          <div className="absolute inset-x-6 bottom-0 top-1/4 rounded-full bg-signal/20 blur-3xl" aria-hidden="true" />
          <img src={cutout} alt="Alok Kumar Gupta" className="relative block w-full select-none" />
          <span className="absolute bottom-8 left-0 rounded-full border border-line bg-panel/90 px-4 py-2 text-sm backdrop-blur">Based in Greater Noida</span>
        </div>
      </div>

      <div className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-5 text-xs uppercase tracking-wide text-dim">
          <span>Available for work</span>
          <span className="hidden sm:inline">Greater Noida, India</span>
          <a href="#skills" className="hover:text-bone">Scroll to explore ↓</a>
        </div>
      </div>
    </section>
  )
}

export default Hero