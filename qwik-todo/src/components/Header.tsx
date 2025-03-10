import { component$, useSignal, $, type PropFunction } from '@builder.io/qwik';
import { User } from '../types';
import { Button } from './ui/Button';

// Import our custom icons
import { MenuIcon, BellIcon, SettingsIcon, UserIcon, SunIcon, MoonIcon } from './Icons';

export interface HeaderProps {
  currentUser: User;
  isDarkMode: boolean;
  onToggleDarkMode$: PropFunction<() => void>;
}

export const Header = component$<HeaderProps>((props) => {
  const { currentUser, isDarkMode, onToggleDarkMode$ } = props;

  // Local state
  const isMenuOpen = useSignal(false);
  const isNotificationsOpen = useSignal(false);

  // Handlers
  const handleToggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  const handleToggleNotifications = $(() => {
    isNotificationsOpen.value = !isNotificationsOpen.value;
  });

  const handleToggleDarkMode = $(() => {
    onToggleDarkMode$();
  });

  return (
    <header
      style={{
        backgroundColor: 'var(--primary-background)',
        color: 'var(--primary-foreground)',
        padding: '0 16px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button intent="ghost" size="icon" aria-label="Menu">
          <MenuIcon />
        </Button>

        <h1
          style={{
            margin: '0 0 0 16px',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          Fast Qwik Todo App
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Button
          intent="ghost"
          size="icon"
          onClick$={handleToggleDarkMode}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </Button>

        <Button intent="ghost" size="icon" onClick$={handleToggleNotifications} aria-label="Notifications">
          <div style={{ position: 'relative' }}>
            <BellIcon />
            <span
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: 'var(--destructive-background)',
                color: 'var(--destructive-foreground)',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              3
            </span>
          </div>
        </Button>

        <Button intent="ghost" size="icon" aria-label="Settings">
          <SettingsIcon />
        </Button>

        <Button intent="ghost" size="icon" onClick$={handleToggleMenu} aria-label="User menu">
          <div style={{ position: 'relative' }}>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                }}
              />
            ) : (
              <UserIcon />
            )}
          </div>
        </Button>
      </div>

      {isMenuOpen.value && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            right: '16px',
            backgroundColor: 'var(--card)',
            color: 'var(--card-foreground)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            minWidth: '200px',
            zIndex: 50,
          }}
        >
          <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 600 }}>{currentUser.name}</div>
            <div style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>{currentUser.email}</div>
          </div>

          <div style={{ padding: '8px 0' }}>
            <button
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--foreground)',
                fontSize: '14px',
              }}
            >
              Profile
            </button>

            <button
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--foreground)',
                fontSize: '14px',
              }}
            >
              Settings
            </button>

            <button
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--destructive-background)',
                fontSize: '14px',
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {isNotificationsOpen.value && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            right: '16px',
            backgroundColor: 'var(--card)',
            color: 'var(--card-foreground)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            minWidth: '300px',
            zIndex: 50,
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border)',
              fontWeight: 600,
            }}
          >
            Notifications
          </div>

          <div>
            {[
              { id: 1, text: 'New task assigned to you', time: '5 minutes ago' },
              { id: 2, text: 'Task "Complete project report" is due tomorrow', time: '2 hours ago' },
              { id: 3, text: 'Your task "Review design mockups" was updated', time: '1 day ago' },
            ].map((notification) => (
              <div
                key={notification.id}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                }}
              >
                <div>{notification.text}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
                  {notification.time}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '8px 16px',
              textAlign: 'center',
              fontSize: '14px',
              color: 'var(--primary-background)',
              cursor: 'pointer',
            }}
          >
            Mark all as read
          </div>
        </div>
      )}
    </header>
  );
});
