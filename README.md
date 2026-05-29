# Royal Events Udaipur

A modern, full-featured luxury wedding and events management website for Udaipur. Features a stunning public site with blog, gallery, and portfolio showcases, combined with a powerful admin dashboard for managing events, testimonials, inquiries, and content.

Built with **Next.js 14**, **Tailwind CSS**, **TypeScript**, and **Supabase**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat-square&logo=supabase)

## Features

- Public site matching the Regal Heritage & Modernity design system
- Pages: Home, About, Services, Venues, Portfolio, Gallery, The Diary (blog), Contact
- Admin panel at `/admin` — manage events, blog, gallery, testimonials, inquiries
- Supabase Postgres + Storage (with seed fallback when DB is empty)

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 3, PostCSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **State Management:** Zustand
- **Authentication:** Custom JWT-based admin auth

## 🚀 Quick Start

```powershell
npm install
copy .env.local
```

1. Create a [Supabase](https://supabase.com) project.
2. Run `supabase/schema.sql` in the SQL Editor.
3. Create a public Storage bucket named **`media`**.
4. Add your project URL and keys to `.env.local`.
5. Run:

```powershell
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin (password from `NEXT_PUBLIC_ADMIN_PASSWORD`)

## 📦 Build & Deployment

### Development
```powershell
npm run dev
```
Visit http://localhost:3000 for the public site and http://localhost:3000/admin for the admin panel.

### Production Build
```powershell
npm run build
npm start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

The application is optimized for deployment on Vercel. Just connect your GitHub repository and it will auto-deploy on every push.

### Deploy to Other Platforms
- **Netlify:** Configure build command to `npm run build` and publish directory to `.next`
- **Docker:** Create a Dockerfile with Node.js base image
- **Self-hosted:** Run `npm run build && npm start` on your server

## 📁 Project Structure

```
src/
  app/
    api/                 # API routes (auth, admin endpoints)
    admin/               # Admin pages & dashboard
    blog/                # Blog pages
    contact/             # Contact page
    gallery/             # Gallery page
    portfolio/           # Portfolio page
    services/            # Services page
    venues/              # Venues page
    layout.tsx           # Root layout
    page.tsx             # Homepage
    globals.css          # Global styles
  components/            # Reusable components
    BlogForm.tsx
    ContactForm.tsx
    EnquiryForm.tsx
    GalleryGrid.tsx
    SiteNav.tsx
    SiteFooter.tsx
    admin/               # Admin-specific components
  lib/                   # Utilities & helpers
    auth.ts              # Authentication logic
    data.ts              # Data fetching
    store.ts             # Zustand store
    supabase/            # Supabase clients
  types/                 # TypeScript type definitions
supabase/
  schema.sql             # Database schema
  seed.sql               # Seed data
```

## ⚙️ Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

##  Author

Created for Royal Events Udaipur.
```
