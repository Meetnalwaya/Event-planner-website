'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Icon from './Icon'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Venues', href: '/venues' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'The Diary', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav
      className={`fixed top-0 w-full bg-surface/90 border-b border-primary/30 flex justify-between items-center px-gutter z-50 transition-all duration-300 backdrop-blur-md max-w-container-max mx-auto left-0 right-0 ${
        scrolled ? 'py-2 shadow-lg' : 'py-4'
      }`}
    >
      <Link
        href="/"
        className="font-headline-md text-headline-md text-primary tracking-tight"
      >
        Royal Events Udaipur
      </Link>

      <div className="hidden lg:flex gap-8 items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`font-label-caps text-label-caps transition-colors duration-300 ${
              isActive(item.href)
                ? 'text-secondary border-b-2 border-secondary pb-1'
                : 'text-on-surface hover:text-secondary'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <Link
        href="/contact"
        className="hidden lg:block bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 tracking-widest hover:bg-secondary transition-all active:scale-95"
      >
        Enquire Now
      </Link>

      <button
        type="button"
        className="lg:hidden text-primary"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <Icon name={mobileOpen ? 'close' : 'menu'} />
      </button>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface border-b border-primary/30 py-6 px-gutter lg:hidden flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`font-label-caps text-label-caps ${
                isActive(item.href) ? 'text-secondary' : 'text-on-surface'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 text-center tracking-widest"
          >
            Enquire Now
          </Link>
        </div>
      )}
    </nav>
  )
}
