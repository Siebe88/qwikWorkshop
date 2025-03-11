import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Game } from '~/components/game';

export default component$(() => {
  return <Game />;
});

export const head: DocumentHead = {
  title: 'Qwik Tic-Tac-Toe',
  meta: [
    {
      name: 'description',
      content: 'A simple Tic-Tac-Toe game built with Qwik',
    },
  ],
};
