import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    // Check connection state
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      return NextResponse.json({
        status: "success",
        message: "Successfully connected to MongoDB Cluster0",
        database: mongoose.connection.name
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "Failed to connect to MongoDB"
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "An error occurred while connecting to the database"
    }, { status: 500 });
  }
}
