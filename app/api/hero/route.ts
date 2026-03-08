import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET() {
  try {
    const hero = await prisma.heroContent.findUnique({
      where: { id: 'hero-main' }
    });
    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const hero = await prisma.heroContent.upsert({
      where: { id: 'hero-main' },
      update: {
        title: body.title,
        subtitle: body.subtitle,
        imageUrl: body.imageUrl,
        buttonText: body.buttonText,
      },
      create: {
        id: 'hero-main',
        title: body.title,
        subtitle: body.subtitle,
        imageUrl: body.imageUrl,
        buttonText: body.buttonText,
      }
    });
    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error updating hero content:', error);
    return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 });
  }
}
