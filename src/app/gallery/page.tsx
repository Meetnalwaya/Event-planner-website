import SiteLayout from '@/components/SiteLayout'
import GalleryGrid from '@/components/GalleryGrid'
import { getPublishedGallery } from '@/lib/data'

export const metadata = {
  title: 'Gallery | Royal Events Udaipur',
  description: 'Moments of grandeur — weddings, corporate galas, and floral installations in Rajasthan.',
}

export default async function GalleryPage() {
  const items = await getPublishedGallery()

  return (
    <SiteLayout>
      <main className="pt-24 min-h-screen">
        <header className="max-w-container-max mx-auto px-gutter pt-section-padding-md pb-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 jali-pattern -z-10 opacity-40" />
          <p className="font-label-caps text-label-caps text-secondary mb-4 tracking-[0.3em]">THE ART OF CELEBRATION</p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6 max-w-4xl mx-auto">
            A Visual Odyssey of <span className="italic font-normal">Timeless Splendor</span>
          </h1>
          <div className="w-24 h-px bg-primary-container mx-auto mb-6" />
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Explore our curated portfolio of grand weddings, corporate galas, and bespoke floral installations across Rajasthan.
          </p>
        </header>
        <GalleryGrid items={items} />
      </main>
    </SiteLayout>
  )
}
