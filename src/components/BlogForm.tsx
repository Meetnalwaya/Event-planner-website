'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import slugify from 'slugify'
import type { BlogPost } from '@/types'

export default function BlogForm({ initial }: { initial?: Partial<BlogPost> }) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: initial?.title || '',
    slug: initial?.slug || '',
    excerpt: initial?.excerpt || '',
    content: initial?.content || '',
    featured_image: initial?.featured_image || '',
    category: initial?.category || 'inspiration',
    author: initial?.author || 'Royal Events Udaipur',
    published: initial?.published ?? false,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const slug = form.slug || slugify(form.title, { lower: true })
    const url = initial?.id ? `/api/admin/blog/${initial.id}` : '/api/admin/blog'
    const res = await fetch(url, {
      method: initial?.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, slug, id: initial?.id }),
    })
    if (res.ok) router.push('/admin/blog')
    else setError((await res.json()).error || 'Save failed')
    setSaving(false)
  }

  const upload = async (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const d = await res.json()
    if (d.url) setForm((f) => ({ ...f, featured_image: d.url }))
  }

  return (
    <form onSubmit={save} className="space-y-6 max-w-2xl border border-gold-30 p-8 bg-surface-container-low">
      {['title', 'slug', 'excerpt', 'featured_image', 'author'].map((field) => (
        <div key={field}>
          <label className="font-label-caps text-[10px] text-primary block mb-2">{field.toUpperCase()}</label>
          <input
            className="w-full border-b py-2 bg-transparent outline-none focus:border-primary"
            value={form[field as keyof typeof form] as string}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required={field === 'title'}
          />
        </div>
      ))}
      <div>
        <label className="font-label-caps text-[10px] text-primary block mb-2">CONTENT (HTML)</label>
        <textarea rows={8} className="w-full border p-3 bg-transparent" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
      </div>
      <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      <label className="flex gap-2"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
      {error && <p className="text-error text-sm">{error}</p>}
      <button type="submit" disabled={saving} className="bg-primary text-on-primary font-label-caps px-8 py-3">Save Post</button>
    </form>
  )
}
