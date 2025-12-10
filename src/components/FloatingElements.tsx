import { Sparkles, Star, Moon, Zap } from "lucide-react";

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating stars */}
      <Star 
        className="absolute top-[15%] left-[10%] text-neon-yellow w-6 h-6 animate-float opacity-60" 
        fill="currentColor"
      />
      <Star 
        className="absolute top-[25%] right-[15%] text-neon-pink w-4 h-4 animate-float-delayed opacity-50" 
        fill="currentColor"
      />
      <Star 
        className="absolute bottom-[30%] left-[20%] text-neon-cyan w-5 h-5 animate-float-slow opacity-40" 
        fill="currentColor"
      />
      
      {/* Floating moons */}
      <Moon 
        className="absolute top-[40%] right-[8%] text-primary w-8 h-8 animate-float opacity-30" 
        fill="currentColor"
      />
      <Moon 
        className="absolute bottom-[20%] right-[25%] text-accent w-6 h-6 animate-float-delayed opacity-25" 
      />
      
      {/* Sparkles */}
      <Sparkles 
        className="absolute top-[60%] left-[5%] text-neon-yellow w-5 h-5 animate-sparkle opacity-50" 
      />
      <Sparkles 
        className="absolute top-[10%] right-[30%] text-secondary w-4 h-4 animate-sparkle opacity-40" 
      />
      
      {/* Energy bolts */}
      <Zap 
        className="absolute bottom-[40%] right-[10%] text-neon-yellow w-4 h-4 animate-float-slow opacity-30" 
        fill="currentColor"
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-[20%] left-[30%] w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-[30%] right-[20%] w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-[50%] left-[50%] w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-float-slow" />
    </div>
  );
};

export default FloatingElements;
