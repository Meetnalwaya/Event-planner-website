import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-admin'
import { adminDeleteGallery, adminUpsertGallery } from '@/lib/data'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const denied = requireAdmin()
  if (denied) return denied
  const body = await request.json()
  const { data, error } = await adminUpsertGallery({ ...body, id: params.id })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const denied = requireAdmin()
  if (denied) return denied
  const { error } = await adminDeleteGallery(params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
