import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          ref={ref}
          className="sr-only peer"
          {...props}
        />
        <div
          className={cn(
            "w-5 h-5 rounded-sm border-2 border-[#C8AA6E] bg-[#0A0E13] transition-all duration-100 flex items-center justify-center",
            "peer-checked:bg-[#C8AA6E] peer-checked:border-[#F0E6D2]",
            "group-hover:border-[#F0E6D2]",
            className
          )}
        >
          <Check className="h-4 w-4 text-[#0A0E13] opacity-0 transition-opacity peer-checked:opacity-100" />
        </div>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
