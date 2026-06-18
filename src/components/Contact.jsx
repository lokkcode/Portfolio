import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
//using emailjs so that allows the viewer to send email and msg from the client side without building the backend server
const SERVICE_ID = 'service_7ccs2yn'
const TEMPLATE_ID = 'template_4vflra6'
const PUBLIC_KEY = 'sL3hWNXyHkxGFQSVl'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // it stops the browser from executing its built-in default action that it defaultly doos
    setLoading(true)
    setError(null)

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      )
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please email me directly at alok41n42@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="w-full py-28"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Top label */}

        {/* Heading */}
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Let's{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white font-serif italic pr-2" >
            Connect
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 font-light leading-relaxed mb-16 max-w-xl">
          Whether you have a project in mind, an internship opportunity,
          or just want to talk tech — my inbox is always open.
          Let's build something great together.
        </p>

        {/* Form */}
        {submitted ? (
          <div className="text-white text-lg font-light border border-white/10 rounded-2xl px-12 py-10 w-full">
            ✦ Thanks! I'll get back to you soon.
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all duration-300"
                style={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all duration-300"
                style={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-2xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all duration-300 resize-none"
              style={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
            />

            {error && (
              <p className="text-sm text-center" style={{ color: '#ff6b6b' }}>{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mx-auto mt-4 px-12 py-4 rounded-full text-sm font-medium tracking-widest uppercase flex items-center gap-3 transition-all duration-300 disabled:opacity-50"
              style={{
                backgroundColor: '#111111',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#ff6b6b'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
            >
              {loading ? 'Sending...' : 'Transmit Message'}
              <span style={{ color: '#ff6b6b' }}>✈</span>
            </button>

          </div>
        )}

        {/* Social links */}
        <div className="flex flex-col md:flex-row gap-6 mt-20 text-sm text-gray-500">
          <a href="mailto:alok41n42@gmail.com" className="hover:text-white transition-colors duration-300">
            alok41n42@gmail.com
          </a>
          <span className="hidden md:block text-gray-700">·</span>
          <a href="https://github.com/lokkcode" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            github.com/lokkcode
          </a>
          <span className="hidden md:block text-gray-700">·</span>
          <a href="https://www.linkedin.com/in/alokgpt/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            LinkedIn
          </a>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 mt-16 pt-8 w-full flex flex-col items-center gap-2">
          <span className="text-gray-600 text-xs tracking-widest uppercase">Alok Kumar Gupta © 2026</span>
          
        </div>

      </div>
    </section>
  )
}

export default Contact