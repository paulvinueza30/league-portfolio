import { fetchBlogPosts, type BlogPost } from "@/lib/blog";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Footer from "@/components/footer";

export function BlogListPage() {
  const { data: posts, isLoading, isError, error } = useQuery<BlogPost[], Error>({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1428] w-full flex justify-center items-center text-[#F0E6D2]">
        Loading blog posts...
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

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A1428] w-full flex justify-center items-center text-[#F0E6D2]">
        No blog posts found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1428] w-full overflow-x-hidden">
      <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col items-center justify-items-center">
        <img className="w-16 h-16 mb-2" src="/league-p.png" alt="League Portfolio Logo" />
        <h1 className="text-balance text-4xl font-bold mb-2 tracking-tight text-[#F0E6D2] md:text-5xl">Paul's Blog</h1>
        <p className="text-lg text-[#CDBE91]">I like Go and Linux, everything else is cool too though...</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-6 pb-6">
        {posts.map((post, idx) => (
          <Link to={`/blog/${post.slug}`} key={idx}>
            <div
              className="
                bg-[#0A1428]
                border-2 border-[#463714]
                hover:border-[#C89B3C]
                hover:bg-[#1E272C]
                cursor-pointer
                transition-all duration-300
                text-[#F0E6D2]
                shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]
                p-6 rounded-lg
              "
            >
              <h3 className="text-xl font-bold text-[#C89B3C] mb-2">{post.title}</h3>
              {post.created_at && (
                <time className="text-[#CDBE91] text-sm mb-4 block">
                  {new Date(post.created_at).toLocaleDateString()}
                </time>
              )}
              <div className="text-[#F0E6D2] line-clamp-3">
                {post.content.slice(0, 150)}...
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}