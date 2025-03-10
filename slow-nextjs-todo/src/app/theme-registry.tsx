'use client';

import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';

// Create an extremely large theme object with many unnecessary options
// to increase the serialization/hydration cost
const createExcessiveTheme = () => {
  const baseTheme = createTheme({
    palette: {
      mode: 'light',
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
      // Add many more color variations to make the theme object larger
      ...Array.from({ length: 20 }).reduce((acc, _, i) => {
        acc[`custom${i}`] = {
          main: '#e91e63',
          light: '#f48fb1',
          dark: '#c2185b',
          contrastText: '#fff',
        };
        return acc;
      }, {} as Record<string, any>),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      // Add many Typography variants
      ...Array.from({ length: 30 }).reduce((acc, _, i) => {
        acc[`customVariant${i}`] = {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: 14 + i * 0.2,
          fontWeight: 400,
          lineHeight: 1.5 + i * 0.05,
          letterSpacing: `${0.1 + i * 0.01}em`,
        };
        return acc;
      }, {} as Record<string, any>),
    },
    // Add many more unnecessarily complex theme options
    customOptions: Array.from({ length: 50 }).reduce((acc, _, i) => {
      acc[`option${i}`] = {
        value: `value-${i}`,
        nestedObject: {
          property1: `property-${i}`,
          property2: `property-${i * 2}`,
          deeperNesting: {
            deep1: `deep-value-${i}`,
            deep2: `deep-value-${i * 2}`,
            deepest: {
              ultraDeep: `ultra-deep-${i}`,
            },
          },
        },
      };
      return acc;
    }, {} as Record<string, any>),
  });

  // This creates a massive object that will slow down hydration
  return baseTheme;
};

// Create the massive theme
const theme = createExcessiveTheme();

// Forced expensive computation on client side
const expensiveComputation = () => {
  let result = 0;
  for (let i = 0; i < 10000000; i++) {
    result += Math.sin(i) * Math.cos(i);
  }
  return result;
};

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'mui' });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[0];
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

  // On client-side, trigger expensive computation during hydration
  if (typeof window !== 'undefined') {
    // This will run during hydration and block the main thread
    const result = expensiveComputation();
    console.log({ expensiveComputationResult: result });
  }

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
