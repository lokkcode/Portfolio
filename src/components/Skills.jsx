import { useEffect, useRef } from 'react'

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'],
    delay: '0s'
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Passport.js'],
    delay: '0.15s'
  },
  {
    title: 'AI & APIs',
    skills: ['Groq API', 'Tavily API', 'Prompt Engineering'],
    delay: '0.3s'
  },
  {
    title: 'Tools & Others',
    skills: ['Git', 'GitHub', 'Vercel', 'Render', 'Cloudinary', 'Mapbox', 'Canva', 'Python', 'Java'],
    delay: '0.45s'
  },
]

function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class to all category cards
            const cards = sectionRef.current.querySelectorAll('.skill-card')
            cards.forEach((card) => {
              card.classList.add('skill-card-visible')
            })
            // Stop observing once triggered
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 } // fires when 20% of section is visible
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full py-8"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="max-w-5xl mx-auto px-6">

        <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">What I work with</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-card"
              style={{ animationDelay: category.delay }}
            >
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-4 border-b border-white/10 pb-3">
                {category.title}
              </p>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm text-gray-300 border border-white/10 rounded-full hover:border-white/40 hover:text-white transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Skills