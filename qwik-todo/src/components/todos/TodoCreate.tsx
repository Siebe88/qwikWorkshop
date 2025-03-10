import { component$, useSignal, useStore, $, type PropFunction } from '@builder.io/qwik';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Todo, User } from '../../types';
import { Checkbox } from '../ui/Checkbox';
import { ChevronUpIcon, ChevronDownIcon, PlusIcon, XIcon } from '../Icons';

export interface TodoCreateProps {
  onAddTodo$: PropFunction<(todo: Omit<Todo, 'id'>) => void>;
  users: User[];
}

export const TodoCreate = component$<TodoCreateProps>((props) => {
  const { onAddTodo$, users } = props;

  // Local state
  const expanded = useSignal(false);
  const title = useSignal('');
  const description = useSignal('');
  const priority = useSignal<'low' | 'medium' | 'high'>('medium');
  const assignedTo = useSignal<string | null>(null);
  const dueDate = useSignal<string | null>(null);
  const tags = useStore<string[]>([]);
  const currentTag = useSignal('');
  const isSubmitting = useSignal(false);
  const titleError = useSignal('');

  // Handlers
  const handleExpandClick = $(() => {
    expanded.value = !expanded.value;
  });

  const handleAddTag = $(() => {
    if (currentTag.value.trim() && !tags.includes(currentTag.value.trim())) {
      tags.push(currentTag.value.trim());
      currentTag.value = '';
    }
  });

  const handleRemoveTag = $((tagToRemove: string) => {
    const index = tags.indexOf(tagToRemove);
    if (index !== -1) {
      tags.splice(index, 1);
    }
  });

  const handleSubmit = $((e?: any) => {
    if (e) e.preventDefault();

    // Validate the title
    if (!title.value.trim()) {
      titleError.value = 'Title is required';
      return;
    }

    // Simulate form submission
    isSubmitting.value = true;

    const now = new Date().toISOString();

    // Create a new todo with all the metadata
    const newTodo: Omit<Todo, 'id'> = {
      title: title.value,
      description: description.value,
      completed: false,
      priority: priority.value,
      dueDate: dueDate.value,
      tags: [...tags],
      createdAt: now,
      updatedAt: now,
      assignedTo: assignedTo.value,
      metadata: {
        source: 'web',
        originatingDevice: 'desktop',
        history: [
          {
            action: 'created',
            timestamp: now,
            user: 'user-1', // Current user
          },
        ],
        settings: {
          notification: true,
          displayColor: priority.value === 'high' ? '#f44336' : priority.value === 'medium' ? '#ff9800' : '#4caf50',
          reminders: dueDate.value ? [dueDate.value] : [],
        },
      },
    };

    onAddTodo$(newTodo);

    // Reset form state
    title.value = '';
    description.value = '';
    priority.value = 'medium';
    assignedTo.value = null;
    dueDate.value = null;
    tags.length = 0;
    isSubmitting.value = false;
    expanded.value = false;
  });

  return (
    <Card variant="default">
      <div style={{ marginBottom: '24px' }}>
        <CardContent>
          <div style={{ padding: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {!expanded.value ? (
                <Input
                  placeholder="Add a new todo..."
                  value={title.value}
                  onChange$={(e: any) => {
                    title.value = e.target.value;
                    if (e.target.value.trim()) {
                      titleError.value = '';
                    }
                  }}
                  error={titleError.value}
                  style={{ marginRight: '16px' }}
                />
              ) : (
                <h3 style={{ margin: 0 }}>Create New Todo</h3>
              )}

              <Button intent={expanded.value ? 'outline' : 'primary'} onClick$={handleExpandClick}>
                {expanded.value ? 'Collapse' : 'Expand'}
                <div style={{ marginLeft: '4px' }}>{expanded.value ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
              </Button>
            </div>

            {expanded.value && (
              <form preventdefault:submit onSubmit$={handleSubmit} style={{ marginTop: '16px' }}>
                <div
                  style={{
                    display: 'grid',
                    gap: '16px',
                  }}
                >
                  <div>
                    <Input
                      label="Title"
                      value={title.value}
                      onChange$={(e: any) => {
                        title.value = e.target.value;
                        if (e.target.value.trim()) {
                          titleError.value = '';
                        }
                      }}
                      error={titleError.value}
                      required
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      Description
                    </label>
                    <textarea
                      value={description.value}
                      onChange$={(e: any) => (description.value = e.target.value)}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--input)',
                        color: 'var(--foreground)',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '16px',
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        Priority
                      </label>
                      <select
                        value={priority.value}
                        onChange$={(e: any) => (priority.value = e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                          backgroundColor: 'var(--background)',
                          color: 'var(--foreground)',
                        }}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        Assign To
                      </label>
                      <select
                        value={assignedTo.value || ''}
                        onChange$={(e: any) => (assignedTo.value = e.target.value || null)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                          backgroundColor: 'var(--background)',
                          color: 'var(--foreground)',
                        }}
                      >
                        <option value="">None</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={dueDate.value ? dueDate.value.split('T')[0] : ''}
                        onChange$={(e: any) =>
                          (dueDate.value = e.target.value ? new Date(e.target.value).toISOString() : null)
                        }
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                          backgroundColor: 'var(--background)',
                          color: 'var(--foreground)',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      Tags
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Input
                        placeholder="Type and press Enter to add tags"
                        value={currentTag.value}
                        onChange$={(e: any) => (currentTag.value = e.target.value)}
                        onKeyDown$={(e: any) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button type="button" onClick$={handleAddTag}>
                        Add
                      </Button>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginTop: '8px',
                      }}
                    >
                      {tags.map((tag, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '4px 8px',
                            backgroundColor: 'var(--primary-background)',
                            color: 'var(--primary-foreground)',
                            borderRadius: '9999px',
                            fontSize: '12px',
                          }}
                        >
                          {tag}
                          <div style={{ marginLeft: '4px', cursor: 'pointer' }} onClick$={() => handleRemoveTag(tag)}>
                            <XIcon />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '8px',
                      marginTop: '16px',
                    }}
                  >
                    <Button type="button" intent="outline" onClick$={() => (expanded.value = false)}>
                      Cancel
                    </Button>
                    <Button type="submit" intent="primary" disabled={isSubmitting.value || !title.value.trim()}>
                      <div style={{ marginRight: '4px' }}>
                        <PlusIcon />
                      </div>
                      {isSubmitting.value ? 'Adding...' : 'Add Todo'}
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {!expanded.value && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '16px',
                }}
              >
                <Button intent="primary" onClick$={handleSubmit} disabled={isSubmitting.value || !title.value.trim()}>
                  <div style={{ marginRight: '4px' }}>
                    <PlusIcon />
                  </div>
                  {isSubmitting.value ? 'Adding...' : 'Add Todo'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
});
