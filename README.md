# Next.js vs. Qwik Framework Workshop

This workshop demonstrates the performance differences between a traditional React-based framework (Next.js) and Qwik's resumable approach to web development.

## Project Structure

- `/slow-nextjs-todo` - A Todo application built with Next.js and Material UI
- `/qwik-todo` - The same Todo application rebuilt with Qwik and vanilla-extract CSS

## Key Comparison Points

This workshop focuses on comparing:

1. **First Contentful Paint (FCP)** - How quickly does the user see content?
2. **Time to Interactive (TTI)** - How long until the user can interact with the app?
3. **JavaScript Payload** - How much JavaScript is sent to the browser?
4. **Overall User Experience** - How does the app feel in terms of responsiveness?

## Running the Applications

### Next.js Todo App

```bash
cd slow-nextjs-todo
npm install
npm run dev
```

### Qwik Todo App

```bash
cd qwik-todo
npm install
npm run dev
```

## Performance Testing

When comparing these applications:

1. Use Chrome DevTools' Performance tab to measure load performance
2. Compare Network tab to see JavaScript payload differences
3. Use Lighthouse to measure overall scores
4. Test on slower connections (throttle in DevTools) to see more pronounced differences

## Key Takeaways

- **Next.js**: Uses hydration, which requires sending React components to the client and rerunning them
- **Qwik**: Uses resumability, which allows the app to "resume" where the server left off without hydration

The difference is particularly noticeable:

- On slower connections
- On mobile devices
- With complex component trees
- With many interactive elements

## Workshop Exercises

1. Add new features to both apps and compare development experience
2. Run Lighthouse tests and compare scores
3. Monitor the Network tab to see different loading patterns
4. Optimize both apps further and compare improvements
