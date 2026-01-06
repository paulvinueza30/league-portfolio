import BlogList from "@/components/blog"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      description: "Learn the basics of building modern web applications with Next.js and React.",
      date: "2024-01-15",
      slug: "getting-started-nextjs",
    },
    {
      id: 1,
      title: "Getting Started with Next.js",
      description: "Learn the basics of building modern web applications with Next.js and React.",
      date: "2024-01-15",
      slug: "getting-started-nextjs",
    },
    {
      id: 1,
      title: "Getting Started with Next.js",
      description: "Learn the basics of building modern web applications with Next.js and React.",
      date: "2024-01-15",
      slug: "getting-started-nextjs",
    },
    {
      id: 2,
      title: "Building Scalable APIs",
      description: "Best practices for designing and implementing scalable REST APIs.",
      date: "2024-01-10",
      slug: "building-scalable-apis",
    },
    {
      id: 3,
      title: "TypeScript Tips & Tricks",
      description: "Advanced TypeScript patterns to write better, type-safe code.",
      date: "2024-01-05",
      slug: "typescript-tips-tricks",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      description: "Core principles for creating intuitive and beautiful user interfaces.",
      date: "2023-12-28",
      slug: "ui-ux-design-principles",
    },
  ]

  return <BlogList posts={blogPosts} />
}
