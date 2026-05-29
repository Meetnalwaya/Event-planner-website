import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export function isAdminRequest() {
  const token = cookies().get('admin-token')
  return token?.value === 'authenticated'
}

export function requireAdmin() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
