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
    [/'/g, ''],
    [/(?<=[^iueoaw])j(?=[iueoaw])/, 'ĭ'],
    [/(?<=[iueoaw])j(?=[^iueoaw])/, 'ĭ'],
    //[/(?<=[^iueoaw])v(?=[iueoaw])/, 'ŭ'],
    //[/(?<=[iueoaw])v(?=[^iueoaw])/, 'ŭ'],
  ]);

export const toIpa = (s: string): string =>
  s.replace(/'/g, '').replace(/[a-zĭŭ]+/g, (it) =>
    replaceEach(it, [
      [/.+/, phoneticise],
      [/.+/, (it) => it.toUpperCase()],

      // add
      [/^(?=[IUEOA])/g, 'H'],

      [/(?<=(.))(?=\1)/g, 'ə'],
      [/(?<=G)(?![IUEOAĬVCK])/g, 'ə'],
      [/(?<=N)(?![IUEOAĬVDT]|$)/g, 'ə'],
      [/(?<=M)(?![IUEOAĬVBP])/g, 'ə'],
      [/(?<=[CDB])(?![IUEOAĬVLR])/g, 'ə'],
      [/(?<=J)(?![IUEOAĬV]|$)/g, 'ə'],
      [/(?<=Z)(?![IUEOAĬV]|$)/g, 'ə'],
      [/(?<=V)(?![IUEOAĬ]|$)/g, 'ə'],
      [/(?<=R)(?![IUEOAĬV]|$)/g, 'ə'],

      // nasalise
      [/(?<=[ĬŬIUEOA])N(?=[XJSZFV])/g, '\u0303'],

      // palatalise
      [/H(?=I)/g, 'ç'],
      [/HĬ(?=[IEAOU])/g, 'ç'],
      [/(?<=[ĬI])H(?![ŬUEOA])/g, 'ç'],

      [/C/g, 'g'],
      [/X/g, 'ʃ'],
      [/H/g, 'x'],
      [/J/g, 'ʒ'],
      [/R/g, 'ɾ'],
      [/G/g, 'ŋ'],
      [/Ĭ/g, 'j'],
      [/Ŭ/g, 'ʋ'],

      // accent
      [/[IEAOU]/, (it) => (it + '\u0301').normalize('NFKC')],

      [/.+/, (it) => it.toLowerCase()],
    ])
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
    [`sibilant + /r/`, [/[xjsz]r/]],
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
