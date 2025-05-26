// @ts-ignore
import { replaceEach } from 'https://sumi.space/js/string.js';

export const toGlide = (s: string) =>
  s.replace(/[a-z]+/g, (it) =>
    replaceEach(it.toUpperCase(), [
      [/JJ/g, 'jʑ'],
      [/VV/g, 'wv'],

      [/(?<=^|[AIUEO])J(?=[AIUEO])/g, 'ʑ'],
      [/(?<=^|[AIUEO])V(?=[AIUEO])/g, 'v'],
      [/V/g, 'w'],
    ]).toLowerCase()
  );

export const toIpa = (s: string): string =>
  s.replace(/[-a-z]+/g, (it) =>
    replaceEach(toGlide(it).toUpperCase(), [
      [/^(?=[AIUEO])/, 'ʔ'],
      [/^-/g, ''],

      //[/(?<![AIUEO])$/, 'ə'],

      [/(?<=[NSZ])I/, 'ɨ'],

      // nasalise
      //[/(?<=[AIUEO])N(?![AIUəEO])/g, '\u0303'],

      [/G/g, 'ŋ'],
      [/C/g, 'g'],
      [/X/g, 'ɕ'],
      [/R/g, 'ɾ'],

      // accent
      //[/(?<=[AIUEO])/, '\u0301'],
    ])
      .toLowerCase()
      .normalize('NFKC')
  );

const checkSonority = (word: string) =>
  word.split(/[iueoaw]+/g).every((consonants, i, self) => {
    if (i === 0)
      return /^[xsfjzv]?[cdbktp]?[xsfjzv]?[gnm]?r?$/.test(consonants);
    else if (i === self.length - 1)
      return /^r?[gnm]?[jzv]?[xsf]?[cdb]?[ktp]?[xsf]?[jzv]?$/.test(consonants);
    else
      return /^r?[gnm]?[xsfjzv]?[cdbktp]?[jzvxsf]?[gnm]?r?$/.test(consonants);
  });

export const invalid = (word: string): string | null => {
  for (const [item, pattern] of [
    ['empty', /^$/],
    ['repeat', /(.)\1/],
    ['non-alphabet', /[^gnmcdbktphxsfʑzvjrlwaiueo -]/],
    //['initial vowel', /^[aiueo]/],

    ['2 vowel', /[aiueo]{2,}/],
    ['3 consonant', /[^aiueo]{3,}/],

    // place
    ['palatal', /[xʑ]j/],
    ['labial', /[mbpfv]w/],

    // manner
    ['2 sibilant', /[xsʑz]{2,}/],
    ['2 nasal', /[gnm]{2,}/],
    //['unvoiced voiced', /[ktphxsf][cdbʑzv]/],
    //['voiced unvoiced', /[cdbʑzv][ktphxsf]/],
  ] as [string, RegExp][])
    if (pattern.test(toGlide(word))) return item;

  //if (!checkSonority(phonetic)) return 'sonority';

  return null;
};
