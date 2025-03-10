'use client';

import React, { useState, useEffect } from 'react';
import { Todo, User } from '../types';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Chip,
  Box,
  Avatar,
  Collapse,
  Divider,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  AssignmentInd as AssignmentIndIcon,
  Schedule as ScheduleIcon,
  Bookmark as BookmarkIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { measureRenderTime } from '../utils/performance';

// A heavy component with many nested elements and unnecessary complexity
// This will be slow to hydrate

interface TodoItemProps {
  todo: Todo;
  users: User[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoItem({ todo, users, onToggleComplete, onDelete, onEdit }: TodoItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const assignee = todo.assignedTo ? users.find((user) => user.id === todo.assignedTo) || null : null;

  // Track render time
  const renderTimer = measureRenderTime(`TodoItem-${todo.id}`);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      renderTimer.start();
      return () => {
        renderTimer.end();
      };
    }
  }, [renderTimer, todo.id]);

  const handleToggleComplete = () => {
    onToggleComplete(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit({
      ...todo,
      title: editedTitle,
      description: editedDescription,
      assignedTo: assignee ? assignee.id : null,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const priorityColor = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336',
  }[todo.priority];

  // Create many unneeded elements that will increase DOM size
  const renderMetadataHistory = () => {
    return todo.metadata.history.map((entry, index) => (
      <Box key={`${todo.id}-history-${index}`} sx={{ mb: 1, p: 1, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 1 }}>
        <Typography variant="caption" component="div">
          {entry.action.toUpperCase()} at {new Date(entry.timestamp).toLocaleString()}
        </Typography>
        <Typography variant="body2">By User: {entry.user}</Typography>
        <Box sx={{ height: '2px', width: '100%', bgcolor: 'rgba(0,0,0,0.1)', my: 1 }} />
      </Box>
    ));
  };

  // Inefficient rendering of tags with many DOM elements
  const renderTags = () => {
    return todo.tags.map((tag, index) => (
      <Chip
        key={`${todo.id}-tag-${index}`}
        label={tag}
        size="small"
        sx={{
          m: 0.5,
          bgcolor: `hsl(${(index * 60) % 360}, 70%, 80%)`,
          '&:hover': { bgcolor: `hsl(${(index * 60) % 360}, 70%, 70%)` },
        }}
      />
    ));
  };

  return (
    <Card
      sx={{
        mb: 2,
        position: 'relative',
        borderLeft: `5px solid ${priorityColor}`,
        opacity: todo.completed ? 0.8 : 1,
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
          <Checkbox checked={todo.completed} onChange={handleToggleComplete} sx={{ mt: -1, ml: -1 }} />

          <Box sx={{ flex: 1 }}>
            {isEditing ? (
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary',
                }}
              >
                {todo.title}
              </Typography>
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>{renderTags()}</Box>

            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                size="small"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {todo.description.length > 100 && !expanded
                  ? `${todo.description.substring(0, 100)}...`
                  : todo.description}
              </Typography>
            )}
          </Box>

          <Box>
            {isEditing ? (
              <Button variant="contained" color="primary" size="small" onClick={handleSaveEdit}>
                Save
              </Button>
            ) : (
              <>
                <IconButton size="small" onClick={handleEdit}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={handleDelete}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {assignee && (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <AssignmentIndIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Avatar src={assignee.avatar} alt={assignee.name} sx={{ width: 24, height: 24, mr: 1 }} />
                <Typography variant="body2">{assignee.name}</Typography>
              </Box>
            )}

            {todo.dueDate && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ScheduleIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2">{new Date(todo.dueDate).toLocaleDateString()}</Typography>
              </Box>
            )}
          </Box>

          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            size="small"
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" gutterBottom>
            <InfoIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
            Additional Information
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Created:
              </Typography>
              <Typography variant="body2">{new Date(todo.createdAt).toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Updated:
              </Typography>
              <Typography variant="body2">{new Date(todo.updatedAt).toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Source:
              </Typography>
              <Typography variant="body2">{todo.metadata.source}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Device:
              </Typography>
              <Typography variant="body2">{todo.metadata.originatingDevice}</Typography>
            </Grid>
          </Grid>

          <Typography variant="subtitle2" gutterBottom>
            <BookmarkIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
            History
          </Typography>

          <Box sx={{ maxHeight: '200px', overflowY: 'auto', mt: 1, mb: 2 }}>{renderMetadataHistory()}</Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}
