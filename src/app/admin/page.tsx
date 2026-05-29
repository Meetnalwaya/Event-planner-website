'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (response.ok) router.push('/admin/dashboard')
      else setError('Invalid password')
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-surface border border-gold-30 p-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 border border-primary flex items-center justify-center">
            <Lock size={28} className="text-primary" />
          </div>
        </div>
        <h1 className="font-headline-lg text-headline-md text-center text-on-surface mb-2">Admin Access</h1>
        <p className="font-body-md text-on-surface-variant text-center mb-8">Enter your password to manage content</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="font-label-caps text-[10px] text-primary mb-2 block">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-outline-variant bg-transparent py-3 focus:border-primary outline-none"
              required
            />
          </div>
          {error && <p className="text-error text-sm font-body-md">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-4 tracking-widest hover:bg-secondary transition-all disabled:opacity-60"
          >
            {loading ? 'LOGGING IN…' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  )
}
