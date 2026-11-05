import { useEffect, useRef, useState } from 'react'

// Same skills as before, shown as a periodic table: one row per category.
const rows = [
  { title: 'Frontend', color: 'var(--c-front)', skills: [['Re', 'React.js'], ['Js', 'JavaScript'], ['Ht', 'HTML'], ['Cs', 'CSS'], ['Tw', 'Tailwind CSS'], ['Vi', 'Vite']] },
  { title: 'Backend', color: 'var(--c-back)', skills: [['No', 'Node.js'], ['Ex', 'Express.js'], ['Mo', 'MongoDB'], ['Ra', 'REST APIs'], ['Pp', 'Passport.js']] },
  { title: 'AI & APIs', color: 'var(--c-ai)', skills: [['Gq', 'Groq API'], ['Tv', 'Tavily API'], ['Pe', 'Prompt Engineering']] },
  { title: 'Tools & Others', color: 'var(--c-tools)', skills: [['Gi', 'Git'], ['Gh', 'GitHub'], ['Ve', 'Vercel'], ['Rn', 'Render'], ['Cl', 'Cloudinary'], ['Mb', 'Mapbox'], ['Cv', 'Canva'], ['Py', 'Python'], ['Jv', 'Java']] },
]

function Skills() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  const [focus, setFocus] = useState(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  let n = 0
  return (
    <section id="skills" ref={ref} className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl">My stack, element by element</h2>
      <p className="mt-4 max-w-md text-dim">Hover or tap a category to light it up.</p>

      <div className="mt-14 space-y-10">
        {rows.map((r, ri) => (
          <div
            key={r.title}
            onMouseEnter={() => setFocus(ri)}
            onMouseLeave={() => setFocus(null)}
            onClick={() => setFocus(focus === ri ? null : ri)}
            className="grid gap-4 transition-opacity duration-300 md:grid-cols-[11rem_1fr] md:items-center"
            style={{ opacity: focus === null || focus === ri ? 1 : 0.25 }}
          >
            <h3 className="font-serif text-3xl italic" style={{ color: r.color }}>{r.title}</h3>
            <ul className="flex flex-wrap gap-2.5 sm:gap-3">
              {r.skills.map(([sym, name]) => {
                const i = n++
                return (
                  <li
                    key={name}
                    style={{ opacity: seen ? 1 : 0, transform: seen ? 'perspective(600px) rotateY(0)' : 'perspective(600px) rotateY(90deg) scale(.8)', transition: `opacity .6s ${i * 50}ms, transform .7s cubic-bezier(.2,.8,.2,1) ${i * 50}ms` }}
                  >
                    <div className="flex size-[5.5rem] flex-col justify-between rounded-lg border bg-panel p-2 transition-transform duration-300 hover:-translate-y-1.5 sm:size-28 sm:p-2.5 lg:size-32" style={{ borderColor: `color-mix(in srgb, ${r.color} 40%, transparent)` }}>
                      <span className="text-xs text-dim">{i + 1}</span>
                      <span className="font-serif text-3xl leading-none sm:text-4xl" style={{ color: r.color }}>{sym}</span>
                      <span className="text-xs leading-tight sm:text-[13px]">{name}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills