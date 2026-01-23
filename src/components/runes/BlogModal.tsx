import { fetchBlogPost, type BlogPost } from "@/lib/blog";
import { useQuery } from "@tanstack/react-query";

interface BlogModalProps {
  slug: string;
  onClose: () => void;
}

export function BlogModal({ slug, onClose }: BlogModalProps) {
  const { data: post, isLoading, isError, error } = useQuery<BlogPost, Error>({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchBlogPost(slug),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-[#F0E6D2]">
        Loading blog post...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-full text-[#F0E6D2]">
        Blog post not found.
      </div>
    );
  }

  return (
    <div className="h-full p-6 overflow-y-auto text-[#F0E6D2]">
      <button
        onClick={onClose}
        className="mb-4 px-4 py-2 bg-[#463714] hover:bg-[#C89B3C] text-[#CDBE91] rounded transition-colors"
      >
        ← Back
      </button>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-[#C89B3C]">{post.title}</h1>
          {post.created_at && (
            <time className="text-[#CDBE91] text-sm">
              {new Date(post.created_at).toLocaleDateString()}
            </time>
          )}
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-[#F0E6D2] whitespace-pre-wrap leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
}