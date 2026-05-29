import BlogForm from '@/components/BlogForm'

export default function NewBlogPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-on-background mb-2">
          Create New Blog Post
        </h1>
        <p className="text-on-background/60">
          Add a new post to your blog. Fill in all required fields.
        </p>
      </div>
      <BlogForm />
    </div>
  )
}
