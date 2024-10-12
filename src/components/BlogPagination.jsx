"use client";
import { useRouter, useSearchParams } from "next/navigation";

const BlogPagination = ({ hasNextPage, hasPrevPage, currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        className={`w-12 text-white p-1 rounded-sm ${
          !hasPrevPage ? "bg-emerald-300" : "bg-emerald-700"
        }`}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `/blog?page=${Number(page) - 1}&per_page=${per_page}`
          );
        }}
      >
        Prev
      </button>

      <div className="p-1 rounded-sm">
        {currentPage} / {totalPages}
      </div>

      <button
        className={`w-12 text-white p-1 rounded-sm ${
          !hasNextPage ? "bg-emerald-300" : "bg-emerald-700"
        }`}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `/blog?page=${Number(page) + 1}&per_page=${per_page}`
          );
        }}
      >
        Next
      </button>
    </div>
  );
};

export default BlogPagination;
