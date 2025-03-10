import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { themeContract } from '../../theme';

// Base card styles
export const cardBase = style({
  backgroundColor: themeContract.color.card,
  color: themeContract.color.cardForeground,
  borderRadius: themeContract.borderRadius.md,
  boxShadow: themeContract.shadows.sm,
  overflow: 'hidden',
  transition: themeContract.transitions.normal,
  position: 'relative',
});

// Card recipe for variants
export const card = recipe({
  base: cardBase,
  variants: {
    elevation: {
      flat: {
        boxShadow: 'none',
        border: `1px solid ${themeContract.color.border}`,
      },
      sm: {
        boxShadow: themeContract.shadows.sm,
      },
      md: {
        boxShadow: themeContract.shadows.md,
      },
      lg: {
        boxShadow: themeContract.shadows.lg,
      },
    },
    hover: {
      true: {
        ':hover': {
          boxShadow: themeContract.shadows.md,
          transform: 'translateY(-2px)',
        },
      },
    },
    bordered: {
      true: {
        border: `1px solid ${themeContract.color.border}`,
      },
    },
    padding: {
      none: {
        padding: 0,
      },
      sm: {
        padding: themeContract.space.sm,
      },
      md: {
        padding: themeContract.space.md,
      },
      lg: {
        padding: themeContract.space.lg,
      },
    },
    width: {
      auto: {},
      full: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    elevation: 'sm',
    hover: false,
    bordered: false,
    padding: 'md',
    width: 'full',
  },
});

// Card header styles
export const cardHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: themeContract.space.md,
  borderBottom: `1px solid ${themeContract.color.border}`,
});

// Card title styles
export const cardTitle = style({
  margin: 0,
  fontWeight: themeContract.fontWeights.semibold,
  fontSize: themeContract.fontSizes.lg,
  color: themeContract.color.foreground,
});

// Card description styles
export const cardDescription = style({
  marginTop: themeContract.space.xs,
  color: themeContract.color.muted.foreground,
  fontSize: themeContract.fontSizes.sm,
});

// Card content styles
export const cardContent = style({
  padding: themeContract.space.md,
});

// Card footer styles
export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: themeContract.space.md,
  borderTop: `1px solid ${themeContract.color.border}`,
  gap: themeContract.space.sm,
});

// Export type for card variants
export type CardVariants = RecipeVariants<typeof card>;
