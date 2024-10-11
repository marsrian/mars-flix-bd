"use client";
import DashboardTabs from "@/components/DashboardTabs";
import Loading from "@/components/Loading";
import Right from "@/components/Right";
import useProfile from "@/components/useProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MoviesPage = () => {
  const [moviesItems, setMoviesItems] = useState({ movies: [] });
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/movies").then((res) => {
      res.json().then((moviesItems) => {
        setMoviesItems(moviesItems);
      });
    });
  }, []);

  if (loading) {
    return <Loading loadingInfo={`Loading movies Info...`} />;
  }

  if (!data.admin) {
    return (
      <p className="italic text-red-600 text-center mt-20">Not an Admin</p>
    );
  }

  return (
    <section className="mt-8 px-2 md:px-0">
      <DashboardTabs isAdmin={true} />
      <div className={`mt-8`}>
        <Link
          className="w-60 mx-auto flex justify-center gap-2 border rounded-md p-2"
          href={"/dashboard/movies/new"}
        >
          Create new movies info <Right />
        </Link>
      </div>
      <div className="w-full md:w-[800px] mx-auto">
        <h2 className="text-sm text-gray-500 dark:text-white mt-8">
          Edit movie item:
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
          {moviesItems.movies.length > 0 &&
            moviesItems.movies.map((item) => (
              <Link
                href={"/dashboard/movies/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
                key={item._id}
              >
                <div className="relative">
                  <Image
                    className="rounded-md w-full h-36 md:h-[200px]"
                    src={item.moviePoster}
                    alt={item.moviePoster}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center mt-1 dark:text-black">
                  {item.movieName}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesPage;