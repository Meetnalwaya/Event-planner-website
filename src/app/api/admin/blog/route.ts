import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-admin'
import { adminListBlog, adminUpsertBlog } from '@/lib/data'

export async function GET() {
  const denied = requireAdmin()
  if (denied) return denied
  try {
    const { data, error } = await adminListBlog()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin()
  if (denied) return denied
  const body = await request.json()
  const { data, error } = await adminUpsertBlog(body)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
