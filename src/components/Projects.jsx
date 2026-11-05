import { useEffect, useRef } from 'react'

// Drop screenshots or short videos in src/assets/projects named by slug,
// e.g. hallucicheck.png, cozycorner.webp, simon-says.mp4. Missing files are fine.
const media = import.meta.glob('../assets/projects/*.{png,jpg,jpeg,webp,mp4,webm}', { eager: true, query: '?url', import: 'default' })
const findMedia = (slug) => {
  const key = Object.keys(media).find((p) => p.split('/').pop().startsWith(`${slug}.`))
  return key ? media[key] : null
}
const isVideo = (u) => /\.(mp4|webm)(\?|$)/.test(u)

const projects = [
  { slug: 'hallucicheck', title: 'HalluciCheck', kind: 'AI web app', featured: true, description: 'AI hallucination detection tool with a 3-stage pipeline: claim extraction, web search verification, and an LLM-as-a-Judge verdict. Costs about $0.002 per check against $0.01+ industry standard.', tags: ['React.js', 'Node.js', 'Groq API', 'Tavily API', 'Express.js'], live: 'https://hallucicheck.vercel.app', github: 'https://github.com/lokkcode/Hallucicheck' },
  { slug: 'cozycorner', title: 'CozyCorner', kind: 'Full-stack web app', description: 'Full-stack Airbnb-like platform with RBAC authentication, RESTful APIs, MVC architecture, Cloudinary image uploads, and Mapbox geocoding. Deployed on Render.', tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Passport.js', 'Mapbox'], live: 'https://cozycorner.onrender.com', github: 'https://github.com/lokkcode/CozyCorner' },
  { slug: 'simon-says', title: 'Simon Says Game', kind: 'Browser game', description: 'A memory game inspired by the classic electronic Simon Says. Memorize the color sequence and repeat it.', tags: ['HTML5', 'CSS3', 'JavaScript (Vanilla)'], live: null, github: 'https://github.com/lokkcode/Simon-Says-Game' },
]

// A desktop monitor with a slight tilt that straightens on hover.
function Monitor({ src, title }) {
  return (
    <div className="mx-auto w-full max-w-2xl [perspective:1400px]">
      <div className="transition-transform duration-500 md:[transform:rotateY(7deg)] md:group-hover:[transform:rotateY(0deg)]">
        <div className="rounded-2xl bg-[#0b0b0d] p-2 shadow-2xl ring-1 ring-white/10 md:p-3">
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-ink">
            {src ? (
              isVideo(src)
                ? <video src={src} autoPlay muted loop playsInline className="size-full object-cover object-top" />
                : <img src={src} alt={`${title} screenshot`} loading="lazy" className="size-full object-cover object-top" />
            ) : (
              <div className="glow-card flex size-full items-center justify-center px-4 text-center font-serif text-3xl text-bone/60 md:text-4xl" style={{ '--x': '50%', '--y': '50%' }}>{title}</div>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto h-8 w-20 bg-gradient-to-b from-[#c9c4c1] to-[#8d8987] [clip-path:polygon(15%_0,85%_0,100%_100%,0_100%)] md:h-12 md:w-28" />
      <div className="mx-auto h-2 w-40 rounded-full bg-gradient-to-b from-[#d4cfcc] to-[#8d8987] shadow-[0_16px_28px_rgba(0,0,0,.35)] md:w-56" />
    </div>
  )
}

function Projects() {
  const list = useRef(null)

  // Each card scales down and darkens as the next one slides over it.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = [...list.current.children]
    let raf = 0
    const update = () => {
      raf = 0
      cards.forEach((c, i) => {
        // Stick below the header; a card taller than the screen sticks once its bottom shows.
        c.style.top = `${Math.min(88 + i * 24, innerHeight - c.offsetHeight - 16)}px`
        const next = cards[i + 1]
        if (!next) return
        const r = c.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (r.bottom - next.getBoundingClientRect().top) / r.height))
        c.style.transform = `scale(${1 - p * 0.06})`
        c.lastChild.style.opacity = p * 0.55
      })
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl">Things I have built</h2>
      <p className="mt-4 max-w-md text-dim">Scroll to stack through them.</p>

      <div ref={list} className="mt-10 space-y-[10vh] md:mt-14 lg:space-y-[14vh]">
        {projects.map((p, i) => (
          <article
            key={p.slug}
            className="origin-top overflow-hidden rounded-3xl border border-line bg-panel p-5 shadow-[0_-20px_60px_rgba(60,10,20,.3)] sm:p-8 sticky lg:min-h-[32rem] lg:p-12"
          >
            <div className={`grid items-center gap-8 lg:gap-12 ${i % 2 ? 'lg:grid-cols-[1fr_1.3fr]' : 'lg:grid-cols-[1.3fr_1fr]'}`}>
              <div className={i % 2 ? 'lg:order-2' : ''}><Monitor src={findMedia(p.slug)} title={p.title} /></div>
              <div>
                <p className="text-sm text-dim">{p.kind}{p.featured ? ', featured project' : ''}</p>
                <h3 className="mt-2 font-serif text-4xl md:text-5xl lg:text-6xl">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-bone/75">{p.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-dim">{t}</li>)}
                </ul>
                {findMedia(p.slug) && isVideo(findMedia(p.slug)) && <p className="mt-6 flex items-center gap-2 text-sm text-dim"><span className="size-2 rounded-full bg-signal" />Screen recording of the build</p>}
                <div className="mt-8 flex flex-wrap gap-3">
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="rounded-full bg-signal px-5 py-2 text-sm font-medium text-ink transition-transform hover:-translate-y-1">Open live site</a>}
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-bone/30 px-5 py-2 text-sm font-medium transition-colors hover:border-signal hover:text-signal">View code</a>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects