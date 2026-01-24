import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { BlogPost } from "@/types/blog"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="w-full bg-[#010A13] border-2 border-[#463714] transition-all hover:border-[#C89B3C] hover:bg-[#1E272C] select-none">
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
  )
}

