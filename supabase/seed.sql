-- Optional seed data (run after schema.sql)

insert into public.events (title, slug, description, location, event_date, category, cover_image, featured, published) values
('The Royal Gala', 'royal-gala-city-palace', 'A grand celebration at City Palace, Udaipur.', 'City Palace, Udaipur', '2023-11-15', 'wedding',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuANmpsAXuzfZFcYYyDCph6TXjgvw7d5zBfSWefEsuk3WkS6aADwSMBXTTM6fs-KMl0piSUZBRZTECy0cmzozm5SjKWnRkj0puw6P8zpU-UNWu3QkrBw0jPdxTuFo8ztSqOrNgBqlhALaCaS4tAPWElX8tb2Km4B0ps_dTO6sy0AQMAYkvI13osmpmnkSVWk6uYPdTj3ExY_qttGbuSYUgFI_Vc0gaBUTG1vwKz929O5j8t9X-rDPtJypXMl1Id15z0G_AqZ99WF9q9I',
 true, true),
('Elite Gatherings', 'elite-corporate-retreat', 'Sophisticated corporate retreat and networking gala.', 'Heritage Hotel, Udaipur', '2024-02-20', 'corporate',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2R8W9-AvhWo6l48zSCZLWxCyzwtgCG2oO0-hB4QKEZdZjRfoODZ1r1VQLCOKxtS3afff_eCWismdrAr6b4JitZu5gV4_4iIOKMRiTghDroUk4O4_O4mP6ljACnLJDOqElxYxw7z9yPi5rE1beUbUkDDlDjY09F4loUTIQY5CoZivXcrupisgmoko0FGsmSpzBLDrYg52dUY8vjtsdAJGZyOVXrpnWbKa9wi0R8haT8W4EKRaNCDzb6YnpgeYJ0orp3YpJyMmJKU2-',
 true, true)
on conflict (slug) do nothing;

insert into public.testimonials (client_name, event_type, rating, content, featured, published) values
('Aditya & Meera Singh', 'Royal Wedding at Taj Lake Palace, 2023', 5,
 'Royal Events Udaipur didn''t just plan a wedding; they orchestrated a dream. Every petal, every light, and every moment felt like it was plucked from a royal fable.',
 true, true);

insert into public.blog_posts (title, slug, excerpt, content, featured_image, category, author, published) values
('The Art of Mandana in Modern Weddings', 'art-of-mandana-modern-weddings',
 'How traditional Rajasthani patterns elevate contemporary celebration design.',
 '<p>Discover how Mandana-inspired motifs bring architectural depth to luxury stationery, mandaps, and venue styling.</p>',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_LmaMEqpaJvQESVz2j9dAe9aUMClRtx-wsjFLfTSh5EVkHZ2UPFCTD1MAq80u2_o6LGrXW1ARzutOFAG-0uiFXY6DF6FdJ-4oqMubf6BZiex1iFO5nEn0zweXiruFvgFFP6Ehw-ZEh2mmjy2s9d7nrzL0EGQ7nVaicwx8ax_ruMimWL7mvgmru3FwwRd8jyNlzeZXYpaFVW8UHQxVKADaoMT0uEf5TS7w7RReUOaAFNdQ-6os_Ho_laUXfqn1kwVFIW-DtALOfe5-',
 'inspiration', 'Royal Events Udaipur', true);
