import { NextResponse } from "next/server";
import say from "say";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    await new Promise((resolve, reject) => {
      say.speak(text, "Microsoft Hedda Desktop", 0.9, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });

    return NextResponse.json({ message: "Speech played successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to speak", error: error }, { status: 500 });
  }
}
