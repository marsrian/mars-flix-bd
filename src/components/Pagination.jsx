"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const PaginationControls = ({ movieCategory, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const per_page = Number(searchParams.get("per_page") ?? 12);

  const MAX_PAGES = 5;

  const startPage = Math.max(1, page - Math.floor(MAX_PAGES / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGES - 1);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    router.push(`/${movieCategory}?page=${p}&per_page=${per_page}`);
  };

  return (
    <div className="mt-12 flex justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 flex-wrap justify-center"
        >
          {/* Prev */}
          <ArrowButton
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
          >
            ‹
          </ArrowButton>

          {/* Left */}
          {startPage > 1 && (
            <>
              <PageButton p={1} page={page} goToPage={goToPage} />
              <span className="px-1 text-emerald-400">…</span>
            </>
          )}

          {/* Middle */}
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((p) => (
            <PageButton key={p} p={p} page={page} goToPage={goToPage} />
          ))}

          {/* Right */}
          {endPage < totalPages && (
            <>
              <span className="px-1 text-emerald-400">…</span>
              <PageButton p={totalPages} page={page} goToPage={goToPage} />
            </>
          )}

          {/* Next */}
          <ArrowButton
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
          >
            ›
          </ArrowButton>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ================= Arrow Button ================= */
const ArrowButton = ({ children, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
      transition active:translate-y-[1px]
      ${
        disabled
          ? "bg-gray-400 text-gray-600"
          : "bg-emerald-700 text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.4)] hover:bg-emerald-800"
      }`}
  >
    {children}
  </button>
);

/* ================= Page Button ================= */
const PageButton = ({ p, page, goToPage }) => (
  <motion.button
    whileTap={{ scale: 0.92 }}
    onClick={() => goToPage(p)}
    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
      border transition-all active:translate-y-[1px]
      ${
        p === page
          ? "bg-black text-emerald-400 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"
          : "bg-white text-black border-gray-300 hover:bg-emerald-100 shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)]"
      }`}
  >
    {p}
  </motion.button>
);

export default PaginationControls;

