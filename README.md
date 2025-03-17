# React vs. Qwik Framework Workshop

This workshop demonstrates the performance differences between traditional React-based applications and Qwik's resumable approach to web development.

## Project Structure

- `/slow-nextjs-todo` - A Todo application built with Next.js and Material UI
- `/qwik-todo` - The same Todo application rebuilt with Qwik and vanilla-extract CSS
- `/react-tic-tac-toe` - A Tic-Tac-Toe game built with React
- `/qwik-tic-tac-toe` - The workshop exercise: Build a Tic-Tac-Toe game with Qwik
- `/Presentation` - Workshop slides and materials

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

### React Tic-Tac-Toe

```bash
cd react-tic-tac-toe
npm install
npm run dev
```

### Qwik Tic-Tac-Toe (Workshop Exercise)

```bash
cd qwik-tic-tac-toe
npm install
npm run dev
```

## Workshop Exercise

The main exercise is to build a Qwik version of the Tic-Tac-Toe game based on the React implementation. This allows you to directly compare:

1. Development experience between React and Qwik
2. Performance differences in a simple interactive game
3. Implementation differences for state management and event handling

## Performance Testing

When comparing these applications:

1. Use Chrome DevTools' Performance tab to measure load performance
2. Compare Network tab to see JavaScript payload differences
3. Use Lighthouse to measure overall scores
4. Test on slower connections (throttle in DevTools) to see more pronounced differences

## Key Takeaways

- **React**: Uses hydration, which requires sending React components to the client and rerunning them
- **Qwik**: Uses resumability, which allows the app to "resume" where the server left off without hydration

The difference is particularly noticeable:

- On slower connections
- On mobile devices
- With complex component trees
- With many interactive elements

## Workshop Goals

1. Understand the differences between React's hydration and Qwik's resumability
2. Learn to build interactive applications with Qwik
3. Experience firsthand the performance benefits of resumable applications
4. Compare developer experience between the two frameworks
