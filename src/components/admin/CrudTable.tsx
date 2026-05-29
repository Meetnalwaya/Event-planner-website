'use client'

import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'

type Column<T> = { key: keyof T | string; label: string; render?: (row: T) => React.ReactNode }

export default function CrudTable<T extends { id: string }>({
  rows,
  columns,
  editHref,
  onDelete,
}: {
  rows: T[]
  columns: Column<T>[]
  editHref: (id: string) => string
  onDelete: (id: string) => void
}) {
  return (
    <div className="border border-gold-30 overflow-x-auto">
      <table className="w-full text-left font-body-md text-sm">
        <thead className="bg-surface-container border-b border-gold-30">
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} className="px-4 py-3 font-label-caps text-[10px] text-primary tracking-widest">
                {c.label}
              </th>
            ))}
            <th className="px-4 py-3 font-label-caps text-[10px] text-primary">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low">
              {columns.map((c) => (
                <td key={String(c.key)} className="px-4 py-3 text-on-surface-variant">
                  {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key as string] ?? '')}
                </td>
              ))}
              <td className="px-4 py-3 flex gap-2">
                <Link href={editHref(row.id)} className="p-2 text-primary hover:bg-primary/10" aria-label="Edit">
                  <Pencil size={16} />
                </Link>
                <button type="button" onClick={() => onDelete(row.id)} className="p-2 text-error hover:bg-error/10" aria-label="Delete">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <p className="p-8 text-center text-on-surface-variant font-body-md">No items yet.</p>
      )}
    </div>
  )
}
