import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';
import './global.css';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Qwik Tic-Tac-Toe</title>
        <link rel="preconnect" href="/" />
        <meta name="description" content="A simple Tic-Tac-Toe game built with Qwik" />
        <style>
          {`
            html {
              line-height: 1.5;
              -webkit-text-size-adjust: 100%;
              tab-size: 4;
              font-family: system-ui, sans-serif;
            }
          `}
        </style>
      </head>
      <body
        lang="en"
        style={{
          padding: '20px',
          margin: '0',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
