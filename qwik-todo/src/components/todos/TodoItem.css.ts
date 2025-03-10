import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { themeContract } from '../../theme';

// TodoItem container
export const todoItemContainer = style({
  position: 'relative',
  margin: `0 0 ${themeContract.space.md}`,
  transition: themeContract.transitions.normal,
});

// TodoItem card base
export const todoItemBase = {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: themeContract.borderRadius.md,
  backgroundColor: themeContract.color.card,
  boxShadow: themeContract.shadows.sm,
  overflow: 'hidden',
  transition: themeContract.transitions.normal,
  marginBottom: themeContract.space.md,
  position: 'relative',
};

// TodoItem card with priority indicator
export const todoItem = recipe({
  base: todoItemBase,
  variants: {
    priority: {
      low: {
        borderLeft: `5px solid ${themeContract.color.low}`,
      },
      medium: {
        borderLeft: `5px solid ${themeContract.color.medium}`,
      },
      high: {
        borderLeft: `5px solid ${themeContract.color.high}`,
      },
    },
    completed: {
      true: {
        opacity: 0.8,
      },
    },
  },
  defaultVariants: {
    priority: 'medium',
    completed: false,
  },
});

// TodoItem header
export const todoItemHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  padding: themeContract.space.md,
});

// Checkbox container
export const checkboxContainer = style({
  flexShrink: 0,
  marginTop: '2px',
  marginRight: themeContract.space.sm,
});

// Content container
export const contentContainer = style({
  flex: 1,
});

// Title container
export const titleContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: themeContract.space.xs,
});

// Todo title
export const todoTitle = recipe({
  base: {
    margin: 0,
    fontSize: themeContract.fontSizes.lg,
    fontWeight: themeContract.fontWeights.medium,
    color: themeContract.color.foreground,
    transition: themeContract.transitions.normal,
  },
  variants: {
    completed: {
      true: {
        textDecoration: 'line-through',
        color: themeContract.color.muted.foreground,
      },
    },
  },
  defaultVariants: {
    completed: false,
  },
});

// Todo description
export const todoDescription = recipe({
  base: {
    margin: `${themeContract.space.xs} 0`,
    fontSize: themeContract.fontSizes.base,
    color: themeContract.color.foreground,
    transition: themeContract.transitions.normal,
  },
  variants: {
    completed: {
      true: {
        color: themeContract.color.muted.foreground,
      },
    },
  },
  defaultVariants: {
    completed: false,
  },
});

// Tags container
export const tagsContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: themeContract.space.xs,
  marginTop: themeContract.space.xs,
});

// Tag
export const tag = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `${themeContract.space.xs} ${themeContract.space.sm}`,
  backgroundColor: themeContract.color.muted.background,
  color: themeContract.color.muted.foreground,
  borderRadius: themeContract.borderRadius.full,
  fontSize: themeContract.fontSizes.xs,
  fontWeight: themeContract.fontWeights.medium,
});

// Actions container
export const actionsContainer = style({
  display: 'flex',
  gap: themeContract.space.xs,
});

// Todo meta
export const todoMeta = style({
  display: 'flex',
  alignItems: 'center',
  padding: themeContract.space.sm,
  borderTop: `1px solid ${themeContract.color.border}`,
  fontSize: themeContract.fontSizes.sm,
  color: themeContract.color.muted.foreground,
});

// Meta item
export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  marginRight: themeContract.space.md,
  gap: themeContract.space.xs,
});

// Collapsible content
export const collapsibleContent = style({
  padding: themeContract.space.md,
  borderTop: `1px solid ${themeContract.color.border}`,
  fontSize: themeContract.fontSizes.sm,
  backgroundColor: themeContract.color.muted.background,
});

// History item
export const historyItem = style({
  padding: themeContract.space.sm,
  marginBottom: themeContract.space.sm,
  borderRadius: themeContract.borderRadius.sm,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
});

// Export types
export type TodoItemVariants = RecipeVariants<typeof todoItem>;
export type TodoTitleVariants = RecipeVariants<typeof todoTitle>;
export type TodoDescriptionVariants = RecipeVariants<typeof todoDescription>;
