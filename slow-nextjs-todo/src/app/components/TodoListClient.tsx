'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Skeleton, Pagination, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Todo, User, FilterOptions } from '../types';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import TodoCreate from './TodoCreate';
import Header from './Header';
import { measureTTI, measureRenderTime } from '../utils/performance';

interface TodoListClientProps {
  initialTodos: Todo[];
  users: User[];
  currentUser: User;
}

export default function TodoListClient({ initialTodos, users, currentUser }: TodoListClientProps) {
  // Measure Time to Interactive when component mounts
  const finishTTIRef = useRef<(() => number) | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Render timer
  const renderTimer = measureRenderTime('TodoListClient');
  const metricsDisplayed = useRef(false);

  // Effect for performance measurement
  useEffect(() => {
    if (typeof window !== 'undefined' && !metricsDisplayed.current) {
      renderTimer.start();

      // Start measuring TTI
      const ttiMeasurement = measureTTI();
      if (ttiMeasurement) {
        finishTTIRef.current = ttiMeasurement;
      }

      setIsLoading(false);
      setIsHydrated(true);

      // Complete TTI measurement
      if (finishTTIRef.current) {
        setTimeout(() => {
          if (finishTTIRef.current) {
            finishTTIRef.current();
            metricsDisplayed.current = true;
          }
        }, 500);
      }

      renderTimer.end();
    }
  }, [renderTimer]);

  // Filter todos based on current filters
  const filteredTodos = todos.filter((todo) => {
    // Apply status filter
    if (filterOptions.status === 'active' && todo.completed) return false;
    if (filterOptions.status === 'completed' && !todo.completed) return false;

    // Apply priority filter
    if (filterOptions.priority !== 'all' && todo.priority !== filterOptions.priority) return false;

    // Apply assignee filter
    if (filterOptions.assignee !== 'all' && todo.assignedTo !== filterOptions.assignee) return false;

    // Apply search filter
    if (filterOptions.search) {
      const searchQuery = filterOptions.search.toLowerCase();
      return (
        todo.title.toLowerCase().includes(searchQuery) ||
        todo.description.toLowerCase().includes(searchQuery) ||
        todo.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
      );
    }

    return true;
  });

  // Pagination
  const pageCount = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTodos = filteredTodos.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);

    // Scroll to top of list
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
    setCurrentPage(1); // Reset to first page
  };

  const handleToggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
              metadata: {
                ...todo.metadata,
                history: [
                  {
                    action: !todo.completed ? 'completed' : 'uncompleted',
                    timestamp: new Date().toISOString(),
                    user: currentUser.id,
                  },
                  ...todo.metadata.history,
                ],
              },
            }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const handleAddTodo = (newTodoData: Omit<Todo, 'id'>) => {
    const newTodo: Todo = {
      ...newTodoData,
      id: `todo-${new Date().getTime()}`,
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  // Render loading skeleton while hydrating
  if (!isHydrated || isLoading) {
    return (
      <Box>
        <Skeleton variant="rectangular" width="100%" height={64} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" width="100%" height={100} sx={{ mb: 2 }} />

        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width="100%" height={120} sx={{ mb: 2 }} />
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <Header currentUser={currentUser} />

      <Box sx={{ mt: 4, mb: 4 }}>
        <TodoCreate onAddTodo={handleAddTodo} users={users} />

        <TodoFilter filterOptions={filterOptions} onFilterChange={handleFilterChange} users={users} />

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">
              {filterOptions.status === 'all'
                ? 'All Todos'
                : filterOptions.status === 'active'
                ? 'Active Todos'
                : 'Completed Todos'}

              {filteredTodos.length > 0 && (
                <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                  ({filteredTodos.length})
                </Typography>
              )}
            </Typography>

            {filteredTodos.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTodos.length)} of{' '}
                {filteredTodos.length}
              </Typography>
            )}
          </Box>

          {filteredTodos.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No todos found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters or create a new todo
              </Typography>
            </Paper>
          ) : (
            <>
              {paginatedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  users={users}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              ))}

              {pageCount > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          display: { xs: 'flex', md: 'none' },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
