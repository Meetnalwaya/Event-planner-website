import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-admin'
import { adminListEvents, adminUpsertEvent } from '@/lib/data'

export async function GET() {
  const denied = requireAdmin()
  if (denied) return denied
  try {
    const { data, error } = await adminListEvents()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin()
  if (denied) return denied
  try {
    const body = await request.json()
    const { data, error } = await adminUpsertEvent(body)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
