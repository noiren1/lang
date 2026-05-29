import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import FadeIn from './FadeIn'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <p className="text-accent font-semibold text-sm uppercase tracking-widest text-center mb-3">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-4 text-gray-900 dark:text-white">
            Let's Work Together
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            Have a project in mind? I'd love to hear about it. Send me a message
            and I'll get back to you within 24 hours.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          {sent ? (
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Thanks for reaching out. I'll be in touch soon.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                className="mt-6 text-accent hover:text-accent-hover font-medium transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-accent dark:focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-accent dark:focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-accent dark:focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-gray-600"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5"
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  )
}
