"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Category = () => {
  const pathName = usePathname();
  return (
    <div className="md:border-l md:px-4 mt-12 md:mt-0">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Anime Category:{" "}
      </h3>
      <ul className="flex flex-col space-y-2 mt-3">
        <Link
          href="/anime-movie"
          className={`${pathName === "/anime-movie" ? "text-cyan-600" : ""}`}
        >
          <li>Anime Movie</li>
        </Link>
        <Link
          href="/anime-series"
          className={`${pathName === "/anime-series" ? "text-cyan-600" : ""}`}
        >
          <li>Anime Series</li>
        </Link>
      </ul>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">
        Movie Category
      </h3>
      <ul className="flex flex-col space-y-2 mt-3">
        <Link
          href="/bangla-movie"
          className={`${pathName === "/bangla-movie" ? "text-cyan-600" : ""}`}
        >
          <li>Bangla Movie</li>
        </Link>
        <Link
          href="/bollywood-movie"
          className={`${
            pathName === "/bollywood-movie" ? "text-cyan-600" : ""
          }`}
        >
          <li>Bollywood Movie</li>
        </Link>
        <Link
          href="/hollywood-movie"
          className={`${
            pathName === "/hollywood-movie" ? "text-cyan-600" : ""
          }`}
        >
          <li>Hollywood Movie</li>
        </Link>
        <Link
          href="/korean-movie"
          className={`${
            pathName === "/korean-movie" ? "text-cyan-600" : ""
          }`}
        >
          <li>Korean Movie</li>
        </Link>
      </ul>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">
        Web Series Category
      </h3>
      <ul className="flex flex-col space-y-2 mt-3">
        <Link
          href="/bangla-web-series"
          className={`${
            pathName === "/bangla-web-series" ? "text-cyan-600" : ""
          }`}
        >
          <li>Bangla Web Series</li>
        </Link>
        <Link
          href="/hindi-web-series"
          className={`${
            pathName === "/hindi-web-series" ? "text-cyan-600" : ""
          }`}
        >
          <li>Hindi Web Series</li>
        </Link>
        <Link
          href="/english-tv-series"
          className={`${
            pathName === "/english-tv-series" ? "text-cyan-600" : ""
          }`}
        >
          <li>English TV Series</li>
        </Link>
        <Link
          href="/korean-tv-series"
          className={`${
            pathName === "/korean-tv-series" ? "text-cyan-600" : ""
          }`}
        >
          <li>Korean TV Series</li>
        </Link>
      </ul>
    </div>
  );
};

export default Category;