import { useState } from 'react'
import emailjs from '@emailjs/browser'

// EmailJS sends the form from the browser, so no backend server is needed.
const SERVICE_ID = 'service_7ccs2yn'
const TEMPLATE_ID = 'template_4vflra6'
const PUBLIC_KEY = 'sL3hWNXyHkxGFQSVl'
const EMAIL = 'alok41n42@gmail.com'

const field = 'w-full rounded-2xl border border-line bg-panel px-6 py-4 text-sm placeholder-dim transition-colors focus:border-signal focus:outline-none'

function Contact() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('website')) return // honeypot: bots fill this hidden field
    const name = f.get('name').trim()
    const email = f.get('email').trim()
    const message = f.get('message').trim()
    if (!name || !message) return setError('Please add your name and a message.')
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Please enter a valid email address.')

    setError('')
    setStatus('sending')
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { from_name: name, from_email: email, message }, PUBLIC_KEY)
      setStatus('sent')
    } catch {
      setStatus('idle')
      setError(`The message did not send. Please email me directly at ${EMAIL}.`)
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 pb-12 pt-28">
      <h2 className="font-serif text-5xl md:text-7xl">Got a role or a project in mind?</h2>
      <p className="mt-4 max-w-md text-dim">I read every message and reply myself.</p>

      {status === 'sent' ? (
        <div role="status" className="mt-12 rounded-3xl border border-signal p-10 text-lg">
          Message sent. I will reply to you soon.
          <button onClick={() => setStatus('idle')} className="mt-4 block text-sm text-dim underline hover:text-signal">Send another message</button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="mt-12 flex flex-col gap-4">
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" type="text" placeholder="Your name" aria-label="Your name" className={field} />
            <input name="email" type="email" placeholder="Your email" aria-label="Your email" className={field} />
          </div>
          <textarea name="message" rows={6} placeholder="What would you like to talk about?" aria-label="Message" className={`${field} resize-none`} />
          {error && <p role="alert" className="text-sm text-signal">{error}</p>}
          <button type="submit" disabled={status === 'sending'} className="self-start rounded-full bg-signal px-10 py-4 font-medium text-ink transition-transform hover:-translate-y-1 disabled:opacity-50">
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>
        </form>
      )}

      <div className="mt-20 flex flex-wrap gap-x-8 gap-y-3 text-dim">
        <a href={`mailto:${EMAIL}`} className="hover:text-signal">{EMAIL}</a>
        <a href="https://github.com/lokkcode" target="_blank" rel="noopener noreferrer" className="hover:text-signal">GitHub</a>
        <a href="https://www.linkedin.com/in/alokgpt/" target="_blank" rel="noopener noreferrer" className="hover:text-signal">LinkedIn</a>
      </div>
      <p className="mt-16 border-t border-line pt-6 text-sm text-dim">Alok Kumar Gupta, 2026. Built with React, Vite and Tailwind CSS.</p>
    </section>
  )
}

export default Contact