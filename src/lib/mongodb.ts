import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const uri =
  process.env.MONGO_URI + "?retryWrites=true&w=majority&appName=CAPITALIVE";
const MONGODB_URI = uri; //process.env.MONGODB_URI!; // Load from .env file

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
