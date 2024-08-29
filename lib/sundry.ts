export const replaceAll = (s: string, replacements: [string | RegExp, string | ((replaced: string) => string)][]): string =>
  replacements.reduce((acc, [replaced, replacer]) => acc.replace(replaced, replacer as any), s);

export const ipa = (w: string): string => replaceAll(w.toUpperCase(), [
  [/[^A-Z- ]/g, ''],
  [/(?<=[IEAOU])-(?=[IEAOU])/g, 'z'],
  [/-/g, ''],

  [/G/g, 'ŋ'],
  [/C/g, 'g'],
  [/Q/g, 'k'],
  [/K/g, 'tɕ'],
  [/H/g, 'x'],
  [/X/g, 'ɕ'],

  [/Ṅ/g, 'ɲ'],
  [/Ḋ/g, 'dʑ'],
  [/J/g, 'ʑ'],

  [/.+/, (it: string) => it.toLowerCase()],
]);