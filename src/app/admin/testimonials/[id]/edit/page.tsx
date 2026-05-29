'use client'

import { useEffect, useState } from 'react'
import TestimonialForm from '@/components/admin/TestimonialForm'
import type { Testimonial } from '@/types'

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<Testimonial | null>(null)
  useEffect(() => {
    fetch('/api/admin/testimonials').then((r) => r.json()).then((d) => setItem((d.data as Testimonial[])?.find((t) => t.id === params.id) || null))
  }, [params.id])
  if (!item) return <p>Loading…</p>
  return (
    <div>
      <h1 className="font-headline-lg text-headline-md mb-8">Edit Testimonial</h1>
      <TestimonialForm initial={item} />
    </div>
  )
}
