// @ts-ignore
import { replaceEach } from 'https://sumi.space/js/string.js';

const consonants = 'nmcdbktphxsfjzvrl';
const vowels = 'aiueo';
export const letters = consonants + vowels;

export const toIpa = (s: string): string =>
  s.replace(new RegExp(`[-${letters}]+`, 'g'), (it) =>
    replaceEach(it.toUpperCase(), [
      [/^(?=[AIUEO])/g, 'ʔ'],
      [/(?<=[CDBJVZL])$/, 'ə'],
      [/-/g, ''],

      [/N(?![AIUEO])/g, '\u0303'],
      [/C/g, 'G'],
      [/X/g, 'ʃ'],

      [/(?<!^|[AIUEO])J(?=[AU])/, 'j'],
      [/(?<!^|[AIUEO])V(?=[AI])/, 'w'],
      [/J/g, 'ʒ'],
      [/.+/, (it) => it.toLowerCase()],

      [/n(j|(?=i))/g, 'ɲ'],
      [/h(j|(?=i))/g, 'ç'],
      [/l(j|(?=i))/g, 'ʎ'],
    ]).normalize('NFC')
  );

export const invalid = (word: string): string | null => {
  for (const [item, pattern] of [
    ['empty', /^$/],
    ['repeat', /(.)\1/],
    ['alphabet', new RegExp(`[^ ${letters}]`)],

    ['consonants', new RegExp(`[${consonants}]{3,}`)],
    ['vowels', new RegExp(`[${vowels}]{2,}`)],

    //['l', /l(?![aiueo])/],
    ['glide', /([xj]i|[mbpfv]u)[ieaou]/],

    ['voiced after', /(?<!^|[nmrlaiueo])[cdbz]/],
    ['voiced before', /[cdbz](?![nmrljvaiueo]|$)/],
    ['glide', /(?<!^|[aiueo])[jv](?![aiueo]|$)/],
  ] as [string, RegExp][])
    if (pattern.test(word)) return `${item} (${word.match(pattern)})`;

  return null;
};

export const compare = (a: string, b: string): number =>
  a === b
    ? 0
    : a === ''
    ? -1
    : b === ''
    ? 1
    : letters.indexOf(a[0]) === letters.indexOf(b[0])
    ? compare(a.substring(1), b.substring(1))
    : letters.indexOf(a[0]) - letters.indexOf(b[0]);

export const orthography = (s: string): string =>
  replaceEach(
    s,
    {
      none: [],
      cyrl: [
        [/c/gi, 'г'],
        [/d/gi, 'д'],
        [/b/gi, 'б'],

        [/k/gi, 'к'],
        [/t/gi, 'т'],
        [/p/gi, 'п'],

        [/h/gi, 'х'],
        [/x/gi, 'ш'],
        [/s/gi, 'с'],
        [/f/gi, 'ф'],

        [/j/gi, 'ж'],
        [/z/gi, 'з'],
        [/v/gi, 'в'],

        [/g/gi, 'ӊ'],
        [/n/gi, 'н'],
        [/m/gi, 'м'],

        [/l/gi, 'л'],
        [/r/gi, 'р'],

        [/a/gi, 'а'],
        [/i/gi, 'і'],
        [/u/gi, 'у'],
        [/e/gi, 'є'],
        [/o/gi, 'о'],
      ],
    }.none
  );
