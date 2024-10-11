import dbConnect from "@/lib/dbConnect";
import { WebSeries } from "@/modals/WebSeries";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const webSeriesDoc = await WebSeries.create(data);
  return NextResponse.json(webSeriesDoc);
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  try {
    let webSeries;
    if (name) {
      webSeries = await WebSeries.find({ seriesName: new RegExp(name, 'i') });
    } else {
      webSeries = await WebSeries.find();
    }

    return new Response(JSON.stringify({ webSeries }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  await dbConnect();
  const { _id, ...data } = await req.json();
  await WebSeries.findByIdAndUpdate(_id, data);
  return NextResponse.json(true);
}

export async function DELETE(req) {
  await dbConnect();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await WebSeries.deleteOne({ _id });
  return NextResponse.json(true);
}