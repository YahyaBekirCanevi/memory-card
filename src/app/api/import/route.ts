import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Word from "@/models/Word";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ error: "Invalid input, expected an array of words" }, { status: 400 });
    }

    // Validate input structure
    const newWords = body.filter(
      (word) =>
        typeof word.word === "string" &&
        typeof word.meaning === "string" &&
        typeof word.example === "string" &&
        typeof word.translation === "string" &&
        typeof word.category === "string"
    );

    if (newWords.length === 0) {
      return NextResponse.json({ error: "No valid words provided" }, { status: 400 });
    }

    // Avoid duplicates by checking existing words
    const existingWords = await Word.find({ word: { $in: newWords.map(w => w.word) } });
    const existingWordsSet = new Set(existingWords.map(w => w.word));

    const filteredWords = newWords.filter(word => !existingWordsSet.has(word.word));

    if (filteredWords.length === 0) {
      return NextResponse.json({ message: "No new words to add (all are duplicates)." }, { status: 200 });
    }

    // Insert new words
    await Word.insertMany(filteredWords);

    return NextResponse.json({ message: "Words imported successfully!", added: filteredWords.length });
  } catch (error) {
    console.error("Error importing words:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
