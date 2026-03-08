import React from 'react';
import Navbar from '@/src/components/Navbar';
import MovieSection from '@/src/components/MovieSection';
import CustomSectionItem from '@/src/components/CustomSectionItem';
import Footer from '@/src/components/Footer';
import { INITIAL_MOVIES } from '@/src/constants';
import prisma from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: { createdAt: 'desc' }
    });
    const sections = await prisma.customSection.findMany({
      where: { page: 'discover' },
      orderBy: { createdAt: 'asc' }
    });

    return {
      movies: movies.length > 0 ? movies : INITIAL_MOVIES,
      sections: sections
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      movies: INITIAL_MOVIES,
      sections: []
    };
  }
}

export default async function Discover() {
  const { movies, sections } = await getData();

  return (
    <div className="min-h-screen font-sans selection:bg-[#e5a00d] selection:text-black">
      <Navbar />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-white mb-6">Find What To Watch, Anywhere!</h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
              With Plex, you're just one click away from streaming virtually any film or TV program, no matter where it lives.
            </p>
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors">
              Select My Streaming Services
            </button>
          </div>

          <MovieSection 
            title="Most Watchlisted This Week" 
            movies={movies.slice(0, 10) as any} 
            type="poster" 
          />

          {sections.map((section) => (
            <CustomSectionItem key={section.id} section={section as any} />
          ))}

          <MovieSection 
            title="Trending Trailers" 
            movies={movies.slice(2, 7) as any} 
            type="video" 
          />
        </div>
        <Footer />
      </main>
    </div>
  );
}
