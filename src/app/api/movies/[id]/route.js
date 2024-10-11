import dbConnect from "@/lib/dbConnect";
import Movie from "@/modals/Movies";
import { NextResponse } from "next/server";

export async function GET(res, { params }) {
  const { id } = params;
  await dbConnect();
  const movie = await Movie.findOne({ _id: id });

  // Fetch three movies with the same genre
  const similarMovies = await Movie.find({
    genre: movie.genre,
    category: movie.category,
    _id: { $ne: id },
  }).limit(3);

  return NextResponse.json({ movie, similarMovies }, { status: 200 });
}
