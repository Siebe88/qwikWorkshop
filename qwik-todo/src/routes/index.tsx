import { component$, useContext } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { TodoList } from '~/components/todos/todo-list';
import { Header } from '~/components/header';
import { sampleTodos, sampleUsers } from '~/utils/data';
import { ThemeContext } from '~/root';

export default component$(() => {
  // Get the first user as the current user
  const currentUser = sampleUsers[0];
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div>
      <Header currentUser={currentUser} isDarkMode={isDarkMode.value} onToggleDarkMode$={toggleDarkMode} />

      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px 16px',
        }}
      >
        <TodoList initialTodos={sampleTodos} users={sampleUsers} currentUser={currentUser} />
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Fast Qwik Todo App',
  meta: [
    {
      name: 'description',
      content: 'A high-performance todo application built with Qwik',
    },
  ],
};
