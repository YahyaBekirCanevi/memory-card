import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { Word } from "@/data/Word";

export async function POST(req: Request) {
  try {
    const filePath = path.join(process.cwd(), "src/data/words.json");

    const body = await req.json();
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ error: "Invalid input, expected an array of words" }, { status: 400 });
    }

    const newWords: Word[] = body.filter(
      (word) =>
        typeof word.word === "string" &&
        typeof word.meaning === "string" &&
        typeof word.example === "string" &&
        typeof word.translation === "string"
    );

    if (newWords.length === 0) {
      return NextResponse.json({ error: "No valid words provided" }, { status: 400 });
    }

    let existingWords: Word[] = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8").trim();
      if (fileContent) {
        existingWords = JSON.parse(fileContent);
      }
    }

    existingWords.push(...newWords);
    fs.writeFileSync(filePath, JSON.stringify(existingWords, null, 2));

    return NextResponse.json({ message: "Words imported successfully!" });
  } catch (_) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
