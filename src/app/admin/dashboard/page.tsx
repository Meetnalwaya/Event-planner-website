'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ events: 0, blog: 0, gallery: 0, inquiries: 0 })

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/events').then((r) => r.json()),
      fetch('/api/admin/blog').then((r) => r.json()),
      fetch('/api/admin/gallery').then((r) => r.json()),
      fetch('/api/admin/inquiries').then((r) => r.json()),
    ]).then(([e, b, g, i]) => {
      setCounts({
        events: e.data?.length ?? 0,
        blog: b.data?.length ?? 0,
        gallery: g.data?.length ?? 0,
        inquiries: i.data?.length ?? 0,
      })
    }).catch(() => {})
  }, [])

  const cards = [
    { label: 'Events', count: counts.events, href: '/admin/events' },
    { label: 'Blog Posts', count: counts.blog, href: '/admin/blog' },
    { label: 'Gallery Images', count: counts.gallery, href: '/admin/gallery' },
    { label: 'Inquiries', count: counts.inquiries, href: '/admin/inquiries' },
  ]

  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Dashboard</h1>
      <p className="font-body-md text-on-surface-variant mb-10">Manage your Royal Events Udaipur website content.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="border border-gold-30 bg-surface-container-low p-6 hover:border-primary transition-colors"
          >
            <p className="font-label-caps text-label-caps text-secondary mb-2">{c.label}</p>
            <p className="font-display-lg text-display-lg-mobile text-primary">{c.count}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
