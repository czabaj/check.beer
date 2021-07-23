export const toModularScale = (space: number | string) =>
  typeof space === `number` ? `var(--s${space})` : space;
