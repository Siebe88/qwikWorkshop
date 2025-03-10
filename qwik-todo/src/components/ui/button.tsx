import { component$, Slot, type QwikIntrinsicElements } from '@builder.io/qwik';

export type ButtonProps = {
  intent?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
} & Omit<QwikIntrinsicElements['button'], 'className'>;

export const Button = component$<ButtonProps>((props) => {
  const { intent = 'primary', size = 'md', fullWidth = false, ...rest } = props;

  // Build class string based on props
  const classes = ['button', `button-intent-${intent}`, `button-size-${size}`, fullWidth ? 'button-full-width' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <button
      class={classes}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.375rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: 'none',
        outline: 'none',
        position: 'relative',
        textDecoration: 'none',
        ...(intent === 'primary' && {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
        }),
        ...(intent === 'ghost' && {
          backgroundColor: 'transparent',
          color: 'inherit',
        }),
        ...(size === 'icon' && {
          height: '40px',
          width: '40px',
          padding: '0',
        }),
        ...(fullWidth && {
          width: '100%',
        }),
      }}
      {...rest}
    >
      <Slot />
    </button>
  );
});
