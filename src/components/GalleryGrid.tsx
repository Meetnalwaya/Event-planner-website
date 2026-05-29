'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { GalleryImage } from '@/types'

const filters = [
  { id: 'all', label: 'All Works' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'floral', label: 'Floral Decor' },
  { id: 'experiences', label: 'Experiences' },
]

export default function GalleryGrid({ items }: { items: GalleryImage[] }) {
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (active === 'all') return items
    return items.filter((i) => i.category === active)
  }, [items, active])

  const getImageSrc = (url?: string) => {
  if (!url) return '/placeholder.jpg'

  return url.startsWith('http') || url.startsWith('/')
    ? url
    : '/placeholder.jpg'
}

  return (
    <>
      <section className="max-w-container-max mx-auto px-gutter mb-12">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-y border-outline-variant py-6">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              className={`font-label-caps text-label-caps transition-colors ${
                active === f.id
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-gutter pb-section-padding-lg">
        <div className="masonry-grid">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="gallery-item group relative cursor-pointer overflow-hidden border border-primary/20 p-2 bg-surface-container-low"
            >
              <div
                className={`overflow-hidden relative ${
                  item.aspect_ratio === '1/1'
                    ? 'aspect-square'
                    : item.aspect_ratio === '4/5'
                      ? 'aspect-[4/5]'
                      : item.aspect_ratio === '3/2'
                        ? 'aspect-[3/2]'
                        : 'aspect-[3/4]'
                }`}
              >
                <Image
                  src={getImageSrc(item.image_url)}
                  alt={item.title}
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <p className="font-label-caps text-[10px] text-white tracking-[0.2em] mb-2">{item.subtitle}</p>
                  <h3 className="font-headline-md text-white text-xl">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-section-padding-md border border-primary/30 p-12 text-center bg-surface-container relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary-container" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary-container" />
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Create Your Own Legacy</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-10">
            Your once-in-a-lifetime moment deserves a setting that echoes through history.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/contact"
              className="bg-primary text-on-primary font-label-caps text-label-caps px-10 py-4 hover:bg-secondary transition-all"
            >
              BOOK A CONSULTATION
            </Link>
            <Link
              href="/portfolio"
              className="border border-primary text-primary font-label-caps text-label-caps px-10 py-4 hover:bg-primary/5 transition-all"
            >
              VIEW PORTFOLIO
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
