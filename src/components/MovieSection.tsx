'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Play } from 'lucide-react';
import { Movie } from '@/src/types';

const VideoCard = ({ movie }: { movie: Movie }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-white/20 transition-all">
        <video
          ref={videoRef}
          src={movie.videoUrl}
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute top-2 right-2">
          <span className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded flex items-center gap-1">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" /> LIVE
          </span>
        </div>
        {!isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Play size={32} className="text-white opacity-50" fill="currentColor" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-[#e5a00d] w-1/3" />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-bold text-sm text-white truncate">{movie.title}</h3>
        <p className="text-xs text-zinc-500 mt-1">{movie.duration} left</p>
      </div>
    </div>
  );
};

const PosterCard = ({ movie }: { movie: Movie }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-white/20 transition-all group-hover:scale-105">
      <img 
        src={movie.posterUrl || `https://picsum.photos/seed/${movie.id}/400/600`} 
        alt={movie.title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <button className="w-full bg-white text-black py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
          <Play size={16} fill="currentColor" /> Play
        </button>
      </div>
    </div>
    <div className="mt-3">
      <h3 className="font-bold text-sm text-white truncate">{movie.title}</h3>
      <p className="text-xs text-zinc-500 mt-1">{movie.year || '2024'} • {movie.type}</p>
    </div>
  </div>
);

const MovieSection = ({ title, movies, type = 'video' }: { title: string, movies: Movie[], type?: 'video' | 'poster' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 group/section">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 group-hover:text-[#e5a00d] transition-colors cursor-pointer">
            {title} <ChevronRight size={24} />
          </h2>
          <div className="flex gap-2 opacity-0 group-hover/section:opacity-100 transition-opacity">
            <button onClick={() => scroll('left')} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {movies.map(movie => (
            <div key={movie.id} className={`flex-none snap-start ${type === 'video' ? 'w-[320px]' : 'w-[200px]'}`}>
              {type === 'video' ? <VideoCard movie={movie} /> : <PosterCard movie={movie} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSection;
