import dbConnect from "@/lib/dbConnect";
import { WebSeries } from "@/modals/WebSeries";
import { NextResponse } from "next/server";

export async function GET(res, { params }) {
  const { id } = params;
  await dbConnect();
  const singleWebSeries = await WebSeries.findOne({ _id: id });
  
  // Fetch three series with the same genre
  const similarWebSeries = await WebSeries.find({
    genre: singleWebSeries.genre,
    category: singleWebSeries.category,
    _id: { $ne: id }
  }).limit(3);

  return NextResponse.json({ singleWebSeries, similarWebSeries }, { status: 200 });
}