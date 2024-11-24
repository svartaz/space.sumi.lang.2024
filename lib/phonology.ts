import { replaceEach } from "./common";

enum Place {
  Velar,
  Palatal,
  Dental,
  Labial,
}

enum Manner {
  Nasal,
  Plossive,
  Fricative,
  Approximant,
}

const phonemes = {
  g: ['consonant', 'sonorant', Manner.Nasal, 'voiced', Place.Velar],
  n: ['consonant', 'sonorant', Manner.Nasal, 'voiced', Place.Dental],
  m: ['consonant', 'sonorant', Manner.Nasal, 'voiced', Place.Labial],

  c: ['consonant', 'obstruent', Manner.Plossive, 'voiced', Place.Velar],
  d: ['consonant', 'obstruent', Manner.Plossive, 'voiced', Place.Dental],
  b: ['consonant', 'obstruent', Manner.Plossive, 'voiced', Place.Labial],

  k: ['consonant', 'obstruent', Manner.Plossive, Place.Velar],
  t: ['consonant', 'obstruent', Manner.Plossive, Place.Dental],
  p: ['consonant', 'obstruent', Manner.Plossive, Place.Labial],

  h: ['consonant', 'obstruent', Manner.Fricative, Place.Velar],
  x: ['consonant', 'obstruent', Manner.Fricative, Place.Palatal],
  s: ['consonant', 'obstruent', Manner.Fricative, Place.Dental],
  f: ['consonant', 'obstruent', Manner.Fricative, Place.Labial],

  j: ['consonant', 'obstruent', Manner.Fricative, 'voiced', Place.Palatal],
  z: ['consonant', 'obstruent', Manner.Fricative, 'voiced', Place.Dental],
  v: ['consonant', 'obstruent', Manner.Fricative, 'voiced', Place.Labial],

  r: ['consonant', 'sonorant', Manner.Approximant, 'voiced', Place.Dental],
  l: ['consonant', 'sonorant', Manner.Approximant, 'voiced', Place.Dental],

  i: ['vowel'],
  e: ['vowel'],
  a: ['vowel'],
  o: ['vowel'],
  u: ['vowel'],
};

export const toIpa = (s: string): string => replaceEach(s.toUpperCase(), [
  [/-/g, ''],
  [/C/g, 'g'],
  [/H/g, 'x'],
  [/X/g, 'ʃ'],
  [/J/g, 'ʒ'],
  [/G/g, 'ŋ'],
  [/R/g, 'ɾ'],
]).toLowerCase();

export const invalid = (word: string): string | null => {
  for (const [item, patterns] of [
    ['empty', [
      /^$/,
    ]],
    ['non-alphabet', [
      /[^ktpcdbhxsfjzvgnmrliyueoa-]/,
    ]],
    ['geminate', [
      /(.)\1/,
    ]],
    [`3 consonants`, [
      /[^iyueoa]{4,}/,
    ]],
    [`3 outer consonants`, [
      /^[^iyueoa]{3,}|[^iyueoa]{3,}$/,
    ]],
    ['2 consonants', [
      /kh|pf|bv/g,
    ]],
    ['3 vowels', [
      /[iyueoa]{3,}/,
    ]],
    ['2 vowels', [
      // allow: ia, oi, ai, au
      /i[iyueo]/,
      /[yue][iyueoa]/,
      /o[yueoa]/,
      /a[yeoa]/,
    ]],
    ['nasals', [
      /[gnm]{2,}/,
    ]],
    ['sibilants', [
      /[xsjz]{2,}/g,
    ]],
    [`initial vowel`, [
      /^[iyueoa]/,
    ]],
    [`initial nasal`, [
      /^[gnm](?![iyueoa])/,
    ]],
    [`final 'h'`, [
      /h$/,
    ]],
    [`nasal + 'r'`, [
      /[gnm]r/,
    ]],
    ['unmatched nasal + consonant', [
      /[nm](?=[ck])/g,
      /[gm](?=[dtr])/g,
      /[gn](?=[bp])/g,
      /[gm](?=[hxsfjzv])/g,
    ]],
    ['plosive + matched nasal', [
      /[ktpcdb][gnm]/g,
    ]],
    [`matched high`, [
      /[xj]i[iyueoa]/g,
      /[xj]y/g,
      /[pbfvm]v/g,
    ]],
    [`unvoiced + voiced, except 'v'`, [
      /[ktphxsf][cdbjz]/g,
      /[cdbjz][ktphxsf]/g,
    ]],
  ] as [string, RegExp[]][])
    for (const pattern of patterns)
      if (pattern.test(word))
        return item;

  return null;
};

export const checkSonority = (word: string) =>
  word
    .split(/[iyueoa]+/g)
    .every(consonants => {
      if (consonants.length < 3)
        return true;
      else {
        const sonorities = [...consonants].map(c =>
          [
            ['a'],
            ['e', 'o'],
            ['i', 'u'],
            ['r'],
            ['l'],
            ['g', 'n', 'm'],
            ['j', 'z', 'v', 'h', 'x', 's', 'f'],
            ['c', 'd', 'b', 'k', 't', 'p'],
          ].findIndex(cs => cs.includes(c))
        );

        let state: null | 'down' | 'up' = null;
        for (let i = 0; i < sonorities.length - 1; i++) {
          if (sonorities[i] === sonorities[i + 1])
            continue;
          else if (sonorities[i] < sonorities[i + 1])
            if (state === 'down')
              return false;
            else
              state = 'up';
          else
            state = 'down';
        }

        return true;
      }
    })
