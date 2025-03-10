import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { themeContract } from '../../theme';

// Base button styles
export const baseButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: themeContract.borderRadius.md,
  fontWeight: themeContract.fontWeights.medium,
  fontSize: themeContract.fontSizes.base,
  textAlign: 'center',
  cursor: 'pointer',
  transition: themeContract.transitions.normal,
  border: 'none',
  outline: 'none',
  position: 'relative',
  userSelect: 'none',
  textDecoration: 'none',
  lineHeight: themeContract.lineHeights.normal,
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  ':focus-visible': {
    boxShadow: `0 0 0 2px ${themeContract.color.background}, 0 0 0 4px ${themeContract.color.brand}`,
  },
});

// Button recipe for variants
export const button = recipe({
  base: baseButton,
  variants: {
    intent: {
      primary: {
        backgroundColor: themeContract.color.primary.background,
        color: themeContract.color.primary.foreground,
        ':hover': {
          backgroundColor: themeContract.color.brand,
        },
      },
      secondary: {
        backgroundColor: themeContract.color.secondary.background,
        color: themeContract.color.secondary.foreground,
        ':hover': {
          filter: 'brightness(1.1)',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: themeContract.color.foreground,
        boxShadow: `inset 0 0 0 1px ${themeContract.color.border}`,
        ':hover': {
          backgroundColor: themeContract.color.muted.background,
        },
      },
      destructive: {
        backgroundColor: themeContract.color.destructive.background,
        color: themeContract.color.destructive.foreground,
        ':hover': {
          filter: 'brightness(1.1)',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: themeContract.color.foreground,
        ':hover': {
          backgroundColor: themeContract.color.muted.background,
        },
      },
      link: {
        backgroundColor: 'transparent',
        color: themeContract.color.brand,
        textDecoration: 'underline',
        ':hover': {
          textDecoration: 'none',
        },
      },
    },
    size: {
      sm: {
        height: '32px',
        padding: `0 ${themeContract.space.sm}`,
        fontSize: themeContract.fontSizes.sm,
      },
      md: {
        height: '40px',
        padding: `0 ${themeContract.space.md}`,
        fontSize: themeContract.fontSizes.base,
      },
      lg: {
        height: '48px',
        padding: `0 ${themeContract.space.lg}`,
        fontSize: themeContract.fontSizes.lg,
      },
      icon: {
        height: '40px',
        width: '40px',
        padding: '0',
        borderRadius: themeContract.borderRadius.md,
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    fullWidth: false,
  },
});

// Export type for button variants
export type ButtonVariants = RecipeVariants<typeof button>;
