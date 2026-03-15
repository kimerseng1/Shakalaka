import { movieController } from "@/src/controller/movie.contoller";
import { NextResponse } from "next/server";

// PUT /api/movies/:id
export async function PUT(req: Request, context: any) {
  try {
    // context.params may be a Promise in dev; handle both cases
    let params = context?.params ?? context;
    if (params && typeof params.then === 'function') {
      params = await params;
    }

    const id = params?.id ?? context?.id;
    if (!id) throw new Error("Movie ID is missing");

    const data = await req.json();

    // Validate posterUrl if provided (only syntax)
    if (data.posterUrl) {
      try {
        new URL(String(data.posterUrl));
      } catch (err) {
        return NextResponse.json({ success: false, message: 'Poster URL must be a valid URL' }, { status: 400 });
      }
    }

    // pass id through as-is (string) to the controller/service
    const movie = await movieController.updateMovie(id, data);

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
export async function DELETE(req: Request, context: any) {
  try {
    // handle promise-like params shape from Next dev validator
    let params = context?.params ?? context;
    if (params && typeof params.then === 'function') {
      params = await params;
    }

    const id = params?.id ?? context?.id;
    if (!id) throw new Error("Movie ID is missing");

  await movieController.deleteMovie(id);
    return NextResponse.json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/movies/:id error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}