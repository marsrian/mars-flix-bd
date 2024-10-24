import dbConnect from "@/lib/dbConnect";
import User from "@/modals/User";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const users = await User.find();
  return NextResponse.json(users);
}