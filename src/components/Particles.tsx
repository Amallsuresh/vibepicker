import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  animationDelay: string;
  animationDuration: string;
  size: number;
  color: string;
}

const Particles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(280 100% 70%)",
      "hsl(180 100% 50%)",
      "hsl(320 100% 65%)",
      "hsl(50 100% 60%)",
    ];

    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${8 + Math.random() * 8}s`,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(newParticles);
  }, []);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
            width: particle.size,
            height: particle.size,
            background: particle.color,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
