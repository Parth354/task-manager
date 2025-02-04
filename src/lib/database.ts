"use server"
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI; 
// const MONGO_URI = "mongodb+srv://parthbajaj05:parthbajaj@task-manager.tmnf2.mongodb.net/"

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable.");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI!, {
      dbName: "taskManager",
      bufferCommands: false,
    }).then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
