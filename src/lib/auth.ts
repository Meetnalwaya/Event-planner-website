import { cookies } from 'next/headers'

export const getAuthToken = () => {
  const cookieStore = cookies()
  return cookieStore.get('auth-token')?.value
}

export const setAuthToken = (token: string) => {
  const cookieStore = cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export const removeAuthToken = () => {
  const cookieStore = cookies()
  cookieStore.delete('auth-token')
}

export const verifyAdminPassword = (password: string): boolean => {
  // In production, use proper password hashing (bcrypt)
  // This is a simple example - replace with actual hashing
  const adminHash = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  return password === adminHash
}
