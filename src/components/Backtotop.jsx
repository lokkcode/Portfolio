import { useEffect, useState } from 'react'

const C = 2 * Math.PI * 20 // ring length

// Appears after the first screen. The ring around the arrow shows how far you have scrolled.
function BackToTop() {
  const [p, setP] = useState(0)

  useEffect(() => {
    const f = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      setP(max > 0 ? Math.min(1, scrollY / max) : 0)
    }
    f()
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])

  const show = p > 0 && scrollY > innerHeight * 0.8

  return (
    <button
      onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full border border-line bg-panel text-bone transition-all duration-300 hover:border-signal hover:text-signal ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--color-signal)" strokeWidth="2" strokeDasharray={C} strokeDashoffset={C * (1 - p)} strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}

export default BackToTop