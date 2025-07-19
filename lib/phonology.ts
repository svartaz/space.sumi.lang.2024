// @ts-ignore
import { replaceEach } from 'https://sumi.space/js/string.js';

const consonants = 'nmcdbktphxsfzrl';
const vowels = 'aiueo';

export const distinguishGlide = (w: string) =>
  replaceEach(w.toLowerCase(), [
    [/j/g, 'J'],
    [/v/g, 'V'],

    [/^J/g, 'ž'],
    [/^V/g, 'v'],

    [/J(?![aiueo])/g, 'j'],
    [/V(?![aiueo])/g, 'w'],

    [/(?<=[aiueo])J(?=[aiueo])/g, 'ž'],
    [/(?<=[aiueo])V(?=[aiueo])/g, 'v'],

    [/(?<=[aiueo])J(?![aiueo])/g, 'j'],
    [/(?<=[aiueo])V(?![aiueo])/g, 'w'],

    [/(?<=[nmcdbktphxsfžzvrl])J(?=[aiueo])/g, 'j'],
    [/(?<=[nmcdbktphxsfžzvrl])V(?=[aiueo])/g, 'w'],
  ]);

export const toIpa = (s: string): string =>
  s.replace(/[-a-zž]+/g, (it) =>
    replaceEach(distinguishGlide(it).toUpperCase(), [
      [/^(?=[AIUEO])/g, 'ʔ'],
      [/-/g, ''],

      [/(?<=[JWAIUEO])N(?![JWAIUEO])/g, '\u0303'],
      [/NJ(?![JWAIUEO])/g, 'ɲ'],
      [/CJ/g, 'ɟ'],
      [/KJ/g, 'c'],
      [/LJ/g, 'ʎ'],
      [/N(?![JWAIUEO])/g, '\u0303'],
      [/C/g, 'g'],
      [/X/g, 'ʃ'],
      [/Ž/g, 'ʒ'],
      [/(?<=[SZ])I/g, 'ɨ'],
    ])
      .toLowerCase()
      .normalize('NFC')
  );

export const invalid = (word: string): string | null => {
  for (const [item, pattern] of [
    ['empty', /^$/],
    ['repeat', /(.)\1/],
    ['non-alphabet', /[^ nmcdbktphxsfžzvjrlwaiueo]/],

    ['3 consonants', /[nmcdbqktphxsfžzvrl]{3,}/],
    ['2 vowels', new RegExp(`[${vowels}]{2,}`)],

    ['palatalise', /[dtsz]j/],
    ['palatal', /[xž]j/],
    ['labial', /[mbpfv]w/],

    ['sibilants', /[xsžz]{2,}/],
    ['nasals', /[nm]{2,}/],
    ['voiced', /[cdbktphxsfžzv][cdbžzv]/],
    ['voiced', /[cdbžzv]([cdbktphxsfžzv]|$)/],
    ['similar', /ji|wu|ij|uw/],
    ['beginning nasal', /^[nm](?![jwaiueo])/],
  ] as [string, RegExp][])
    if (pattern.test(distinguishGlide(word)))
      return `${item}(${distinguishGlide(word).match(pattern)})`;

  return null;
};

export const monosyllables = (() => {
  const value: string[] = [];
  for (const c0 of [...consonants])
    for (const g of ['', 'j', 'v'])
      for (const v of vowels)
        for (const c1 of [...consonants])
          if (!invalid(c0 + g + v + c1)) value.push(c0 + g + v + c1);

  return value;
})();

const alphabet = 'nmcdbktphxsfjzvrlaiueo';
export const compare = (a: string, b: string): number =>
  a === b
    ? 0
    : a === ''
    ? -1
    : b === ''
    ? 1
    : alphabet.indexOf(a[0]) === alphabet.indexOf(b[0])
    ? compare(a.substring(1), b.substring(1))
    : alphabet.indexOf(a[0]) - alphabet.indexOf(b[0]);
