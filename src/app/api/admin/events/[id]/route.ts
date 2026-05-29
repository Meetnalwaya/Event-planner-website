import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-admin'
import { adminDeleteEvent, adminUpsertEvent } from '@/lib/data'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const denied = requireAdmin()
  if (denied) return denied
  try {
    const body = await request.json()
    const { data, error } = await adminUpsertEvent({ ...body, id: params.id })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const denied = requireAdmin()
  if (denied) return denied
  try {
    const { error } = await adminDeleteEvent(params.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
