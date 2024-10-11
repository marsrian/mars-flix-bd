import React from "react";
import { getWebSeries } from "@/components/fetch/getWebSeries";
import PaginationControls from "@/components/Pagination";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

export const metadata = {
  title: "Korean TV Series",
  description:
    "Explore and download the newest Korean TV series at MarsFlixBD. Free, high-quality downloads of your favorite shows.",
};

const KoreanTvSeriesPage = async ({ searchParams }) => {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "12";
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const { webSeries } = await getWebSeries();
  const koreanTVSeries = webSeries.filter(
    (series) => series.category === "6707e039efc8651f796e134c"
  );

  const sortedKoreanSeries = koreanTVSeries.sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
  );

  const allKoreanSeries = sortedKoreanSeries.slice(start, end);
  return (
    <div className="mb-4">
      <h1 className="border-l-4 border-l-red-600 pl-2 text-xl md:text-3xl font-semibold text-blue-gray-800 dark:text-white">
        Korean TV Series: {koreanTVSeries?.length}
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
        {allKoreanSeries?.map((koreanSeries) => (
          <Link
            href={`/korean-tv-series/${koreanSeries._id}`}
            className="group block border-1 shadow-md shadow-slate-600 hover:opacity-90 overflow-x-hidden mt-2"
            key={koreanSeries._id}
          >
            <div className="relative">
              <Image
                src={koreanSeries.moviePoster}
                width={250}
                height={300}
                alt={koreanSeries.moviePoster}
                className="h-40 md:h-80 transition-transform hover:opacity-50 w-full"
              />
              <h3 className="absolute opacity-0 group-hover:opacity-100 top-2/4 right-1/3 md:right-1/2 text-3xl font-bold">
                <FaPlay />
              </h3>
            </div>
            <h3
              title={koreanSeries.seriesName}
              className="hover:text-blue-600 md:font-bold text-nowrap overflow-hidden h-5 my-1 mr-1 md:mr-2 md:mb-2 pl-1 md:pl-2"
            >
              {koreanSeries.seriesName}
            </h3>
            <div className="px-1 md:px-2 md:pb-2 flex justify-between">
              <p>{koreanSeries.releaseDate}</p>
              <p>{koreanSeries.IMDBRating}</p>
            </div>
          </Link>
        ))}
      </div>
      <PaginationControls
        hasNextPage={end < sortedKoreanSeries.length}
        hasPrevPage={start > 0}
        movieCategory={"korean-tv-series"}
        currentPage={Number(page)}
        totalPages={Math.ceil(sortedKoreanSeries.length / Number(per_page))}
      />
    </div>
  );
};

export default KoreanTvSeriesPage;
