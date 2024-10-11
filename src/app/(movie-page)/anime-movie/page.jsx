import React from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import { getMovies } from "@/components/fetch/getMovies";
import PaginationControls from "@/components/Pagination";

export const metadata = {
  title: "Anime Movie",
  description:
    "MarsFlixBD: Your source for free anime movie downloads. Get the latest releases in HD quality now.",
};

const AnimeMoviePage = async ({ searchParams }) => {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "12";
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const { movies } = await getMovies();
  const animeMovies = movies.filter(
    (movie) => movie.category === "6707de9fefc8651f796e12e6"
  );

  const sortedAnimeMovies = animeMovies.sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
  );

  const allAnime = sortedAnimeMovies.slice(start, end);

  return (
    <div className="mb-4">
      <h1 className="border-l-4 border-l-red-600 pl-2 text-xl md:text-3xl font-semibold text-blue-gray-800 dark:text-white">
        Anime Movie: {animeMovies?.length}
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
        {allAnime?.map((animeMovie) => (
          <Link
            href={`/anime-movie/${animeMovie._id}`}
            className="group block border-1 shadow-md shadow-slate-600 hover:opacity-90 overflow-x-hidden mt-2"
            key={animeMovie._id}
          >
            <div className="relative">
              <Image
                src={animeMovie.moviePoster}
                width={250}
                height={300}
                alt={animeMovie.moviePoster}
                className="h-40 md:h-80 transition-transform hover:opacity-50 w-full"
              />
              <h3 className="absolute opacity-0 group-hover:opacity-100 top-2/4 right-1/3 md:right-1/2 text-3xl font-bold">
                <FaPlay />
              </h3>
            </div>
            <h3
              title={animeMovie.movieName}
              className="hover:text-blue-600 md:font-bold text-nowrap overflow-hidden h-5 my-1 mr-1 md:mr-2 md:mb-2 pl-1 md:pl-2"
            >
              {animeMovie.movieName}
            </h3>
            <div className="px-1 md:px-2 md:pb-2 flex justify-between">
              <p>{animeMovie.releaseDate}</p>
              <p>{animeMovie.IMDBRating}</p>
            </div>
          </Link>
        ))}
      </div>
      <PaginationControls
        hasNextPage={end < sortedAnimeMovies.length}
        hasPrevPage={start > 0}
        movieCategory={"anime-movie"}
        currentPage={Number(page)}
        totalPages={Math.ceil(sortedAnimeMovies.length / Number(per_page))}
      />
    </div>
  );
};

export default AnimeMoviePage;