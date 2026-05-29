'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Testimonial } from '@/types'

export default function TestimonialForm({ initial }: { initial?: Partial<Testimonial> }) {
  const router = useRouter()
  const [form, setForm] = useState({
    client_name: initial?.client_name || '',
    event_type: initial?.event_type || '',
    rating: initial?.rating ?? 5,
    content: initial?.content || '',
    featured: initial?.featured ?? false,
    published: initial?.published ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const url = initial?.id ? `/api/admin/testimonials/${initial.id}` : '/api/admin/testimonials'
    const res = await fetch(url, {
      method: initial?.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: initial?.id }),
    })
    if (res.ok) router.push('/admin/testimonials')
    else setError((await res.json()).error || 'Save failed')
    setSaving(false)
  }

  return (
    <form onSubmit={save} className="space-y-6 max-w-2xl border border-gold-30 p-8 bg-surface-container-low">
      <div>
        <label className="font-label-caps text-[10px] text-primary block mb-2">CLIENT NAME</label>
        <input className="w-full border-b py-2 bg-transparent" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} required />
      </div>
      <div>
        <label className="font-label-caps text-[10px] text-primary block mb-2">EVENT TYPE</label>
        <input className="w-full border-b py-2 bg-transparent" value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })} />
      </div>
      <div>
        <label className="font-label-caps text-[10px] text-primary block mb-2">RATING (1-5)</label>
        <input type="number" min={1} max={5} className="w-full border-b py-2 bg-transparent" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
      </div>
      <div>
        <label className="font-label-caps text-[10px] text-primary block mb-2">CONTENT</label>
        <textarea rows={5} className="w-full border p-3 bg-transparent" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
      </div>
      <label className="flex gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
      <label className="flex gap-2"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
      {error && <p className="text-error text-sm">{error}</p>}
      <button type="submit" disabled={saving} className="bg-primary text-on-primary font-label-caps px-8 py-3">Save</button>
    </form>
  )
}
