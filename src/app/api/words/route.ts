import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Word from "@/models/Word";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase(); // Connect to MongoDB

    const url = new URL(req.url);
    const amount = parseInt(url.searchParams.get("amount") || "10", 10);
    const page = parseInt(url.searchParams.get("page") || "1", 10);

    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount parameter" }, { status: 400 });
    }

    if (isNaN(page) || page <= 0) {
      return NextResponse.json({ error: "Invalid page parameter" }, { status: 400 });
    }

    // Fetch random words with pagination
    const words = await Word.aggregate([
      { $sample: { size: amount * page } }, // Get more than needed to support pagination
      { $skip: (page - 1) * amount }, // Skip previous pages
      { $limit: amount } // Limit the results
    ]);

    return NextResponse.json(words);
  } catch (error) {
    console.error("Error fetching words:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
