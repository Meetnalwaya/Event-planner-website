import { createBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  seedBlog,
  seedEvents,
  seedGallery,
  seedTestimonials,
} from '@/lib/seed-data'
import type { BlogPost, Event, GalleryImage, Inquiry, Testimonial } from '@/types'

function withIds<T extends Record<string, unknown>>(
  items: T[],
  prefix: string
): (T & { id: string; created_at: string; updated_at: string })[] {
  const now = new Date().toISOString()
  return items.map((item, i) => ({
    ...item,
    id: `${prefix}-seed-${i}`,
    created_at: now,
    updated_at: now,
  })) as (T & { id: string; created_at: string; updated_at: string })[]
}

// ——— Public reads (anon client + seed fallback) ———

export async function getPublishedEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) {
    return withIds(seedEvents, 'event') as Event[]
  }
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('published', true)
    .order('event_date', { ascending: false })
  if (error || !data?.length) return withIds(seedEvents, 'event') as Event[]
  return data as Event[]
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const all = await getPublishedEvents()
  const featured = all.filter((e) => e.featured)
  return featured.length ? featured : all.slice(0, 4)
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const all = await getPublishedEvents()
  return all.find((e) => e.slug === slug) ?? null
}

export async function getPublishedGallery(category?: string): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured()) {
    const items = withIds(seedGallery, 'gallery') as GalleryImage[]
    if (!category || category === 'all') return items
    return items.filter((g) => g.category === category)
  }
  const supabase = createBrowserClient()
  let q = supabase
    .from('gallery_images')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
  if (category && category !== 'all') q = q.eq('category', category)
  const { data, error } = await q
  if (error || !data?.length) {
    const items = withIds(seedGallery, 'gallery') as GalleryImage[]
    if (!category || category === 'all') return items
    return items.filter((g) => g.category === category)
  }
  return data as GalleryImage[]
}

export async function getPublishedBlog(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    return withIds(
      seedBlog.map((b) => ({ ...b, views: 0 })),
      'blog'
    ) as BlogPost[]
  }
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error || !data?.length) {
    return withIds(seedBlog.map((b) => ({ ...b, views: 0 })), 'blog') as BlogPost[]
  }
  return data as BlogPost[]
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPublishedBlog()
  return posts.find((p) => p.slug === slug) ?? null
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) {
    return withIds(seedTestimonials, 'testimonial') as Testimonial[]
  }
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error || !data?.length) return withIds(seedTestimonials, 'testimonial') as Testimonial[]
  return data as Testimonial[]
}

export async function getFeaturedTestimonial(): Promise<Testimonial | null> {
  const all = await getPublishedTestimonials()
  return all.find((t) => t.featured) ?? all[0] ?? null
}

export async function createInquiry(
  inquiry: Omit<Inquiry, 'id' | 'created_at' | 'updated_at' | 'status'>
) {
  const admin = createAdminClient()
  if (!admin) {
    return { data: { id: 'local', ...inquiry, status: 'new' as const }, error: null }
  }
  return admin
    .from('inquiries')
    .insert([{ ...inquiry, status: 'new' }])
    .select()
    .single()
}

// ——— Admin reads/writes (service role) ———

function adminDb() {
  const client = createAdminClient()
  if (!client) throw new Error('Supabase is not configured. Add credentials to .env.local')
  return client
}

export async function adminListEvents() {
  const { data, error } = await adminDb().from('events').select('*').order('created_at', { ascending: false })
  return { data: (data as Event[]) ?? [], error }
}

export async function adminUpsertEvent(payload: Partial<Event> & { title: string; slug: string }) {
  if (payload.id && !payload.id.startsWith('event-seed')) {
    const { data, error } = await adminDb().from('events').update(payload).eq('id', payload.id).select().single()
    return { data, error }
  }
  const { id: _id, ...rest } = payload
  const { data, error } = await adminDb().from('events').insert(rest).select().single()
  return { data, error }
}

export async function adminDeleteEvent(id: string) {
  return adminDb().from('events').delete().eq('id', id)
}

export async function adminListBlog() {
  const { data, error } = await adminDb().from('blog_posts').select('*').order('created_at', { ascending: false })
  return { data: (data as BlogPost[]) ?? [], error }
}

export async function adminUpsertBlog(payload: Partial<BlogPost> & { title: string; slug: string }) {
  if (payload.id && !payload.id.startsWith('blog-seed')) {
    const { data, error } = await adminDb().from('blog_posts').update(payload).eq('id', payload.id).select().single()
    return { data, error }
  }
  const { id: _id, ...rest } = payload
  const { data, error } = await adminDb().from('blog_posts').insert(rest).select().single()
  return { data, error }
}

export async function adminDeleteBlog(id: string) {
  return adminDb().from('blog_posts').delete().eq('id', id)
}

export async function adminListGallery() {
  const { data, error } = await adminDb().from('gallery_images').select('*').order('sort_order', { ascending: true })
  return { data: (data as GalleryImage[]) ?? [], error }
}

export async function adminUpsertGallery(payload: Partial<GalleryImage> & { title: string; image_url: string }) {
  if (payload.id && !payload.id.startsWith('gallery-seed')) {
    const { data, error } = await adminDb().from('gallery_images').update(payload).eq('id', payload.id).select().single()
    return { data, error }
  }
  const { id: _id, ...rest } = payload
  const { data, error } = await adminDb().from('gallery_images').insert(rest).select().single()
  return { data, error }
}

export async function adminDeleteGallery(id: string) {
  return adminDb().from('gallery_images').delete().eq('id', id)
}

export async function adminListTestimonials() {
  const { data, error } = await adminDb().from('testimonials').select('*').order('created_at', { ascending: false })
  return { data: (data as Testimonial[]) ?? [], error }
}

export async function adminUpsertTestimonial(payload: Partial<Testimonial> & { client_name: string; content: string }) {
  if (payload.id && !payload.id.startsWith('testimonial-seed')) {
    const { data, error } = await adminDb().from('testimonials').update(payload).eq('id', payload.id).select().single()
    return { data, error }
  }
  const { id: _id, ...rest } = payload
  const { data, error } = await adminDb().from('testimonials').insert(rest).select().single()
  return { data, error }
}

export async function adminDeleteTestimonial(id: string) {
  return adminDb().from('testimonials').delete().eq('id', id)
}

export async function adminListInquiries() {
  const { data, error } = await adminDb().from('inquiries').select('*').order('created_at', { ascending: false })
  return { data: (data as Inquiry[]) ?? [], error }
}

export async function adminUpdateInquiryStatus(id: string, status: Inquiry['status']) {
  return adminDb().from('inquiries').update({ status }).eq('id', id).select().single()
}

export async function uploadMedia(file: File, folder = 'uploads') {
  const admin = adminDb()
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await admin.storage.from('media').upload(path, file, { upsert: false })
  if (error) return { url: null, error }
  const { data } = admin.storage.from('media').getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}
