'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Badge,
  CircularProgress,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { User } from '../types';
import { artificialDelay } from '../utils/performance';
import { useThemeMode } from '../theme-registry';

interface HeaderProps {
  currentUser: User;
}

// Header component with unnecessary computations and delays
export default function Header({ currentUser }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  // Get dark mode from context
  const { darkMode, toggleDarkMode } = useThemeMode();

  // Effect to simulate loading state and add delay
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Artificial delay to simulate slow component mount
      artificialDelay(300);
      setIsLoading(false);

      // Unnecessary calculations to slow rendering
      const expensiveCalculation = () => {
        let result = 0;
        for (let i = 0; i < 100000; i++) {
          result += Math.sin(i) * Math.cos(i);
        }
        return result;
      };

      expensiveCalculation();
    }
  }, []);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    artificialDelay(50);
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    artificialDelay(50);
    setAnchorEl(null);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    artificialDelay(50);
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    artificialDelay(50);
    setNotificationAnchorEl(null);
    setUnreadNotifications(0);
  };

  const handleToggleDarkMode = () => {
    // Remove artificial delay for faster theme switching
    toggleDarkMode();
  };

  // Dummy notifications
  const notifications = [
    { id: 1, text: 'New task assigned to you', time: '5 minutes ago' },
    { id: 2, text: 'Task "Complete project report" is due tomorrow', time: '2 hours ago' },
    { id: 3, text: 'Your task "Review design mockups" was updated', time: '1 day ago' },
  ];

  if (isLoading) {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', py: 2 }}>
            <CircularProgress color="inherit" size={24} sx={{ mr: 2 }} />
            <Typography variant="h6">Loading...</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Slow NextJS Todo App
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton color="inherit" onClick={handleToggleDarkMode}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotificationClick}
              aria-controls={notificationAnchorEl ? 'notification-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={notificationAnchorEl ? 'true' : undefined}
            >
              <Badge badgeContent={unreadNotifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            id="notification-menu"
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
            MenuListProps={{
              'aria-labelledby': 'notification-button',
            }}
            sx={{ mt: 2 }}
          >
            <Box sx={{ p: 2, minWidth: '300px' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Notifications
              </Typography>
            </Box>
            <Divider />
            {notifications.map((notification) => (
              <MenuItem key={notification.id} onClick={handleNotificationClose}>
                <Box sx={{ display: 'flex', flexDirection: 'column', py: 1 }}>
                  <Typography variant="body1">{notification.text}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem onClick={handleNotificationClose}>
              <Typography variant="body2" sx={{ width: '100%', textAlign: 'center' }}>
                Mark all as read
              </Typography>
            </MenuItem>
          </Menu>

          <Tooltip title="Settings">
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={currentUser.name}>
            <IconButton
              onClick={handleProfileClick}
              aria-controls={anchorEl ? 'profile-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? 'true' : undefined}
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Avatar alt={currentUser.name} src={currentUser.avatar} sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>

          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
            sx={{ mt: 2 }}
          >
            <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileClose}>My account</MenuItem>
            <Divider />
            <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
