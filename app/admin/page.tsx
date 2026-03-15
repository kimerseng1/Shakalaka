'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, Film } from 'lucide-react';
import Navbar from '@/src/components/Navbar';
import MovieForm from '@/src/components/admin/MovieForm';
import { Movie } from '@/src/types';

export default function AdminPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // Fetch all movies
  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/movies');
      if (!res.ok) throw new Error('Failed to fetch movies');
      const data: Movie[] = await res.json();
      setMovies(data);
    } catch (error: any) {
      console.error('Error fetching movies:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Create or update movie
  const handleSubmitMovie = async (movieData: Omit<Movie, 'id'>, id?: string | number) => {
    try {
  const url = id ? `/api/movies/${id}` : '/api/movies';
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to save movie');
      }

      await fetchMovies();
      setIsFormOpen(false);
      setEditingMovie(null);
    } catch (error: any) {
      console.error('Error saving movie:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  // Delete movie
  const handleDeleteMovie = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this movie?')) return;

    try {
  const res = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to delete movie');
      }

      await fetchMovies();
    } catch (error: any) {
      console.error('Error deleting movie:', error.message);
      alert(`Error deleting movie: ${error.message}`);
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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Movie Manage</h1>
            <p className="text-zinc-500">Manage your movie library.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setEditingMovie(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-[#e5a00d] text-black font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#e5a00d]/20"
            >
              <Plus size={20} /> Add Movie
            </button>
          </div>
        </div>

        {/* Movie Library */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Film size={24} className="text-[#e5a00d]" /> Movie Library
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-white/20 transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={movie.posterUrl || `https://picsum.photos/seed/${movie.id}/400/300`}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.onerror = null;
                      img.src = `https://picsum.photos/seed/${movie.id}/400/300`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-bold text-white">{movie.title}</h3>
                    <p className="text-xs text-zinc-400">
                      {movie.type} • {movie.duration}
                    </p>
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
      </main>

      {/* MovieForm modal */}
      <AnimatePresence>
        {isFormOpen && (
          <MovieForm
            movie={editingMovie ?? undefined}
            onClose={() => {
              setIsFormOpen(false);
              setEditingMovie(null);
            }}
            onSuccess={async (data: Omit<Movie, 'id'>) => {
              // Use the ID of editingMovie for updates (keep as string if that's what DB uses)
              await handleSubmitMovie(
                data,
                editingMovie?.id ?? undefined
              );
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}