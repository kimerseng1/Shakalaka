import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET() {
  try {
    const sections = await prisma.customSection.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const section = await prisma.customSection.create({
      data: {
        title: body.title,
        content: body.content,
        imageUrl: body.imageUrl,
        imagePosition: body.imagePosition,
        page: body.page,
      }
    });
    return NextResponse.json(section);
  } catch (error) {
    console.error('Error creating section:', error);
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 });
  }
}
