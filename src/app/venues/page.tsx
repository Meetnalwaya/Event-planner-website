import Image from 'next/image'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'

const venues = [
  {
    name: 'City Palace, Udaipur',
    location: 'Lake Pichola',
    desc: 'Iconic courtyards and terraces for royal wedding ceremonies.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD0EmCR2-RC_zqR2yfhQD9l_Uzlpww_TzXzgtl8hjwfWU9tE4VdW5uzDADCTyLXNtHU2qTLKWV8IF7r6kMiujfR3hS64b4JYPSN34-s-Mkz1ExHiAiQtxWZr_CkqKsT4xIvTXijFhqLgnu8gtWejTyvn2b7DY-pxrT_i7e5YdOg5KAwsTgKjuTi8TWvfx_q3sfKidSrBvPLR6m72hbP_haiD4cYEnXLCLd7n2c9bLJLbFaiXiPbnFHk_J7XPAAwT1nVIJlAW89kP-_S',
  },
  {
    name: 'Taj Lake Palace',
    location: 'Floating Heritage',
    desc: 'An island palace for intimate, world-renowned celebrations.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuANmpsAXuzfZFcYYyDCph6TXjgvw7d5zBfSWefEsuk3WkS6aADwSMBXTTM6fs-KMl0piSUZBRZTECy0cmzozm5SjKWnRkj0puw6P8zpU-UNWu3QkrBw0jPdxTuFo8ztSqOrNgBqlhALaCaS4tAPWElX8tb2Km4B0ps_dTO6sy0AQMAYkvI13osmpmnkSVWk6uYPdTj3ExY_qttGbuSYUgFI_Vc0gaBUTG1vwKz929O5j8t9X-rDPtJypXMl1Id15z0G_AqZ99WF9q9I',
  },
  {
    name: 'Heritage Havelis',
    location: 'Old City',
    desc: 'Restored mansions offering authentic Mewar architecture and charm.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBLqvPokZSyg0oTprnNsMNg5fQYKVB6SoosaAuHaRIecM_1LFD_dLrykHe7wgDC4jNO2nlqcZ29VJI-10mDx0bwNJNrjbM5YkFQnLAhIXzsiJgWCAx3YJZ2nR685b6FIQQw8weVRaSyzX50WWtAUc8EAlb1DTqRfwkfXlhcbLjU7HU4ueTcTdogMdxuOClNQGBaCaWRHyNfvF04PWpGUiEtTdD4yuA_rwX27QGRaWlaVcYLl9QetufEujMWIEhIUAw9GsFiev6WGdBu',
  },
]

export const metadata = { title: 'Venues | Spring Diaries Events' }

export default function VenuesPage() {
  return (
    <SiteLayout>
      <main className="pt-24 bg-surface-container-low min-h-screen">
        <header className="max-w-container-max mx-auto px-gutter pt-section-padding-md pb-12 text-center">
          <p className="font-label-caps text-label-caps text-secondary mb-4 tracking-[0.3em]">ROYAL PALACES & ESTATES</p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6">
            Venues of <span className="italic text-primary">Legend</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            We hold preferred relationships with Rajasthan&apos;s most prestigious properties.
          </p>
        </header>

        <section className="max-w-container-max mx-auto px-gutter pb-section-padding-lg grid gap-12">
          {venues.map((v) => (
            <article key={v.name} className="grid md:grid-cols-5 gap-0 border border-gold-30 bg-surface overflow-hidden">
              <div className="md:col-span-3 relative min-h-[280px]">
                <Image src={v.image} alt={v.name} fill className="object-cover" />
              </div>
              <div className="md:col-span-2 p-10 flex flex-col justify-center">
                <span className="font-label-caps text-label-caps text-secondary mb-2">{v.location}</span>
                <h2 className="font-headline-lg text-headline-md mb-4">{v.name}</h2>
                <p className="font-body-md text-on-surface-variant mb-6">{v.desc}</p>
                <Link href="/contact" className="font-label-caps text-label-caps text-primary border border-primary px-6 py-3 w-fit hover:bg-primary hover:text-on-primary transition-all">
                  Enquire for This Venue
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteLayout>
  )
}
