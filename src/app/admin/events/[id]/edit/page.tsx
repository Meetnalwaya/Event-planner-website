'use client'

import { useEffect, useState } from 'react'
import EventForm from '@/components/admin/EventForm'
import type { Event } from '@/types'

export default function EditEventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    fetch('/api/admin/events')
      .then((r) => r.json())
      .then((d) => setEvent((d.data as Event[])?.find((e) => e.id === params.id) || null))
  }, [params.id])

  if (!event) return <p className="font-body-md">Loading…</p>

  return (
    <div>
      <h1 className="font-headline-lg text-headline-md mb-8">Edit Event</h1>
      <EventForm initial={event} />
    </div>
  )
}
