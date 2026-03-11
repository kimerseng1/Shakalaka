import React from "react";
import Navbar from "@/src/components/Navbar";
import MovieSection from "@/src/components/MovieSection";
import Footer from "@/src/components/Footer";
import { INITIAL_MOVIES } from "@/src/constants";

export const dynamic = "force-dynamic";

async function getMovies() {
  try {
    const res = await fetch("http://localhost:3000/api/movies", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }

    const movies = await res.json();

    // Ensure we always return an array
    if (Array.isArray(movies) && movies.length > 0) {
      return movies;
    }

    return INITIAL_MOVIES;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return INITIAL_MOVIES;
  }
}

export default async function Home() {
  const movies = await getMovies();

  return (
    <div className="min-h-screen font-sans selection:bg-[#e5a00d] selection:text-black">
      <Navbar />

      <main className="p-4">
        {/* Movies To Watch */}
        <MovieSection
          title="Movies To Watch Right Now"
          movies={movies.slice(0, 4)}
          type="video"
        />

        {/* Shows
        <MovieSection
          title="Binge-Worthy Shows"
          movies={movies}
          type="poster"
        /> */}

        {/* Reverse order */}
        {/* <MovieSection
          title="And The Winner Was"
          movies={[...movies].reverse()}
          type="poster"
        /> */}

        <Footer />
      </main>
    </div>
  );
}