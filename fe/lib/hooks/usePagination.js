"use client";

import { useState } from "react";

export default function usePagination(initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const resetPage = () => setPage(1);

  return {
    page,
    limit,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    resetPage,
    offset: (page - 1) * limit,
  };
}
