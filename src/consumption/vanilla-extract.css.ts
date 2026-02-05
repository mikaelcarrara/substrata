/* 
  vanilla-extract Consumption
  Uses tokens as string values in type-safe style definitions.
*/

import { style } from '@vanilla-extract/css';

export const card = style({
    padding: 'var(--space-4)',
    background: 'var(--color-surface)',
    color: 'var(--color-text-primary)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
});

export const button = style({
    padding: 'var(--space-2) var(--space-4)',
    backgroundColor: 'var(--color-brand-primary)',
    color: 'var(--color-text-inverse)',
    fontFamily: 'var(--font-family-base)',
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    selectors: {
        '&:hover': {
            backgroundColor: 'var(--color-brand-hover)',
        }
    }
});
