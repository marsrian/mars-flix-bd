import dbConnect from "@/lib/dbConnect";
import { WebCategory } from "@/modals/WebCategory";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { name } = await req.json();
  const categoryDoc = await WebCategory.create({ name });
  return NextResponse.json(categoryDoc);
}

export async function GET() {
  await dbConnect();
  const categories = await WebCategory.find();
  return NextResponse.json(categories);
}

export async function DELETE(req) {
  await dbConnect();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await WebCategory.deleteOne({ _id });
  return NextResponse.json(true);
}

export async function PUT(req) {
  await dbConnect();
  const { _id, name } = await req.json();
  await WebCategory.updateOne({ _id }, { name });
  return NextResponse.json(true);
}