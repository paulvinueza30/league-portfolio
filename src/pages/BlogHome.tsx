
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export default function BlogPage() {
  // Sample blog posts - replace with your actual blog data
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
    }, {
      id: 1,
      title: "Getting Started with Next.js",
      description: "Learn the basics of building modern web applications with Next.js and React.",
      date: "2024-01-15",
      slug: "getting-started-nextjs",
    }, {
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

  return (
    <div className="min-h-screen bg-[#0A1428]">
      <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col items-center justify-items-center">
        <img className="w-16 h-16 mb-8" src="/league-p.png" />
        <h1 className="text-balance text-4xl font-bold mb-4 tracking-tight text-[#F0E6D2] md:text-5xl">Blog </h1>
        <p className="text-lg text-[#CDBE91]">Thoughts, tutorials, and insights on web development</p>

        {/* Navigation & Socials */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="border-2 border-[#463714] bg-[#0A1428] text-[#CDBE91] hover:border-[#C89B3C] hover:bg-[#1E272C] hover:text-[#F0E6D2]"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-9 w-9 border-2 border-[#463714] text-[#CDBE91] hover:border-[#C89B3C] hover:bg-[#1E272C] hover:text-[#F0E6D2]"
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-9 w-9 border-2 border-[#463714] bg-[#0A1428] text-[#CDBE91] hover:border-[#C89B3C] hover:bg-[#1E272C] hover:text-[#F0E6D2]"
            >
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-9 w-9 border-2 border-[#463714] bg-[#0A1428] text-[#CDBE91] hover:border-[#C89B3C]  hover:bg-[#1E272C] hover:text-[#F0E6D2]"
            >
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-9 w-9 border-2 border-[#463714] text-[#CDBE91] hover:border-[#C89B3C]  hover:bg-[#1E272C] hover:text-[#F0E6D2]"
            >
              <a href="mailto:hello@example.com">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 mx-[8em]">
        {blogPosts.map((post) => (
          <Card className="bg-[#010A13] border-2 border-[#463714] transition-all hover:border-[#C89B3C] hover:bg-[#1E272C]">
            <CardHeader>
              <div className="mb-2 text-sm text-[#BCAC88]">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <CardTitle className="text-balance text-xl text-[#F0E6D2]">{post.title}</CardTitle>
              <CardDescription className="text-pretty text-[#CDBE91]">{post.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div >
  )
}
