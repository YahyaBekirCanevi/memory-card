"use client";

import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { Word } from "@/data/Word";
import { FaCheck, FaStepForward, FaTimes } from "react-icons/fa";
import ResultPage from "@/components/Result";

export default function Quiz() {
  const [words, setWords] = useState<Word[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setDone] = useState(false);

  const [fails, setFails] = useState(0);
  const [skips, setSkips] = useState(0);
  const [successes, setSuccesses] = useState(0);

  useEffect(() => {
    fetch("/api/words?amount=10")
      .then(async (res) => {
        if (!res.ok)
          throw new Error(`Error ${res.status}: ${await res.text()}`);
        return res.json();
      })
      .then((data: Word[]) => setWords(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-red-400">{error}</div>;

  const handleButtonClick = (action: string) => {
    if (action === "success") {
      setSuccesses((prev) => prev + 1);
    } else if (action === "fail") {
      setFails((prev) => prev + 1);
    } else if (action === "skip") {
      setSkips((prev) => prev + 1);
    } else {
      return;
    }
    if (currentIndex === words.length - 1) {
      setDone(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="min-h-[600px] bg-background flex flex-col items-center justify-center">
      <>
        {/* Card display */}
        <div className="card-container mb-6">
          {words.slice(currentIndex, currentIndex + 1).map((word) => (
            <Card key={currentIndex} {...word} />
          ))}
        </div>
        {words.length > 0 && <div className="mt-4 mb-8">
          {currentIndex + 1} / {words.length}
        </div>}
        {/* Buttons */}
        {words.length > 0 && <div className="flex gap-6">
          <button
            onClick={() => handleButtonClick("fail")}
            className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition"
          >
            <FaTimes size={32} />
          </button>
          <button
            onClick={() => handleButtonClick("skip")}
            className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600 transition"
          >
            <FaStepForward size={32} />
          </button>
          <button
            onClick={() => handleButtonClick("success")}
            className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition"
          >
            <FaCheck size={32} />
          </button>
        </div>}
      </>

      {words.length > 0 && isDone && (
        <>
          <ResultPage fails={fails} skips={skips} successes={successes} />
        </>
      )}
    </div>
  );
}
