# Slow Next.js Todo App

This is a deliberately slow-performing Todo application built with Next.js and Material UI, created specifically to demonstrate the hydration costs and performance challenges of client-side hydration in traditional React frameworks.

## Purpose

This application is designed for educational purposes, specifically for a workshop comparing the performance characteristics of Next.js with Qwik. It includes multiple intentional performance bottlenecks:

1. Heavy client-side JavaScript execution
2. Artificial delays to simulate slow event handling
3. Excessive and unnecessarily complex components
4. Inefficient rendering patterns
5. Large data payload to be hydrated
6. Expensive calculations during component mounting
7. Sluggish CSS transitions and animations

## Performance Metrics

The application includes built-in performance measurement. When you run the app, you'll see a performance metrics panel in the bottom right corner showing:

- Time to Interactive (TTI): The time it takes for the application to become fully interactive after initial load
- Component render times in the browser console

## Running the App

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Comparison with Qwik

This app serves as a "before" example in a workshop demonstrating the benefits of using Qwik for building performant web applications. The key issues to observe:

1. **Hydration Cost**: The app must download, parse, and execute large amounts of JavaScript before becoming interactive.
2. **Time to Interactive**: Notice the delay between seeing the UI and being able to interact with it.
3. **JavaScript Bundle Size**: Check the network tab to see the size of JavaScript being downloaded.
4. **Event Handling Performance**: Observe sluggishness when interacting with components.

A corresponding Qwik version of this application would demonstrate how Qwik's resumability enables instant interactivity without the hydration cost.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
