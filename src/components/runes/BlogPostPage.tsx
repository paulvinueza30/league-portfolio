import { fetchBlogPost, type BlogPost } from "@/lib/blog";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import Footer from "@/components/footer";
import ReactMarkdown from "react-markdown";
import BlogNavigation from "@/components/blog/BlogNavigation";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, isError, error } = useQuery<BlogPost, Error>({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchBlogPost(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1428] w-full flex justify-center items-center text-[#F0E6D2]">
        Loading blog post...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#0A1428] w-full flex justify-center items-center text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A1428] w-full flex justify-center items-center text-[#F0E6D2]">
        Blog post not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1428] w-full overflow-x-hidden">
      <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col items-center justify-items-center">
        <img className="w-16 h-16 mb-2" src="/league-p.png" alt="League Portfolio Logo" />
        <h1 className="text-balance text-4xl font-bold mb-2 tracking-tight text-[#F0E6D2] md:text-5xl">Paul's Blog</h1>
        <p className="text-lg text-[#CDBE91]">I like Go and Linux, everything else is cool too though...</p>
        <BlogNavigation />
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-6">
        <Link
          to="/blog"
          className="inline-block mb-4 px-4 py-2 bg-[#463714] hover:bg-[#C89B3C] text-[#CDBE91] rounded transition-colors"
        >
          ← Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-[#C89B3C]">{post.title}</h1>
            {post.created_at && (
              <time className="text-[#CDBE91] text-sm">
                {new Date(post.created_at).toLocaleDateString()}
              </time>
            )}
          </header>

          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>

      <Footer />
    </div>
  );
}