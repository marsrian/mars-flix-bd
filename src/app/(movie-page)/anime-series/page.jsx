import { getWebSeries } from "@/components/fetch/getWebSeries";
import PaginationControls from "@/components/Pagination";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

export const metadata = {
  title: "Anime Series",
  description:
    "Download the latest anime series at MarsFlixBD. Enjoy free, high-quality downloads of your favorite anime shows.",
};

const AnimeSeriesPage = async ({ searchParams }) => {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "12";
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const { webSeries } = await getWebSeries();

  const animeSeries = webSeries.filter(
    (series) => series.category === "67083ccee96b541b9fafeebb"
  );

  const sortedAnimeSeries = animeSeries.sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
  );

  const allAnimeSeries = sortedAnimeSeries.slice(start, end);

  return (
    <div className="mb-4">
      <h1 className="border-l-4 border-l-red-600 pl-2 text-xl md:text-3xl font-semibold text-blue-gray-800 dark:text-white">
        Anime Series: {animeSeries?.length}
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
        {allAnimeSeries?.map((animeSeries) => (
          <Link
            href={`/anime-series/${animeSeries._id}`}
            className="group block border-1 shadow-md shadow-slate-600 hover:opacity-90 overflow-x-hidden mt-2"
            key={animeSeries._id}
          >
            <div className="relative">
              <Image
                src={animeSeries.moviePoster}
                width={250}
                height={300}
                alt={animeSeries.moviePoster}
                className="h-40 md:h-80 transition-transform hover:opacity-50 w-full"
              />
              <h3 className="absolute opacity-0 group-hover:opacity-100 top-2/4 right-1/3 md:right-1/2 text-3xl font-bold">
                <FaPlay />
              </h3>
            </div>
            <h3
              title={animeSeries.seriesName}
              className="hover:text-blue-600 md:font-bold text-nowrap overflow-hidden h-5 my-1 mr-1 md:mr-2 md:mb-2 pl-1 md:pl-2"
            >
              {animeSeries.seriesName}
            </h3>
            <div className="px-1 md:px-2 md:pb-2 flex justify-between">
              <p>{animeSeries.releaseDate}</p>
              <p>{animeSeries.IMDBRating}</p>
            </div>
          </Link>
        ))}
      </div>
      <PaginationControls
        hasNextPage={end < sortedAnimeSeries.length}
        hasPrevPage={start > 0}
        movieCategory={"anime-series"}
        currentPage={Number(page)}
        totalPages={Math.ceil(sortedAnimeSeries.length / Number(per_page))}
      />
    </div>
  );
};

export default AnimeSeriesPage;
