import { Separator } from "@/components/ui/separator";
import { Circle } from "lucide-react";

export function PlayerSeperator({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-row items-center text-[var(--color-brand-separator)] w-full ${className}`}>
      <Circle className="w-2 h-2 fill-[var(--color-brand-separator)]" />
      <Separator decorative={true} className="flex-1 bg-[var(--color-brand-separator)] " />
    </div>
  );
}