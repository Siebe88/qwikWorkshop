import { component$, useSignal, type PropFunction, type QwikIntrinsicElements } from '@builder.io/qwik';

export type CheckboxProps = {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  onChange$?: PropFunction<(checked: boolean, e: Event) => void>;
} & Omit<QwikIntrinsicElements['input'], 'type' | 'onChange$'>;

export const Checkbox = component$<CheckboxProps>((props) => {
  const { label, checked = false, disabled = false, required = false, name, value, onChange$, ...rest } = props;

  const isChecked = useSignal(checked);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <input
          style={{
            position: 'absolute',
            width: '16px',
            height: '16px',
            opacity: 0,
            margin: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          id={name}
          type="checkbox"
          checked={isChecked.value}
          disabled={disabled}
          required={required}
          name={name}
          value={value}
          onChange$={(e) => {
            const target = e.target as HTMLInputElement;
            isChecked.value = target.checked;
            onChange$?.(target.checked, e);
          }}
          {...rest}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '16px',
            height: '16px',
            backgroundColor: isChecked.value ? '#3b82f6' : 'white',
            border: isChecked.value ? '1px solid #3b82f6' : '1px solid #d1d5db',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            opacity: disabled ? 0.5 : 1,
            pointerEvents: disabled ? 'none' : 'auto',
          }}
        >
          {isChecked.value && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                color: 'white',
              }}
            >
              <path
                d="M9 1L3.5 8L1 5.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {label && (
        <label
          style={{
            marginLeft: '8px',
            fontSize: '14px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
          }}
          htmlFor={name}
        >
          {label}
        </label>
      )}
    </div>
  );
});
