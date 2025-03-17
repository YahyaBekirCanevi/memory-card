import mongoose from "mongoose";

const uri =
  "mongodb+srv://customer:XepZRAmaUBTQw56v@capitalive.ynjwh.mongodb.net/" +
  "?retryWrites=true&w=majority&appName=CAPITALIVE";
const MONGODB_URI = uri; //process.env.MONGODB_URI!; // Load from .env file

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "memory_cards",
        bufferCommands: false,
        serverApi: { version: "1", strict: true, deprecationErrors: true },
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
