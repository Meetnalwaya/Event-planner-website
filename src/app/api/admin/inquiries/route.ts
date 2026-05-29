import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-admin'
import { adminListInquiries } from '@/lib/data'

export async function GET() {
  const denied = requireAdmin()
  if (denied) return denied
  try {
    const { data, error } = await adminListInquiries()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
