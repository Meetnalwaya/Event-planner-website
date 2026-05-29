import Image from 'next/image'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'
import EnquiryForm from '@/components/EnquiryForm'
import Icon from '@/components/Icon'
import { getFeaturedEvents, getFeaturedTestimonial } from '@/lib/data'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD0EmCR2-RC_zqR2yfhQD9l_Uzlpww_TzXzgtl8hjwfWU9tE4VdW5uzDADCTyLXNtHU2qTLKWV8IF7r6kMiujfR3hS64b4JYPSN34-s-Mkz1ExHiAiQtxWZr_CkqKsT4xIvTXijFhqLgnu8gtWejTyvn2b7DY-pxrT_i7e5YdOg5KAwsTgKjuTi8TWvfx_q3sfKidSrBvPLR6m72hbP_haiD4cYEnXLCLd7n2c9bLJLbFaiXiPbnFHk_J7XPAAwT1nVIJlAW89kP-_S'

const ABOUT_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBQYllX5yNDP5lTscs3bUb_lr8w8Hg7MLtXIXct10jCtgIWlDmsbnEmrL7s3MJga4uQqtNBZ5SvTtNpxtGQySlxEN68iaYNdj_5Ec0tA08jeLxV_TFfgcxpT0lVO1Dt20xC-GQ0j-HDYFFrcyCfIEP-_969WgvgvvbZr6JHOxjdDtT0TxW5tohfosNoMFgnFSNwd0YFyrfnjJguFSxl8EM-5EqFglAcLl-ybOavp04QKR1Strav5Zxb47e5p1XU2DU7HMPiItbVGwC_'

export default async function HomePage() {
  const [events, testimonial] = await Promise.all([
    getFeaturedEvents(),
    getFeaturedTestimonial(),
  ])

  const gridItems = events.length >= 4 ? events.slice(0, 4) : events

  return (
    <SiteLayout>
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={HERO_IMG} alt="Royal Udaipur palace wedding courtyard at golden hour" fill className="object-cover" priority />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 px-gutter max-w-container-max mx-auto w-full pt-20">
          <div className="max-w-2xl text-white">
            <span className="font-label-caps text-label-caps tracking-[0.3em] text-primary-fixed mb-4 block">
              Bespoke Heritage Weddings
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-none">
              Crafting Your <br />
              <span className="italic font-normal">Palatial Legacy.</span>
            </h1>
            <p className="font-body-lg text-body-lg mb-10 text-surface-container-low max-w-lg">
              Experience the pinnacle of Rajasthani opulence. We curate timeless celebrations in the heart of Udaipur&apos;s royal history.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary-container text-on-primary-container px-10 py-4 font-label-caps text-label-caps tracking-widest hover:bg-primary hover:text-on-primary transition-all"
            >
              Begin Your Journey
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="font-label-caps text-[10px] tracking-[0.2em]">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      <section className="py-section-padding-lg bg-surface relative overflow-hidden">
        <div className="jali-pattern absolute inset-0 pointer-events-none" />
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative">
          <div className="md:col-span-5 relative">
            <div className="border border-gold-30 p-4 absolute -top-4 -left-4 w-full h-full z-0" />
            <div className="relative z-10 w-full aspect-[4/5]">
              <Image src={ABOUT_IMG} alt="Rajasthani bride henna and gold jewelry" fill className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
          <div className="md:col-span-7">
            <span className="font-label-caps text-label-caps text-primary mb-4 block">Our Heritage Story</span>
            <h2 className="font-headline-lg text-headline-lg mb-8">
              Architects of <span className="text-secondary italic">Awe.</span>
            </h2>
            <div className="space-y-6 max-w-xl">
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Founded in the ivory corridors of Udaipur, Spring Diaries Events is more than a planning firm—we are storytellers of heritage.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                From the shimmering waters of Lake Pichola to the rugged beauty of the Aravalli hills, our team blends modern precision with the legendary hospitality of Mewar.
              </p>
              <Link href="/about" className="inline-flex items-center gap-4 group pt-6">
                <span className="font-label-caps text-label-caps text-secondary border-b border-secondary/40 pb-1 group-hover:border-secondary transition-all">
                  Meet Our Founders
                </span>
                <Icon name="arrow_forward" className="text-secondary transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-padding-lg bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="font-label-caps text-label-caps text-primary mb-4 block uppercase">The Portfolio</span>
              <h2 className="font-headline-lg text-headline-lg">Signature Celebrations</h2>
            </div>
            <p className="max-w-sm font-body-md text-on-surface-variant">
              A curated selection of our most iconic transformations across Rajasthan&apos;s premier heritage venues.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {gridItems.map((item, i) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden border border-gold-30 ${
                  i === 0 ? 'md:col-span-2 md:row-span-2 h-[600px]' : i === 3 ? 'md:row-span-2 h-[600px]' : 'h-[288px]'
                }`}
              >
                <Image
                  src={item.cover_image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-primary-fixed font-label-caps text-label-caps mb-2 uppercase">{item.category}</span>
                  <h3 className="text-white font-headline-md text-headline-md">{item.title}</h3>
                  <p className="text-white/80 font-body-md text-sm mt-1">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/portfolio" className="font-label-caps text-label-caps text-secondary border-b border-secondary/40 pb-1 hover:border-secondary">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {testimonial && (
        <section className="py-section-padding-lg bg-surface">
          <div className="max-w-container-max mx-auto px-gutter text-center">
            <div className="inline-block mb-12">
              <div className="flex justify-center gap-1 text-primary mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Icon key={i} name="star" filled />
                ))}
              </div>
              <div className="w-12 h-px bg-primary mx-auto" />
            </div>
            <blockquote className="font-headline-lg text-headline-lg italic mb-12 leading-tight max-w-4xl mx-auto">
              &ldquo;{testimonial.content}&rdquo;
            </blockquote>
            <p className="font-label-caps text-label-caps text-secondary tracking-widest mb-1">{testimonial.client_name}</p>
            <p className="font-body-md text-on-surface-variant text-sm">{testimonial.event_type}</p>
          </div>
        </section>
      )}

      <section className="relative py-section-padding-lg overflow-hidden bg-primary">
        <div className="jali-pattern absolute inset-0 opacity-20 invert" />
        <div className="max-w-container-max mx-auto px-gutter relative z-10">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mb-8">Begin Your Story Today</h2>
            <p className="font-body-lg text-on-primary/80 mb-12 max-w-xl">
              Whether a grand royal wedding or an intimate corporate retreat, let us craft an experience that is uniquely yours.
            </p>
            <EnquiryForm variant="hero" />
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
