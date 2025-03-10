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
      <CardContent>
        <div
          style={{
            padding: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            backgroundColor: 'white',
          }}
        >
          {!expanded.value ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%',
              }}
            >
              <div style={{ flex: '1' }}>
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
                  style={{ width: '100%' }}
                />
              </div>

              <Button
                intent="outline"
                onClick$={handleExpandClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                }}
              >
                Expand
                <ChevronDownIcon />
              </Button>

              <Button
                intent="primary"
                onClick$={handleSubmit}
                disabled={isSubmitting.value || !title.value.trim()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                }}
              >
                <PlusIcon />
                <span>Add Todo</span>
              </Button>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827',
                  }}
                >
                  Create New Todo
                </h3>

                <Button
                  intent="outline"
                  onClick$={handleExpandClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                  }}
                >
                  Collapse
                  <ChevronUpIcon />
                </Button>
              </div>

              <form
                preventdefault:submit
                onSubmit$={handleSubmit}
                style={{
                  marginTop: '16px',
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '16px',
                }}
              >
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
                        fontWeight: '500',
                        color: '#374151',
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
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        backgroundColor: 'white',
                        color: '#111827',
                        fontSize: '14px',
                        resize: 'vertical',
                        outline: 'none',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
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
                          fontWeight: '500',
                          color: '#374151',
                        }}
                      >
                        Priority
                      </label>
                      <select
                        value={priority.value}
                        onChange$={(e: any) => (priority.value = e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          backgroundColor: 'white',
                          color: '#111827',
                          fontSize: '14px',
                          outline: 'none',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
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
                          fontWeight: '500',
                          color: '#374151',
                        }}
                      >
                        Assign To
                      </label>
                      <select
                        value={assignedTo.value || ''}
                        onChange$={(e: any) => (assignedTo.value = e.target.value || null)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          backgroundColor: 'white',
                          color: '#111827',
                          fontSize: '14px',
                          outline: 'none',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
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
                          fontWeight: '500',
                          color: '#374151',
                        }}
                      >
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={dueDate.value || ''}
                        onChange$={(e: any) => (dueDate.value = e.target.value || null)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          backgroundColor: 'white',
                          color: '#111827',
                          fontSize: '14px',
                          outline: 'none',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
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
                        fontWeight: '500',
                        color: '#374151',
                      }}
                    >
                      Tags
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Input
                        placeholder="Add a tag..."
                        value={currentTag.value}
                        onChange$={(e: any) => (currentTag.value = e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <Button
                        type="button"
                        intent="outline"
                        onClick$={handleAddTag}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '8px 16px',
                          borderRadius: '6px',
                        }}
                      >
                        <PlusIcon />
                        <span>Add</span>
                      </Button>
                    </div>

                    {tags.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                          marginTop: '8px',
                        }}
                      >
                        {tags.map((tag) => (
                          <div
                            key={tag}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              backgroundColor: '#f3f4f6',
                              borderRadius: '16px',
                              padding: '4px 12px',
                              fontSize: '14px',
                              gap: '6px',
                            }}
                          >
                            {tag}
                            <div style={{ cursor: 'pointer' }} onClick$={() => handleRemoveTag(tag)}>
                              <XIcon />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '8px',
                      marginTop: '8px',
                      paddingTop: '16px',
                      borderTop: '1px solid #e5e7eb',
                    }}
                  >
                    <Button
                      type="button"
                      intent="outline"
                      onClick$={() => {
                        expanded.value = false;
                        title.value = '';
                        description.value = '';
                        priority.value = 'medium';
                        assignedTo.value = null;
                        dueDate.value = null;
                        tags.length = 0;
                        titleError.value = '';
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      intent="primary"
                      disabled={isSubmitting.value}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <PlusIcon />
                      <span>Add Todo</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
