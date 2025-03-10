import { component$, useSignal, $, type PropFunction } from '@builder.io/qwik';
import {
  todoItem,
  todoItemHeader,
  checkboxContainer,
  contentContainer,
  titleContainer,
  todoTitle,
  todoDescription,
  tagsContainer,
  tag,
  actionsContainer,
  todoMeta,
  metaItem,
  collapsibleContent,
  historyItem,
} from './todo-item.css';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Todo, User } from '../../types';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  TrashIcon,
  InfoIcon,
  BookmarkIcon,
} from '../icons';

export interface TodoItemProps {
  todo: Todo;
  users: User[];
  onToggleComplete$: PropFunction<(id: string) => void>;
  onDelete$: PropFunction<(id: string) => void>;
  onEdit$: PropFunction<(todo: Todo) => void>;
}

export const TodoItem = component$<TodoItemProps>((props) => {
  const { todo, users, onToggleComplete$, onDelete$, onEdit$ } = props;

  // Local state
  const expanded = useSignal(false);

  // Find assignee if exists
  const assignee = todo.assignedTo ? users.find((user) => user.id === todo.assignedTo) : null;

  // Handle toggle complete
  const handleToggleComplete = $(() => {
    onToggleComplete$(todo.id);
  });

  // Handle delete
  const handleDelete = $(() => {
    onDelete$(todo.id);
  });

  // Handle edit
  const handleEdit = $(() => {
    onEdit$(todo);
  });

  // Handle expand/collapse
  const handleExpandClick = $(() => {
    expanded.value = !expanded.value;
  });

  return (
    <div class={todoItem({ priority: todo.priority, completed: todo.completed })}>
      <div class={todoItemHeader}>
        <div class={checkboxContainer}>
          <Checkbox checked={todo.completed} onChange$={handleToggleComplete} />
        </div>

        <div class={contentContainer}>
          <div class={titleContainer}>
            <h3 class={todoTitle({ completed: todo.completed })}>{todo.title}</h3>

            <div class={actionsContainer}>
              <Button intent="ghost" size="icon" onClick$={handleEdit} aria-label="Edit todo">
                <EditIcon />
              </Button>

              <Button intent="ghost" size="icon" onClick$={handleDelete} aria-label="Delete todo">
                <TrashIcon />
              </Button>
            </div>
          </div>

          {todo.tags.length > 0 && (
            <div class={tagsContainer}>
              {todo.tags.map((tagText) => (
                <span key={tagText} class={tag}>
                  {tagText}
                </span>
              ))}
            </div>
          )}

          <p class={todoDescription({ completed: todo.completed })}>
            {expanded.value || todo.description.length <= 100
              ? todo.description
              : `${todo.description.substring(0, 100)}...`}
          </p>
        </div>
      </div>

      <div class={todoMeta}>
        {assignee && (
          <div class={metaItem}>
            <UserIcon />
            <span>{assignee.name}</span>
          </div>
        )}

        {todo.dueDate && (
          <div class={metaItem}>
            <CalendarIcon />
            <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
          </div>
        )}

        <div class={metaItem}>
          <ClockIcon />
          <span>Updated: {new Date(todo.updatedAt).toLocaleDateString()}</span>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <Button
            intent="ghost"
            size="sm"
            onClick$={handleExpandClick}
            aria-expanded={expanded.value}
            aria-label={expanded.value ? 'Collapse details' : 'Expand details'}
          >
            {expanded.value ? <ChevronUpIcon /> : <ChevronDownIcon />}
            {expanded.value ? 'Less' : 'More'}
          </Button>
        </div>
      </div>

      {expanded.value && (
        <div class={collapsibleContent}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <InfoIcon />
            Additional Information
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Created:</div>
              <div>{new Date(todo.createdAt).toLocaleString()}</div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Updated:</div>
              <div>{new Date(todo.updatedAt).toLocaleString()}</div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Source:</div>
              <div>{todo.metadata.source}</div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Device:</div>
              <div>{todo.metadata.originatingDevice}</div>
            </div>
          </div>

          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', marginTop: '16px' }}>
            <BookmarkIcon />
            History
          </h4>

          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {todo.metadata.history.map((entry, index) => (
              <div key={index} class={historyItem}>
                <div style={{ fontWeight: 'bold' }}>
                  {entry.action.toUpperCase()} at {new Date(entry.timestamp).toLocaleString()}
                </div>
                <div>By User: {entry.user}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
