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
      <div className="mx-auto max-w-4xl px-6 py-8 flex flex-col items-center justify-center text-center">
        <img className="w-20 h-20 mb-4" src="/league-p.png" alt="League Portfolio Logo" />
        <h1 className="text-balance text-5xl font-bold mb-4 tracking-tight text-[#F0E6D2] md:text-6xl">Paul's Blog</h1>
        <p className="text-lg text-[#CDBE91] md:text-xl">I like Go and Linux, everything else is cool too though...</p>
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

          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-[#C89B3C] mb-4 md:text-4xl">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold text-[#C89B3C] mb-3 mt-6 md:text-3xl">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-medium text-[#C89B3C] mb-2 mt-4 md:text-2xl">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-[#F0E6D2] mb-4 leading-relaxed md:text-lg">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="text-[#F0E6D2] mb-4 ml-6 list-disc md:text-lg">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="text-[#F0E6D2] mb-4 ml-6 list-decimal md:text-lg">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-[#F0E6D2] mb-1">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#C89B3C] pl-4 italic text-[#CDBE91] my-4 md:text-lg">
                  {children}
                </blockquote>
              ),
              code: (props) => {
                const { children, className } = props;
                const inline = !className;
                if (inline) {
                  return (
                    <code className="bg-[#1E272C] px-2 py-1 rounded text-[#C89B3C] font-mono md:text-lg">
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-[#1E272C] p-4 rounded overflow-x-auto my-4">
                    <code className="text-[#CDBE91] font-mono md:text-lg">{children}</code>
                  </pre>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>

      <Footer />
    </div>
  );
}