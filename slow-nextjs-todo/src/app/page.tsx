import { Suspense } from 'react';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import { sampleTodos, sampleUsers } from './utils/data';
import TodoListClient from './components/TodoListClient';

// The main page component that fetches data server-side and passes it to client components
export default function Home() {
  // Get data on the server
  const initialTodos = sampleTodos;
  const users = sampleUsers;
  const currentUser = users[0]; // Just use the first user as the current user

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Suspense fallback={<LoadingFallback />}>
        <TodoListClient initialTodos={initialTodos} users={users} currentUser={currentUser} />
      </Suspense>
    </Container>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
      }}
    >
      <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
      <Typography variant="h6">Loading Todo Application...</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        This might take a while due to the intentional performance bottlenecks
      </Typography>
    </Box>
  );
}
