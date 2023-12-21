export const replaceAll = (s: string, rules: [string, any][]) =>
  rules.reduce((acc: string, [a, b]) => acc.replace(new RegExp(a, 'g'), b), s)

export const randomChoose = <A>(xs: A[]): A =>
  xs[Math.floor(Math.random() * xs.length)];

export const randomPop = <A>(xs: A[]): A =>
  xs.splice(Math.floor(Math.random() * xs.length), 1)[0];