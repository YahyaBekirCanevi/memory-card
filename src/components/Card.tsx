import { Word } from "@/data/Word";
import { useEffect, useState } from "react";

type CardProps = Word;

export default function Card({ word, meaning, example, translation }: CardProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [word, meaning, example, translation]);

  const handleFlip = () => setFlipped((prev) => !prev);

  return (
    <div className="card-container flex justify-center items-center">
      <div
        className={`card ${flipped ? "flipped" : ""} w-64 h-40 bg-secondary text-background font-bold flex items-center justify-center rounded-xl shadow-lg cursor-pointer transition-transform`}
        onClick={handleFlip}
      >
        <div className="card-front flex items-center justify-center">
          {word}
        </div>
        <div className="card-back p-4">
          <h3 className="text-xl">{meaning}</h3>
          <p className="text-sm mt-2">{example}</p>
          <p className="text-xs italic">{translation}</p>
        </div>
      </div>
    </div>
  );
}
