import { Button } from "@/components/ui/button";
import { Sparkles, Star, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-1/4 animate-float">
        <div className="w-16 h-24 rounded-xl border-2 border-primary/30 bg-gradient-card rotate-12 shadow-neon" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float-delayed">
        <div className="w-14 h-20 rounded-xl border-2 border-secondary/30 bg-gradient-card -rotate-12 shadow-glow-cyan" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float-slow">
        <div className="w-12 h-18 rounded-xl border-2 border-accent/30 bg-gradient-card rotate-6 shadow-glow-pink" />
      </div>

      {/* Main content */}
      <div className="text-center max-w-2xl mx-auto">
        {/* Icon cluster */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Moon className="w-8 h-8 text-primary animate-float" />
          <Star className="w-12 h-12 text-neon-yellow animate-sparkle" fill="currentColor" />
          <Sparkles className="w-8 h-8 text-secondary animate-float-delayed" />
        </div>

        {/* Title */}
        <h1 className={cn(
          "font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
          "mb-6 leading-tight"
        )}>
          <span className="text-gradient">Pick Your</span>
          <br />
          <span className="text-foreground glow-text">Daily Vibe Card</span>
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg sm:text-xl mb-10 max-w-md mx-auto">
          Let the universe guide you with a personalized quote, lucky numbers, and cosmic energy just for today.
        </p>

        {/* CTA Button */}
        <Button
          variant="cosmic"
          size="xl"
          onClick={onStart}
          className="group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-5 h-5 group-hover:animate-sparkle" />
            Start Your Journey
            <Sparkles className="w-5 h-5 group-hover:animate-sparkle" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </Button>

        {/* Sub-info */}
        <p className="text-muted-foreground/60 text-sm mt-6">
          ✨ Free • No signup required • Unlimited vibes
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
