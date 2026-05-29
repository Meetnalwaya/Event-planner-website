import { NextRequest, NextResponse } from 'next/server'
import { createInquiry } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }
    const { data, error } = await createInquiry({
      name,
      email,
      phone: phone || '',
      service: service || 'general',
      message: message || '',
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, data })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
