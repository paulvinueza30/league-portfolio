import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { fetchBlogPosts, type BlogPost } from "@/lib/blog";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BlogModal } from "./BlogModal";

interface BlogPostsModalProps {
  onBack: () => void;
}

export function BlogPostsModal({ onBack }: BlogPostsModalProps) {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const { data: posts, isLoading, isError, error } = useQuery<BlogPost[], Error>({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  if (selectedPost) {
    return (
      <BlogModal
        slug={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    );
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-full text-[#F0E6D2]">Loading blog posts...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-full text-red-500">Error: {error?.message}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="flex justify-center items-center h-full text-[#F0E6D2]">No blog posts found.</div>;
  }

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#463714] hover:bg-[#C89B3C] text-[#CDBE91] rounded transition-colors"
        >
          ← Back to Projects
        </button>
        <h2 className="text-2xl font-bold text-[#C89B3C]">Blog Posts</h2>
        <div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {posts.map((post, idx) => (
          <Card
            key={idx}
            className="
              bg-[#0A1428]
              border-2 border-[#463714]
              hover:border-[#C89B3C]
              hover:bg-[#1E272C]
              cursor-pointer
              transition-all duration-300
              text-[#F0E6D2]
              shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]
            "
            onClick={() => setSelectedPost(post.title.toLowerCase().replace(/\s+/g, '-'))}
          >
            <CardHeader className="p-4">
              <h3 className="text-xl font-bold text-[#C89B3C]">{post.title}</h3>
              {post.created_at && (
                <time className="text-[#CDBE91] text-sm">
                  {new Date(post.created_at).toLocaleDateString()}
                </time>
              )}
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-[#F0E6D2] line-clamp-3">
                {post.content.slice(0, 150)}...
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}