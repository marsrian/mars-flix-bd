import Category from "@/components/Category";

const MoviePageLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 px-4 md:px-10 mt-8">
      <div className="md:col-span-5 md:pr-4">{children}</div>
      <Category />
    </div>
  );
};

export default MoviePageLayout;