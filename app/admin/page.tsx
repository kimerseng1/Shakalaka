'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Film, 
  LayoutDashboard, 
  Settings, 
  Image as ImageIcon 
} from 'lucide-react';
import Navbar from '@/src/components/Navbar';
import MovieForm from '@/src/components/admin/MovieForm';
import CustomSectionForm from '@/src/components/admin/CustomSectionForm';
import HeroForm from '@/src/components/admin/HeroForm';
import { Movie, HeroContent, CustomSection } from '@/src/types';
import { INITIAL_HERO } from '@/src/constants';

export default function AdminPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent>(INITIAL_HERO);
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isHeroFormOpen, setIsHeroFormOpen] = useState(false);
  const [isSectionFormOpen, setIsSectionFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>();
  const [editingSection, setEditingSection] = useState<CustomSection | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [moviesRes, heroRes, sectionsRes] = await Promise.all([
        fetch('/api/movies'),
        fetch('/api/hero'),
        fetch('/api/sections')
      ]);

      const moviesData = await moviesRes.json();
      const heroData = await heroRes.json();
      const sectionsData = await sectionsRes.json();

      setMovies(moviesData);
      if (heroData && !heroData.error) setHeroContent(heroData);
      setCustomSections(sectionsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMovie = async (movieData: Omit<Movie, 'id'>) => {
    try {
      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      });
      if (res.ok) {
        fetchData();
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleEditMovie = async (movieData: Omit<Movie, 'id'>) => {
    if (!editingMovie) return;
    try {
      const res = await fetch(`/api/movies/${editingMovie.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      });
      if (res.ok) {
        fetchData();
        setIsFormOpen(false);
        setEditingMovie(undefined);
      }
    } catch (error) {
      console.error('Error editing movie:', error);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    if (!confirm('Are you sure you want to delete this movie?')) return;
    try {
      const res = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleUpdateHero = async (newContent: HeroContent) => {
    try {
      const res = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent)
      });
      if (res.ok) {
        setHeroContent(newContent);
        setIsHeroFormOpen(false);
      }
    } catch (error) {
      console.error('Error updating hero:', error);
    }
  };

  const handleAddSection = async (sectionData: Omit<CustomSection, 'id'>) => {
    try {
      const res = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionData)
      });
      if (res.ok) {
        fetchData();
        setIsSectionFormOpen(false);
      }
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };

  const handleEditSection = async (sectionData: Omit<CustomSection, 'id'>) => {
    if (!editingSection) return;
    try {
      const res = await fetch(`/api/sections/${editingSection.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionData)
      });
      if (res.ok) {
        fetchData();
        setIsSectionFormOpen(false);
        setEditingSection(undefined);
      }
    } catch (error) {
      console.error('Error editing section:', error);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;
    try {
      const res = await fetch(`/api/sections/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#e5a00d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Admin Dashboard</h1>
            <p className="text-zinc-500">Manage your movie library and custom content sections.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsHeroFormOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10"
            >
              <Settings size={20} />
              Edit Hero
            </button>
            <button
              onClick={() => {
                setEditingSection(undefined);
                setIsSectionFormOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10"
            >
              <Plus size={20} />
              Add Section
            </button>
            <button
              onClick={() => {
                setEditingMovie(undefined);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-[#e5a00d] text-black font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#e5a00d]/20"
            >
              <Plus size={20} />
              Add Movie
            </button>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Film size={24} className="text-[#e5a00d]" /> Movie Library
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map(movie => (
                <div key={movie.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-white/20 transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={movie.posterUrl || `https://picsum.photos/seed/${movie.id}/400/300`} 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-lg font-bold text-white">{movie.title}</h3>
                      <p className="text-xs text-zinc-400">{movie.type} • {movie.duration}</p>
                    </div>
                  </div>
                  <div className="p-4 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingMovie(movie);
                        setIsFormOpen(true);
                      }}
                      className="p-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <LayoutDashboard size={24} className="text-[#e5a00d]" /> Custom Sections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customSections.map(section => (
                <div key={section.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between group hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={section.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white">{section.title}</h3>
                        <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-zinc-400 uppercase font-bold">
                          {section.page}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 truncate max-w-[200px]">{section.content}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingSection(section);
                        setIsSectionFormOpen(true);
                      }}
                      className="p-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteSection(section.id)}
                      className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {customSections.length === 0 && (
                <div className="col-span-full py-12 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <ImageIcon size={32} className="mx-auto text-zinc-700 mb-2" />
                  <p className="text-zinc-500">No custom sections yet. Add one to customize your pages!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {isFormOpen && (
          <MovieForm
            movie={editingMovie}
            onSubmit={editingMovie ? handleEditMovie : handleAddMovie}
            onClose={() => {
              setIsFormOpen(false);
              setEditingMovie(undefined);
            }}
          />
        )}
        {isHeroFormOpen && (
          <HeroForm 
            content={heroContent}
            onSubmit={handleUpdateHero}
            onClose={() => setIsHeroFormOpen(false)}
          />
        )}
        {isSectionFormOpen && (
          <CustomSectionForm 
            section={editingSection}
            onSubmit={editingSection ? handleEditSection : handleAddSection}
            onClose={() => setIsSectionFormOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
