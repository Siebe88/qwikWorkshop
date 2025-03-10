import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { themeContract } from '../../theme';
import { globalStyle } from '@vanilla-extract/css';

// Checkbox container
export const checkboxContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  position: 'relative',
  cursor: 'pointer',
  userSelect: 'none',
});

// Hidden input
export const checkboxInput = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
  margin: 0,
  // No selectors here
});

// Global styles for adjacent elements
globalStyle(`${checkboxInput}:focus-visible + div`, {
  boxShadow: `0 0 0 2px ${themeContract.color.background}, 0 0 0 4px ${themeContract.color.brand}`,
});

globalStyle(`${checkboxInput}:checked + div`, {
  backgroundColor: themeContract.color.primary.background,
  borderColor: themeContract.color.primary.background,
});

globalStyle(`${checkboxInput}:checked + div svg`, {
  opacity: 1,
});

globalStyle(`${checkboxInput}:disabled + div`, {
  opacity: 0.5,
  cursor: 'not-allowed',
});

// Checkbox base styles for the visual part
export const checkboxBaseStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: themeContract.color.border,
  backgroundColor: themeContract.color.background,
  transition: themeContract.transitions.normal,
  color: themeContract.color.white,
};

// Checkbox recipe for variants
export const checkbox = recipe({
  base: checkboxBaseStyles,
  variants: {
    size: {
      sm: {
        width: '16px',
        height: '16px',
        borderRadius: '4px',
      },
      md: {
        width: '20px',
        height: '20px',
        borderRadius: '5px',
      },
      lg: {
        width: '24px',
        height: '24px',
        borderRadius: '6px',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// Checkbox icon
export const checkboxIcon = style({
  width: '100%',
  height: '100%',
  opacity: 0,
  transition: themeContract.transitions.fast,
});

// Checkbox label
export const checkboxLabel = style({
  marginLeft: themeContract.space.sm,
  fontSize: themeContract.fontSizes.base,
  color: themeContract.color.foreground,
});

// Export type for checkbox variants
export type CheckboxVariants = RecipeVariants<typeof checkbox>;
