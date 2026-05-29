'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CrudTable from '@/components/admin/CrudTable'
import type { Testimonial } from '@/types'

export default function AdminTestimonialsPage() {
  const [rows, setRows] = useState<Testimonial[]>([])
  const load = () => fetch('/api/admin/testimonials').then((r) => r.json()).then((d) => setRows(d.data || []))
  useEffect(() => { load() }, [])

  const onDelete = async (id: string) => {
    if (!confirm('Delete?')) return
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-lg text-headline-md">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="bg-primary text-on-primary font-label-caps px-6 py-3 text-sm">+ New</Link>
      </div>
      <CrudTable
        rows={rows}
        columns={[
          { key: 'client_name', label: 'Client' },
          { key: 'event_type', label: 'Event' },
          { key: 'rating', label: 'Rating' },
        ]}
        editHref={(id) => `/admin/testimonials/${id}/edit`}
        onDelete={onDelete}
      />
    </div>
  )
}
