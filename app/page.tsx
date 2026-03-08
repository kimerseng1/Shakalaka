import React from 'react';
import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import GenreBrowser from '@/src/components/GenreBrowser';
import MovieSection from '@/src/components/MovieSection';
import CustomSectionItem from '@/src/components/CustomSectionItem';
import Footer from '@/src/components/Footer';
import { INITIAL_MOVIES, INITIAL_HERO } from '@/src/constants';
import prisma from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: { createdAt: 'desc' }
    });
    const hero = await prisma.heroContent.findUnique({
      where: { id: 'hero-main' }
    });
    const sections = await prisma.customSection.findMany({
      where: { page: 'home' },
      orderBy: { createdAt: 'asc' }
    });

    return {
      movies: movies.length > 0 ? movies : INITIAL_MOVIES,
      hero: hero || INITIAL_HERO,
      sections: sections
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      movies: INITIAL_MOVIES,
      hero: INITIAL_HERO,
      sections: []
    };
  }
}

export default async function Home() {
  const { movies, hero, sections } = await getData();

  return (
    <div className="min-h-screen font-sans selection:bg-[#e5a00d] selection:text-black">
      <Navbar />
      
      <main>
        <Hero content={hero as any} />
        <GenreBrowser />
        
        <MovieSection 
          title="What's On Now" 
          movies={movies.slice(0, 4) as any} 
          type="video" 
        />
        
        <MovieSection 
          title="Tune In Now: Popular Shows" 
          movies={movies.slice(2, 6) as any} 
          type="video" 
        />

        {sections.map((section) => (
          <CustomSectionItem key={section.id} section={section as any} />
        ))}

        <MovieSection 
          title="Binge-Worthy Shows" 
          movies={movies as any} 
          type="poster" 
        />

        <MovieSection 
          title="And The Winner Was" 
          movies={[...movies].reverse() as any} 
          type="poster" 
        />
        
        <Footer />
      </main>
    </div>
  );
}
