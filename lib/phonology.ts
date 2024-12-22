import { replaceEach } from './common';

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

export const phoneticise = (word: string) =>
  replaceEach(word, [
    [/(?<=[^IUEOA])J(?=[IUEOA])/, 'Y'],
    [/(?<=[IUEOA])J(?=[^IUEOA])/, 'Y'],
    [/(?<=[^IUEOA])V(?=[IUEOA])/, 'W'],
    [/(?<=[IUEOA])V(?=[^IUEOA])/, 'W'],
  ]);

export const toIpa = (s: string): string =>
  s
    .replace(/[A-Z]+/g, (it) =>
      replaceEach(phoneticise(it), [
        [/(?<=[YWIUEOA])N(?![YWIUEOA])/g, '\u0303'],

        [/H(?=I)/g, 'ç'],
        [/HY(?=[EAOU])/g, 'ç'],
        [/(?<=[YI])H(?![WEAOU])/g, 'ç'],

        [/(?<=[KTP])$/g, 'ʰ'],

        [/C/g, 'g'],
        [/X/g, 'ʃ'],
        [/J/g, 'ʒ'],
        [/R/g, 'ɾ'],
        [/G/g, 'ŋ'],
        [/Y/g, 'j'],
      ]).toLowerCase()
    )
    .normalize('NFC');

export const invalid = (word: string): string | null => {
  const wordPhonetic = phoneticise(word);

  for (const [item, patterns] of [
    ['empty', [/^$/]],
    ['non-alphabet', [/[^KTPCDBHXSFJZVGNMRLYWIUEOA]/]],
    ['initial H', [/^[IEAOU]/]],
    ['geminate', [/(.)\1/]],
    [`4 consonants`, [/[^YWIUEOA]{4,}/]],
    [`3 outer consonants`, [/^[^YWIUEOA]{3,}|[^YWIUEOA]{3,}$/]],
    ['plosive + fricative', [/KH|PF/g]],
    ['2 vowels', [/[IUEOA]{2,}/]],
    ['nasals', [/[GNM]{2,}/]],
    ['sibilants', [/[XSZ]{2,}/g]],
    [`initial nasal + consonant`, [/^[GNM](?![YWIUEOA])/]],
    [`nasal + 'r'`, [/[GNM]R/]],
    [
      'unmatched nasal + consonant',
      [/[NM][CK]/g, /[GM][DTR]/g, /[GN][BP]/g, /[GM][HXSFJZV]/g],
    ],
    ['plosive + matched nasal', [/[KC]G/g, /[TD]N/g, /[PB]M/g]],
    [`matched high`, [/[XJ]Y/g, /[PBFVM]W/g]],
    [`unvoiced + voiced`, [/[KTPHXSF][CDBJZV]/g, /[CDBJZV][KTPHXSF]/g]],
    [`matching glide + vowel`, [/YI|WU/]],
  ] as [string, RegExp[]][])
    for (const pattern of patterns) if (pattern.test(wordPhonetic)) return item;

  return null;
};

export const checkSonority = (word: string) =>
  phoneticise(word)
    .split(/[IUEOA]+/g)
    .every((consonants, i, self) => {
      if (i === 0)
        return /^[HXSF]*[JZV]*[KTP]*[CDB]*[HXSF]*[JZV]*[GNM]?L?R?[YW]?$/.test(
          consonants
        );
      else if (i === self.length - 1)
        return /^[YW]?R?L?[GNM]?[JZV]*[HXSF]*[CDB]*[KTP]*[HXSF]*[JZV]*$/.test(
          consonants
        );
      else
        return /^[YW]?R?L?[GNM]?[JZV]*[HXSF]*[CDB]*[KTP]*[CDB]*[HXSF]*[JZV]*[GNM]?L?R?[YW]?$/.test(
          consonants
        );
    });
