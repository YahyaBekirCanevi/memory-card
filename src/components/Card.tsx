import { Word } from "@/data/Word";
import useSpeech from "@/hooks/useSpeech";
import { MouseEventHandler, useEffect, useState } from "react";
import { IoMdVolumeHigh } from "react-icons/io";

type CardProps = Word;

export default function Card({
  word,
  meaning,
  example,
  translation,
}: CardProps) {
  const [flipped, setFlipped] = useState(false);
  const { speak, isSpeaking } = useSpeech();

  useEffect(() => {
    setFlipped(false);
  }, [word, meaning, example, translation]);

  const handleFlip: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setFlipped((prev) => !prev);
  }

  const handleSpeech: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    speak(word);
  }

  return (
    <div className="card-container flex justify-center items-center">
      <div
        className={`card ${
          flipped ? "flipped" : ""
        } w-64 h-40 bg-secondary text-background font-bold flex items-center justify-center rounded-xl shadow-lg cursor-pointer transition-transform`}
        onClick={handleFlip}
      >
        <div className="card-front flex items-center justify-center">
          {word}
          <button
            onClick={handleSpeech}
            className="mt-2 ml-2 flex items-center justify-center bg-primary p-2 rounded-full"
          >
            <IoMdVolumeHigh
              size={24}
              className={isSpeaking ? "animate-pulse" : ""}
            />
          </button>
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
