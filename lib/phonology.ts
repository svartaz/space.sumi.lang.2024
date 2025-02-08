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

export const phoneticise = (word: string) =>
  replaceEach(word, [
    [/(?<=[^iueoaw])j(?=[iueoaw])/, 'ĭ'],
    [/(?<=[iueoaw])j(?=[^iueoaw])/, 'ĭ'],
    [/(?<=[^iueoaw])v(?=[iueoaw])/, 'ŭ'],
    [/(?<=[iueoaw])v(?=[^iueoaw])/, 'ŭ'],
  ]);

export const toIpa = (s: string): string =>
  s.replace(/[a-zĭŭ]+/g, (it) =>
    replaceEach(phoneticise(it).toUpperCase(), [
      [/^(?=[IUEOAW](?!$))/g, 'H'],
      [/(?<=[ĬŬIUEOAW])N(?=[XJSZFV])/g, '\u0303'],

      [/H(?=I)/g, 'ç'],
      [/HĬ(?=[IEAOUW])/g, 'ç'],
      [/(?<=[ĬI])H(?![ŬUEOAW])/g, 'ç'],

      [/(?<=(?<!^)[KTP])$/g, 'ʰ'],
      [/(?<!^)C$/g, 'K'],
      [/(?<!^)D$/g, 'T'],
      [/(?<!^)B$/g, 'P'],

      [/(?<=^[^IUEOAW]*)A/, 'a'],
      [/A/g, 'ə'],

      [/C/g, 'g'],
      [/X/g, 'ʃ'],
      [/H/g, 'x'],
      [/J/g, 'ʒ'],
      [/R/g, 'ɾ'],
      [/G/g, 'ŋ'],
      [/Ĭ/g, 'j'],
      [/Ŭ/g, 'ʋ'],
      [/W/g, 'ə'],
    ])
      .toLowerCase()
      .normalize('NFC')
  );

const checkSonority = (word: string) =>
  phoneticise(word)
    .split(/[iueoaw]+/g)
    .every((consonants, i, self) => {
      if (i === 0)
        return /^[hxsf]?[jzv]?[ktp]?[cdb]?[hxsf]?[jzv]?[gnm]?l?r?[ĭŭ]?$/.test(
          consonants
        );
      else if (i === self.length - 1)
        return /^[ĭŭ]?r?l?[gnm]?[jzv]?[hxsf]?[cdb]?[ktp]?[hxsf]?[jzv]?$/.test(
          consonants
        );
      else
        return /^[ĭŭ]?r?l?[gnm]?[jzv]?[hxsf]?[cdb]?[ktp]?[cdb]?[hxsf]?[jzv]?[gnm]?l?r?[ĭŭ]?$/.test(
          consonants
        );
      return false;
    });

export const invalid = (word: string): string | null => {
  const phonetic = phoneticise(word);

  for (const [item, patterns] of [
    ['empty', [/^$/]],
    ['non-alphabet', [/[^ktpcdbhxsfjzvgnmrlĭŭiueoaw]/]],

    ['geminate', [/(.)\1/]],
    [`4 consonants`, [/[^ĭŭiueoaw]{4,}/]],
    [`3 outer consonants`, [/^[^ĭŭiueoaw]{3,}/, /[^ĭŭiueoaw]{3,}$/]],
    ['affricate', [/kh|tx|ts|pf/g]],

    [`initial nasal + consonant`, [/^[gnm](?![ĭŭiueoaw])/]],
    ['final consonant', [/[hz]$/]],
    [`nasal + /r/`, [/[gnm]r/]],
    [`sibilant + /r/`, [/[xjsz]r/]],
    ['unmatched nasal + consonant', [/[nm][ck]/g, /[gm][dtr]/g, /[gn][bp]/g]],
    ['plosive + matched nasal', [/[ck]g/g, /[dt]n/g, /[bp]m/g]],
    ['matched glide', [/[xj]ĭ/g, /[pbfvm]ŭ/g]],
    ['unvoiced + voiced', [/[ktphxsf][cdbjzv]/g, /[cdbjzv][ktphxsf]/g]],
    ['matched glide + vowel', [/ĭi|ŭu/]],
    ['vowel + /[ln]d/ + vowel', [/[ĭŭiueoaw][ln]d[ĭŭiueoaw]/]],
    ['labial + /u/', [/[fv]u/]],
    ['voiced + non-sonorant', [/[cdbjzv][^lgnmrĭŭiueoaw]/g]],
  ] as [string, RegExp[]][])
    for (const pattern of patterns) if (pattern.test(phonetic)) return item;

  if (!checkSonority(phonetic)) return 'sonority';

  return null;
};
