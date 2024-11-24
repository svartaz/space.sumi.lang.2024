export const log = (it: any) => {
  console.log(it);
  return it
}

export const replaceEach = (
  s: string,
  replacements: [
    string | RegExp,
    string | ((substring: string, ...args: any[]) => string)
  ][]
): string =>
  replacements.reduce((acc, [replaced, replacer]) =>
    acc.replace(replaced, replacer as any), s);
