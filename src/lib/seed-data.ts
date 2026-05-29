import type { BlogPost, Event, GalleryImage, Testimonial } from '@/types'

export const seedEvents: Omit<Event, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    title: 'The Royal Gala',
    slug: 'royal-gala-city-palace',
    description: 'A grand celebration at City Palace, Udaipur.',
    location: 'City Palace, Udaipur',
    event_date: '2023-11-15',
    category: 'wedding',
    cover_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuANmpsAXuzfZFcYYyDCph6TXjgvw7d5zBfSWefEsuk3WkS6aADwSMBXTTM6fs-KMl0piSUZBRZTECy0cmzozm5SjKWnRkj0puw6P8zpU-UNWu3QkrBw0jPdxTuFo8ztSqOrNgBqlhALaCaS4tAPWElX8tb2Km4B0ps_dTO6sy0AQMAYkvI13osmpmnkSVWk6uYPdTj3ExY_qttGbuSYUgFI_Vc0gaBUTG1vwKz929O5j8t9X-rDPtJypXMl1Id15z0G_AqZ99WF9q9I',
    gallery: [],
    featured: true,
    published: true,
  },
  {
    title: 'Elite Gatherings',
    slug: 'elite-corporate-retreat',
    description: 'Sophisticated corporate retreat and networking gala.',
    location: 'Heritage Hotel, Udaipur',
    event_date: '2024-02-20',
    category: 'corporate',
    cover_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2R8W9-AvhWo6l48zSCZLWxCyzwtgCG2oO0-hB4QKEZdZjRfoODZ1r1VQLCOKxtS3afff_eCWismdrAr6b4JitZu5gV4_4iIOKMRiTghDroUk4O4_O4mP6ljACnLJDOqElxYxw7z9yPi5rE1beUbUkDDlDjY09F4loUTIQY5CoZivXcrupisgmoko0FGsmSpzBLDrYg52dUY8vjtsdAJGZyOVXrpnWbKa9wi0R8haT8W4EKRaNCDzb6YnpgeYJ0orp3YpJyMmJKU2-',
    gallery: [],
    featured: true,
    published: true,
  },
]

export const seedGallery: Omit<GalleryImage, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    title: 'Palace of Dreams',
    subtitle: 'ROYAL WEDDINGS',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0fKT5x9YrjRdeWOBw8zdxL2k0dTA82U60X5sCxoVRibnX71k-Uy4yBMeIS-TpJpVvYPEtCTwpb6MGOVxK6ulLUcI6FRyL45kfCOEj_iUm1tCo1sPh-l6TdiRIU9FLK-HEaUWcB-0l7hm3KGL20N3Xv4Z6P1lcV9GZiyCKoOzvsiKRsffHkm7WcUhiqcSO35s_d_jBBw76zpVTUAH_uWCaC2ZDR0VAMyLBgRIuUaFYjxodzn0ZeWLEtGydjoZpbsTAGRiVnss6kU-W',
    category: 'weddings',
    aspect_ratio: '3/4',
    sort_order: 1,
    published: true,
  },
  {
    title: 'Elite Networking',
    subtitle: 'CORPORATE GALAS',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBw__NdnTyGACLNqwUMvUADABWi7kAQJ-1DzTDrXMfxa6XbMqoIdYrccF5_xC3ab9Et8OeLrf0eYkDs_TQ3-Nt_1guTjcH8v3WCpwkWpDqHzWuvF__z-ogq_7mauKIfcKRDol6FtFhMUn3bKSp1JBafxh48kMnzW3VfL_4D77-TkpdersY47AxcfaAqlaT26cSE6C0MFsYZS0k_uJL0sIc6Q957Vz2nPWzJsX7UBaFJAOhdrNopRkVm_JCj43FzyP7SCG5vKrSkiElE',
    category: 'corporate',
    aspect_ratio: '1/1',
    sort_order: 2,
    published: true,
  },
  {
    title: 'Botanical Grandeur',
    subtitle: 'FLORAL DESIGN',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBLqvPokZSyg0oTprnNsMNg5fQYKVB6SoosaAuHaRIecM_1LFD_dLrykHe7wgDC4jNO2nlqcZ29VJI-10mDx0bwNJNrjbM5YkFQnLAhIXzsiJgWCAx3YJZ2nR685b6FIQQw8weVRaSyzX50WWtAUc8EAlb1DTqRfwkfXlhcbLjU7HU4ueTcTdogMdxuOClNQGBaCaWRHyNfvF04PWpGUiEtTdD4yuA_rwX27QGRaWlaVcYLl9QetufEujMWIEhIUAw9GsFiev6WGdBu',
    category: 'floral',
    aspect_ratio: '4/5',
    sort_order: 3,
    published: true,
  },
]

export const seedTestimonials: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    client_name: 'Aditya & Meera Singh',
    event_type: 'Royal Wedding at Taj Lake Palace, 2023',
    rating: 5,
    content:
      "Royal Events Udaipur didn't just plan a wedding; they orchestrated a dream. Every petal, every light, and every moment felt like it was plucked from a royal fable. They are truly the custodians of Udaipur's elegance.",
    featured: true,
    published: true,
  },
]

export const seedBlog: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>[] = [
  {
    title: 'The Art of Mandana in Modern Weddings',
    slug: 'art-of-mandana-modern-weddings',
    excerpt: 'How traditional Rajasthani patterns elevate contemporary celebration design.',
    content:
      '<p>Discover how Mandana-inspired motifs bring architectural depth to luxury stationery, mandaps, and venue styling.</p>',
    featured_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_LmaMEqpaJvQESVz2j9dAe9aUMClRtx-wsjFLfTSh5EVkHZ2UPFCTD1MAq80u2_o6LGrXW1ARzutOFAG-0uiFXY6DF6FdJ-4oqMubf6BZiex1iFO5nEn0zweXiruFvgFFP6Ehw-ZEh2mmjy2s9d7nrzL0EGQ7nVaicwx8ax_ruMimWL7mvgmru3FwwRd8jyNlzeZXYpaFVW8UHQxVKADaoMT0uEf5TS7w7RReUOaAFNdQ-6os_Ho_laUXfqn1kwVFIW-DtALOfe5-',
    category: 'inspiration',
    author: 'Royal Events Udaipur',
    published: true,
  },
]
