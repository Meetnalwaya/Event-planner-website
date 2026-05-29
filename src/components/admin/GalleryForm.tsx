'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { GalleryImage } from '@/types'

export default function GalleryForm({ initial }: { initial?: Partial<GalleryImage> }) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: initial?.title || '',
    subtitle: initial?.subtitle || '',
    image_url: initial?.image_url || '',
    category: initial?.category || 'weddings',
    aspect_ratio: initial?.aspect_ratio || '3/4',
    sort_order: initial?.sort_order ?? 0,
    published: initial?.published ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const url = initial?.id ? `/api/admin/gallery/${initial.id}` : '/api/admin/gallery'
    const method = initial?.id ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: initial?.id }),
    })
    if (res.ok) router.push('/admin/gallery')
    else {
      const d = await res.json()
      setError(d.error || 'Save failed')
    }
    setSaving(false)
  }

  const upload = async (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const d = await res.json()
    if (d.url) setForm((f) => ({ ...f, image_url: d.url }))
  }

  return (
    <form onSubmit={save} className="space-y-6 max-w-2xl border border-gold-30 p-8 bg-surface-container-low">
      {['title', 'subtitle', 'image_url'].map((field) => (
        <div key={field}>
          <label className="font-label-caps text-[10px] text-primary block mb-2">{field.replace('_', ' ').toUpperCase()}</label>
          <input
            className="w-full border-b border-outline-variant bg-transparent py-2 outline-none focus:border-primary"
            value={form[field as keyof typeof form] as string}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required={field === 'title' || field === 'image_url'}
          />
        </div>
      ))}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="font-label-caps text-[10px] text-primary block mb-2">CATEGORY</label>
          <select className="w-full border-b py-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {['weddings', 'corporate', 'floral', 'experiences', 'venues'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-label-caps text-[10px] text-primary block mb-2">ASPECT</label>
          <select className="w-full border-b py-2" value={form.aspect_ratio} onChange={(e) => setForm({ ...form, aspect_ratio: e.target.value })}>
            {['3/4', '1/1', '4/5', '3/2'].map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-label-caps text-[10px] text-primary block mb-2">ORDER</label>
          <input type="number" className="w-full border-b py-2" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
        </div>
      </div>
      <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      <label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
      {error && <p className="text-error text-sm">{error}</p>}
      <button type="submit" disabled={saving} className="bg-primary text-on-primary font-label-caps px-8 py-3">Save</button>
    </form>
  )
}
