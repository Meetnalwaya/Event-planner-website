'use client'

import { useEffect, useState } from 'react'
import type { Inquiry } from '@/types'

export default function AdminInquiriesPage() {
  const [rows, setRows] = useState<Inquiry[]>([])

  const load = () => fetch('/api/admin/inquiries').then((r) => r.json()).then((d) => setRows(d.data || []))
  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    load()
  }

  return (
    <div>
      <h1 className="font-headline-lg text-headline-md mb-8">Inquiries</h1>
      <div className="space-y-4">
        {rows.map((inq) => (
          <div key={inq.id} className="border border-gold-30 p-6 bg-surface-container-low">
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div>
                <p className="font-headline-md text-lg">{inq.name}</p>
                <p className="font-body-md text-on-surface-variant">{inq.email} · {inq.phone}</p>
                <p className="font-label-caps text-[10px] text-primary mt-2">{inq.service}</p>
              </div>
              <select
                value={inq.status}
                onChange={(e) => updateStatus(inq.id, e.target.value as Inquiry['status'])}
                className="border border-outline-variant px-3 py-2 font-body-md text-sm"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            {inq.message && <p className="mt-4 font-body-md text-on-surface-variant">{inq.message}</p>}
          </div>
        ))}
        {rows.length === 0 && <p className="text-on-surface-variant font-body-md">No inquiries yet.</p>}
      </div>
    </div>
  )
}
