import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-admin'
import { adminListBlog, adminListInquiries } from '@/lib/data'

export async function GET() {
  const denied = requireAdmin()
  if (denied) return denied
  try {
    const { data: posts } = await adminListBlog()
    const { data: inquiries } = await adminListInquiries()
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0)
    const pendingInquiries = inquiries.filter((i) => i.status === 'new').length
    return NextResponse.json({
      totalPosts: posts.length,
      totalInquiries: inquiries.length,
      pendingInquiries,
      totalViews,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
