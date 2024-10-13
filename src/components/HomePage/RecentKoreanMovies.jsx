import React from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import { getMovies } from "../fetch/getMovies";

const RecentKoreanMovies = async () => {
  const { movies } = await getMovies();

  const koreanMovies = movies.filter(
    (movie) => movie.category === "6707e54befc8651f796e139c"
  );

  const sortedKoreanMovies = koreanMovies.sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
  );

  return (
    <div className="mt-8 px-2 md:px-0">
      <div className="flex justify-between items-center">
        <h1 className="border-l-4 border-l-red-600 pl-2 text-xl md:text-3xl font-semibold text-blue-gray-800 dark:text-white">
          Korean Movie:
        </h1>
        <Link
          href="/korean-movie"
          className="text-blue-500 hover:text-blue-600"
        >
          See All
        </Link>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
        {sortedKoreanMovies.length > 0 &&
          sortedKoreanMovies.slice(0, 6).map((koreanMovie) => (
            <Link
              href={`/korean-movie/${koreanMovie._id}`}
              className="group block border-1 shadow-md shadow-slate-600 hover:opacity-90 overflow-x-hidden mt-2"
              key={koreanMovie._id}
            >
              <div className="relative">
                <Image
                  src={koreanMovie.moviePoster}
                  width={250}
                  height={300}
                  alt={koreanMovie.moviePoster}
                  className="h-40 md:h-80 transition-transform hover:opacity-50 w-full"
                />
                <h3 className="absolute opacity-0 group-hover:opacity-100 top-2/4 right-1/3 md:right-1/2 text-3xl font-bold">
                  <FaPlay />
                </h3>
              </div>
              <h3
                title={koreanMovie.movieName}
                className="hover:text-blue-600 md:font-bold text-nowrap overflow-hidden h-5 my-1 mr-1 md:mr-2 md:mb-2 pl-1 md:pl-2"
              >
                {koreanMovie.movieName}
              </h3>
              <div className="px-1 md:px-2 md:pb-2 flex justify-between">
                <p>{koreanMovie.releaseDate}</p>
                <p>{koreanMovie.IMDBRating}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default RecentKoreanMovies;