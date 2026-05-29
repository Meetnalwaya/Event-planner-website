export interface Event {
  id: string
  title: string
  slug: string
  description: string
  location: string
  event_date: string | null
  category: string
  cover_image: string
  gallery: string[]
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  category: string
  author: string
  published: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  title: string
  subtitle: string
  image_url: string
  category: string
  aspect_ratio: string
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  client_name: string
  event_type: string
  rating: number
  content: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  status: 'new' | 'contacted' | 'closed'
  created_at: string
  updated_at: string
}

export interface Venue {
  id: string
  name: string
  slug: string
  description: string
  location: string
  images: string[]
  capacity: number
  published: boolean
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string
  image: string
  features: string[]
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}
