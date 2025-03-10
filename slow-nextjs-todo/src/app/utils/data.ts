import { Todo, User } from '../types';

// Generate a large amount of sample data to increase the initial payload size
export const generateSampleUsers = (count: number = 20): User[] => {
  return Array.from({ length: count }).map((_, index) => ({
    id: `user-${index + 1}`,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
    role: index < 2 ? 'admin' : 'user',
  }));
};

export const generateSampleTodos = (count: number = 200): Todo[] => {
  const priorities = ['low', 'medium', 'high'] as const;
  const tags = [
    'work',
    'personal',
    'shopping',
    'health',
    'finance',
    'family',
    'home',
    'education',
    'travel',
    'leisure',
  ];

  return Array.from({ length: count }).map((_, index) => {
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));

    const updatedDate = new Date(createdDate);
    updatedDate.setHours(updatedDate.getHours() + Math.floor(Math.random() * 48));

    const dueDate = Math.random() > 0.2 ? new Date() : null;
    if (dueDate) {
      dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 14));
    }

    const randomTags = Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(
      () => tags[Math.floor(Math.random() * tags.length)]
    );

    const historyLength = Math.floor(Math.random() * 5) + 1;
    const historyEntries = Array.from({ length: historyLength }).map((_, histIndex) => {
      const histTimestamp = new Date(createdDate);
      histTimestamp.setHours(histTimestamp.getHours() + histIndex * 2);

      return {
        action: ['created', 'updated', 'status_changed', 'assigned'][Math.floor(Math.random() * 4)],
        timestamp: histTimestamp.toISOString(),
        user: `user-${Math.floor(Math.random() * 20) + 1}`,
      };
    });

    const remindersCount = Math.floor(Math.random() * 3);
    const reminders = Array.from({ length: remindersCount }).map(() => {
      const reminderDate = new Date();
      reminderDate.setDate(reminderDate.getDate() + Math.floor(Math.random() * 7));
      return reminderDate.toISOString();
    });

    return {
      id: `todo-${index + 1}`,
      title: `Task ${index + 1}: ${
        ['Complete', 'Review', 'Plan', 'Discuss', 'Implement'][Math.floor(Math.random() * 5)]
      } ${['project', 'report', 'meeting', 'feature', 'bug fix'][Math.floor(Math.random() * 5)]}`,
      completed: Math.random() > 0.7,
      description: `This is a detailed description for task ${
        index + 1
      }. It contains a lot of unnecessary text to make the payload larger. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      priority: priorities[Math.floor(Math.random() * 3)],
      dueDate: dueDate ? dueDate.toISOString() : null,
      tags: [...new Set(randomTags)], // Remove duplicates
      createdAt: createdDate.toISOString(),
      updatedAt: updatedDate.toISOString(),
      assignedTo: Math.random() > 0.3 ? `user-${Math.floor(Math.random() * 20) + 1}` : null,
      metadata: {
        source: ['web', 'mobile', 'api', 'import'][Math.floor(Math.random() * 4)],
        originatingDevice: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
        history: historyEntries,
        settings: {
          notification: Math.random() > 0.5,
          displayColor: ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0'][Math.floor(Math.random() * 5)],
          reminders,
        },
      },
    };
  });
};

// Pre-generate the data
export const sampleUsers = generateSampleUsers();
export const sampleTodos = generateSampleTodos();
