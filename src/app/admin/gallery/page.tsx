'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CrudTable from '@/components/admin/CrudTable'
import type { GalleryImage } from '@/types'

export default function AdminGalleryPage() {
  const [rows, setRows] = useState<GalleryImage[]>([])

  const load = () => fetch('/api/admin/gallery').then((r) => r.json()).then((d) => setRows(d.data || []))
  useEffect(() => { load() }, [])

  const onDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-lg text-headline-md">Gallery</h1>
        <Link href="/admin/gallery/new" className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 text-sm">
          + New Image
        </Link>
      </div>
      <CrudTable
        rows={rows}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'sort_order', label: 'Order' },
        ]}
        editHref={(id) => `/admin/gallery/${id}/edit`}
        onDelete={onDelete}
      />
    </div>
  )
}
