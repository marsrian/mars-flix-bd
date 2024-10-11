"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardTabs = () => {
  const pathName = usePathname();
  return (
    <div className="mb-8">
      <ul className="flex justify-center gap-3 md:gap-4 flex-wrap">
        <Link
          href="/dashboard/movies"
          className={`${
            pathName.includes("/dashboard/movies")
              ? "text-green-600 text-lg font-semibold"
              : " text-lg font-semibold"
          } border p-1 md:p-2 rounded-sm`}
        >
          Movies
        </Link>
        <Link
          href="/dashboard/web-series"
          className={`${
            pathName.includes("/dashboard/web-series")
              ? "text-green-600 text-lg font-semibold"
              : " text-lg font-semibold"
          } border p-1 md:p-2 rounded-sm`}
        >
          Web Series
        </Link>
        <Link
          href="/dashboard/create-blog"
          className={`${
            pathName === "/dashboard/create-blog"
              ? "text-green-600 text-lg font-semibold"
              : " text-lg font-semibold"
          } border p-1 md:p-2 rounded-sm`}
        >
          Blog
        </Link>
        <Link
          href="/dashboard/users"
          className={`${
            pathName.includes("/dashboard/users")
              ? "text-green-600 text-lg font-semibold"
              : " text-lg font-semibold"
          } border p-1 md:p-2 rounded-sm`}
        >
          Users
        </Link>
        <Link
          href="/dashboard/movie-category"
          className={`${
            pathName === "/dashboard/movie-category"
              ? "text-green-600 text-lg font-semibold"
              : " text-lg font-semibold"
          } border p-1 md:p-2 rounded-sm`}
        >
          Movie Category
        </Link>
        <Link
          href="/dashboard/web-category"
          className={`${
            pathName === "/dashboard/web-category"
              ? "text-green-600 text-lg font-semibold"
              : " text-lg font-semibold"
          } border p-1 md:p-2 rounded-sm`}
        >
          Web Category
        </Link>
      </ul>
    </div>
  );
};

export default DashboardTabs;