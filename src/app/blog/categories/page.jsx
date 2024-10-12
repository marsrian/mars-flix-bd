import Link from "next/link";
import CategoryByPost from "../CategoryByPost";

export const metadata = {
  title: "Blog",
  openGraph: {
    title: "Blog | MarsFlixBD Movie info list",
    description:
      "Anime, Movie, Series huge collection see in MarsFlixBD website.",
  },
};

async function fetchBlogs() {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }

const CategoryPage = async ({ searchParams }) => {
  const blogs = await fetchBlogs();
  return (
    <div className="">
      <h3 className="font-bold text-3xl text-center mb-8">
        <Link href="/" className=" text-blue-500">
          Home
        </Link>{" "}
        » Archive by category &apos;
        {searchParams.category}&apos;
      </h3>
      <div className="col-span-1 md:col-span-4 flex flex-col gap-2">
        {blogs
          .filter((blog) => blog.category === `${searchParams.category}`)
          .map((blog) => (
            <CategoryByPost blog={blog} key={blog._id} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
