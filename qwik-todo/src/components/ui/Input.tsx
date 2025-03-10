import { component$, type QwikIntrinsicElements, type JSXOutput } from '@builder.io/qwik';

export type InputProps = {
  label?: string;
  error?: string;
  hint?: string;
  startIcon?: JSXOutput;
  endIcon?: JSXOutput;
} & Omit<QwikIntrinsicElements['input'], 'className'>;

export const Input = component$<InputProps>((props) => {
  const { label, error, hint, id, startIcon, endIcon, ...rest } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      {label && (
        <label
          style={{
            fontWeight: '500',
            fontSize: '14px',
            color: '#333',
          }}
          for={id}
        >
          {label}
        </label>
      )}

      <div style={{ position: 'relative', width: '100%' }}>
        {startIcon && (
          <div
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {startIcon}
          </div>
        )}

        <input
          id={id}
          style={{
            display: 'flex',
            height: '40px',
            width: '100%',
            borderRadius: '6px',
            border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
            backgroundColor: 'white',
            padding: '0 12px',
            paddingLeft: startIcon ? '40px' : '12px',
            paddingRight: endIcon ? '40px' : '12px',
            fontSize: '14px',
            color: '#333',
            outline: 'none',
            transition: 'all 0.2s ease',
          }}
          {...rest}
        />

        {endIcon && (
          <div
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {endIcon}
          </div>
        )}
      </div>

      {(error || hint) && (
        <div
          style={{
            fontSize: '12px',
            color: error ? '#ef4444' : '#6b7280',
          }}
        >
          {error || hint}
        </div>
      )}
    </div>
  );
});
