import PaginationControls from "@/components/Pagination";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiTwotoneCalendar,
} from "react-icons/ai";
import AllBlogPost from "./AllBlog";

async function fetchBlogs() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const metadata = {
  title: "Blog",
  openGraph: {
    title: "Blog | MarsFlixBD Movie info list",
    description:
      "Anime, Movie, Series huge collection see in MarsFlixBD website.",
  },
};

const Blog = async ({ searchParams }) => {
  const blogs = await fetchBlogs();

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "3";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const allBlogs = blogs.slice(start, end);

  const categoryList = [
    {
      name: "Movie List",
      path: "/blog/categories?category=Movie List",
    },
    {
      name: "Movie Review",
      path: "/blog/categories?category=Movie Review",
    },
    {
      name: "TV Series Review",
      path: "/blog/categories?category=TV Series Review",
    },
    {
      name: "TV Series List",
      path: "/blog/categories?category=TV Series List",
    },
    {
      name: "Entertainment",
      path: "/blog/categories?category=Entertainment",
    },
    {
      name: "Tech Trick",
      path: "/blog/categories?category=Tech Trick",
    },
    {
      name: "Terms",
      path: "/blog/categories?category=Terms",
    },
  ];

  return (
    <div className="container mx-auto px-2 md:px-0">
      <div>
        <h2 className="text-2xl font-semibold text-center my-10">
          <span className="text-red-500">Trending</span> Blog
        </h2>
        {blogs.length > 0 && (
          <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <Link
                key={blog._id}
                href={`/blog/${blog?._id}`}
                className="grid grid-cols-1 rounded shadow-md dark:bg-gray-900 mb-2"
              >
                <div className="flex flex-col gap-4">
                  <Image
                    src={blog.image.url}
                    width={200}
                    height={100}
                    alt={blog?.image?.url}
                    className="w-auto h-60"
                  ></Image>
                  <div className="p-4">
                    <h3 className="font-semibold mb-4">{blog?.title}</h3>
                    <p className="mb-6 text-sm">{blog?.excerpt.slice(0, 100)}...</p>
                    <div className="flex justify-between">
                      <p className="flex items-center gap-1">
                        <AiOutlineHeart size={20} />
                        {blog.likes.length}
                      </p>
                      <p className="flex items-center gap-1">
                        <AiOutlineComment size={20} />
                        {blog.comments.length}
                      </p>
                      <p className="flex items-center text-gray-500 gap-1">
                        <AiTwotoneCalendar />
                        {moment(blog?.createdAt).format("D MMM YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* Recent All Blogs */}
      <h2 className="text-2xl font-semibold text-center mb-8 mt-20">
        <span className="text-red-500">Recent</span> Blog
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="col-span-1 md:col-span-4 flex flex-col gap-2">
          {allBlogs.map((blog) => (
            <AllBlogPost blog={blog} key={blog.id} />
          ))}
          <PaginationControls
            hasNextPage={end < blogs.length}
            hasPrevPage={start > 0}
          />
        </div>
        <div className="col-span-1 border rounded-md">
          <h1 className="text-xl font-bold p-2 border-b text-center">Category:</h1>
          {categoryList.map((category) => (
            <p key={category.name} className="border-b p-2 px-4">
              <Link href={category.path}>{category.name}</Link>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
