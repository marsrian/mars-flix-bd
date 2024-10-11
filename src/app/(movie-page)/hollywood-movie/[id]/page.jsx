import React from "react";
import Image from "next/image";
import { FaCloudDownloadAlt, FaPlay } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { getSingleMovie } from "@/components/fetch/getMovies";
import { Button } from "@/components/ui/button";
import ShareMovieSocial from "@/components/ShareMovieSocial";

export const metadata = {
  title: "Hollywood Movie",
  description:
    "Download the latest Hollywood movies at MarsFlixBD. Enjoy free, high-quality downloads of your favorite Hollywood films.",
};

const SingleHollywoodMoviePage = async ({ params }) => {
  const { movie, similarMovies } = await getSingleMovie(params);
  const {
    _id,
    movieName,
    moviePoster,
    releaseDate,
    IMDBRating,
    genre,
    duration,
    director,
    cast,
    language,
    quality,
    resolution,
    size,
    movieLink,
    trailerLink,
    description,
    subtitle,
  } = movie;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="md:col-span-2">
          <Image
            className="md:col-span-1 w-full h-96"
            width={400}
            height={500}
            src={moviePoster}
            alt={moviePoster}
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
            <h5 className="text-base font-bold">DIRECTOR</h5>
            <p>{director}</p>
          </div>
          <hr className=" bg-gray-500" />
          <div className="my-2">
            <h5 className="text-base font-bold">CAST</h5>
            <p>{cast}</p>
          </div>
        </div>
        <div className="md:col-span-4 space-y-3">
          <h3 className="font-bold text-xl md:text-3xl font-Caveat">
            {movieName}
          </h3>
          <div className="flex gap-3">
            <p className="px-3 py-2 rounded-md bg-teal-800 font-semibold text-white">
              {quality}
            </p>
            <p className="px-3 py-2 rounded-md bg-purple-500 font-semibold text-white">
              {resolution}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Spinner />
            <p>
              <span className="text-lg font-medium">Language:</span> {language}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Spinner />
            <p>
              <span className="text-lg font-medium">Size:</span> {size}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Spinner />
            <p>
              <span className="text-lg font-medium">Released:</span>{" "}
              {releaseDate}
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
            title={`${movieName} Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe>
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-medium mt-8">
              Full Movie Download via Single Links:
            </h3>
            <Button className="text-2xl font-bold bg-orange-400 hover:bg-orange-300 mt-2 py-2 px-3 rounded-md text-white">
              <Link
                href={movieLink}
                className="flex items-center gap-2"
                target="blank"
              >
                Download Now <FaCloudDownloadAlt />
              </Link>
            </Button>
            <br />
            {subtitle && (
              <div className="mt-5">
                <h3 className="text-xl font-medium">
                  Subtitle Download Links:
                </h3>
                <Button className="text-2xl font-bold bg-gray-900 hover:bg-gray-700 mt-1 py-2 px-3 rounded-md text-white">
                  <Link
                    className="flex items-center gap-2"
                    href={subtitle}
                    target="blank"
                  >
                    English Subtitle <FaCloudDownloadAlt />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Movie */}
      <ShareMovieSocial _id={_id} movieCategory={`hollywood-movie`} />

      {/* Similar Movie */}
      {similarMovies.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">You may also like:</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {similarMovies.map((similarMovie) => (
              <Link
                href={`/hollywood-movie/${similarMovie._id}`}
                className="group block border-1 shadow-md shadow-slate-600 hover:opacity-90 overflow-x-hidden mt-2"
                key={similarMovie._id}
              >
                <div className="relative">
                  <Image
                    src={similarMovie.moviePoster}
                    width={250}
                    height={300}
                    alt={similarMovie.moviePoster}
                    className="h-40 md:h-80 transition-transform hover:opacity-50 w-full"
                  />
                  <h3 className="absolute opacity-0 group-hover:opacity-100 top-2/4 right-1/3 md:right-1/2 text-3xl font-bold">
                    <FaPlay />
                  </h3>
                </div>
                <h3
                  title={similarMovie.movieName}
                  className="hover:text-blue-600 md:font-bold text-nowrap overflow-hidden h-5 my-1 mr-1 md:mr-2 md:mb-2 pl-1 md:pl-2"
                >
                  {similarMovie.movieName}
                </h3>
                <div className="px-1 md:px-2 md:pb-2 flex justify-between">
                  <p>{similarMovie.releaseDate}</p>
                  <p>{similarMovie.IMDBRating}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleHollywoodMoviePage;
