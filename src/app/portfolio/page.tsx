import Image from 'next/image'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'
import { getPublishedEvents } from '@/lib/data'

export const metadata = {
  title: 'Portfolio | Spring Diaries Events',
  description: 'Our royal celebrations and signature events across Udaipur and Rajasthan.',
}

export default async function PortfolioPage() {
  const events = await getPublishedEvents()

  return (
    <SiteLayout>
      <main className="pt-24 min-h-screen bg-surface">
        <header className="max-w-container-max mx-auto px-gutter pt-section-padding-md pb-12 text-center">
          <p className="font-label-caps text-label-caps text-secondary mb-4 tracking-[0.3em]">OUR ROYAL CELEBRATIONS</p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6">
            Portfolio of <span className="italic font-normal text-primary">Prestige</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Each celebration is a chapter in our legacy of curating unforgettable experiences at India&apos;s most storied venues.
          </p>
        </header>

        <section className="max-w-container-max mx-auto px-gutter pb-section-padding-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <article key={event.id} className="border border-gold-30 bg-surface-container-low group overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={event.cover_image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="font-label-caps text-[10px] text-primary tracking-[0.2em] uppercase">{event.category}</span>
                <h2 className="font-headline-md text-headline-md mt-2 mb-2">{event.title}</h2>
                <p className="font-body-md text-on-surface-variant text-sm mb-4">{event.location}</p>
                <p className="font-body-md text-on-surface-variant line-clamp-3">{event.description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="bg-primary py-section-padding-md text-center px-gutter">
          <h2 className="font-headline-lg text-on-primary mb-6">Plan Your Celebration</h2>
          <Link href="/contact" className="inline-block bg-surface text-primary font-label-caps text-label-caps px-10 py-4 hover:bg-secondary hover:text-white transition-all">
            Enquire Now
          </Link>
        </section>
      </main>
    </SiteLayout>
  )
}
