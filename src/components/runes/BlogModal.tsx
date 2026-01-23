import ReactMarkdown from "react-markdown";
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
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-[#C89B3C] mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-[#CDBE91] mb-3 mt-6">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-medium text-[#CDBE91] mb-2 mt-4">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-[#F0E6D2] mb-4 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="text-[#F0E6D2] mb-4 ml-6 list-disc">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="text-[#F0E6D2] mb-4 ml-6 list-decimal">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-[#F0E6D2] mb-1">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#C89B3C] pl-4 italic text-[#CDBE91] my-4">
                  {children}
                </blockquote>
              ),
              code: (props) => {
                const { children, className } = props;
                const inline = !className;
                if (inline) {
                  return (
                    <code className="bg-[#1E272C] px-2 py-1 rounded text-[#C89B3C] font-mono">
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-[#1E272C] p-4 rounded overflow-x-auto my-4">
                    <code className="text-[#CDBE91] font-mono">{children}</code>
                  </pre>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}