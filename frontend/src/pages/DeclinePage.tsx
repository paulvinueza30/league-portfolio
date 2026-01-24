import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import BackButton from "@/components/BackButton"; // Import the new BackButton component

export default function DeclinePage() {
  return (
    <div className="min-h-screen bg-[#0A1428] w-full flex flex-col items-center justify-center text-center p-4 overflow-x-hidden relative"> {/* Added relative for absolute positioning */}
      <div className="absolute top-4 left-4 z-50">
        <BackButton />
      </div>
      <img
        src="/league-p.png"
        alt="Bouncing Favicon"
        className="w-24 h-24 mb-8 animate-bounce"
      />

      <h1 className="text-balance text-4xl sm:text-5xl font-bold mb-4 tracking-tight text-[#F0E6D2]">
        Oh, you declined, Summoner!
      </h1>
      <p className="text-lg sm:text-xl text-[#CDBE91] mb-8 max-w-2xl">
        Guess you decided against witnessing peak portfolio performance. Your loss, honestly.
      </p>

      <div className="flex justify-center mb-8">
        <Link
          to="/blog"
          className="px-6 py-3 bg-[#C8AA6E] hover:bg-[#F0E6D2] text-[#0A0E13] font-bold rounded border-2 border-[#A09B8C] transition-all duration-200 uppercase tracking-wider text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Definitely Not a Blog
        </Link>
      </div>
      
      <div className="mt-6 flex flex-wrap items-center gap-3 justify-center">
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
  );
}
