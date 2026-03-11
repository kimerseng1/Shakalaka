import { movieController } from "@/src/controller/movie.contoller";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("GET /api/movies called");  // debug log
    const movies = await movieController.getMovies();
    console.log("Movies fetched:", movies);  // debug log
    return NextResponse.json(movies);
  } catch (error) {
    console.error("GET /api/movies error:", error);
    return NextResponse.json({ message: "Server error", error: error instanceof Error ? error.message : error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const movie = await movieController.createMovie(data);
    return NextResponse.json(movie);
  } catch (error) {
    console.error("POST /api/movies error:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}