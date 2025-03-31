import { replaceEach } from './common';

export const toIpa = (s: string): string =>
  s.replace(/[a-z]+/g, (it) =>
    replaceEach(it, [
      [/.+/, (it) => it.toUpperCase()],

      // nasalise
      [/(?<=[AIUEO])N(?![AIUEO])/g, '\u0303'],

      [/G/g, 'ŋ'],
      [/C/g, 'g'],
      [/X/g, 'ɕ'],
      [/J/g, 'ʑ'],
      [/R/g, 'ɾ'],

      // accent
      [/(?<=[IEAOU])/, '\u0301'],

      [/.+/, (it) => it.toLowerCase().normalize('NFKC')],
    ])
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
    ['non-alphabet', /[^gnmcdbktpxsfjzvraiueo]/],
    ['initial vowel', /^[aiueo]/],
    ['initial cluster', /^[^aiueo]{2,}/],
    ['final', /[^nktxsfraiueo]$/],

    // vowel
    ['2 vowels', /[aeo]{2,}|eu|oi/],
    ['3 vowels', /[aiueo][iu][aiueo]/],
    ['4 vowels', /[aiueo]{4,}/],

    // place
    ['velar', /[gck][i]/],
    ['palatal', /[xr]i(?=[aiueo])/],
    ['dental', /[ndt]i(?=[aiueo])/],
    ['labial', /[mbpfv]u(?=[aiueo])/],

    // manner
    ['sibilant', /xs|sx/],
    ['nasal', /[gnm]{2,}/],
    ['plosive voi', /[cdb][gnmcdbktpxsfjzv]/],
    ['plosive unv', /[ktp][gnmcdbktpxsfjzv]/],
    ['fricative unv', /[xsf][cdbjzv]/],
    ['fricative voi', /[rzv][cdbktpxsfjzv]/],

    // specific
    ['nasal coda', /[gm](?![aiueo])/],
  ] as [string, RegExp][])
    if (pattern.test(word)) return item;

  //if (!checkSonority(phonetic)) return 'sonority';

  return null;
};
