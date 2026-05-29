'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  Image as ImageIcon,
  LogOut,
  MessageSquare,
  Quote,
} from 'lucide-react'

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Calendar, label: 'Events', href: '/admin/events' },
  { icon: FileText, label: 'Blog', href: '/admin/blog' },
  { icon: ImageIcon, label: 'Gallery', href: '/admin/gallery' },
  { icon: Quote, label: 'Testimonials', href: '/admin/testimonials' },
  { icon: MessageSquare, label: 'Inquiries', href: '/admin/inquiries' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="w-64 bg-inverse-surface text-inverse-on-surface flex flex-col shrink-0">
        <div className="p-6 border-b border-primary/20">
          <h1 className="font-headline-md text-primary-fixed text-lg">Spring Diaries</h1>
          <p className="text-xs text-inverse-on-surface/60 mt-1 font-label-caps">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 font-body-md text-sm transition-colors ${
                  active ? 'bg-primary text-on-primary' : 'hover:bg-primary/20 text-inverse-on-surface'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-primary/20 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm hover:text-primary-fixed">
            <Home size={18} /> View Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-300 hover:bg-red-900/30"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
