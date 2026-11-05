import { useEffect, useRef, useState } from 'react'
import ThemeToggle from './Themetoggle'

const links = [
  ['Home', '#hero'],
  ['Skills', '#skills'],
  ['Journey', '#journey'],
  ['Projects', '#projects'],
  ['Contact', '#contact'],
]

function useClock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const tick = () =>
      setT(new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }))
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])
  return t
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const bar = useRef(null)
  const time = useClock()

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [open])

  return (
    <>
      <div ref={bar} className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-signal" style={{ transform: 'scaleX(0)' }} />
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-line bg-ink/70 px-6 py-4 backdrop-blur">
        <a href="#hero" className="text-lg font-bold tracking-tight text-bone" onClick={() => setOpen(false)}>
          Alok Kumar Gupta
        </a>
        <div className="flex items-center gap-4 text-bone sm:gap-6">
          <span className="hidden text-sm sm:block" aria-label="Local time">Greater Noida, {time}</span>
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-expanded={open} className="rounded-full border border-bone/40 px-15 py-2 text-sm font-medium">
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <nav
        aria-label="Main"
        className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-6 transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] md:px-16"
        style={{ clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)', visibility: open ? 'visible' : 'hidden', transitionProperty: 'clip-path, visibility', transitionDelay: open ? '0s' : '0s, .7s' }}
      >
        <ul className="flex flex-col gap-2">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="inline-block font-serif text-6xl italic transition-transform duration-300 hover:translate-x-4 hover:text-signal sm:text-8xl">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-dim">Greater Noida, India. It is {time} here.</p>
      </nav>
    </>
  )
}

export default Navbar