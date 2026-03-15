import { movieController } from "@/src/controller/movie.contoller";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    console.log("GET /api/movies called");

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    let movies;

    if (search) {
      console.log("Searching movies:", search);
      movies = await movieController.searchMovies(search);
    } else {
      movies = await movieController.getMovies();
    }

    console.log("Movies fetched:", movies);

    return NextResponse.json(movies);
  } catch (error) {
    console.error("GET /api/movies error:", error);

    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // If a poster URL is provided, check it's a valid URL string (don't require network reachability)
    if (data.posterUrl) {
      try {
        new URL(String(data.posterUrl));
      } catch (err) {
        return NextResponse.json({ message: 'Poster URL must be a valid URL' }, { status: 400 });
      }
    }

    const movie = await movieController.createMovie(data);

    return NextResponse.json(movie);
  } catch (error) {
    console.error("POST /api/movies error:", error);

    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}