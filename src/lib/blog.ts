export interface BlogPost {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at?: string;
}

export interface BlogResponse {
  data: BlogPost[];
  timestamp: number;
  source: string;
}

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }
  const data: BlogResponse = await response.json();
  return data.data;
};

export const fetchBlogPost = async (slug: string): Promise<BlogPost> => {
  const response = await fetch(`/api/posts/${slug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog post");
  }
  return response.json();
};