import { cn } from "@/lib/utils";
import { Sparkles, Heart, Star, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export interface VibeCardData {
  quote: string;
  interpretation: string;
  luckyColor: string;
  luckyNumber: number;
  dailyTask: string;
  theme: string;
  aesthetic: string;
}

interface VibeCardProps {
  data: VibeCardData;
  isRevealed: boolean;
  onReveal?: () => void;
}

const aestheticStyles: Record<string, { bg: string; border: string; accent: string; font: string }> = {
  "Neon Cyberpunk": {
    bg: "bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#2d1b4e]",
    border: "border-neon-cyan shadow-glow-cyan",
    accent: "text-neon-cyan",
    font: "font-display",
  },
  "Kawaii Pastel": {
    bg: "bg-gradient-to-br from-pink-200/20 via-purple-200/20 to-blue-200/20",
    border: "border-pink-300/50 shadow-glow-pink",
    accent: "text-pink-300",
    font: "font-body",
  },
  "Mystic Purple Tarot": {
    bg: "bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#4a1c6e]",
    border: "border-primary shadow-neon",
    accent: "text-primary",
    font: "font-display",
  },
  "Retro Sunset": {
    bg: "bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-600/20",
    border: "border-orange-400/50",
    accent: "text-orange-300",
    font: "font-display",
  },
  "Minimal Zen": {
    bg: "bg-gradient-to-br from-gray-800/50 to-gray-900/50",
    border: "border-gray-500/30",
    accent: "text-gray-300",
    font: "font-body",
  },
  "Celestial Stars": {
    bg: "bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-blue-900/50",
    border: "border-indigo-400/50 shadow-glow-purple",
    accent: "text-indigo-300",
    font: "font-display",
  },
};

const VibeCard = ({ data, isRevealed, onReveal }: VibeCardProps) => {
  const [showSparkles, setShowSparkles] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  
  const style = aestheticStyles[data.aesthetic] || aestheticStyles["Mystic Purple Tarot"];

  useEffect(() => {
    if (isRevealed) {
      setShowSparkles(true);
      setTimeout(() => setCardFlipped(true), 100);
      setTimeout(() => setShowSparkles(false), 2000);
    }
  }, [isRevealed]);

  const handleClick = () => {
    if (!isRevealed && onReveal) {
      onReveal();
    }
  };

  return (
    <div className="relative perspective-1000" onClick={handleClick}>
      {/* Sparkles overlay */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(12)].map((_, i) => (
            <Sparkles
              key={i}
              className={cn(
                "absolute text-neon-yellow animate-sparkle",
                `w-${3 + (i % 3)} h-${3 + (i % 3)}`
              )}
              style={{
                left: `${10 + (i * 7)}%`,
                top: `${10 + ((i * 13) % 80)}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      <div
        className={cn(
          "relative w-72 sm:w-80 min-h-[420px] rounded-3xl p-6 border-2 transition-all duration-700",
          style.bg,
          style.border,
          style.font,
          "cursor-pointer transform-gpu",
          !isRevealed && "hover:scale-105",
          cardFlipped ? "animate-bounce-in" : ""
        )}
      >
        {!isRevealed ? (
          /* Card back */
          <div className="flex flex-col items-center justify-center h-full min-h-[380px] gap-4">
            <div className="relative">
              <Star className="w-16 h-16 text-primary animate-spin-slow" fill="currentColor" />
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-neon-yellow animate-sparkle" />
            </div>
            <p className="text-muted-foreground text-center mt-4">
              Tap to reveal your vibe
            </p>
          </div>
        ) : (
          /* Card front */
          <div className="flex flex-col h-full gap-4 animate-slide-up">
            {/* Theme badge */}
            <div className="flex items-center justify-between">
              <span className={cn("text-xs uppercase tracking-wider", style.accent)}>
                {data.theme}
              </span>
              <Sparkles className={cn("w-4 h-4", style.accent)} />
            </div>

            {/* Quote */}
            <div className="flex-1 flex items-center">
              <blockquote className="text-lg sm:text-xl font-medium text-foreground leading-relaxed">
                "{data.quote}"
              </blockquote>
            </div>

            {/* Interpretation */}
            <p className="text-sm text-muted-foreground italic">
              {data.interpretation}
            </p>

            {/* Divider */}
            <div className={cn("h-px w-full", `bg-gradient-to-r from-transparent via-current to-transparent`, style.accent)} />

            {/* Lucky items */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Heart className={cn("w-4 h-4", style.accent)} />
                <span className="text-muted-foreground">Lucky Color:</span>
                <span className="font-medium">{data.luckyColor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className={cn("w-4 h-4", style.accent)} />
                <span className="text-muted-foreground">Number:</span>
                <span className="font-medium">{data.luckyNumber}</span>
              </div>
            </div>

            {/* Daily task */}
            <div className="bg-muted/30 rounded-xl p-3 mt-2">
              <div className="flex items-center gap-2 mb-1">
                <Zap className={cn("w-4 h-4", style.accent)} />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Today's Task
                </span>
              </div>
              <p className="text-sm font-medium">{data.dailyTask}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VibeCard;
