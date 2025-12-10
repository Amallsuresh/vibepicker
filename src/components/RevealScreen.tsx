import { useState } from "react";
import { Button } from "@/components/ui/button";
import VibeCard, { VibeCardData } from "./VibeCard";
import { Download, Share2, RefreshCw, ArrowLeft, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface RevealScreenProps {
  cardData: VibeCardData;
  onPickAnother: () => void;
  onHome: () => void;
  streak: number;
}

const RevealScreen = ({ cardData, onPickAnother, onHome, streak }: RevealScreenProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to localStorage or a database
    const savedCards = JSON.parse(localStorage.getItem("vibeCards") || "[]");
    savedCards.push({ ...cardData, savedAt: new Date().toISOString() });
    localStorage.setItem("vibeCards", JSON.stringify(savedCards));
    
    toast({
      title: "Card Saved! ✨",
      description: "Your vibe card has been saved to your collection.",
    });
  };

  const handleShare = async () => {
    const shareText = `🌟 My Daily Vibe Card 🌟\n\n"${cardData.quote}"\n\n💫 Lucky Color: ${cardData.luckyColor}\n🔢 Lucky Number: ${cardData.luckyNumber}\n\nGet your own vibe card!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Daily Vibe Card",
          text: shareText,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard! 📋",
        description: "Share your vibe with the world!",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      {/* Streak counter */}
      {streak > 0 && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2 border border-primary/30">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="font-bold text-foreground">{streak}</span>
          <span className="text-muted-foreground text-sm">day streak</span>
        </div>
      )}

      {/* Card */}
      <div className="mb-8">
        <VibeCard 
          data={cardData} 
          isRevealed={isRevealed}
          onReveal={() => setIsRevealed(true)}
        />
      </div>

      {/* Action buttons - only show after reveal */}
      {isRevealed && (
        <div className="animate-slide-up space-y-4 w-full max-w-xs">
          {/* Energy boost indicator */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-1">
                <span className="text-lg">💙</span>
              </div>
              <span className="text-xs text-muted-foreground">Emotional</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center mx-auto mb-1">
                <span className="text-lg">🔥</span>
              </div>
              <span className="text-xs text-muted-foreground">Motivation</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-1">
                <span className="text-lg">🌿</span>
              </div>
              <span className="text-xs text-muted-foreground">Calmness</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleSave}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              variant="neon"
              size="lg"
              onClick={handleShare}
              className="flex-1"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <Button
            variant="cosmic"
            size="lg"
            onClick={onPickAnother}
            className="w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Pick Another Card
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={onHome}
            className="w-full text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      )}

      {!isRevealed && (
        <p className="text-muted-foreground animate-pulse text-center">
          Tap the card to reveal your vibe ✨
        </p>
      )}
    </div>
  );
};

export default RevealScreen;
