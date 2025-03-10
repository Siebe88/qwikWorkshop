import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { themeContract } from '../../theme';

// Input container
export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: themeContract.space.xs,
});

// Input wrapper
export const inputWrapper = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
});

// Input base styles
export const inputBaseStyles = {
  width: '100%',
  backgroundColor: themeContract.color.input,
  border: `1px solid ${themeContract.color.border}`,
  color: themeContract.color.foreground,
  fontSize: themeContract.fontSizes.base,
  lineHeight: themeContract.lineHeights.normal,
  transition: themeContract.transitions.normal,
  ':focus': {
    outline: 'none',
    borderColor: themeContract.color.brand,
    boxShadow: `0 0 0 2px ${themeContract.color.background}, 0 0 0 4px ${themeContract.color.brand}`,
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  '::placeholder': {
    color: themeContract.color.muted.foreground,
  },
};

// Input recipe for variants
export const input = recipe({
  base: inputBaseStyles,
  variants: {
    size: {
      sm: {
        height: '32px',
        padding: `0 ${themeContract.space.sm}`,
        fontSize: themeContract.fontSizes.sm,
        borderRadius: themeContract.borderRadius.sm,
      },
      md: {
        height: '40px',
        padding: `0 ${themeContract.space.md}`,
        fontSize: themeContract.fontSizes.base,
        borderRadius: themeContract.borderRadius.md,
      },
      lg: {
        height: '48px',
        padding: `0 ${themeContract.space.lg}`,
        fontSize: themeContract.fontSizes.lg,
        borderRadius: themeContract.borderRadius.md,
      },
    },
    error: {
      true: {
        borderColor: themeContract.color.destructive.background,
        ':focus': {
          borderColor: themeContract.color.destructive.background,
          boxShadow: `0 0 0 2px ${themeContract.color.background}, 0 0 0 4px ${themeContract.color.destructive.background}`,
        },
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    error: false,
    fullWidth: true,
  },
});

// Start icon container
export const startIconContainer = style({
  position: 'absolute',
  top: '50%',
  left: themeContract.space.sm,
  transform: 'translateY(-50%)',
  color: themeContract.color.muted.foreground,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// End icon container
export const endIconContainer = style({
  position: 'absolute',
  top: '50%',
  right: themeContract.space.sm,
  transform: 'translateY(-50%)',
  color: themeContract.color.muted.foreground,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Input with start icon
export const inputWithStartIcon = style({
  paddingLeft: `calc(${themeContract.space.sm} * 2 + 20px)`,
});

// Input with end icon
export const inputWithEndIcon = style({
  paddingRight: `calc(${themeContract.space.sm} * 2 + 20px)`,
});

// Input label
export const inputLabel = style({
  fontSize: themeContract.fontSizes.sm,
  fontWeight: themeContract.fontWeights.medium,
  color: themeContract.color.foreground,
});

// Error message
export const errorMessage = style({
  fontSize: themeContract.fontSizes.xs,
  color: themeContract.color.destructive.background,
  marginTop: themeContract.space.xs,
});

// Export type for input variants
export type InputVariants = RecipeVariants<typeof input>;
