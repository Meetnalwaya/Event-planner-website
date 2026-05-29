'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import slugify from 'slugify'
import type { Event } from '@/types'

export default function EventForm({ initial }: { initial?: Partial<Event> }) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: initial?.title || '',
    slug: initial?.slug || '',
    description: initial?.description || '',
    location: initial?.location || '',
    event_date: initial?.event_date?.slice(0, 10) || '',
    category: initial?.category || 'wedding',
    cover_image: initial?.cover_image || '',
    featured: initial?.featured ?? false,
    published: initial?.published ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const slug = form.slug || slugify(form.title, { lower: true })
    const url = initial?.id ? `/api/admin/events/${initial.id}` : '/api/admin/events'
    const method = initial?.id ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, slug, id: initial?.id }),
    })
    if (res.ok) router.push('/admin/events')
    else {
      const d = await res.json()
      setError(d.error || 'Save failed — configure Supabase in .env.local')
    }
    setSaving(false)
  }

  const upload = async (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const d = await res.json()
    if (d.url) setForm((f) => ({ ...f, cover_image: d.url }))
  }

  return (
    <form onSubmit={save} className="space-y-6 max-w-2xl border border-gold-30 p-8 bg-surface-container-low">
      {['title', 'slug', 'location', 'cover_image'].map((field) => (
        <div key={field}>
          <label className="font-label-caps text-[10px] text-primary block mb-2">{field.replace('_', ' ').toUpperCase()}</label>
          <input
            className="w-full border-b border-outline-variant bg-transparent py-2 outline-none focus:border-primary"
            value={form[field as keyof typeof form] as string}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required={field === 'title'}
          />
        </div>
      ))}
      <div>
        <label className="font-label-caps text-[10px] text-primary block mb-2">DESCRIPTION</label>
        <textarea
          rows={4}
          className="w-full border border-outline-variant bg-transparent p-3 outline-none focus:border-primary"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-label-caps text-[10px] text-primary block mb-2">CATEGORY</label>
          <select
            className="w-full border-b border-outline-variant bg-transparent py-2"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {['wedding', 'corporate', 'floral', 'experiences'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-label-caps text-[10px] text-primary block mb-2">EVENT DATE</label>
          <input
            type="date"
            className="w-full border-b border-outline-variant bg-transparent py-2"
            value={form.event_date}
            onChange={(e) => setForm({ ...form, event_date: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="font-label-caps text-[10px] text-primary block mb-2">UPLOAD COVER</label>
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      </div>
      <label className="flex items-center gap-2 font-body-md">
        <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
        Featured
      </label>
      <label className="flex items-center gap-2 font-body-md">
        <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
        Published
      </label>
      {error && <p className="text-error text-sm">{error}</p>}
      <button type="submit" disabled={saving} className="bg-primary text-on-primary font-label-caps px-8 py-3 disabled:opacity-60">
        {saving ? 'Saving…' : 'Save Event'}
      </button>
    </form>
  )
}
