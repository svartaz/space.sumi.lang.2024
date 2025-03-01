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

// LGNMCDBKTPHXSFJZVĬRIUEOA

export const toIpa = (s: string): string =>
  s.replace(/'/g, '').replace(/[a-zĭŭ]+/g, (it) =>
    replaceEach(it, [
      [/.+/, phoneticise],
      [/.+/, (it) => it.toUpperCase()],

      // insert
      [/(?<=[IUEOA])(?=[IUEOA])/g, 'H'],

      [/(?<=(.))(?=\1)/g, 'ə'],

      [/(?<=L)(?=R|$)/g, 'ə'],

      [/(?<=[GMCDBJZV])$/g, 'ə'],

      [/(?<=[GNM])(?=[LGNM])/g, 'ə'],
      [/(?<=[GM])(?=[HXSFJZR])/g, 'ə'],
      [/(?<=G)(?=[DBTP])/g, 'ə'],
      [/(?<=N)(?=[CBKPR])/g, 'ə'],
      [/(?<=M)(?=[CDKT])/g, 'ə'],

      [/(?<=[CDB])(?=[GNMCDBKTPHXSFJZ])/g, 'ə'],
      [/(?<=D)(?=L)/g, 'ə'],

      [/(?<=[KTPHXSF])(?=[CDBJZ])/g, 'ə'],
      [/(?<=T)(?=L)/g, 'ə'],

      [/(?<=X)(?=[ĬR])/g, 'ə'],
      [/(?<=S)(?=[XR])/g, 'ə'],

      [/(?<=[JZV])(?=[KTPHXSF])/g, 'ə'],
      [/(?<=J)(?=[ĬR])/g, 'ə'],
      [/(?<=Z)(?=[JR])/g, 'ə'],
      [/(?<=V)(?=B)/g, 'ə'],

      [/(?<=ST)(?=R)/g, 'ə'],

      // palatal vowel
      [/ĬU/g, 'y'],
      [/ĬO/g, 'ø'],

      [/(?<=[XJ])U/g, 'y'],
      [/(?<=[XJ])O/g, 'jø'],

      // nasalise
      [/(?<=[ĬIUEOA])N(?=[XJSZFV])/g, '\u0303'],

      // palatalise
      [/H(?=I)/g, 'ç'],
      [/HĬ(?=[IEAOU])/g, 'ç'],
      [/(?<=[ĬI])H(?![ŬUEOA])/g, 'ç'],

      // aspirate
      [/(?<=[KTP])$/g, 'ʰ'],

      [/C/g, 'g'],
      [/X/g, 'ʃ'],
      [/H/g, 'h'],
      [/J/g, 'ʒ'],
      [/R/g, 'ɾ'],
      [/G/g, 'ŋ'],
      [/Ĭ/g, 'j'],
      [/V/g, 'ʋ'],

      // accent
      [/[IEAOU]/, (it) => (it + '\u0301').normalize('NFC')],

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
  ] as [string, RegExp[]][])
    for (const pattern of patterns) if (pattern.test(phonetic)) return item;

  if (!checkSonority(phonetic)) return 'sonority';

  return null;
};
