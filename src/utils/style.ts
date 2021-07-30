export const toModularScale = (space?: number | string) =>
  typeof space == null
    ? 0
    : typeof space === `number`
    ? `var(--s${space})`
    : space;
