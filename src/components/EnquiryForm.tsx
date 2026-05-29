'use client'

import { useState } from 'react'

type Props = {
  variant?: 'hero' | 'footer'
  className?: string
}

export default function EnquiryForm({ variant = 'footer', className = '' }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: '', service: 'general', message: '' }),
      })
      if (res.ok) {
        setStatus('ok')
        setName('')
        setEmail('')
      } else setStatus('err')
    } catch {
      setStatus('err')
    }
  }

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className={`w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-primary px-2 font-label-caps text-[10px] text-on-primary/60">
            YOUR NAME
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border-b-2 border-on-primary/30 text-on-primary py-4 focus:border-on-primary outline-none transition-all placeholder:text-on-primary/40 font-body-md"
            placeholder="Full Name"
            type="text"
          />
        </div>
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-primary px-2 font-label-caps text-[10px] text-on-primary/60">
            CONTACT EMAIL
          </label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b-2 border-on-primary/30 text-on-primary py-4 focus:border-on-primary outline-none transition-all placeholder:text-on-primary/40 font-body-md"
            placeholder="email@address.com"
            type="email"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-surface text-primary px-8 py-4 font-label-caps text-label-caps tracking-widest hover:bg-secondary hover:text-white transition-all shadow-xl disabled:opacity-60"
        >
          {status === 'loading' ? 'SENDING…' : status === 'ok' ? 'SENT!' : 'ENQUIRE NOW'}
        </button>
      </form>
    )
  }

  return null
}
