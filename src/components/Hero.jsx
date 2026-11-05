import { useEffect, useRef, useState } from 'react'
import alokImg from '../assets/aloknew.png'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>'
const scramble = (text, keep = 0) =>
  text.split('').map((c, i) => (c === ' ' || c === '&' || i < keep ? c : CHARS[Math.floor(Math.random() * CHARS.length)])).join('')

// The one orchestrated moment: each line decodes from noise into real text.
function Decode({ text, delay = 0 }) {
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const [out, setOut] = useState(() => (reduce ? text : scramble(text)))

  useEffect(() => {
    if (reduce) return
    let frame = 0
    let id
    const steps = 24
    const start = setTimeout(() => {
      id = setInterval(() => {
        frame++
        setOut(frame >= steps ? text : scramble(text, Math.floor((text.length * frame) / steps)))
        if (frame >= steps) clearInterval(id)
      }, 40)
    }, delay)
    return () => { clearTimeout(start); clearInterval(id) }
  }, [text, delay, reduce])

  return <span aria-hidden="true">{out}</span>
}

function Hero() {
  const ref = useRef(null)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  return (
    <section id="hero" ref={ref} onMouseMove={move} className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28">
      <div className="glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-start justify-between gap-12 md:flex-row md:items-end">
        <div>
          <h1 aria-label="Full-Stack Developer & AI Builder" className="text-[clamp(3rem,9.5vw,8rem)] font-extrabold leading-[0.92] tracking-tight">
            <span className="block"><Decode text="Full-Stack" /></span>
            <span className="block"><Decode text="Developer" delay={200} /></span>
            <span className="block"><Decode text="& AI Builder" delay={400} /></span>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-dim">
            I build AI-powered web apps, from the model call to the interface. Open to internships and entry-level roles.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="rounded-full bg-signal px-7 py-3 font-medium text-ink transition-transform hover:-translate-y-1">See my projects</a>
            <a href="#contact" className="rounded-full border border-bone/30 px-7 py-3 font-medium transition-colors hover:border-signal hover:text-signal">Send a message</a>
          </div>
        </div>

        <div className="relative w-56 shrink-0 sm:w-64 md:w-80">
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full border border-signal" />
          <img src={alokImg} alt="Alok Kumar Gupta" className="relative aspect-[4/5] w-full rounded-t-full object-cover object-top" />
        </div>
      </div>
    </section>
  )
}

export default Hero