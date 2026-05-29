'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CrudTable from '@/components/admin/CrudTable'
import type { BlogPost } from '@/types'

export default function AdminBlogPage() {
  const [rows, setRows] = useState<BlogPost[]>([])
  const load = () => fetch('/api/admin/blog').then((r) => r.json()).then((d) => setRows(d.data || []))
  useEffect(() => { load() }, [])

  const onDelete = async (id: string) => {
    if (!confirm('Delete post?')) return
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-lg text-headline-md">Blog / The Diary</h1>
        <Link href="/admin/blog/new" className="bg-primary text-on-primary font-label-caps px-6 py-3 text-sm">+ New Post</Link>
      </div>
      <CrudTable
        rows={rows}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'published', label: 'Status', render: (r) => (r.published ? 'Published' : 'Draft') },
        ]}
        editHref={(id) => `/admin/blog/${id}/edit`}
        onDelete={onDelete}
      />
    </div>
  )
}
