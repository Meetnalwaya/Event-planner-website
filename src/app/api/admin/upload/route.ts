import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-admin'
import { uploadMedia } from '@/lib/data'

export async function POST(request: NextRequest) {
  const denied = requireAdmin()
  if (denied) return denied
  try {
    const form = await request.formData()
    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
    const { url, error } = await uploadMedia(file)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ url })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
