import { replaceEach } from "./common";

enum Place {
  Velar,
  Palatal,
  Dental,
  Labial,
}

enum Manner {
  Nasal,
  Plosive,
  Fricative,
  Approximant,
}

const phonemes = {
  g: ['consonant', 'sonorant', Manner.Nasal, 'voiced', Place.Velar],
  n: ['consonant', 'sonorant', Manner.Nasal, 'voiced', Place.Dental],
  m: ['consonant', 'sonorant', Manner.Nasal, 'voiced', Place.Labial],

  c: ['consonant', 'obstruent', Manner.Plosive, 'voiced', Place.Velar],
  d: ['consonant', 'obstruent', Manner.Plosive, 'voiced', Place.Dental],
  b: ['consonant', 'obstruent', Manner.Plosive, 'voiced', Place.Labial],

  k: ['consonant', 'obstruent', Manner.Plosive, Place.Velar],
  t: ['consonant', 'obstruent', Manner.Plosive, Place.Dental],
  p: ['consonant', 'obstruent', Manner.Plosive, Place.Labial],

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

const phoneticise = (word: string) => replaceEach(word, [
  [/(?<=[^iueoa])j(?=[iueoa])/, 'y'],
  [/(?<=[iueoa])j(?=[^iueoa])/, 'y'],
  [/(?<=[^iueoa])v(?=[iueoa])/, 'w'],
  [/(?<=[iueoa])v(?=[^iueoa])/, 'w'],
]);

export const toIpa = (s: string): string => replaceEach(phoneticise(s).toUpperCase(), [
  [/^(?=[IUEOA])/g, 'ʔ'],
  [/(?<=[IUEOA])N(?![IUEOAYW])/g, '\u0303'],

  [/(?<=[KTP])$/g, 'ʰ'],

  [/-/g, ''],
  [/C/g, 'g'],
  [/H/g, 'x'],
  [/X/g, 'ʃ'],
  [/J/g, 'ʒ'],
  [/G/g, 'ŋ'],
  [/R/g, 'ɾ'],

  [/Y/g, 'j'],
]).toLowerCase().normalize("NFC");

export const invalid = (word: string): string | null => {
  const wordPhonetic = phoneticise(word);

  for (const [item, patterns] of [
    ['empty', [
      /^$/,
    ]],
    ['non-alphabet', [
      /[^ktpcdbhxsfjzvgnmrliueoayw-]/,
    ]],
    ['geminate', [
      /(.)\1/,
    ]],
    [`4 consonants`, [
      /[^iueoa]{4,}/,
    ]],
    [`3 outer consonants`, [
      /^[^iueoayw]{3,}|[^iueoayw]{3,}$/,
    ]],
    ['plosive + fricative', [
      /kh|pf/g,
    ]],
    ['2 vowels', [
      /[iueoa]{2,}/,
    ]],
    ['nasals', [
      /[gnm]{2,}/,
    ]],
    ['sibilants', [
      /[xsjz][xsz]/g,
    ]],
    [`initial nasal + consonant`, [
      /^[gnm](?![iueoayw])/,
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
      /[kc]g/g,
      /[td]n/g,
      /[pb]m/g,
    ]],
    [`matched high`, [
      /[xj]y/g,
      /[pbfvm]w/g,
    ]],
    [`unvoiced + voiced`, [
      /[ktphxsf][cdbjzv]/g,
      /[cdbjzv][ktphxsf]/g,
    ]],
    [`matching glide + vowel`, [
      /yi|wu/,
    ]],
  ] as [string, RegExp[]][])
    for (const pattern of patterns)
      if (pattern.test(wordPhonetic))
        return item;

  return null;
};

export const checkSonority = (word: string) =>
  phoneticise(word)
    .split(/[iueoa]+/g)
    .every(consonants => {
      if (consonants.length < 3)
        return true;
      else {
        const sonorities = [...consonants].map(c =>
          [
            ['a'],
            ['e', 'o'],
            ['i', 'u'],
            ['y', 'w'],
            ['r'],
            ['l'],
            ['g', 'n', 'm'],
            ['j', 'z', 'v'],
            ['h', 'x', 's', 'f'],
            ['c', 'd', 'b'],
            ['k', 't', 'p'],
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
