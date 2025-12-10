import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface SelectionChipProps {
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  variant?: "default" | "mood" | "aesthetic";
}

const SelectionChip = ({ 
  label, 
  icon, 
  selected, 
  onClick, 
  variant = "default" 
}: SelectionChipProps) => {
  const [isWiggling, setIsWiggling] = useState(false);

  const handleClick = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
    onClick?.();
  };

  const variantStyles = {
    default: selected 
      ? "bg-primary/30 border-primary text-foreground shadow-neon" 
      : "bg-muted/50 border-muted-foreground/20 text-muted-foreground hover:border-primary/50 hover:bg-primary/10",
    mood: selected
      ? "bg-accent/30 border-accent text-foreground shadow-glow-pink"
      : "bg-muted/50 border-muted-foreground/20 text-muted-foreground hover:border-accent/50 hover:bg-accent/10",
    aesthetic: selected
      ? "bg-secondary/30 border-secondary text-foreground shadow-glow-cyan"
      : "bg-muted/50 border-muted-foreground/20 text-muted-foreground hover:border-secondary/50 hover:bg-secondary/10",
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "px-4 py-3 rounded-2xl border-2 transition-all duration-300 flex items-center gap-2",
        "hover:scale-105 active:scale-95 cursor-pointer",
        variantStyles[variant],
        isWiggling && "animate-wiggle"
      )}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
};

export default SelectionChip;
