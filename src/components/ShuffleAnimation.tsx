import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface ShuffleAnimationProps {
  onComplete: () => void;
}

const ShuffleAnimation = ({ onComplete }: ShuffleAnimationProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => onComplete(), 2200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-8">
      {/* Orbiting cards */}
      <div className="relative w-48 h-48">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "absolute top-1/2 left-1/2 w-20 h-28 rounded-xl border-2 border-primary/50",
              "bg-gradient-card transition-all duration-500",
              phase >= 1 && "animate-shuffle"
            )}
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 120 + phase * 60}deg) translateX(${phase < 3 ? 60 : 0}px)`,
              opacity: phase < 3 ? 1 : 0,
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            <div className="flex items-center justify-center h-full">
              <Sparkles className="w-6 h-6 text-primary animate-sparkle" />
            </div>
          </div>
        ))}
        
        {/* Center merge effect */}
        {phase >= 2 && (
          <div 
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-24 h-32 rounded-xl border-2 border-primary",
              "bg-gradient-to-br from-primary/30 to-accent/30",
              "shadow-neon animate-pulse-glow",
              phase >= 3 && "scale-110"
            )}
          >
            <div className="flex items-center justify-center h-full">
              <Sparkles className="w-8 h-8 text-neon-yellow animate-sparkle" />
            </div>
          </div>
        )}
      </div>

      {/* Loading text */}
      <div className="text-center">
        <p className="text-lg font-display text-foreground glow-text animate-pulse">
          {phase < 2 
            ? "Shuffling the universe..." 
            : phase < 3 
            ? "Aligning your energy..." 
            : "Your vibe is ready!"}
        </p>
        
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i <= phase ? "bg-primary shadow-neon scale-125" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShuffleAnimation;
