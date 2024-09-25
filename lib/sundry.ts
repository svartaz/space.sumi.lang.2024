
/* eslint-disable @typescript-eslint/no-explicit-any */
export const replaceAll = (
  s: string,
  replacements: [
    string | RegExp,
    string | ((replaced: string) => string)
  ][]
): string =>
  replacements.reduce((acc, [replaced, replacer]) => acc.replace(replaced, replacer as any), s);