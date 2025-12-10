import { useState, useEffect } from "react";
import Particles from "@/components/Particles";
import FloatingElements from "@/components/FloatingElements";
import HeroSection from "@/components/HeroSection";
import SelectionScreen from "@/components/SelectionScreen";
import ShuffleAnimation from "@/components/ShuffleAnimation";
import RevealScreen from "@/components/RevealScreen";
import { VibeCardData } from "@/components/VibeCard";
import { generateVibeCard } from "@/lib/quoteGenerator";

type Screen = "home" | "selection" | "shuffle" | "reveal";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selections, setSelections] = useState<{
    theme: string;
    aesthetic: string;
    mood: string;
  } | null>(null);
  const [cardData, setCardData] = useState<VibeCardData | null>(null);
  const [streak, setStreak] = useState(0);

  // Load streak from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem("vibeStreak");
    const lastVisit = localStorage.getItem("vibeLastVisit");
    const today = new Date().toDateString();
    
    if (savedStreak && lastVisit) {
      const lastVisitDate = new Date(lastVisit).toDateString();
      if (lastVisitDate === today) {
        setStreak(parseInt(savedStreak));
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastVisitDate === yesterday.toDateString()) {
          const newStreak = parseInt(savedStreak) + 1;
          setStreak(newStreak);
          localStorage.setItem("vibeStreak", newStreak.toString());
        } else {
          setStreak(1);
          localStorage.setItem("vibeStreak", "1");
        }
      }
    } else {
      setStreak(1);
      localStorage.setItem("vibeStreak", "1");
    }
    localStorage.setItem("vibeLastVisit", new Date().toISOString());
  }, []);

  const handleStart = () => {
    setCurrentScreen("selection");
  };

  const handleSelectionComplete = (newSelections: {
    theme: string;
    aesthetic: string;
    mood: string;
  }) => {
    setSelections(newSelections);
    setCurrentScreen("shuffle");
  };

  const handleShuffleComplete = () => {
    if (selections) {
      const newCard = generateVibeCard(
        selections.theme,
        selections.aesthetic,
        selections.mood
      );
      setCardData(newCard);
      setCurrentScreen("reveal");
    }
  };

  const handlePickAnother = () => {
    setCurrentScreen("selection");
    setCardData(null);
    setSelections(null);
  };

  const handleHome = () => {
    setCurrentScreen("home");
    setCardData(null);
    setSelections(null);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Particles />
      <FloatingElements />
      
      {currentScreen === "home" && (
        <HeroSection onStart={handleStart} />
      )}
      
      {currentScreen === "selection" && (
        <SelectionScreen 
          onComplete={handleSelectionComplete}
          onBack={handleHome}
        />
      )}
      
      {currentScreen === "shuffle" && (
        <ShuffleAnimation onComplete={handleShuffleComplete} />
      )}
      
      {currentScreen === "reveal" && cardData && (
        <RevealScreen 
          cardData={cardData}
          onPickAnother={handlePickAnother}
          onHome={handleHome}
          streak={streak}
        />
      )}
    </div>
  );
};

export default Index;
