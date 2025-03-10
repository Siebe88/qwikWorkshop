export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  assignedTo: string | null;
  // Additional fields to make the object larger
  metadata: {
    source: string;
    originatingDevice: string;
    history: {
      action: string;
      timestamp: string;
      user: string;
    }[];
    settings: {
      notification: boolean;
      displayColor: string;
      reminders: string[];
    };
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface FilterOptions {
  status: 'all' | 'active' | 'completed';
  priority: 'all' | 'low' | 'medium' | 'high';
  assignee: string | 'all';
  search: string;
}
