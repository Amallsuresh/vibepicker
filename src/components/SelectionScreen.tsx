import { useState } from "react";
import { Button } from "@/components/ui/button";
import SelectionChip from "./SelectionChip";
import { cn } from "@/lib/utils";
import { 
  Sparkles, Heart, Zap, Brain, Smile, MessageCircle, 
  Moon, Coffee, Flame, CloudRain, Frown, Clock, Battery
} from "lucide-react";

interface SelectionScreenProps {
  onComplete: (selections: {
    theme: string;
    aesthetic: string;
    mood: string;
  }) => void;
  onBack: () => void;
}

const themes = [
  { label: "Motivational", icon: <Zap className="w-4 h-4" /> },
  { label: "Optimistic", icon: <Sparkles className="w-4 h-4" /> },
  { label: "Healing", icon: <Heart className="w-4 h-4" /> },
  { label: "Confidence", icon: <Flame className="w-4 h-4" /> },
  { label: "Love & Relationships", icon: <Heart className="w-4 h-4" /> },
  { label: "Productivity", icon: <Brain className="w-4 h-4" /> },
  { label: "Humor", icon: <Smile className="w-4 h-4" /> },
  { label: "Mystic / Tarot", icon: <Moon className="w-4 h-4" /> },
];

const aesthetics = [
  { label: "Neon Cyberpunk", icon: "🌃" },
  { label: "Kawaii Pastel", icon: "🌸" },
  { label: "Mystic Purple Tarot", icon: "🔮" },
  { label: "Retro Sunset", icon: "🌅" },
  { label: "Minimal Zen", icon: "🪷" },
  { label: "Celestial Stars", icon: "✨" },
];

const moods = [
  { label: "Happy", icon: "😄" },
  { label: "Low", icon: "😔" },
  { label: "Angry", icon: "😡" },
  { label: "Tired", icon: "😴" },
  { label: "Stressed", icon: "😖" },
  { label: "Need Comfort", icon: "🤍" },
  { label: "Excited", icon: "🔥" },
];

const SelectionScreen = ({ onComplete, onBack }: SelectionScreenProps) => {
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedAesthetic, setSelectedAesthetic] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [step, setStep] = useState(0);

  const canProceed = step === 0 
    ? selectedTheme !== "" 
    : step === 1 
    ? selectedAesthetic !== "" 
    : selectedMood !== "";

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onComplete({
        theme: selectedTheme,
        aesthetic: selectedAesthetic,
        mood: selectedMood,
      });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <div className="max-w-2xl w-full">
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === step 
                  ? "w-8 bg-primary shadow-neon" 
                  : i < step 
                  ? "w-4 bg-primary/50" 
                  : "w-4 bg-muted"
              )}
            />
          ))}
        </div>

        {/* Step 0: Theme selection */}
        {step === 0 && (
          <div className="animate-slide-up">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-2">
              What energy do you need today?
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Choose a quote theme that speaks to you
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {themes.map((theme) => (
                <SelectionChip
                  key={theme.label}
                  label={theme.label}
                  icon={theme.icon}
                  selected={selectedTheme === theme.label}
                  onClick={() => setSelectedTheme(theme.label)}
                  variant="default"
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Aesthetic selection */}
        {step === 1 && (
          <div className="animate-slide-up">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-2">
              Pick your card aesthetic
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Choose how your vibe card will look
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {aesthetics.map((aesthetic) => (
                <SelectionChip
                  key={aesthetic.label}
                  label={aesthetic.label}
                  icon={aesthetic.icon}
                  selected={selectedAesthetic === aesthetic.label}
                  onClick={() => setSelectedAesthetic(aesthetic.label)}
                  variant="aesthetic"
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Mood selection */}
        {step === 2 && (
          <div className="animate-slide-up">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-2">
              How are you feeling right now?
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              We'll tailor your vibe to match your mood
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {moods.map((mood) => (
                <SelectionChip
                  key={mood.label}
                  label={mood.label}
                  icon={mood.icon}
                  selected={selectedMood === mood.label}
                  onClick={() => setSelectedMood(mood.label)}
                  variant="mood"
                />
              ))}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
          >
            Back
          </Button>
          
          <Button
            variant="cosmic"
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="min-w-[160px]"
          >
            {step === 2 ? (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Shuffle the Universe
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectionScreen;
