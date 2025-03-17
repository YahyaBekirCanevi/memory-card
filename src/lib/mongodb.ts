import mongoose from "mongoose";
import { MongoClient, MongoClientOptions } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const MONGODB_URI = process.env.MONGO_URI;

let cachedMongoose = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase(): Promise<mongoose.Mongoose> {
  if (cachedMongoose.conn) {
    return cachedMongoose.conn;
  }

  if (!cachedMongoose.promise) {
    cachedMongoose.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "memory_cards",
        bufferCommands: false,
        serverApi: { version: "1", strict: true, deprecationErrors: true },
      })
      .then((mongoose) => mongoose);
  }

  cachedMongoose.conn = await cachedMongoose.promise;
  return cachedMongoose.conn;
}


const options: MongoClientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

let cachedMongoClient = (global as any) || { conn: null, promise: null };

export async function connectToMongoClient(): Promise<MongoClient> {
  if (cachedMongoClient.conn) {
    return cachedMongoClient.conn;
  }

  if (!cachedMongoClient.promise) {
    const client = new MongoClient(MONGODB_URI, options);
    cachedMongoClient.promise = client.connect();
  }

  cachedMongoClient.conn = await cachedMongoClient.promise;
  return cachedMongoClient.conn;
}
