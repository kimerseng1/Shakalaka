'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import MovieSection from "@/src/components/MovieSection";
import Footer from "@/src/components/Footer";
import { INITIAL_MOVIES } from "@/src/constants";

async function getMovies(search?: string) {
  try {
    const url = search
      ? `/api/movies?search=${encodeURIComponent(search)}`
      : "/api/movies";

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) throw new Error("Failed to fetch movies");

    const movies = await res.json();
    return Array.isArray(movies) && movies.length > 0 ? movies : INITIAL_MOVIES;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return INITIAL_MOVIES;
  }
}

export default function Home() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [movies, setMovies] = useState(INITIAL_MOVIES);

  const [visibleCount, setVisibleCount] = useState(8); // show 8 initially

  // Fetch movies whenever search changes
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovies(search || undefined);
      setMovies(data);
      setVisibleCount(8); // reset visible count on new search
    };

    fetchData();
  }, [search]);

  const handleSearch = (query: string) => {
    setSearch(query); // triggers useEffect
    const newUrl = query ? `/?search=${encodeURIComponent(query)}` : "/";
    window.history.pushState({}, "", newUrl);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8); // load 8 more movies
  };

  const visibleMovies = movies.slice(0, visibleCount);
  const hasMore = movies.length > visibleMovies.length;

  return (
    <div className="min-h-screen font-sans selection:bg-[#e5a00d] selection:text-black">
      <Navbar onSearch={handleSearch} initialQuery={search} />

      <main className="p-4">
        <MovieSection
          title={search ? `Search Result for "${search}"` : "Movies To Watch Right Now"}
          movies={visibleMovies}
          type="video"
        />

        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-[#e5a00d] text-black font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#e5a00d]/20"
            >
              Load More
            </button>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}