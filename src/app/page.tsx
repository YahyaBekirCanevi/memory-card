"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 min-h-[600px]">
      <div className="icon w-[240px] h-[240px]"/>
      <div className="space-y-2">
      <h1 className="text-4xl font-bold text-secondary">
        Welcome to{" "}
        <span className="font-extrabold tracking-tight underline text-primary">
        BrainBolt
        </span>
      </h1>
      <p className="text-lg text-secondary">
        Learn German words with interactive flashcards.
      </p>
      </div>
      <div className="flex space-x-4">
        <Link href="/quiz" className="btn">
          Start Quiz
        </Link>
        <Link href="/learn" className="btn">
          Learn All Words
        </Link>
      </div>
    </div>
  );
}
