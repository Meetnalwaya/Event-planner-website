import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-admin'
import { adminUpdateInquiryStatus } from '@/lib/data'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const denied = requireAdmin()
  if (denied) return denied
  const { status } = await request.json()
  const { data, error } = await adminUpdateInquiryStatus(params.id, status)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
