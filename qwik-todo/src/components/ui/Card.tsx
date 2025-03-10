import { component$, Slot } from '@builder.io/qwik';

export type CardProps = {
  variant?: 'default' | 'bordered' | 'raised' | 'flat';
  padding?: 'sm' | 'md' | 'lg' | 'none';
};

export const Card = component$<CardProps>((props) => {
  const { variant = 'default', padding = 'md' } = props;

  // Basic styles for card
  const baseStyles = {
    backgroundColor: 'white',
    color: '#333',
    borderRadius: '0.375rem',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
  };

  // Add variant-specific styles
  const variantStyles = {
    default: {
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    },
    bordered: {
      border: '1px solid #e2e8f0',
    },
    raised: {
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    },
    flat: {
      boxShadow: 'none',
    },
  };

  // Add padding styles
  const paddingStyles = {
    none: {
      padding: '0',
    },
    sm: {
      padding: '0.5rem',
    },
    md: {
      padding: '1rem',
    },
    lg: {
      padding: '1.5rem',
    },
  };

  return (
    <div
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...paddingStyles[padding],
      }}
    >
      <Slot />
    </div>
  );
});

export const CardHeader = component$(() => {
  return (
    <div
      style={{
        padding: '1rem',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <Slot />
    </div>
  );
});

export const CardTitle = component$(() => {
  return (
    <h3
      style={{
        fontWeight: '600',
        fontSize: '1.25rem',
        color: '#333',
      }}
    >
      <Slot />
    </h3>
  );
});

export const CardDescription = component$(() => {
  return (
    <p
      style={{
        marginTop: '0.25rem',
        color: '#6b7280',
        fontSize: '0.875rem',
      }}
    >
      <Slot />
    </p>
  );
});

export const CardContent = component$(() => {
  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <Slot />
    </div>
  );
});

export const CardFooter = component$(() => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '1rem',
        borderTop: '1px solid #e2e8f0',
        gap: '0.5rem',
      }}
    >
      <Slot />
    </div>
  );
});
