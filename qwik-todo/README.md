# Fast Qwik Todo App

This is a high-performance Todo application built with Qwik, demonstrating the benefits of resumability over traditional hydration-based frameworks like Next.js.

## Purpose

This application is designed for educational purposes, specifically for a workshop comparing the performance characteristics of Qwik with Next.js. It includes the same functionality as the Next.js version but with significantly better performance:

1. **Instant Interactivity**: No hydration delay - components are interactive immediately
2. **Progressive JavaScript Loading**: Only loads the JS needed for the current interaction
3. **Zero Hydration Cost**: Qwik's resumability eliminates the need for hydration
4. **O(1) JavaScript Payload**: JS payload size remains constant regardless of application complexity
5. **Fine-grained Reactivity**: Only updates what needs to change

## Performance Metrics

The application includes built-in performance measurement. When you run the app, you'll see a performance metrics panel in the bottom right corner showing:

- Time to Interactive (TTI): Always 0ms since Qwik components are instantly interactive
- Hydration Cost: None, since Qwik doesn't hydrate
- JS Payload: Minimal, since Qwik only sends the JS needed for each interaction

## Technologies Used

- **Qwik**: Core framework with resumability
- **Vanilla Extract**: For type-safe CSS-in-TS styling
- **Qwik UI Headless**: For accessible UI primitives
- **Qwikest Icons**: For Lucide icons in Qwik

## Running the App

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Comparison with Next.js

This app serves as an "after" example in a workshop demonstrating the benefits of using Qwik for building performant web applications. The key improvements over the Next.js version:

1. **No Hydration Cost**: The app is instantly interactive without waiting for JavaScript to download, parse, and execute.
2. **Immediate Time to Interactive**: Users can interact with components immediately after the HTML loads.
3. **Minimal JavaScript**: Only the JavaScript needed for the current interaction is sent to the browser.
4. **Smooth Event Handling**: Event handlers execute immediately without waiting for the entire application to hydrate.

## Project Structure

- `src/components/ui/`: Reusable UI components built with vanilla-extract
- `src/components/todos/`: Todo-specific components
- `src/theme/`: Theme definition using vanilla-extract
- `src/utils/`: Utility functions for data generation and performance measurement
- `src/types/`: TypeScript interfaces and types
- `src/routes/`: Qwik City routes
