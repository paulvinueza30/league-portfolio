import BlogCard from "./BlogCard"
import BlogNavigation from "./BlogNavigation"
import Footer from "@/components/footer"
import type { BlogPost } from "@/types/blog"

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  const leftColumnPosts = posts
    .map((post, i) => ({ post, originalIndex: i }))
    .filter(({ originalIndex }) => originalIndex % 2 === 0)
  const rightColumnPosts = posts
    .map((post, i) => ({ post, originalIndex: i }))
    .filter(({ originalIndex }) => originalIndex % 2 === 1)

  return (
    <div className="min-h-screen bg-[#0A1428] w-full overflow-x-hidden">
      <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col items-center justify-items-center">
        <img className="w-16 h-16 mb-2" src="/league-p.png" alt="League Portfolio Logo" />
        <h1 className="text-balance text-4xl font-bold mb-2 tracking-tight text-[#F0E6D2] md:text-5xl">Paul's Blog</h1>
        <p className="text-lg text-[#CDBE91]">I like Go and Linux, everything else is cool too though...</p>

        <BlogNavigation />
      </div>

      <div className="flex gap-[3em] px-6 pb-6 max-w-4xl mx-auto mt-8">
        <div className="flex-1 flex flex-col gap-[4em]">
          {leftColumnPosts.map(({ post, originalIndex }) => (
            <BlogCard key={`left-${originalIndex}-${post.id}`} post={post} />
          ))}
        </div>

        <div className="flex-1 flex flex-col gap-[4em] mt-16">
          {rightColumnPosts.map(({ post, originalIndex }) => (
            <BlogCard key={`right-${originalIndex}-${post.id}`} post={post} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

