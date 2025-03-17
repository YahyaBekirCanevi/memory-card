import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { Word } from "@/data/Word";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const amountParam = url.searchParams.get("amount");
    const pageParam = url.searchParams.get("page");
    const amount = amountParam ? parseInt(amountParam, 10) : 10;
    const page = pageParam ? parseInt(pageParam, 10) : 1

    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount parameter" }, { status: 400 });
    }

    if (isNaN(page) || page <= 0) {
      return NextResponse.json({ error: "Invalid page parameter" + page }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src/data/words.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Words file not found" }, { status: 500 });
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    if (!fileContent.trim()) {
      return NextResponse.json({ error: "Words file is empty" }, { status: 500 });
    }

    const words: Word[] = JSON.parse(fileContent);
    const shuffled = words.sort(() => 0.5 - Math.random());

    return NextResponse.json(shuffled.slice(amount * (page - 1), amount * page));
  } catch (_) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
