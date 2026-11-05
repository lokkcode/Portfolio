import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { flushSync } from 'react-dom'

const root = document.documentElement

// A small vertical sky window. The moon sinks below the horizon and the sun rises above it,
// while sunrise or sunset light sweeps across the whole page.
function ThemeToggle() {
  const [theme, setTheme] = useState(root.dataset.theme || 'dark')
  const band = useRef(null)
  const dark = theme === 'dark'

  const apply = (t) => {
    root.dataset.theme = t
    try { localStorage.setItem('theme', t) } catch { /* private mode: skip saving */ }
    setTheme(t)
  }

  const flip = () => {
    const next = dark ? 'light' : 'dark'
    const rising = next === 'light'
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return apply(next)
    if (!document.startViewTransition) {
      root.classList.add('fade')
      setTimeout(() => root.classList.remove('fade'), 450)
      return apply(next)
    }
    const vh = innerHeight
    const half = vh * 0.15
    const opts = { duration: 1000, easing: 'ease-in-out' }
    document.startViewTransition(() => flushSync(() => apply(next))).ready.then(() => {
      root.animate(
        { clipPath: rising ? ['inset(100% 0 0 0)', 'inset(0 0 0 0)'] : ['inset(0 0 100% 0)', 'inset(0 0 0 0)'] },
        { ...opts, pseudoElement: '::view-transition-new(root)' }
      )
      band.current.animate(
        { transform: rising ? [`translateY(${vh - half}px)`, `translateY(${-half}px)`] : [`translateY(${-half}px)`, `translateY(${vh - half}px)`], opacity: [0, 1, 1, 0] },
        opts
      )
    })
  }

  const fade = 'transition-opacity duration-700'

  return (
    <>
      {createPortal(<div ref={band} className="horizon-band" aria-hidden="true" />, document.body)}
      <button
        onClick={flip}
        aria-label={dark ? 'Switch to day mode' : 'Switch to night mode'}
        aria-pressed={!dark}
        className="relative h-14 w-10 shrink-0 overflow-hidden rounded-full border border-signal"
        style={{ background: dark ? 'linear-gradient(#14080b, #3a1520)' : 'linear-gradient(#ffd9c7, #ffb3a0)', transition: 'background 1s' }}
      >
        <span className={`${fade} absolute left-2 top-2 size-0.5 rounded-full bg-bone`} style={{ opacity: dark ? 1 : 0 }} />
        <span className={`${fade} absolute right-2 top-4 size-0.5 rounded-full bg-bone`} style={{ opacity: dark ? 1 : 0 }} />
        <span className={`${fade} absolute left-1 top-2 h-1.5 w-4 rounded-full bg-white/80`} style={{ opacity: dark ? 0 : 1 }} />
        <span
          className="absolute left-[9px] size-5 rounded-full transition-[top,box-shadow] duration-1000 ease-in-out"
          style={{ top: dark ? 13 : 40, boxShadow: 'inset -5px -2px 0 0 #f3ece6' }}
        />
        <span
          className="absolute left-[9px] size-5 rounded-full bg-[#ffd166] transition-[top] duration-1000 ease-in-out"
          style={{ top: dark ? 40 : 13, boxShadow: '0 0 10px 3px rgba(255,170,70,.7)' }}
        />
        <span
          className="absolute inset-x-0 bottom-0 h-4 border-t border-signal"
          style={{ background: dark ? '#0d0508' : '#e8a08f', transition: 'background 1s' }}
        />
      </button>
    </>
  )
}

export default ThemeToggle