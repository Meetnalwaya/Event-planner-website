'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Heritage Wedding',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok) setForm({ name: '', email: '', phone: '', service: 'Heritage Wedding', message: '' })
    } catch {
      setStatus('err')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">
      {[
        { key: 'name', label: 'FULL NAME', type: 'text' },
        { key: 'email', label: 'EMAIL', type: 'email' },
        { key: 'phone', label: 'PHONE', type: 'tel' },
      ].map((f) => (
        <div key={f.key} className="relative">
          <label className="font-label-caps text-[10px] text-primary mb-2 block tracking-widest">{f.label}</label>
          <input
            required={f.key !== 'phone'}
            type={f.type}
            value={form[f.key as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            className="w-full bg-transparent border-b-2 border-outline-variant text-on-surface py-4 focus:border-primary outline-none font-body-md"
          />
        </div>
      ))}
      <div>
        <label className="font-label-caps text-[10px] text-primary mb-2 block tracking-widest">SERVICE</label>
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full bg-transparent border-b-2 border-outline-variant text-on-surface py-4 focus:border-primary outline-none font-body-md"
        >
          {['Heritage Wedding', 'Corporate Gala', 'Bespoke Concierge', 'Event Production'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="font-label-caps text-[10px] text-primary mb-2 block tracking-widest">MESSAGE</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-transparent border-2 border-outline-variant text-on-surface p-4 focus:border-primary outline-none font-body-md"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-primary text-on-primary font-label-caps text-label-caps px-10 py-4 tracking-widest hover:bg-secondary transition-all disabled:opacity-60"
      >
        {status === 'loading' ? 'SENDING…' : status === 'ok' ? 'MESSAGE SENT' : 'SUBMIT ENQUIRY'}
      </button>
      {status === 'err' && <p className="text-error font-body-md">Something went wrong. Please try again.</p>}
    </form>
  )
}
