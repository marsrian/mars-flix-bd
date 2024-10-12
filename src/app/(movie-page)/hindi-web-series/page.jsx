import { getWebSeries } from "@/components/fetch/getWebSeries";
import PaginationControls from "@/components/Pagination";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

export const metadata = {
  title: "Hindi Web Series",
  description:
    "Discover and download the best Hindi web series at MarsFlixBD. Enjoy high-quality, free downloads of the latest Hindi shows",
};

const HindiWebSeriesPage = async ({searchParams}) => {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "12";
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const { webSeries } = await getWebSeries();
  const hindiWebSeries = webSeries.filter(
    (series) => series.category === "6707e025efc8651f796e1346"
  );

  const sortedHindiSeries = hindiWebSeries.sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
  );

  const allHindiSeries = sortedHindiSeries.slice(start, end);

  return (
    <div className="mb-4">
      <h1 className="border-l-4 border-l-red-600 pl-2 text-xl md:text-3xl font-semibold text-blue-gray-800 dark:text-white">
        Hindi Web Series: {hindiWebSeries?.length}
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
        {allHindiSeries?.map((hindiSeries) => (
          <Link
            href={`/hindi-web-series/${hindiSeries._id}`}
            className="group block border-1 shadow-md shadow-slate-600 hover:opacity-90 overflow-x-hidden mt-2"
            key={hindiSeries._id}
          >
            <div className="relative">
              <Image
                src={hindiSeries.moviePoster}
                width={250}
                height={300}
                alt={hindiSeries.moviePoster}
                className="h-40 md:h-80 transition-transform hover:opacity-50 w-full"
              />
              <h3 className="absolute opacity-0 group-hover:opacity-100 top-2/4 right-1/3 md:right-1/2 text-3xl font-bold">
                <FaPlay />
              </h3>
            </div>
            <h3
              title={hindiSeries.seriesName}
              className="hover:text-blue-600 md:font-bold text-nowrap overflow-hidden h-5 my-1 mr-1 md:mr-2 md:mb-2 pl-1 md:pl-2"
            >
              {hindiSeries.seriesName}
            </h3>
            <div className="px-1 md:px-2 md:pb-2 flex justify-between">
              <p>{hindiSeries.releaseDate}</p>
              <p>{hindiSeries.IMDBRating}</p>
            </div>
          </Link>
        ))}
      </div>
      <PaginationControls
        hasNextPage={end < sortedHindiSeries.length}
        hasPrevPage={start > 0}
        movieCategory={"hindi-web-series"}
        currentPage={Number(page)}
        totalPages={Math.ceil(sortedHindiSeries.length / Number(per_page))}
      />
    </div>
  );
};

export default HindiWebSeriesPage;