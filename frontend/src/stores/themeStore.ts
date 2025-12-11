import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeState, ThemeMode } from '@/types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',

      toggleTheme: () => {
        set((state) => {
          const newMode = state.mode === 'light' ? 'dark' : 'light';
          
          // Update DOM
          if (newMode === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          
          return { mode: newMode };
        });
      },

      setTheme: (mode: ThemeMode) => {
        // Update DOM
        if (mode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        set({ mode });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Initialize theme on load
const initTheme = () => {
  const storedTheme = localStorage.getItem('theme-storage');
  if (storedTheme) {
    try {
      const { state } = JSON.parse(storedTheme);
      if (state.mode === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }
};

initTheme();