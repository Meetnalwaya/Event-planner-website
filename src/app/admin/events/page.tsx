'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CrudTable from '@/components/admin/CrudTable'
import type { Event } from '@/types'

export default function AdminEventsPage() {
  const [rows, setRows] = useState<Event[]>([])

  const load = () => fetch('/api/admin/events').then((r) => r.json()).then((d) => setRows(d.data || []))
  useEffect(() => { load() }, [])

  const onDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-lg text-headline-md">Events</h1>
        <Link href="/admin/events/new" className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 text-sm">
          + New Event
        </Link>
      </div>
      <CrudTable
        rows={rows}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'location', label: 'Location' },
          {
            key: 'published',
            label: 'Status',
            render: (r) => (r.published ? 'Published' : 'Draft'),
          },
        ]}
        editHref={(id) => `/admin/events/${id}/edit`}
        onDelete={onDelete}
      />
    </div>
  )
}
