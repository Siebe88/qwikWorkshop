'use client';

import React, { useState, useEffect } from 'react';
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
import { Add as AddIcon, ExpandMore as ExpandMoreIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { User, Todo } from '../types';
import { artificialDelay } from '../utils/performance';

interface TodoCreateProps {
  onAddTodo: (todo: Omit<Todo, 'id'>) => void;
  users: User[];
}

export default function TodoCreate({ onAddTodo, users }: TodoCreateProps) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleError, setTitleError] = useState('');

  // Inefficient effect to slow down rendering
  useEffect(() => {
    if (typeof window !== 'undefined') {
      artificialDelay(100);
    }
  }, [expanded]);

  const handleExpandClick = () => {
    artificialDelay(50);
    setExpanded(!expanded);
  };

  const handleAddTag = () => {
    artificialDelay(30);
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    artificialDelay(30);
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the title
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }

    // Simulate slow form submission
    setIsSubmitting(true);
    artificialDelay(500);

    const now = new Date().toISOString();

    // Create a new todo with all the metadata
    const newTodo: Omit<Todo, 'id'> = {
      title,
      description,
      completed: false,
      priority,
      dueDate,
      tags,
      createdAt: now,
      updatedAt: now,
      assignedTo,
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
          displayColor: priority === 'high' ? '#f44336' : priority === 'medium' ? '#ff9800' : '#4caf50',
          reminders: dueDate ? [dueDate] : [],
        },
      },
    };

    onAddTodo(newTodo);

    // Reset form state
    setTitle('');
    setDescription('');
    setPriority('medium');
    setAssignedTo(null);
    setDueDate(null);
    setTags([]);
    setIsSubmitting(false);
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
              artificialDelay(20);
              setTitle(e.target.value);
              if (e.target.value.trim()) {
                setTitleError('');
              }
            }}
            error={!!titleError}
            helperText={titleError}
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
                  artificialDelay(20);
                  setTitle(e.target.value);
                  if (e.target.value.trim()) {
                    setTitleError('');
                  }
                }}
                error={!!titleError}
                helperText={titleError}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => {
                  artificialDelay(30);
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
                    artificialDelay(30);
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
                  value={assignedTo || ''}
                  label="Assign To"
                  onChange={(e) => {
                    artificialDelay(30);
                    setAssignedTo(e.target.value || null);
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
                value={dueDate ? dueDate.split('T')[0] : ''}
                onChange={(e) => {
                  artificialDelay(30);
                  setDueDate(e.target.value ? new Date(e.target.value).toISOString() : null);
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
                  value={currentTag}
                  onChange={(e) => {
                    artificialDelay(10);
                    setCurrentTag(e.target.value);
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
                  artificialDelay(50);
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
                disabled={isSubmitting || !title.trim()}
              >
                {isSubmitting ? 'Adding...' : 'Add Todo'}
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
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? 'Adding...' : 'Add Todo'}
          </Button>
        </Box>
      )}
    </Paper>
  );
}
