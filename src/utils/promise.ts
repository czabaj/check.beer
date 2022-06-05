export const delayU = <T>(milliseconds: number, result?: T) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds, result));

export const delay =
  <T>(milliseconds: number) =>
  (result: T) =>
    delayU(milliseconds, result);
