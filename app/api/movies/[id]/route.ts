import { movieController } from "@/src/controller/movie.contoller";
import { NextResponse } from "next/server";

// PUT /api/movies/:id
export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    if (!id) throw new Error("Movie ID is missing");

    const data = await req.json();
    const movie = await movieController.updateMovie(Number(id), data);

    return NextResponse.json({ success: true, movie });
  } catch (error) {
    console.error("PUT /api/movies/:id error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/movies/:id
export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    if (!id) throw new Error("Movie ID is missing");

    await movieController.deleteMovie(Number(id));
    return NextResponse.json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/movies/:id error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}