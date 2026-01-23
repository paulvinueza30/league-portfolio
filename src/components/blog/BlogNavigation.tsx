import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, Twitter, Linkedin, Mail, House } from "lucide-react"
import { Link } from "react-router-dom"

export default function BlogNavigation() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="h-9 w-9 border-2 border-[#463714] text-[#CDBE91] hover:border-[#C89B3C] hover:bg-[#1E272C] hover:text-[#F0E6D2]"
      >
        <Link to="/">
          <House className=" h-4 w-4" />
        </Link>
      </Button>

      <div className="flex items-center gap-2">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-9 w-9 border-2 border-[#463714] text-[#CDBE91] hover:border-[#C89B3C] hover:bg-[#1E272C] hover:text-[#F0E6D2]"
        >
          <a href="https://github.com/paulvinueza30" target="_blank" rel="noopener noreferrer">
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
          <a href="https://www.linkedin.com/in/paul-vinueza/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-9 w-9 border-2 border-[#463714] bg-[#0A1428] text-[#CDBE91] hover:border-[#C89B3C] hover:bg-[#1E272C] hover:text-[#F0E6D2]"
        >
          <a href="https://x.com/ctrlaltbachata" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </a>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-9 w-9 border-2 border-[#463714] text-[#CDBE91] hover:border-[#C89B3C] hover:bg-[#1E272C] hover:text-[#F0E6D2]"
        >
          <a href="mailto:paulvinueza30@gmail.com">
            <Mail className="h-4 w-4" />
            <span className="sr-only">Email</span>
          </a>
        </Button>
      </div>
    </div>
  )
}