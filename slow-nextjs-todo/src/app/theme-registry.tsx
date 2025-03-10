'use client';

import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, createContext, useContext } from 'react';

// Create a context for theme mode
export const ThemeModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Custom hook to use the theme mode
export const useThemeMode = () => useContext(ThemeModeContext);

// Create a more efficient theme object
const createOptimizedTheme = (darkMode: boolean) => {
  const baseTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#fff',
      },
      secondary: {
        main: '#9c27b0',
        light: '#ba68c8',
        dark: '#7b1fa2',
        contrastText: '#fff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  });

  return baseTheme;
};

// Create light and dark themes once to avoid recreating them on each toggle
const lightTheme = createOptimizedTheme(false);
const darkTheme = createOptimizedTheme(true);

// Type definition to handle Emotion cache serialization
interface SerializedStyles {
  name: string;
  [key: string]: string | number | boolean | null | undefined;
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'mui' });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      // Handle the Emotion serialized styles - proper type conversion
      const serialized = args[0] as unknown as SerializedStyles;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  // Use pre-created themes instead of creating new ones on each render
  const theme = darkMode ? darkTheme : lightTheme;

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  // Provide the theme mode context to children
  return (
    <ThemeModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ThemeModeContext.Provider>
  );
}
