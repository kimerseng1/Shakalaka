import React from 'react';
import Navbar from '@/src/components/Navbar';
import MovieSection from '@/src/components/MovieSection';
import CustomSectionItem from '@/src/components/CustomSectionItem';
import Footer from '@/src/components/Footer';
import { ChevronRight } from 'lucide-react';
import { INITIAL_MOVIES } from '@/src/constants';
import prisma from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: { createdAt: 'desc' }
    });
    const sections = await prisma.customSection.findMany({
      where: { page: 'on-demand' },
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

export default async function OnDemand() {
  const { movies, sections } = await getData();

  return (
    <div className="min-h-screen font-sans selection:bg-[#e5a00d] selection:text-black">
      <Navbar />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-black text-white mb-6">Watch Free Movies & TV Shows</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mb-12">
            You've come to the right place. We've got a bunch of free movies and TV shows here at Plex, and you can start watching right away.
          </p>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              Categories <ChevronRight size={24} />
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Action', color: 'bg-blue-600' },
                { name: 'Animation', color: 'bg-green-600' },
                { name: 'Comedy', color: 'bg-purple-600' },
                { name: 'Crime', color: 'bg-zinc-700' },
                { name: 'Documentary', color: 'bg-orange-600' },
                { name: 'Drama', color: 'bg-stone-600' }
              ].map(cat => (
                <div key={cat.name} className={`${cat.color} aspect-video rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border border-white/10`}>
                  <span className="font-bold text-white">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          <MovieSection 
            title="Binge-Worthy Shows" 
            movies={movies.slice(0, 8) as any} 
            type="poster" 
          />

          {sections.map((section) => (
            <CustomSectionItem key={section.id} section={section as any} />
          ))}

          <MovieSection 
            title="Quests, Sagas, and (sometimes) Dragons" 
            movies={movies.slice(4, 12) as any} 
            type="poster" 
          />
        </div>
        <Footer />
      </main>
    </div>
  );
}
