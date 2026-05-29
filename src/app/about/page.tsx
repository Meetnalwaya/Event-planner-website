import Image from 'next/image'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'
import Icon from '@/components/Icon'

const TEAM_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBQYllX5yNDP5lTscs3bUb_lr8w8Hg7MLtXIXct10jCtgIWlDmsbnEmrL7s3MJga4uQqtNBZ5SvTtNpxtGQySlxEN68iaYNdj_5Ec0tA08jeLxV_TFfgcxpT0lVO1Dt20xC-GQ0j-HDYFFrcyCfIEP-_969WgvgvvbZr6JHOxjdDtT0TxW5tohfosNoMFgnFSNwd0YFyrfnjJguFSxl8EM-5EqFglAcLl-ybOavp04QKR1Strav5Zxb47e5p1XU2DU7HMPiItbVGwC_'

export const metadata = {
  title: 'About Us | Royal Events Udaipur',
}

export default function AboutPage() {
  return (
    <SiteLayout>
      <main className="pt-24 bg-surface">
        <header className="max-w-container-max mx-auto px-gutter pt-section-padding-md pb-16 text-center relative">
          <div className="jali-pattern absolute inset-0 opacity-30 pointer-events-none" />
          <p className="font-label-caps text-label-caps text-secondary mb-4 tracking-[0.3em]">OUR STORY</p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6">
            Born in the <span className="italic text-primary">Ivory City</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-3xl mx-auto">
            Spring Diaries Events was founded on a singular belief: that every celebration should echo the grandeur of its setting.
          </p>
        </header>

        <section className="max-w-container-max mx-auto px-gutter pb-section-padding-lg grid md:grid-cols-2 gap-16 items-center">
          <div className="relative border border-gold-30 p-4">
            <div className="relative aspect-[4/5]">
              <Image src={TEAM_IMG} alt="Spring Diaries heritage storytelling" fill className="object-cover" />
            </div>
          </div>
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-8">
              Custodians of <span className="text-secondary italic">Udaipur&apos;s Elegance</span>
            </h2>
            <div className="space-y-6 text-on-surface-variant font-body-lg">
              <p>
                Our founders grew up among the palaces and courtyards of Mewar, learning that true luxury lies in precision, hospitality, and narrative.
              </p>
              <p>
                Today we partner with royal venues, master artisans, and world-class vendors to deliver weddings and corporate experiences that feel both timeless and impeccably modern.
              </p>
            </div>
            <ul className="mt-10 space-y-4">
              {['Heritage-first design', 'White-glove concierge', 'End-to-end production'].map((t) => (
                <li key={t} className="flex items-center gap-3 font-label-caps text-label-caps text-primary">
                  <Icon name="diamond" className="text-secondary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-surface-container-low py-section-padding-lg">
          <div className="max-w-container-max mx-auto px-gutter text-center">
            <h2 className="font-headline-lg mb-8">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                { title: 'Integrity', desc: 'Transparent partnerships with venues and families alike.' },
                { title: 'Artistry', desc: 'Every detail—from mandap to menu—is intentionally composed.' },
                { title: 'Legacy', desc: 'We design moments meant to be remembered for generations.' },
              ].map((v) => (
                <div key={v.title} className="border border-gold-30 p-8 bg-surface">
                  <h3 className="font-headline-md text-primary mb-4">{v.title}</h3>
                  <p className="font-body-md text-on-surface-variant">{v.desc}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" className="inline-block mt-12 bg-primary text-on-primary font-label-caps text-label-caps px-10 py-4 hover:bg-secondary transition-all">
              Start a Conversation
            </Link>
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}
