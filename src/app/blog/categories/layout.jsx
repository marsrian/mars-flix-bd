import Link from "next/link";

const CategoryLayout = async ({ children }) => {
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
    <div className="container mx-auto mt-10 px-2 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="col-span-1 md:col-span-4">{children}</div>
        <div className="col-span-1 border rounded-md mt-16">
          <h1 className="text-xl font-bold p-2 border-b">Category:</h1>
          {categoryList.map((category) => (
            <p key={category.name} className="border-b p-2">
              <Link href={category.path}>{category.name}</Link>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryLayout;
