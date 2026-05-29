'use client'

import { useEffect, useState } from 'react'
import BlogForm from '@/components/BlogForm'
import type { BlogPost } from '@/types'

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    fetch('/api/admin/blog')
      .then((r) => r.json())
      .then((d) => setPost((d.data as BlogPost[])?.find((p) => p.id === params.id) || null))
  }, [params.id])

  if (!post) return <p className="font-body-md">Loading…</p>

  return (
    <div>
      <h1 className="font-headline-lg text-headline-md mb-8">Edit Blog Post</h1>
      <BlogForm initial={post} />
    </div>
  )
}
