import React from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import { getMovies } from "../fetch/getMovies";

const RecentAnimeMovie = async () => {
  const { movies } = await getMovies();

  const animeMovies = movies.filter(
    (movie) => movie.category === "6707de9fefc8651f796e12e6"
  );

  const sortedAnimeMovies = animeMovies.sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
  );

  return (
    <div className="mt-8 px-2 md:px-0">
      <div className="flex justify-between items-center">
        <h1 className="border-l-4 border-l-red-600 pl-2 text-xl md:text-3xl font-semibold text-blue-gray-800 dark:text-white">
          Anime Movie:
        </h1>
        <Link href="/anime-movie" className="text-blue-500 hover:text-blue-600">
          See all
        </Link>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
        {sortedAnimeMovies.length > 0 &&
          sortedAnimeMovies.slice(0, 12).map((animeMovies) => (
            <Link
              href={`/anime-movie/${animeMovies._id}`}
              className="group block border-1 shadow-md shadow-slate-600 hover:opacity-90 overflow-x-hidden mt-2"
              key={animeMovies._id}
            >
              <div className="relative">
                <Image
                  src={animeMovies.moviePoster}
                  width={250}
                  height={300}
                  alt={animeMovies.moviePoster}
                  className="h-40 md:h-80 transition-transform hover:opacity-50 w-full"
                />
                <h3 className="absolute opacity-0 group-hover:opacity-100 top-2/4 right-1/3 md:right-1/2 text-3xl font-bold">
                  <FaPlay />
                </h3>
              </div>
              <h3
                title={animeMovies.movieName}
                className="hover:text-blue-600 md:font-bold text-nowrap overflow-hidden h-5 my-1 mr-1 md:mr-2 md:mb-2 pl-1 md:pl-2"
              >
                {animeMovies.movieName}
              </h3>
              <div className="px-1 md:px-2 md:pb-2 flex justify-between">
                <p>{animeMovies.releaseDate}</p>
                <p>{animeMovies.IMDBRating}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default RecentAnimeMovie;