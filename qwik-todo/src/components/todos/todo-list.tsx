import { component$, useSignal, useStore, $, useVisibleTask$, type PropFunction } from '@builder.io/qwik';
import { TodoItem } from './todo-item';
import { Todo, User, FilterOptions } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { TodoFilter } from './todo-filter';
import { TodoCreate } from './todo-create';
import { addPerformanceMetricsElement } from '../../utils/performance';
import { PlusIcon } from '../icons';

export interface TodoListProps {
  initialTodos: Todo[];
  users: User[];
  currentUser: User;
}

export const TodoList = component$<TodoListProps>((props) => {
  const { initialTodos, users, currentUser } = props;

  // State
  const todos = useStore<Todo[]>(initialTodos);
  const filterOptions = useStore<FilterOptions>({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    search: '',
  });
  const currentPage = useSignal(1);
  const itemsPerPage = 10;

  // Add performance metrics
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    // Add performance metrics to show Qwik's instant interactivity
    addPerformanceMetricsElement({
      Framework: 'Qwik (Resumable)',
      'Time to Interactive': '0ms',
      'Hydration Cost': 'None (Resumable)',
      'JS Payload': 'Minimal (Progressive)',
    });
  });

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
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const paginatedTodos = filteredTodos.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handleFilterChange = $((newFilters: FilterOptions) => {
    filterOptions.status = newFilters.status;
    filterOptions.priority = newFilters.priority;
    filterOptions.assignee = newFilters.assignee;
    filterOptions.search = newFilters.search;
    currentPage.value = 1; // Reset to first page
  });

  const handleToggleComplete = $((id: string) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      const updatedTodo = { ...todos[todoIndex] };
      updatedTodo.completed = !updatedTodo.completed;
      updatedTodo.updatedAt = new Date().toISOString();

      // Add to history
      updatedTodo.metadata.history = [
        {
          action: updatedTodo.completed ? 'completed' : 'uncompleted',
          timestamp: new Date().toISOString(),
          user: currentUser.id,
        },
        ...updatedTodo.metadata.history,
      ];

      todos[todoIndex] = updatedTodo;
    }
  });

  const handleDeleteTodo = $((id: string) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
    }
  });

  const handleEditTodo = $((updatedTodo: Todo) => {
    const todoIndex = todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (todoIndex !== -1) {
      todos[todoIndex] = updatedTodo;
    }
  });

  const handleAddTodo = $((newTodoData: Omit<Todo, 'id'>) => {
    const newTodo: Todo = {
      ...newTodoData,
      id: `todo-${new Date().getTime()}`,
    };

    todos.unshift(newTodo);
  });

  const handlePageChange = $((page: number) => {
    currentPage.value = page;

    // Scroll to top of list
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  return (
    <div>
      <TodoCreate onAddTodo$={handleAddTodo} users={users} />

      <TodoFilter filterOptions={filterOptions} onFilterChange$={handleFilterChange} users={users} />

      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <h2 style={{ margin: 0 }}>
            {filterOptions.status === 'all'
              ? 'All Todos'
              : filterOptions.status === 'active'
                ? 'Active Todos'
                : 'Completed Todos'}

            {filteredTodos.length > 0 && (
              <span style={{ marginLeft: '8px', color: 'var(--muted-foreground)' }}>({filteredTodos.length})</span>
            )}
          </h2>

          {filteredTodos.length > 0 && (
            <div style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTodos.length)} of{' '}
              {filteredTodos.length}
            </div>
          )}
        </div>

        {filteredTodos.length === 0 ? (
          <Card>
            <CardContent style={{ textAlign: 'center', padding: '32px' }}>
              <CardTitle style={{ marginBottom: '8px' }}>No todos found</CardTitle>
              <p style={{ marginBottom: '16px', color: 'var(--muted-foreground)' }}>
                Try adjusting your filters or create a new todo
              </p>
              <Button intent="primary" onClick$={() => {}}>
                <PlusIcon />
                Add New Todo
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {paginatedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                users={users}
                onToggleComplete$={handleToggleComplete}
                onDelete$={handleDeleteTodo}
                onEdit$={handleEditTodo}
              />
            ))}

            {pageCount > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '24px',
                  gap: '8px',
                }}
              >
                {Array.from({ length: pageCount }).map((_, index) => (
                  <Button
                    key={index}
                    intent={currentPage.value === index + 1 ? 'primary' : 'outline'}
                    onClick$={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});
