"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaAlignRight, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import demoImage from "/public/img/demo_image.jpg";
import MarsWLogo from "/public/MFW.png";
import MarsBLogo from "/public/MFB.png";
import { FcSearch } from "react-icons/fc";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import useProfile from "./useProfile";
import { ModeToggle } from "./ModToggle";

const Navbar = () => {
  const [userData, setUserData] = useState({});
  const { data: session, status } = useSession();
  console.log(session);
  const { data } = useProfile();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef();

  const pathName = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  async function fetchUser() {
    try {
      const res = await fetch(`/api/user/${session?.user?._id}`);

      const resData = await res.json();

      setUserData(resData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [session?.user?._id]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleShowDropdown = () => setShowDropdown((prev) => true);
  const handleHideDropdown = () => setShowDropdown((prev) => false);

  // Search Field:
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      try {
        const movieRes = await fetch(`/api/movies?name=${searchTerm}`);
        const movies = await movieRes.json();
        setSearchResults(movies);
        console.log(movies);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSearchResultClick = () => {
    setSearchResults([]);
  };
  return (
    <div
      className={`sticky top-0 z-40 ${
        isScrolled ? "bg-white dark:bg-black" : "bg-transparent"
      }`}
    >
      <div className="flex flex-row items-center justify-between shadow-md dark:shadow-xl dark:border-b dark:border-gray-900 border-b-gray-400 px-4 py-2 md:py-3">
        <Link href="/">
          <Image
            src={MarsWLogo}
            width={100}
            height={60}
            alt="logo"
            className="hidden dark:block w-auto"
          />
          <Image
            src={MarsBLogo}
            width={100}
            height={60}
            alt="logo"
            className="dark:hidden w-auto"
          />
        </Link>
        {/* Search Field: */}
        <div className="hidden md:block" ref={searchResultsRef}>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={searchTerm}
                onChange={handleSearchInputChange}
              placeholder="Search Movie only"
              className="border rounded-md px-2 py-1"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-1 rounded-md"
            >
              Search
            </button>
          </form>
          {searchResults.movies && (
            <div className="absolute top-14 z-10">
              {searchResults.movies.length === 0 && (
                <div className="z-10 text-red-500 italic bg-gray-900 px-5 py-3 rounded-sm">
                  No results found
                </div>
              )}
              <ul
                className={`flex flex-col space-y-1 text-white  p-3 rounded-sm ${
                  searchResults.movies.length === 0
                    ? "bg-transparent"
                    : "bg-gray-900"
                }`}
              >
                {searchResults.movies.map((movie) => (
                  <li key={movie._id} onClick={handleSearchResultClick}>
                    {movie.category === "6707deacefc8651f796e12e9" ? (
                      <Link
                        href={`/bangla-movie/${movie._id}`}
                        className="hover:text-gray-400"
                      >
                        {movie.movieName}
                      </Link>
                    ) : movie.category === "6707deb3efc8651f796e12ec" ? (
                      <Link
                        href={`/bollywood-movie/${movie._id}`}
                        className="hover:text-gray-400"
                      >
                        {movie.movieName}
                      </Link>
                    ) : movie.category === "6707debaefc8651f796e12ef" ? (
                      <Link
                        href={`/hollywood-movie/${movie._id}`}
                        className="hover:text-gray-400"
                      >
                        {movie.movieName}
                      </Link>
                    ) : movie.category === "6707e54befc8651f796e139c" ? (
                      <Link
                        href={`/korean-movie/${movie._id}`}
                        className="hover:text-gray-400"
                      >
                        {movie.movieName}
                      </Link>
                    ) : (
                      <Link
                        href={`/anime-movie/${movie._id}`}
                        className="hover:text-gray-400"
                      >
                        {movie.movieName}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <ul className="hidden md:flex flex-col md:flex-row items-center font-medium text-lg gap-8">
          <li>
            <Link
              href="/"
              className={`${pathName === "/" ? "text-green-600" : ""}`}
            >
              Home
            </Link>
          </li>
          {/* Anime Page: */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`${
                  pathName.includes("/anime-") ? "text-green-600" : ""
                } border-0 bg-transparent hover:bg-transparent`}
              >
                Anime
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              <DropdownMenuGroup>
                <Link href="/anime-movie">
                  <DropdownMenuItem className="cursor-pointer">
                    Anime Movie
                  </DropdownMenuItem>
                </Link>
                <Link href="/anime-series">
                  <DropdownMenuItem className="cursor-pointer">
                    Anime Series
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Movie Page: */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`${
                  pathName.includes("/bangla-movie") ||
                  pathName.includes("/bollywood-movie") ||
                  pathName.includes("/hollywood-movie") ||
                  pathName.includes("/korean-movie")
                    ? "text-green-600"
                    : ""
                } border-0 bg-transparent hover:bg-transparent`}
              >
                Movie
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              <DropdownMenuGroup>
                <Link href="/bangla-movie">
                  <DropdownMenuItem className="cursor-pointer">
                    Bangla Movie
                  </DropdownMenuItem>
                </Link>
                <Link href="/bollywood-movie">
                  <DropdownMenuItem className="cursor-pointer">
                    Bollywood Movie
                  </DropdownMenuItem>
                </Link>
                <Link href="/hollywood-movie">
                  <DropdownMenuItem className="cursor-pointer">
                    Hollywood Movie
                  </DropdownMenuItem>
                </Link>
                <Link href="/korean-movie">
                  <DropdownMenuItem className="cursor-pointer">
                    Korean Movie
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Web Series Page: */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`${
                  pathName.includes("/bangla-web-series") ||
                  pathName.includes("/hindi-web-series") ||
                  pathName.includes("/english-tv-series") ||
                  pathName.includes("/korean-tv-series")
                    ? "text-green-600"
                    : ""
                } border-0 bg-transparent hover:bg-transparent`}
              >
                Web Series
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuGroup>
                <Link href="/bangla-web-series">
                  <DropdownMenuItem className="hover:cursor-pointer">
                    Bangla Web Series
                  </DropdownMenuItem>
                </Link>
                <Link href="/hindi-web-series">
                  <DropdownMenuItem className="hover:cursor-pointer">
                    Hindi Web Series
                  </DropdownMenuItem>
                </Link>
                <Link href="/english-tv-series">
                  <DropdownMenuItem className="hover:cursor-pointer">
                    English TV Series
                  </DropdownMenuItem>
                </Link>
                <Link href="/korean-tv-series">
                  <DropdownMenuItem className="hover:cursor-pointer">
                    Korean TV Series
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <li>
            <Link
              href="/blog"
              className={pathName === "/blog" ? "text-green-600" : ""}
            >
              Blog
            </Link>
          </li>
          {status === "loading" && <p>Loading...</p>}
          {status === "authenticated" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-0 bg-transparent hover:bg-transparent"
                >
                  <Image
                    onClick={handleShowDropdown}
                    src={
                      userData?.avatar?.url ||
                      userData?.avatar?.url ||
                      session?.user?.image ||
                      demoImage
                    }
                    alt="avatar"
                    width={40}
                    height={40}
                    sizes="100vw"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                  <Link href={`/user/${session?.user?._id?.toString()}`}>
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  {data.admin && (
                    <Link href="/dashboard/users">
                      <DropdownMenuItem className="hover:cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      handleHideDropdown();
                    }}
                    className="hover:text-red-600 w-full"
                  >
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </button>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {status === "unauthenticated" && (
            <>
              <li>
                <Link
                  href="/login"
                  className={
                    pathName === "/login" ? "text-green-600 font-bold" : ""
                  }
                >
                  Login
                </Link>
              </li>
            </>
          )}
          <li>
            <ModeToggle />
          </li>
        </ul>

        {/* For Mobile */}
        <div className="flex gap-2 items-center md:hidden">
          <ModeToggle />
          {isOpen ? (
            <button
              onClick={handleToggle}
              className="text-xl font-semibold text-green-600 border-0"
            >
              <FaAlignRight />
            </button>
          ) : (
            <>
              <div className="absolute top-[55px] w-60 left-0 h-[600px] p-4 bg-gray-800 text-white font-medium text-lg duration-1000 md:hidden">
                <ul className="flex flex-col gap-3 mt-12 text-center">
                  <Link
                    href="/"
                    className={pathName === "/" ? "text-green-300" : ""}
                  >
                    Home
                  </Link>
                  {/* Anime Page: */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={`${
                          pathName.includes("/anime-") ? "text-green-600" : ""
                        } border-0 bg-transparent hover:bg-transparent`}
                      >
                        Anime
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32">
                      <DropdownMenuGroup>
                        <Link href="/anime-movie">
                          <DropdownMenuItem className="cursor-pointer">
                            Anime Movie
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/anime-series">
                          <DropdownMenuItem className="cursor-pointer">
                            Anime Series
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* Movie Page: */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={`${
                          pathName.includes("/bangla-movie") ||
                          pathName.includes("/bollywood-movie") ||
                          pathName.includes("/hollywood-movie") ||
                          pathName.includes("/korean-movie")
                            ? "text-green-600"
                            : ""
                        } border-0 bg-transparent hover:bg-transparent`}
                      >
                        Movie
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-36">
                      <DropdownMenuGroup>
                        <Link href="/bangla-movie">
                          <DropdownMenuItem className="cursor-pointer">
                            Bangla Movie
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/bollywood-movie">
                          <DropdownMenuItem className="cursor-pointer">
                            Bollywood Movie
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/hollywood-movie">
                          <DropdownMenuItem className="cursor-pointer">
                            Hollywood Movie
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/korean-movie">
                          <DropdownMenuItem className="cursor-pointer">
                            Korean Movie
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* Web Series Page: */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={`${
                          pathName.includes("/bangla-web-series") ||
                          pathName.includes("/hindi-web-series") ||
                          pathName.includes("/english-tv-series") ||
                          pathName.includes("/korean-tv-series")
                            ? "text-green-600"
                            : ""
                        } border-0 bg-transparent hover:bg-transparent`}
                      >
                        Web Series
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuGroup>
                        <Link href="/bangla-web-series">
                          <DropdownMenuItem className="hover:cursor-pointer">
                            Bangla Web Series
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/hindi-web-series">
                          <DropdownMenuItem className="hover:cursor-pointer">
                            Hindi Web Series
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/english-tv-series">
                          <DropdownMenuItem className="hover:cursor-pointer">
                            English TV Series
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/korean-tv-series">
                          <DropdownMenuItem className="hover:cursor-pointer">
                            Korean TV Series
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <li>
                    <Link
                      href="/blog"
                      className={pathName === "/blog" ? "text-green-600" : ""}
                    >
                      Blog
                    </Link>
                  </li>
                  {status === "authenticated" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-0 bg-transparent hover:bg-transparent"
                        >
                          <Image
                            onClick={handleShowDropdown}
                            src={
                              userData?.avatar?.url
                                ? userData?.avatar?.url
                                : demoImage
                            }
                            alt="avatar"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-10 h-10 rounded-full cursor-pointer"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-32">
                        <DropdownMenuGroup>
                          <Link href={`/user/${session?.user?._id.toString()}`}>
                            <DropdownMenuItem className="hover:cursor-pointer">
                              <User className="mr-2 h-4 w-4" />
                              <span>Profile</span>
                            </DropdownMenuItem>
                          </Link>
                          {data.admin && (
                            <Link href="/dashboard/movies">
                              <DropdownMenuItem className="hover:cursor-pointer">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                              </DropdownMenuItem>
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              signOut();
                              handleHideDropdown();
                            }}
                            className="hover:text-red-600 w-full"
                          >
                            <DropdownMenuItem className="hover:cursor-pointer">
                              <LogOut className="mr-2 h-4 w-4" />
                              Logout
                            </DropdownMenuItem>
                          </button>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  {status === "unauthenticated" && (
                    <>
                      <li>
                        <Link
                          href="/login"
                          className={
                            pathName === "/login"
                              ? "text-green-600 font-bold"
                              : ""
                          }
                        >
                          Login
                        </Link>
                      </li>
                    </>
                  )}
                  {/* Search Field: */}
                  <div className="block md:hidden" ref={searchResultsRef}>
                    <form
                        onSubmit={handleSearchSubmit}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        placeholder="Search Movie only"
                        className="border rounded-md p-1 w-full text-black dark:text-white"
                      />
                      <button
                        type="submit"
                        className="bg-green-600 p-1 py-1 rounded-md"
                      >
                        <FcSearch />
                      </button>
                    </form>
                    {searchResults.movies && (
                      <div className="z-10">
                        {searchResults.movies.length === 0 && (
                          <div className="z-10 text-red-400 italic bg-gray-900 p-2 md:p-3 rounded-sm">
                            No Movie found
                          </div>
                        )}
                        <ul className="flex flex-col space-y-1 text-white bg-gray-900 p-1 rounded-sm">
                          {searchResults.movies.map((movie) => (
                            <li
                              key={movie._id}
                              onClick={handleSearchResultClick}
                            >
                              {movie.category === "6707deacefc8651f796e12e9" ? (
                                <Link
                                  href={`/bangla-movie/${movie._id}`}
                                  className="hover:text-gray-400"
                                >
                                  {movie.movieName}
                                </Link>
                              ) : movie.category ===
                                "6707deb3efc8651f796e12ec" ? (
                                <Link
                                  href={`/bollywood-movie/${movie._id}`}
                                  className="hover:text-gray-400"
                                >
                                  {movie.movieName}
                                </Link>
                              ) : movie.category ===
                                "6707debaefc8651f796e12ef" ? (
                                <Link
                                  href={`/hollywood-movie/${movie._id}`}
                                  className="hover:text-gray-400"
                                >
                                  {movie.movieName}
                                </Link>
                              ) : movie.category ===
                                "6707e54befc8651f796e139c" ? (
                                <Link
                                  href={`/korean-movie/${movie._id}`}
                                  className="hover:text-gray-400"
                                >
                                  {movie.movieName}
                                </Link>
                              ) : (
                                <Link
                                  href={`/anime-movie/${movie._id}`}
                                  className="hover:text-gray-400"
                                >
                                  {movie.movieName}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </ul>
              </div>
              <button
                onClick={handleToggle}
                className="text-xl font-semibold text-green-600 border-0"
              >
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
