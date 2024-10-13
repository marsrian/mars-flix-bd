import { getSingleWebSeries } from "@/components/fetch/getWebSeries";
import ShareMovieSocial from "@/components/ShareMovieSocial";
import SingleEp from "@/components/SingleEp";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

export const generateMetadata = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/web-series/${params.id}`
  );
  const seriesData = await res.json();

  return {
    title: `${seriesData.singleWebSeries.seriesName}`,
    description: seriesData.singleWebSeries.description,
    keywords: seriesData.singleWebSeries.description.split(" "),
  };
};

const SingleHindiSeriesPage = async ({ params }) => {
  const { singleWebSeries, similarWebSeries } = await getSingleWebSeries(
    params
  );
  const {
    _id,
    seriesName,
    moviePoster,
    releaseDate,
    IMDBRating,
    genre,
    duration,
    language,
    quality,
    resolution,
    size,
    season,
    totalEpisode,
    trailerLink,
    description,
    episodes,
  } = singleWebSeries;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="md:col-span-2">
          <Image
            src={moviePoster}
            width={400}
            height={500}
            alt={moviePoster}
            className="md:col-span-1 w-full h-96"
          />
          <hr className=" bg-gray-500" />
          <div className="my-2">
            <h5 className="text-base font-bold">RATING</h5>
            <p>IMDb Rating: {IMDBRating}</p>
          </div>
          <hr className=" bg-gray-500" />
          <div className="my-2">
            <h5 className="text-base font-bold">GENRES</h5>
            <p>{genre}</p>
          </div>
          <hr className=" bg-gray-500" />
          <div className="my-2">
            <h5 className="text-base font-bold">RUN TIME</h5>
            <p>{duration}</p>
          </div>
          <hr className=" bg-gray-500" />
          <div className="my-2">
            <h5 className="text-base font-bold">LANGUAGE</h5>
            <p>{language}</p>
          </div>
          <hr className=" bg-gray-500" />
          <div className="my-2">
            <h5 className="text-base font-bold">RELEASED</h5>
            <p>{releaseDate}</p>
          </div>
        </div>
        <div className="md:col-span-4 space-y-3">
          <h3 className="font-bold text-xl md:text-3xl font-Caveat">
            {seriesName}
          </h3>
          <div className="flex gap-3">
            <p className="px-3 py-2 rounded-md bg-teal-800 font-semibold text-white">
              {quality}
            </p>
            <p className="px-3 py-2 rounded-md bg-purple-500 font-semibold text-white">
              {resolution}
            </p>
          </div>
          <div className="flex items-center text-lg gap-2">
            <Spinner />
            <p>
              <span className="font-medium">Season:</span> {season}
            </p>
          </div>
          <div className="flex items-center text-lg gap-2">
            <Spinner />
            <p>
              <span className="font-medium">Total Episode:</span> {totalEpisode}
            </p>
          </div>
          <div className="flex items-center text-lg gap-2">
            <Spinner />
            <p>
              <span className="font-medium">Size:</span> {size}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Spinner />
            <p className="text-justify">
              <span className="text-lg font-medium">Storyline:</span>{" "}
              {description}
            </p>
          </div>
          <iframe
            className="w-full h-72 md:h-[450px]"
            src={trailerLink}
            title={`${seriesName} Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe>
          <div className="text-center">
            <button className="text-2xl text-white font-bold bg-orange-500 my-3 py-2 px-3 rounded-sm cursor-default">
              Download Now ⬇
            </button>
            <ul className="flex flex-col items-center space-y-5 mt-2">
              {episodes.map((episode, index) => (
                <SingleEp
                  key={index}
                  episode={episode}
                  index={index}
                ></SingleEp>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Share Series */}
      <ShareMovieSocial _id={_id} movieCategory={`hindi-web-series`} />

      {/* Similar Series */}
      {similarWebSeries.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            You may also like:
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {similarWebSeries.map((similarWeb) => (
              <Link
                href={`/hindi-web-series/${similarWeb._id}`}
                className="group block border-1 shadow-md shadow-slate-600 hover:opacity-90 overflow-x-hidden mt-2"
                key={similarWeb._id}
              >
                <div className="relative">
                  <Image
                    src={similarWeb.moviePoster}
                    width={250}
                    height={300}
                    alt={similarWeb.moviePoster}
                    className="h-40 md:h-80 transition-transform hover:opacity-50 w-full"
                  />
                  <h3 className="absolute opacity-0 group-hover:opacity-100 top-2/4 right-1/3 md:right-1/2 text-3xl font-bold">
                    <FaPlay />
                  </h3>
                </div>
                <h3
                  title={similarWeb.seriesName}
                  className="hover:text-blue-600 md:font-bold text-nowrap overflow-hidden h-5 my-1 mr-1 md:mr-2 md:mb-2 pl-1 md:pl-2"
                >
                  {similarWeb.seriesName}
                </h3>
                <div className="px-1 md:px-2 md:pb-2 flex justify-between">
                  <p>{similarWeb.releaseDate}</p>
                  <p>{similarWeb.IMDBRating}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleHindiSeriesPage;
