"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { Word } from "@/data/Word";

export default function Learn() {
  const [words, setWords] = useState<Word[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_AMOUNT = 12;

  useEffect(() => {
    fetch(`/api/words?amount=${PAGE_AMOUNT}&page=${page}`)
      .then(async (res) => {
        if (!res.ok)
          throw new Error(`Error ${res.status}: ${await res.text()}`);
        return res.json();
      })
      .then((data: Word[]) => setWords([...words, ...data]))
      .catch((err) => setError(err.message));
  }, [page]);

  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-secondary ml-8 mb-6 w-full">
        Words
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {words.length > 0 &&
          words.map((word, index) => <Card key={index} {...word} />)}
      </div>

      <div className="flex flex-col justify-center items-center w-full mt-24 mb-16">
        <button className="btn" onClick={() => setPage((prev) => prev + 1)} >Load More</button>
      </div>
    </div>
  );
}
