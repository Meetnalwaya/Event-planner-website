'use client'

import { useEffect, useState } from 'react'
import GalleryForm from '@/components/admin/GalleryForm'
import type { GalleryImage } from '@/types'

export default function EditGalleryPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<GalleryImage | null>(null)
  useEffect(() => {
    fetch('/api/admin/gallery').then((r) => r.json()).then((d) => setItem((d.data as GalleryImage[])?.find((g) => g.id === params.id) || null))
  }, [params.id])
  if (!item) return <p>Loading…</p>
  return (
    <div>
      <h1 className="font-headline-lg text-headline-md mb-8">Edit Gallery Image</h1>
      <GalleryForm initial={item} />
    </div>
  )
}
