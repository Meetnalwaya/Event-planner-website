'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/admin/AdminShell'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname === '/admin'
  const [ok, setOk] = useState(isLogin)
  const [loading, setLoading] = useState(!isLogin)

  useEffect(() => {
    if (isLogin) {
      setOk(true)
      setLoading(false)
      return
    }
    fetch('/api/auth/check')
      .then((r) => {
        if (r.ok) setOk(true)
        else router.push('/admin')
      })
      .catch(() => router.push('/admin'))
      .finally(() => setLoading(false))
  }, [isLogin, router, pathname])

  if (isLogin) return <>{children}</>

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center font-body-md">
        Loading…
      </div>
    )
  }

  if (!ok) return null

  return <AdminShell>{children}</AdminShell>
}
