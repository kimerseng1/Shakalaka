'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { CustomSection } from '@/src/types';

interface CustomSectionFormProps {
  section?: CustomSection;
  onSubmit: (section: Omit<CustomSection, 'id'>) => void;
  onClose: () => void;
}

const CustomSectionForm = ({ section, onSubmit, onClose }: CustomSectionFormProps) => {
  const [formData, setFormData] = useState({
    title: section?.title || '',
    content: section?.content || '',
    imageUrl: section?.imageUrl || '',
    imagePosition: section?.imagePosition || 'right',
    page: section?.page || 'home'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<CustomSection, 'id'>);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#1a1a1a] border border-white/10 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold text-white">
            {section ? 'Edit Section' : 'Add Custom Section'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto scrollbar-hide">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Target Page</label>
            <div className="flex gap-2">
              {(['home', 'on-demand', 'discover'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, page: p })}
                  className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all capitalize ${
                    formData.page === p
                      ? 'bg-[#e5a00d] border-[#e5a00d] text-black'
                      : 'bg-white/5 border-white/10 text-white hover:border-white/20'
                  }`}
                >
                  {p.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Section Title</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#e5a00d] focus:border-transparent outline-none transition-all text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Content</label>
            <textarea
              required
              rows={4}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#e5a00d] focus:border-transparent outline-none transition-all resize-none text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Image URL</label>
            <input
              required
              type="url"
              value={formData.imageUrl}
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#e5a00d] focus:border-transparent outline-none transition-all text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Image Position</label>
            <div className="flex gap-3">
              {(['left', 'right'] as const).map(pos => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setFormData({ ...formData, imagePosition: pos })}
                  className={`flex-1 py-3 rounded-xl border font-medium transition-all capitalize ${
                    formData.imagePosition === pos
                      ? 'bg-[#e5a00d] border-[#e5a00d] text-black'
                      : 'bg-white/5 border-white/10 text-white hover:border-white/20'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#e5a00d] text-black font-bold rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-[#e5a00d]/20"
            >
              {section ? 'Save Changes' : 'Add Section'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CustomSectionForm;
