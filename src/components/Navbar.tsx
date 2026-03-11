'use client';

import React from 'react';
import { Search, LayoutDashboard, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-[#e5a00d] rounded flex items-center justify-center text-black font-bold">
                P
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">plex</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
              <Link href="/" className={`hover:text-white transition-colors ${pathname === '/' ? 'text-white' : ''}`}>Movie</Link>
              {/* <Link href="/on-demand" className={`hover:text-white transition-colors ${pathname === '/on-demand' ? 'text-white' : ''}`}>On Demand</Link>
              <Link href="/discover" className={`hover:text-white transition-colors ${pathname === '/discover' ? 'text-white' : ''}`}>Discover</Link> */}
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden sm:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search movies, TV shows..." 
                className="w-full bg-white/10 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:bg-white/20 focus:border-white/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/admin"
              className={`p-2 rounded-full hover:bg-white/10 transition-colors ${pathname === '/admin' ? 'text-[#e5a00d]' : 'text-zinc-400'}`}
            >
              <LayoutDashboard size={20} />
            </Link>
            {/* <div className="flex items-center gap-2 text-zinc-400 hover:text-white cursor-pointer transition-colors">
              <Bookmark size={20} />
              <span className="text-sm font-medium hidden lg:block">Watchlist</span>
            </div>
            <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">
              Sign In
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
