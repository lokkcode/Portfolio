import { useRef, useEffect } from 'react'

const projects = [
  {
    title: 'HalluciCheck',
    description:
      'AI hallucination detection tool with a 3-stage pipeline — claim extraction, web search verification, and LLM-as-a-Judge verdict. Costs ~$0.002/check vs $0.01+ industry standard.',
    tags: ['React.js', 'Node.js', 'Groq API', 'Tavily API', 'Express.js'],
    live: 'https://hallucicheck.vercel.app',
    github: 'https://github.com/lokkcode/Hallucicheck',
    featured: true,
  },
  {
    title: 'CozyCorner',
    description:
      'Full-stack Airbnb-like platform with RBAC authentication, RESTful APIs, MVC architecture, Cloudinary image uploads, and Mapbox geocoding. Deployed on Render.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Passport.js', 'Mapbox'],
    live: 'https://cozycorner.onrender.com',
    github: 'https://github.com/lokkcode/CozyCorner',
    featured: false,
  },
  {
    title: 'Simon Says Game',
    description:
      'A fun and interactive memory-based game built with web technologies, inspired by the classic Simon Says electronic game. The objective is to memorize and repeat the correct sequence of colors.',
    tags: ['HTML5', 'CSS3', 'JavaScript (Vanilla)'],
    live: null,
    github: 'https://github.com/lokkcode/Simon-Says-Game',
    featured: false,
  },
]

// Duplicate cards for seamless infinite loop
const doubled = [...projects, ...projects]

function ProjectCard({ project }) {
  return (
    <div
      className="flex-shrink-0 w-96 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-red/30 transition-all duration-500"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Top */}
      <div>
        {project.featured && (
          <span className="text-xs tracking-widest uppercase text-gray-500 border border-white/10 px-3 py-1 rounded-full mb-6 inline-block">
            Featured
          </span>
        )}
        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 border border-white/10 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom links */}
      <div className="flex gap-3">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full text-sm font-medium text-black bg-white hover:bg-transparent hover:text-white border border-white transition-all duration-300"
          >
            Live ↗
          </a>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-full text-sm font-medium text-white border border-white/20 hover:border-white transition-all duration-300"
        >
          GitHub
        </a>
      </div>
    </div>
  )
}

function Projects() {
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const speed = 0.5 // px per frame — lower = slower

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += speed

        // Reset when first half scrolled — creates seamless loop
        const halfWidth = track.scrollWidth / 2
        if (posRef.current >= halfWidth) {
          posRef.current = 0
        }

        track.style.transform = `translateX(-${posRef.current}px)`
      }
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <section
      id="projects"
      className="w-full py-28 overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">What I've built</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">Projects</h2>
      </div>

        <div className="max-w-5xl mx-auto px-6">
            {/* Carousel */}
            <div
                className="relative overflow-hidden"
                onMouseEnter={() => (pausedRef.current = true)}
                onMouseLeave={() => (pausedRef.current = false)}
            >

        
      
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }}
        />

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-6 w-max px-6 pb-4"
        >
          {doubled.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </div>

    </section>
  )
}

export default Projects