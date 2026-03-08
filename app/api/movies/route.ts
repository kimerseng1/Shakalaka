import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

// export async function GET() {
//   try {
//     const movies = await prisma.movie.findMany({
//       orderBy: { createdAt: 'desc' }
//     });
//     return NextResponse.json(movies);
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
//   }
// }

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const movie = await prisma.movie.create({
      data: {
        title: body.title,
        duration: body.duration,
        type: body.type,
        subtitle: body.subtitle,
        videoUrl: body.videoUrl,
        posterUrl: body.posterUrl,
        year: body.year,
      }
    });
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Error creating movie:', error);
    return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
  }
}
