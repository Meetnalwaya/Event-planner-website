import Image from 'next/image'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'
import { getPublishedBlog } from '@/lib/data'

export const metadata = { title: 'The Diary | Royal Events Udaipur' }

export default async function BlogPage() {
  const posts = await getPublishedBlog()

  return (
    <SiteLayout>
      <main className="pt-24 bg-surface min-h-screen">
        <header className="max-w-container-max mx-auto px-gutter pt-section-padding-md pb-12 text-center">
          <p className="font-label-caps text-label-caps text-secondary mb-4 tracking-[0.3em]">INSIGHTS & INSPIRATION</p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6">
            The <span className="italic text-primary">Diary</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Editorial notes on heritage design, venue discovery, and the art of celebration in Rajasthan.
          </p>
        </header>

        <section className="max-w-container-max mx-auto px-gutter pb-section-padding-lg grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="border border-gold-30 bg-surface-container-low group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <span className="font-label-caps text-[10px] text-primary tracking-[0.2em] uppercase">{post.category}</span>
                <h2 className="font-headline-md text-headline-md mt-2 mb-3">{post.title}</h2>
                <p className="font-body-md text-on-surface-variant line-clamp-3 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="font-label-caps text-label-caps text-secondary border-b border-secondary/40 pb-1">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteLayout>
  )
}
