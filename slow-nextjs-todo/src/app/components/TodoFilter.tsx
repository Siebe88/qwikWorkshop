'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Collapse,
  Divider,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { FilterOptions, User } from '../types';
import { artificialDelay } from '../utils/performance';

interface TodoFilterProps {
  filterOptions: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  users: User[];
}

export default function TodoFilter({ filterOptions, onFilterChange, users }: TodoFilterProps) {
  const [expanded, setExpanded] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterOptions>(filterOptions);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Inefficient effect that recalculates on every render
  useEffect(() => {
    // Artificial delay to simulate slow component
    artificialDelay(150);

    // Unnecessary state update and computations
    setTempFilters(filterOptions);

    // Count active filters
    let count = 0;
    if (filterOptions.status !== 'all') count++;
    if (filterOptions.priority !== 'all') count++;
    if (filterOptions.assignee !== 'all') count++;
    if (filterOptions.search) count++;
    setActiveFiltersCount(count);

    // More unnecessary work to slow things down
    const expensiveCalculation = () => {
      let result = 0;
      for (let i = 0; i < 50000; i++) {
        result += Math.sin(i) * Math.cos(i);
      }
      return result;
    };

    expensiveCalculation();
  }, [filterOptions]);

  // Expensive handlers with artificial delays
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    artificialDelay(50);
    const newValue = e.target.value;
    setTempFilters((prev) => ({ ...prev, search: newValue }));

    // Apply search filter immediately without debouncing
    onFilterChange({ ...filterOptions, search: newValue });
  };

  const handleStatusChange = (e: any) => {
    artificialDelay(30);
    const newValue = e.target.value;
    setTempFilters((prev) => ({ ...prev, status: newValue }));
    onFilterChange({ ...filterOptions, status: newValue });
  };

  const handlePriorityChange = (e: any) => {
    artificialDelay(30);
    const newValue = e.target.value;
    setTempFilters((prev) => ({ ...prev, priority: newValue }));
    onFilterChange({ ...filterOptions, priority: newValue });
  };

  const handleAssigneeChange = (e: any) => {
    artificialDelay(30);
    const newValue = e.target.value;
    setTempFilters((prev) => ({ ...prev, assignee: newValue }));
    onFilterChange({ ...filterOptions, assignee: newValue });
  };

  const handleExpandClick = () => {
    artificialDelay(50);
    setExpanded(!expanded);
  };

  const handleClearFilters = () => {
    artificialDelay(100);
    const resetFilters: FilterOptions = {
      status: 'all',
      priority: 'all',
      assignee: 'all',
      search: '',
    };
    setTempFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Render active filter chips for better UX (but with performance cost)
  const renderActiveFilters = () => {
    if (activeFiltersCount === 0) return null;

    const filters = [];

    if (filterOptions.status !== 'all') {
      filters.push(
        <Chip
          key="status"
          label={`Status: ${filterOptions.status}`}
          onDelete={() => handleStatusChange({ target: { value: 'all' } })}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ m: 0.5 }}
        />
      );
    }

    if (filterOptions.priority !== 'all') {
      filters.push(
        <Chip
          key="priority"
          label={`Priority: ${filterOptions.priority}`}
          onDelete={() => handlePriorityChange({ target: { value: 'all' } })}
          size="small"
          color="secondary"
          variant="outlined"
          sx={{ m: 0.5 }}
        />
      );
    }

    if (filterOptions.assignee !== 'all') {
      const assigneeName = users.find((u) => u.id === filterOptions.assignee)?.name || filterOptions.assignee;
      filters.push(
        <Chip
          key="assignee"
          label={`Assignee: ${assigneeName}`}
          onDelete={() => handleAssigneeChange({ target: { value: 'all' } })}
          size="small"
          color="info"
          variant="outlined"
          sx={{ m: 0.5 }}
        />
      );
    }

    if (filterOptions.search) {
      filters.push(
        <Chip
          key="search"
          label={`Search: ${filterOptions.search}`}
          onDelete={() => handleSearchChange({ target: { value: '' } } as any)}
          size="small"
          color="default"
          variant="outlined"
          sx={{ m: 0.5 }}
        />
      );
    }

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
        <Typography variant="caption" sx={{ mr: 1, mt: 0.5 }}>
          Active filters:
        </Typography>
        {filters}
        {filters.length > 1 && (
          <Chip
            label="Clear all"
            onClick={handleClearFilters}
            size="small"
            color="error"
            variant="outlined"
            sx={{ m: 0.5 }}
          />
        )}
      </Box>
    );
  };

  return (
    <Paper sx={{ mb: 3, p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={expanded ? 12 : 6} md={expanded ? 12 : 8}>
          <TextField
            fullWidth
            placeholder="Search todos..."
            value={tempFilters.search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: tempFilters.search ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => handleSearchChange({ target: { value: '' } } as any)}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} sx={{ display: { xs: 'block', sm: expanded ? 'block' : 'none' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant={expanded ? 'contained' : 'outlined'}
              color="primary"
              startIcon={<FilterListIcon />}
              endIcon={
                <ExpandMoreIcon
                  sx={{
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                  }}
                />
              }
              onClick={handleExpandClick}
              size="small"
              sx={{ mr: 1 }}
            >
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>

            {activeFiltersCount > 0 && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                size="small"
              >
                Clear
              </Button>
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="status-filter-label">Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    id="status-filter"
                    value={tempFilters.status}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="priority-filter-label">Priority</InputLabel>
                  <Select
                    labelId="priority-filter-label"
                    id="priority-filter"
                    value={tempFilters.priority}
                    label="Priority"
                    onChange={handlePriorityChange}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="assignee-filter-label">Assignee</InputLabel>
                  <Select
                    labelId="assignee-filter-label"
                    id="assignee-filter"
                    value={tempFilters.assignee}
                    label="Assignee"
                    onChange={handleAssigneeChange}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Collapse>

          {activeFiltersCount > 0 && renderActiveFilters()}
        </Grid>
      </Grid>
    </Paper>
  );
}
