import dbConnect from "@/lib/dbConnect";
import Movie from "@/modals/Movies";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const movieDoc = await Movie.create(data);
  return NextResponse.json(movieDoc);
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  try {
    let movies;
    if (name) {
      movies = await Movie.find({ movieName: new RegExp(name, 'i') });
    } else {
      movies = await Movie.find();
    }

    return new Response(JSON.stringify({ movies }), {
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
  await Movie.findByIdAndUpdate(_id, data);
  return NextResponse.json(true);
}

export async function DELETE(req) {
  await dbConnect();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await Movie.deleteOne({ _id });
  return NextResponse.json(true);
}