# Royal Events Udaipur - Next.js + Supabase Setup Guide

A complete modular Next.js application for luxury wedding event planning with admin dashboard, blog management, and client inquiry system powered by Supabase.

## 🚀 Features

- **Modern Next.js 14** with App Router
- **Supabase PostgreSQL** for backend
- **TailwindCSS** for styling with luxury color scheme
- **Modular Component Architecture**
- **Admin Dashboard** with secure authentication
- **Blog Management System** (Create, Edit, Delete, Publish)
- **Client Inquiry Management**
- **Responsive Design** (Mobile & Desktop)
- **Type-Safe** with TypeScript
- **API Routes** for backend operations
- **State Management** with Zustand

## 📋 Project Structure

```
spring-diaries-next/
├── src/
│   ├── app/
│   │   ├── api/                  # API routes
│   │   │   ├── auth/            # Authentication routes
│   │   │   └── admin/           # Admin endpoints
│   │   ├── admin/               # Admin pages
│   │   │   ├── blog/           # Blog management
│   │   │   ├── inquiries/       # Inquiry management
│   │   │   └── dashboard/       # Admin dashboard
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   │   └── globals.css          # Global styles
│   ├── components/              # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── BlogForm.tsx
│   ├── lib/                     # Utilities
│   │   ├── db.ts               # Database queries
│   │   ├── auth.ts             # Auth utilities
│   │   ├── supabase-client.ts  # Supabase client
│   │   ├── store.ts            # Zustand store
│   │   └── utils.ts            # Helper functions
│   └── types/                   # TypeScript types
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## 🔧 Installation

### 1. Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)

### 2. Clone/Download Project

```bash
cd spring-diaries-next
npm install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Project Settings → API
4. Copy:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - **service_role key** (SUPABASE_SERVICE_ROLE_KEY)

### 4. Create Database Tables

In Supabase SQL Editor, run the following:

```sql
-- Blog Posts Table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt VARCHAR(500) NOT NULL,
  featured_image VARCHAR(500),
  category VARCHAR(50) NOT NULL,
  author VARCHAR(100),
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Services Table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  icon VARCHAR(100),
  features TEXT[],
  price_starting DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Venues Table
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(500) NOT NULL,
  images VARCHAR(500)[],
  capacity INTEGER,
  price_per_day DECIMAL(10, 2),
  amenities TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Portfolio Items Table
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  images VARCHAR(500)[],
  category VARCHAR(100),
  event_date DATE,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Inquiries Table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  service VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(255) NOT NULL,
  event_type VARCHAR(100),
  rating INTEGER,
  content TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_portfolio_featured ON portfolio_items(featured);
```

### 5. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Authentication
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here

# App Configuration
NEXT_PUBLIC_APP_NAME=Royal Events Udaipur
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Key Pages & Routes

### Public Pages
- `/` - Homepage
- `/services` - Services listing
- `/portfolio` - Portfolio/Gallery
- `/venues` - Venue selection
- `/blog` - Blog posts
- `/about` - About page
- `/contact` - Contact form

### Admin Pages (Protected)
- `/admin` - Login page
- `/admin/dashboard` - Dashboard
- `/admin/blog` - Blog management
- `/admin/blog/new` - Create new post
- `/admin/blog/[id]/edit` - Edit post
- `/admin/inquiries` - Manage inquiries
- `/admin/settings` - Settings (extensible)

## 🛡️ Security

### Admin Authentication
- Password-based authentication
- HTTP-only cookies
- Session management
- Protected routes

### To Change Admin Password
Edit `.env.local`:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=your_new_secure_password
```

## 🎨 Customization

### Colors & Branding
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#d4af37',      // Gold luxury color
  secondary: '#904d00',    // Orange
  // ... more colors
}
```

### Fonts
Currently using:
- **Serif**: Playfair Display (headings)
- **Sans**: Montserrat (body)

Edit in `src/app/layout.tsx` to change fonts.

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/check` - Check auth status
- `POST /api/auth/logout` - Admin logout

### Blog Posts
- `GET /api/admin/blog` - All posts
- `POST /api/admin/blog` - Create post
- `GET /api/admin/blog/[id]` - Get single post
- `PATCH /api/admin/blog/[id]` - Update post
- `DELETE /api/admin/blog/[id]` - Delete post

### Inquiries
- `GET /api/admin/inquiries` - All inquiries
- `POST /api/admin/inquiries` - Create inquiry
- `PATCH /api/admin/inquiries/[id]` - Update status
- `DELETE /api/admin/inquiries/[id]` - Delete inquiry

### Stats
- `GET /api/admin/stats` - Dashboard statistics

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Settings
5. Deploy!

### Deploy to Other Platforms

The project can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- AWS Amplify
- DigitalOcean

## 📦 Dependencies

### Core
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety

### Database & Auth
- `@supabase/supabase-js` - Supabase client
- `@supabase/auth-helpers-nextjs` - Auth helpers

### Styling
- `tailwindcss` - Utility CSS
- `@tailwindcss/forms` - Form styling

### Utilities
- `react-icons` - Icon library
- `zod` - Schema validation
- `zustand` - State management
- `date-fns` - Date utilities
- `slugify` - URL slug generation

## 🐛 Troubleshooting

### Supabase Connection Issues
1. Verify environment variables
2. Check Supabase project is active
3. Ensure anon key has table access

### Admin Login Not Working
1. Verify `NEXT_PUBLIC_ADMIN_PASSWORD` is set
2. Clear browser cookies
3. Check browser console for errors

### Build Errors
1. Delete `node_modules` and `.next`
2. Run `npm install`
3. Run `npm run build`

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues and support:
1. Check the troubleshooting section
2. Review API route documentation
3. Check browser console for errors
4. Review Supabase logs

---

**Happy coding! 🎉**
