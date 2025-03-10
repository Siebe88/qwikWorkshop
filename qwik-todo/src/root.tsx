import { component$, useSignal, useVisibleTask$, $, createContextId, useContextProvider } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/RouterHead/RouterHead';
import { isDev } from '@builder.io/qwik';

import './global.css.ts';
import { lightTheme, darkTheme } from './theme';
import { measureTTI } from './utils/performance';

// Create a context for theme
export const ThemeContext = createContextId<{
  isDarkMode: { value: boolean };
  toggleDarkMode: () => void;
}>('theme-context');

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  // Initialize with light mode as default (false)
  const isDarkMode = useSignal(false);

  // Toggle dark mode function
  const toggleDarkMode = $(() => {
    isDarkMode.value = !isDarkMode.value;
    console.log({ newDarkModeValue: isDarkMode.value });
  });

  // Provide the theme context to all child components
  useContextProvider(ThemeContext, { isDarkMode, toggleDarkMode });

  // Measure TTI for performance comparison
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    measureTTI();
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />}
        <RouterHead />
      </head>
      <body lang="en" class={isDarkMode.value ? darkTheme : lightTheme}>
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
