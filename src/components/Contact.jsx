import { useState } from 'react'
import emailjs from '@emailjs/browser'

// EmailJS sends the form from the browser, so no backend server is needed.
const SERVICE_ID = 'service_7ccs2yn'
const TEMPLATE_ID = 'template_4vflra6'
const PUBLIC_KEY = 'sL3hWNXyHkxGFQSVl'
const EMAIL = 'alok41n42@gmail.com'

const field = 'w-full rounded-2xl border border-line bg-panel px-6 py-4 text-sm placeholder-dim transition-colors focus:border-signal focus:outline-none'

function Contact() {
  const [open, setOpen] = useState(false)
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
    <section id="contact" className="pt-10">
      <div className="dark-card rounded-t-[2rem] bg-panel text-bone md:rounded-t-[3rem]">
        <div className="mx-auto max-w-5xl px-6 pb-8 pt-16 md:pt-24">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-dim">
            <span className="size-1.5 rounded-full bg-signal" />Open to internships and entry-level roles
          </p>
          <h2 className="mt-5 text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight">
            Got a role or a project in mind?
            <span className="block text-bone/40">Let's talk.</span>
          </h2>
          <p className="mt-6 max-w-md text-dim">I read every message and reply myself.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="contact-form" className="flex items-center gap-3 rounded-full bg-bone py-2 pl-6 pr-2 font-medium text-ink">
              {open ? 'Close form' : 'Send a message'}
              <span className={`grid size-9 place-items-center rounded-full bg-ink text-bone transition-transform duration-300 ${open ? 'rotate-90' : ''}`}>→</span>
            </button>
            <a href="#projects" className="rounded-full border border-line px-6 py-3.5 font-medium transition-colors hover:border-signal">See my projects</a>
          </div>

          <div id="contact-form" className={`grid transition-[grid-template-rows,visibility] duration-500 ${open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'}`}>
            <div className="-m-4 overflow-hidden p-4">
              <div className="neon-border mt-8 max-w-2xl">
              <div className="rounded-[1.65rem] bg-ink p-5 sm:p-8">
              {status === 'sent' ? (
                <div role="status" className="text-lg">
                  Message sent. I will reply to you soon.
                  <button onClick={() => setStatus('idle')} className="mt-3 block text-sm text-dim underline hover:text-signal">Send another message</button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="flex flex-col gap-4">
                  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <input name="name" type="text" placeholder="Your name" aria-label="Your name" className={field} />
                    <input name="email" type="email" placeholder="Your email" aria-label="Your email" className={field} />
                  </div>
                  <textarea name="message" rows={5} placeholder="What would you like to talk about?" aria-label="Message" className={`${field} resize-none`} />
                  {error && <p role="alert" className="text-sm text-signal">{error}</p>}
                  <button type="submit" disabled={status === 'sending'} className="self-start rounded-full bg-signal px-8 py-3.5 font-medium text-ink transition-transform hover:-translate-y-1 disabled:opacity-50">
                    {status === 'sending' ? 'Sending...' : 'Send message'}
                  </button>
                </form>
              )}
              </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-6 text-sm text-dim">
            <span>© 2026 Alok Kumar Gupta</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href={`mailto:${EMAIL}`} className="hover:text-bone">Email</a>
              <a href="https://github.com/lokkcode" target="_blank" rel="noopener noreferrer" className="hover:text-bone">GitHub</a>
              <a href="https://www.linkedin.com/in/alokgpt/" target="_blank" rel="noopener noreferrer" className="hover:text-bone">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact