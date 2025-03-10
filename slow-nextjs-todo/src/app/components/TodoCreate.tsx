'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Chip,
  FormHelperText,
} from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { User, Todo } from '../types';

interface TodoCreateProps {
  onAddTodo: (todo: Omit<Todo, 'id'>) => void;
  users: User[];
}

export default function TodoCreate({ onAddTodo, users }: TodoCreateProps) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [assignee, setAssignee] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string>('');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear any previous errors
    setErrors({});

    // Create new todo
    const newTodo: Omit<Todo, 'id'> = {
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority,
      assignedTo: assignee,
      dueDate: dueDate || null,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        source: 'web',
        originatingDevice: 'desktop',
        history: [
          {
            action: 'created',
            timestamp: new Date().toISOString(),
            user: users[0].id, // Default to first user
          },
        ],
        settings: {
          notification: true,
          displayColor: priority === 'high' ? '#f44336' : priority === 'medium' ? '#ff9800' : '#4caf50',
          reminders: dueDate ? [dueDate] : [],
        },
      },
    };

    // Add the todo
    onAddTodo(newTodo);

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setAssignee(null);
    setDueDate('');
    setTags([]);
    setExpanded(false);
  };

  return (
    <Paper sx={{ mb: 4, p: 2, position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!expanded ? (
          <TextField
            fullWidth
            placeholder="Add a new todo..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim()) {
                setErrors({});
              }
            }}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mr: 2 }}
          />
        ) : (
          <Typography variant="h6">Create New Todo</Typography>
        )}

        <Button
          variant={expanded ? 'outlined' : 'contained'}
          color="primary"
          onClick={handleExpandClick}
          endIcon={
            <ExpandMoreIcon
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          }
        >
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (e.target.value.trim()) {
                    setErrors({});
                  }
                }}
                error={!!errors.title}
                helperText={errors.title}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  value={priority}
                  label="Priority"
                  onChange={(e) => {
                    setPriority(e.target.value as 'low' | 'medium' | 'high');
                  }}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="assignee-label">Assign To</InputLabel>
                <Select
                  labelId="assignee-label"
                  value={assignee || ''}
                  label="Assign To"
                  onChange={(e) => {
                    setAssignee(e.target.value || null);
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Add Tags"
                  value={newTag}
                  onChange={(e) => {
                    setNewTag(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Type and press Enter to add tags"
                  sx={{ mb: 1 }}
                />
                <FormHelperText>Press Enter to add a tag</FormHelperText>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  setExpanded(false);
                }}
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                disabled={!title.trim() || Object.keys(errors).length > 0}
              >
                {Object.keys(errors).length > 0 ? 'Adding...' : 'Add Todo'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Collapse>

      {!expanded && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            disabled={!title.trim() || Object.keys(errors).length > 0}
          >
            {Object.keys(errors).length > 0 ? 'Adding...' : 'Add Todo'}
          </Button>
        </Box>
      )}
    </Paper>
  );
}
