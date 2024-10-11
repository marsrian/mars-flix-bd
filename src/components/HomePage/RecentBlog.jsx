import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiTwotoneCalendar,
} from "react-icons/ai";

async function fetchBlogs() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
}

export const metadata = {
  title: "Blog",
  openGraph: {
    title: "Blog | MarsFlixBD Movie info list",
    description:
      "Anime, Movie, Series huge collection see in MarsFlixBD website.",
  },
};

const RecentBlog = async () => {
  const blogs = await fetchBlogs();

  return (
    <div className="mt-20">
      <div className="md:container mx-auto px-2 md:px-0">
        <h2 className="text-2xl font-semibold text-center my-10">
          <span className="text-red-500">Trending</span> Blog
        </h2>
        {blogs.length > 0 && (
          <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
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
                    <p className="mb-6">{blog?.excerpt.slice(0,100)}...</p>
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
    </div>
  );
};

export default RecentBlog;
