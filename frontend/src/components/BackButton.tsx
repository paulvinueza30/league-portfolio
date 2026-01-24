import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Use ArrowLeft icon

interface BackButtonProps {
  to?: string;
  className?: string;
}

export default function BackButton({ to = "/", className }: BackButtonProps) { // Default to "/"
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        onClick={() => navigate(to)}
        className="p-2 rounded-md bg-[#1a1a1a]/70 border border-[#534631]/60 text-[#c8aa6e]/80 hover:bg-[#534631]/30 hover:text-[#c8aa6e] transition-all duration-200 shadow-md"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <span className="text-xs text-[#c8aa6e]/70 mt-1 font-medium">Back to Config</span>
    </div>
  );
}