/* 
  CSS-in-JS Consumption (styled-components / emotion)
  Uses tokens as strings within template literals.
*/

import styled from 'styled-components';

export const Card = styled.div`
  padding: var(--space-4);
  background: var(--color-surface);
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
`;

export const Button = styled.button`
  padding: var(--space-2) var(--space-4);
  background: var(--color-brand-primary);
  color: var(--color-text-inverse);
  font-family: var(--font-family-base);
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;

  &:hover {
    background: var(--color-brand-hover);
  }
`;
