import Image from 'next/image'
import { notFound } from 'next/navigation'
import SiteLayout from '@/components/SiteLayout'
import { getBlogBySlug } from '@/lib/data'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug)
  return { title: post ? `${post.title} | The Diary` : 'Post Not Found' }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug)
  if (!post) notFound()

  return (
    <SiteLayout>
      <main className="pt-24 bg-surface">
        <article className="max-w-container-max mx-auto px-gutter pb-section-padding-lg">
          <header className="pt-section-padding-md pb-12 max-w-3xl">
            <span className="font-label-caps text-label-caps text-secondary mb-4 block">{post.category}</span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6">{post.title}</h1>
            <p className="font-body-md text-on-surface-variant">By {post.author}</p>
          </header>
          {post.featured_image && (
            <div className="relative aspect-[21/9] mb-12 border border-gold-30">
              <Image src={post.featured_image} alt={post.title} fill className="object-cover" />
            </div>
          )}
          <div
            className="prose prose-lg max-w-3xl font-body-lg text-on-surface-variant"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </SiteLayout>
  )
}
