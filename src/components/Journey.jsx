import { useEffect, useRef, useState } from 'react'

const steps = [
  { year: '2027', when: 'Final year, until Jul 2027', title: 'B.Tech, Artificial Intelligence', org: 'Noida Institute of Engineering and Technology, Greater Noida', points: ['Technical Head of Khushiyan Batoon Club.'] },
  { year: '2026', when: 'Mar — May 2026', title: 'Web Developer Intern (MERN)', org: 'Daarsoft Technology FZC LLC, Dubai (remote)', points: ['Worked on the React.js frontend and the Node.js, Express.js and MongoDB backend, including API integration and debugging.', 'Built the /contact page, which sends form data to the backend over a REST API, and the /blog page, which shows posts from an API as cards.'] },
  { year: '2026', when: '2026-certificate', title: 'MERN Stack', org: 'Apna College, Sigma 8.0', points: [] },
  { year: '2025', when: 'Jul — Sep 2025', title: 'Product Design Intern', org: 'Lucous Perfumes', points: ['Designed the logo and packaging for three product lines using Canva and AI tools.'] },
  { year: '2025', when: '2025', title: 'ReactJS certification', org: 'Infosys Springboard', points: [] },
  { year: '2024', when: 'Aug — Sep 2024', title: 'Web Development Intern', org: 'CodSoft', points: [] },
]

// Each digit is a column of 0-9 that slides to the right number.
function Odometer({ value }) {
  return (
    <div role="img" aria-label={value} className="flex text-[clamp(4rem,17vw,12rem)] font-extrabold leading-none tabular-nums">
      {value.split('').map((d, i) => (
        <span key={i} aria-hidden="true" className="block h-[1em] overflow-hidden">
          <span className="flex flex-col transition-transform duration-[900ms] ease-[cubic-bezier(.7,0,.2,1)]" style={{ transform: `translateY(${-Number(d)}em)` }}>
            {Array.from({ length: 10 }, (_, n) => <span key={n} className="block h-[1em]">{n}</span>)}
          </span>
        </span>
      ))}
    </div>
  )
}

function Journey() {
  const [active, setActive] = useState(0)
  const [dotTop, setDotTop] = useState(12)
  const items = useRef([])

  useEffect(() => {
    const pick = () => {
      const mid = innerHeight * 0.45
      let best = 0, dist = Infinity
      items.current.forEach((el, i) => {
        const d = Math.abs(el.getBoundingClientRect().top + 40 - mid)
        if (d < dist) { dist = d; best = i }
      })
      setActive(best)
    }
    pick()
    addEventListener('scroll', pick, { passive: true })
    return () => removeEventListener('scroll', pick)
  }, [])

  useEffect(() => { setDotTop(items.current[active].offsetTop + 12) }, [active])

  const s = steps[active]
  const n = String(active + 1).padStart(2, '0')

  return (
    <section id="journey" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="md:grid md:grid-cols-2 md:gap-16">
        <div className="sticky top-[5.5rem] z-10 -mx-6 border-b border-line bg-ink/90 px-6 py-3 backdrop-blur md:top-32 md:z-0 md:mx-0 md:self-start md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
          <svg viewBox="0 0 400 400" aria-hidden="true" className="pointer-events-none absolute max-md:hidden -left-24 top-1/2 w-[34rem] max-w-none text-bone/10 transition-transform duration-1000" style={{ transform: `translateY(-50%) rotate(${active * 40}deg)` }}>
            <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="2 22" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="1 9" />
            <circle cx="200" cy="200" r="110" fill="none" stroke="currentColor" />
          </svg>
          <div className="relative">
            <p className="flex items-center gap-2 text-sm text-dim"><span className="size-1.5 rounded-full bg-signal" />My story</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight max-md:sr-only md:text-5xl">Let's go back in time.</h2>
            <div className="mt-1 md:mt-6"><Odometer value={s.year} /></div>
            <p key={s.when} className="mt-2 font-mono text-xs uppercase tracking-widest md:mt-6">{s.when}</p>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="font-bold">{n}</span>
              <span className="text-dim">/ {String(steps.length).padStart(2, '0')}</span>
              <span className="h-px w-40 bg-line"><span className="block h-px bg-signal transition-[width] duration-700" style={{ width: `${((active + 1) / steps.length) * 100}%` }} /></span>
            </div>
          </div>
        </div>

        <ol className="relative mt-8 pl-10 md:mt-0">
          <span className="absolute left-0 top-0 h-full w-px bg-line" />
          <span className="absolute left-0 top-0 w-px bg-signal transition-[height] duration-700" style={{ height: dotTop }} />
          <span className="absolute -left-[7px] size-[15px] rounded-full bg-signal ring-4 ring-signal/20 transition-[top] duration-700" style={{ top: dotTop - 7 }} />
          {steps.map((t, i) => (
            <li key={t.title} ref={(el) => (items.current[i] = el)} className={`pb-20 transition-opacity duration-500 last:pb-[10vh] md:pb-40 md:last:pb-[30vh] ${i === active ? 'opacity-100' : 'opacity-35'}`}>
              <p className="font-mono text-xs uppercase tracking-widest text-dim">{t.when}</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{t.title}</h3>
              <p className="mt-1 text-lg">{t.org}</p>
              {t.points.length > 0 && (
                <ul className="mt-5 max-w-lg space-y-3">
                  {t.points.map((p) => <li key={p} className="flex gap-3 text-bone/80"><span className="text-dim">–</span>{p}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Journey