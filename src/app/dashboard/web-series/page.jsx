"use client"
import DashboardTabs from "@/components/DashboardTabs";
import Loading from "@/components/Loading";
import Right from "@/components/Right";
import useProfile from "@/components/useProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const WebSeriesPage = () => {
  const [webSeriesItems, setWebSeriesItems] = useState({ webSeries: [] });
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/web-series").then((res) => {
      res.json().then((webSeriesItems) => {
        setWebSeriesItems(webSeriesItems);
      });
    });
  }, []);



  if (loading) {
    return (
      <Loading loadingInfo={`Loading Web Series Info...`} />
    );
  }

  if (!data.admin) {
    return (
      <p className="italic text-red-600 text-center mt-20">Not an Admin</p>
    );
  }

  return (
    <section className="mt-8 px-2 md:px-0 w-full md:w-[800px] mx-auto">
      <DashboardTabs isAdmin={true} />
      <div className={`mt-8`}>
        <Link
          className="w-60 mx-auto flex justify-center gap-2 border rounded-md p-2"
          href={"/dashboard/web-series/new"}
        >
          Create new web series <Right />
        </Link>
      </div>
      <div className="w-full md:w-[800px] mx-auto">
        <h2 className="text-sm text-gray-500 dark:text-white mt-8">Edit web series item:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
          {webSeriesItems.webSeries.length > 0 &&
            webSeriesItems.webSeries.map((item) => (
              <Link
                href={"/dashboard/web-series/edit/" + item._id}
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
                <div className="text-center dark:text-black mt-1">{item.seriesName}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default WebSeriesPage;