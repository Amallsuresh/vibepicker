import { VibeCardData } from "@/components/VibeCard";

const quotesByTheme: Record<string, Array<{ quote: string; interpretation: string }>> = {
  "Motivational": [
    { quote: "The only way to do great work is to love what you do.", interpretation: "Passion fuels excellence. Find joy in your journey." },
    { quote: "Your limitation—it's only your imagination.", interpretation: "Break free from self-imposed boundaries today." },
    { quote: "Push yourself, because no one else is going to do it for you.", interpretation: "You are your own greatest champion." },
    { quote: "Great things never come from comfort zones.", interpretation: "Growth awaits just beyond your fears." },
    { quote: "Dream it. Believe it. Build it.", interpretation: "Every great achievement starts with a vision." },
  ],
  "Optimistic": [
    { quote: "Every day is a fresh start, a new chapter waiting to unfold.", interpretation: "Today holds infinite possibilities." },
    { quote: "The sun is always shining above the clouds.", interpretation: "Hope persists even in dark moments." },
    { quote: "Good things are coming. Keep believing.", interpretation: "Trust the timing of your life." },
    { quote: "You're closer than you think.", interpretation: "Persistence is about to pay off." },
    { quote: "Today's energy is tomorrow's reality.", interpretation: "Your positive vibes are creating your future." },
  ],
  "Healing": [
    { quote: "You are allowed to be both a masterpiece and a work in progress.", interpretation: "Embrace your journey of growth." },
    { quote: "Healing is not linear. Be gentle with yourself.", interpretation: "Every step forward counts, even the small ones." },
    { quote: "Your wounds are where the light enters you.", interpretation: "Pain transforms into wisdom and strength." },
    { quote: "Rest is not a reward. It is a necessity.", interpretation: "Taking care of yourself is productive." },
    { quote: "You've survived 100% of your worst days.", interpretation: "You're stronger than you realize." },
  ],
  "Confidence": [
    { quote: "You are the entire ocean in a drop.", interpretation: "Your potential is limitless and deep." },
    { quote: "Doubt kills more dreams than failure ever will.", interpretation: "Trust yourself and take the leap." },
    { quote: "You didn't come this far to only come this far.", interpretation: "Keep pushing—greatness awaits." },
    { quote: "Be the energy you want to attract.", interpretation: "Your confidence radiates and returns to you." },
    { quote: "Own your story. Write your next chapter.", interpretation: "You are the author of your destiny." },
  ],
  "Love & Relationships": [
    { quote: "Love begins with the way you treat yourself.", interpretation: "Self-love is the foundation of all love." },
    { quote: "The right people will find their way to you.", interpretation: "Trust the connections that feel natural." },
    { quote: "Be the love you never received.", interpretation: "Break cycles and create new patterns." },
    { quote: "Hearts that understand each other speak a silent language.", interpretation: "True connection transcends words." },
    { quote: "Love is not about finding the right person, but being the right person.", interpretation: "Growth attracts growth." },
  ],
  "Productivity": [
    { quote: "Small daily improvements lead to stunning results.", interpretation: "Focus on the 1% that compounds." },
    { quote: "Don't count the days. Make the days count.", interpretation: "Quality over quantity in all you do." },
    { quote: "The secret of getting ahead is getting started.", interpretation: "Action defeats overthinking." },
    { quote: "Focus on progress, not perfection.", interpretation: "Done is better than perfect." },
    { quote: "Your future self will thank you.", interpretation: "Every small effort today builds tomorrow." },
  ],
  "Humor": [
    { quote: "I'm not lazy, I'm on energy-saving mode.", interpretation: "Sometimes rest is the most productive thing." },
    { quote: "Life is short. Smile while you still have teeth.", interpretation: "Find joy in the little moments." },
    { quote: "I put the 'pro' in procrastinate.", interpretation: "But hey, you're here now—that counts!" },
    { quote: "Be a pineapple: stand tall, wear a crown, and be sweet inside.", interpretation: "Quirky confidence is the best kind." },
    { quote: "Today's goal: be less of a mess than yesterday.", interpretation: "Progress is progress, no matter how small!" },
  ],
  "Mystic / Tarot": [
    { quote: "The universe is conspiring in your favor.", interpretation: "Unseen forces are aligning for your highest good." },
    { quote: "What is meant for you will find you.", interpretation: "Trust divine timing and release control." },
    { quote: "The stars have been watching over your journey.", interpretation: "You are guided by cosmic wisdom." },
    { quote: "Your intuition is your inner compass. Trust it.", interpretation: "The answers you seek are within." },
    { quote: "New moons bring new beginnings.", interpretation: "A cycle of renewal is upon you." },
  ],
};

const moodModifiers: Record<string, string[]> = {
  "Happy": ["Ride this wave of joy!", "Your happiness is contagious today.", "Celebrate this beautiful energy."],
  "Low": ["Even the darkest night will end.", "It's okay to not be okay.", "This too shall pass, dear one."],
  "Angry": ["Channel this fire into transformation.", "Your anger is valid. Use it wisely.", "Let it fuel positive change."],
  "Tired": ["Rest is sacred. Honor your needs.", "Recharge—you've earned it.", "Tomorrow will bring fresh energy."],
  "Stressed": ["Breathe. You are exactly where you need to be.", "One step at a time.", "Release what you cannot control."],
  "Need Comfort": ["You are loved more than you know.", "Wrap yourself in gentle self-care.", "The universe holds you tenderly."],
  "Excited": ["This energy is magnetic!", "Great things are on the horizon.", "Let your enthusiasm light the way."],
};

const luckyColors = [
  "Cosmic Purple", "Ocean Teal", "Sunset Orange", "Moonlight Silver", 
  "Rose Quartz", "Forest Green", "Golden Honey", "Midnight Blue",
  "Coral Pink", "Sage Green", "Electric Blue", "Warm Amber"
];

const dailyTasks = [
  "Send a kind message to someone you appreciate",
  "Take 5 minutes to breathe deeply and center yourself",
  "Write down 3 things you're grateful for",
  "Drink an extra glass of water",
  "Step outside and feel the sun (or rain!) on your face",
  "Listen to a song that makes you feel alive",
  "Compliment yourself in the mirror",
  "Do one small thing that sparks joy",
  "Reach out to an old friend",
  "Move your body in a way that feels good",
  "Put your phone down for 30 minutes",
  "Create something, no matter how small",
  "Say 'no' to something that drains you",
  "Say 'yes' to something exciting",
  "Journal one page about your feelings",
];

export function generateVibeCard(
  theme: string,
  aesthetic: string,
  mood: string
): VibeCardData {
  const themeQuotes = quotesByTheme[theme] || quotesByTheme["Motivational"];
  const randomQuote = themeQuotes[Math.floor(Math.random() * themeQuotes.length)];
  
  const moodMods = moodModifiers[mood] || moodModifiers["Happy"];
  const moodBoost = moodMods[Math.floor(Math.random() * moodMods.length)];
  
  return {
    quote: randomQuote.quote,
    interpretation: `${randomQuote.interpretation} ${moodBoost}`,
    luckyColor: luckyColors[Math.floor(Math.random() * luckyColors.length)],
    luckyNumber: Math.floor(Math.random() * 99) + 1,
    dailyTask: dailyTasks[Math.floor(Math.random() * dailyTasks.length)],
    theme,
    aesthetic,
  };
}
