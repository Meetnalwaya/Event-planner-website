import Image from 'next/image'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'

const services = [
  {
    title: 'Heritage Weddings',
    desc: 'Full-service royal wedding planning across palaces, havelis, and lakeside estates.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0fKT5x9YrjRdeWOBw8zdxL2k0dTA82U60X5sCxoVRibnX71k-Uy4yBMeIS-TpJpVvYPEtCTwpb6MGOVxK6ulLUcI6FRyL45kfCOEj_iUm1tCo1sPh-l6TdiRIU9FLK-HEaUWcB-0l7hm3KGL20N3Xv4Z6P1lcV9GZiyCKoOzvsiKRsffHkm7WcUhiqcSO35s_d_jBBw76zpVTUAH_uWCaC2ZDR0VAMyLBgRIuUaFYjxodzn0ZeWLEtGydjoZpbsTAGRiVnss6kU-W',
  },
  {
    title: 'Corporate Galas',
    desc: 'Executive retreats, product launches, and gala dinners with regal Rajasthani flair.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBw__NdnTyGACLNqwUMvUADABWi7kAQJ-1DzTDrXMfxa6XbMqoIdYrccF5_xC3ab9Et8OeLrf0eYkDs_TQ3-Nt_1guTjcH8v3WCpwkWpDqHzWuvF__z-ogq_7mauKIfcKRDol6FtFhMUn3bKSp1JBafxh48kMnzW3VfL_4D77-TkpdersY47AxcfaAqlaT26cSE6C0MFsYZS0k_uJL0sIc6Q957Vz2nPWzJsX7UBaFJAOhdrNopRkVm_JCj43FzyP7SCG5vKrSkiElE',
  },
  {
    title: 'Bespoke Concierge',
    desc: 'Guest logistics, cultural experiences, and VIP hospitality throughout your stay.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCa8gggDVz9-I-NaCGijTr91bbkvAsuJ5lCuYa0Fgw1ufu0i-76BMDjEXsCbCF6--MREUZ5Sn-W5JRoLQLO5btpcEEVKiDEpAEeOVC_SBBoA1tcCGVId66UoALSM0jklst8M2UTrFzRzhagAE7xjLjiMrtNvJeV02byYSC8_ggZx1lwU1GAwnVXJHg8-gpTHS5zPSNZZ7r-tC5uBHnyDDEZK1hsy_0Hmyo9qQAnW8txz2HJM-VID5wkesoVZog0aL66EQtObuIOFhwR',
  },
  {
    title: 'Event Production',
    desc: 'Lighting, sound, decor, and entertainment orchestrated to editorial standards.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDKW8EJ2UjWAPj1ss1bYjPBYWDgp3fX7nIOCdkk18js2hc6B6rTDZtXA73nP_QuH_J5_PB0uHEbzqtyZrOFi2skXbExCH6YB0fjKmQImAtn8eFp2lLWgCGlHqWlyI7HMvI0kgueMEekBEhCvatHUOM7uWdOB4ZEQzqCSk4h0v5oKHAFx_0EBa6m3cK_062_nXALgsqd_8y_Xl250melndJ-jF89gJjFy-iWoJahC4JlyXVkYYo-Je121sPjfzkQKtpuiiq2AbOkAqx',
  },
]

export const metadata = { title: 'Services | Spring Diaries Events' }

export default function ServicesPage() {
  return (
    <SiteLayout>
      <main className="pt-24 bg-surface">
        <header className="max-w-container-max mx-auto px-gutter pt-section-padding-md pb-12 text-center">
          <p className="font-label-caps text-label-caps text-secondary mb-4 tracking-[0.3em]">CURATED EXPERIENCES</p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6">
            Services of <span className="italic text-primary">Distinction</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            From intimate ceremonies to state-scale celebrations, every service is tailored to your vision and venue.
          </p>
        </header>

        <section className="max-w-container-max mx-auto px-gutter pb-section-padding-lg space-y-16">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`relative aspect-[4/3] border border-gold-30 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <Image src={s.image} alt={s.title} fill className="object-cover" />
              </div>
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <span className="font-label-caps text-label-caps text-primary mb-2 block">0{i + 1}</span>
                <h2 className="font-headline-lg text-headline-lg mb-4">{s.title}</h2>
                <p className="font-body-lg text-on-surface-variant mb-6">{s.desc}</p>
                <Link href="/contact" className="font-label-caps text-label-caps text-secondary border-b border-secondary/40 pb-1 hover:border-secondary">
                  Request Details
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
    </SiteLayout>
  )
}
