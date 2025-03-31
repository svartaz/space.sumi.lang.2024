import { replaceEach } from './common';
import { invalid } from './phonology';

export const name = 'kxal';

const fromAcronym = (acronym: string) =>
  replaceEach(acronym.toUpperCase(), [
    [/A/g, 'a'],
    [/B/g, 'ba'],
    [/C/g, 'ca'],
    [/D/g, 'da'],
    [/^E/g, 'e'],
    [/E/g, 'je'],
    [/F/g, 'fa'],
    [/G/g, 'ga'],
    [/H/g, 'ko'],
    [/^I/g, 'i'],
    [/I/g, 'ji'],
    [/J/g, 'ja'],
    [/K/g, 'ka'],
    [/L/g, 'la'],
    [/M/g, 'ma'],
    [/N/g, 'na'],
    [/^O/g, 'o'],
    [/O/g, 'vo'],
    [/P/g, 'pa'],
    [/Q/g, 'ku'],
    [/R/g, 'ra'],
    [/S/g, 'sa'],
    [/T/g, 'ta'],
    [/^U/g, 'u'],
    [/U/g, 'vu'],
    [/V/g, 'va'],
    [/W/g, 'vi'],
    [/X/g, 'xa'],
    [/Y/g, 'ju'],
    [/Z/g, 'za'],

    [/(?<![iueoa])a$/g, ''],
  ]);

enum Klass {
  Case = 'case',
  Preverb = 'preverb',
  Verb = 'verb',
  Numeral = 'numeral',
  Joiner = 'joiner',
  Clause = 'clause',
  Other = 'other',
}

export enum Formation {
  Simplex,
  Complex,
  Idiom,
}

interface ValuePre {
  d: string;
  c: Klass;
  tokened: string;
  formation: Formation;
  o: string;
  origins?: {
    pie?: string;
    gmc?: string;
    eng?: string;
    deu?: string;
    ice?: string;
    lat?: string;
  };
  token?: string;
  complex?: string[];
  idiom?: string[];
}

/*
proto indo european
*ḱ   x
*k   k
*kʷ  k
*bʰ  b
*dʰ  d
*ǵʰ  j
*gʰ  c
*gʷʰ c
*/

/*
- animate - subject, inanimate, object
- one thing - subject, many things - object
*/

const dicPre = new Map<string, ValuePre>(
  Object.entries({
    then: {
      d: '2025-02-06',
      c: Klass.Other,
      tokened: "separator ','",
      o: 'a priori',
      token: 'xi',
    },

    der: {
      d: '2024-02-13',
      c: Klass.Case,
      tokened: 'nominative',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fan%C4%93',
      token: 'fe',
    },
    den: {
      d: '2024-02-13',
      c: Klass.Case,
      tokened: 'accusative',
      o: 'https://en.wiktionary.org/wiki/%D8%B1%D8%A7#Persian',
      token: 're',
    },
    to: {
      d: '2024-02-13',
      c: Klass.Case,
      tokened: 'dative',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C5%8D',
      token: 'te',
    },
    with: {
      d: '2024-12-24',
      c: Klass.Case,
      tokened: 'unspecified case',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/midi',
      token: 'me',
    },
    ly: {
      d: '2024-02-13',
      c: Klass.Case,
      tokened: 'adverb',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-līkaz',
      token: 'ke',
    },

    done: {
      d: '2024-02-13',
      c: Klass.Preverb,
      tokened:
        '[voice] passive. foregoeth a case marker (default: accusative).',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-',
      token: 'ca',
    },
    repeat: {
      d: '2024-02-13',
      c: Klass.Preverb,
      tokened: '[aspect] frequentative',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-lōną',
      token: 'lo',
    },

    begin: {
      d: '2024-02-13',
      c: Klass.Preverb,
      tokened: '[aspect] inchoative. begineth to',
      token: 'xo',
    },
    end: {
      d: '2024-02-13',
      c: Klass.Preverb,
      tokened: '[aspect] completive. endeth to',
      o: 'https://en.wiktionary.org/wiki/по-#Russian',
      token: 'zo',
    },

    shall: {
      d: '2024-02-13',
      c: Klass.Preverb,
      tokened: '[tense] future',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85',
      token: 'xu',
    },
    do: {
      d: '2024-02-13',
      c: Klass.Preverb,
      tokened: '[tense] present',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nu',
      token: 'nu',
    },
    did: {
      d: '2024-02-13',
      c: Klass.Preverb,
      tokened: '[tense] past',
      o: 'https://en.wiktionary.org/wiki/%E5%92%97#Chinese',
      token: 'zu',
    },

    would: {
      d: '2024-02-13',
      c: Klass.Preverb,
      tokened: '[mood] irrealis, optative, imperative',
      token: 'so',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swa',
    },

    may: {
      d: '2024-02-13',
      c: Klass.Preverb,
      token: 'm0',
      tokened: '[mood] may, possibly',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/maganą',
    },

    so: {
      d: '2024-02-13',
      c: Klass.Preverb,
      tokened: '[restrictiveness] which is, so (non-restrictive)',
      token: 'do',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/þus',
    },

    ever: {
      d: '2024-10-19',
      c: Klass.Preverb,
      tokened: '[essentiality] in essence, in a nominal sense',
      token: 'se',
      o: 'https://en.wiktionary.org/wiki/esse#Latin',
    },

    not: {
      d: '2024-02-13',
      c: Klass.Joiner,
      tokened: '[logic] not, negation',
      token: 'na',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne',
    },
    and: {
      d: '2024-02-13',
      c: Klass.Joiner,
      tokened: '[logic] and, both, conjunction',
      token: 'be',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bai',
    },
    or: {
      d: '2024-02-13',
      c: Klass.Joiner,
      tokened: '[logic] or, at least one, disjunction',
      token: 'bo',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bai',
    },
    iff: {
      d: '2024-02-13',
      c: Klass.Joiner,
      tokened: '[logic] if and only iff, equivalence',
      token: 'ba',
      o: 'a priori',
    },
    xor: {
      d: '2025-01-02',
      c: Klass.Joiner,
      tokened: '[logic] either',
      idiom: ['not', 'iff'],
    },

    'which{': {
      d: '2024-02-13',
      c: Klass.Clause,
      tokened: 'openeth relative clause. @0 is that which @{sentence}',
      token: 'vi',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwat',
    },
    'that{': {
      d: '2024-02-13',
      c: Klass.Clause,
      tokened:
        'openeth statement clause. @0 is the (event, statement) that @{sentence}',
      token: 'di',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEat',
    },
    'whether{': {
      d: '2024-07-28',
      c: Klass.Clause,
      tokened: 'openeth truthfulness clause. @0 is whether @{sentence}',
      token: 'ji',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ja',
    },
    'how_much{': {
      d: '2024-10-20',
      c: Klass.Clause,
      tokened: 'openeth extent clause. @0 is the extent how much @{sentence}',
      token: 'ki',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haiduz',
    },
    '}': {
      d: '2024-02-13',
      c: Klass.Other,
      tokened: 'closeth clause',
      token: 'la',
      o: 'https://en.wiktionary.org/wiki/啦#Chinese',
    },

    called: {
      d: '2024-02-13',
      c: Klass.Other,
      tokened: '@0 is called @{name}',
      token: 'no',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/namô',
    },

    _0: {
      d: '2025-02-27',
      c: Klass.Other,
      tokened: 'bound variable 0',
      o: 'a priori',
      token: 'ku',
    },
    _1: {
      d: '2025-02-27',
      c: Klass.Other,
      tokened: 'bound variable 0',
      o: 'a priori',
      token: 'tu',
    },
    _2: {
      d: '2025-02-27',
      c: Klass.Other,
      tokened: 'bound variable 0',
      o: 'a priori',
      token: 'pu',
    },

    zero: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 0',
      token: 'ze',
      o: 'https://en.wiktionary.org/wiki/%D8%B5%D9%81%D8%B1#Arabic',
    },
    one: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 1',
      token: 'ka',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/Háykas',
    },
    two: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 2',
      token: 'tua',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twai',
    },
    three: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 3',
      token: 'dre',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%ABz',
    },
    four: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 4',
      token: 'for',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fedw%C5%8Dr',
    },
    five: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 5',
      token: 'pan',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/p%C3%A1n%C4%8Da',
    },
    six: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 6',
      token: 'xek',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/%C5%A1w%C3%A1%C4%87%C5%A1',
    },
    seven: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 7',
      token: 'sef',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sebun',
    },
    eight: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 8',
      token: 'vak',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aht%C5%8Du',
    },
    nine: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 9',
      token: 'nin',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/newun',
    },

    infinite: {
      d: '2024-09-06',
      c: Klass.Numeral,
      tokened: 'infinite, ∞',
      token: 'sin',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sin-',
    },
    kilo: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: "[separator] 1000, ','",
      token: 'kir',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BE%C5%ABsund%C4%AB',
    },
    deci: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: "[separator] decimal separator, '.'",
      token: 'dek',
      o: 'https://en.wiktionary.org/wiki/pungo#Latin',
    },

    how_many: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[interogative] how many',
      token: 'vo',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C5%8D',
    },

    each: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: 'each, every, all',
      token: 'pa',
      o: 'https://en.wiktionary.org/wiki/%CF%80%E1%BE%B6%CF%82#Ancient_Greek',
    },

    at_most: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[comparative] at most. ≤',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%ABtilaz',
      token: 'lu',
    },
    less_than: {
      d: '2024-08-31',
      c: Klass.Numeral,
      tokened: '[comparative] less than. <',
      token: 'me',
      o: 'https://en.wiktionary.org/wiki/l%C3%A6s#Etymology_2_2',
    },

    plural: {
      d: '2024-09-17',
      c: Klass.Numeral,
      tokened: 'plural, at least two',
      idiom: ['two', 'at_most'],
    },

    _add: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[binary] addition, +',
      token: 'sum',
      o: 'https://en.wiktionary.org/wiki/summa#Latin',
    },
    _sub: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[binary] subtraction, -',
      token: 'dif',
      o: 'https://en.wiktionary.org/wiki/differentia#Latin',
    },
    _mul: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[binary] multiplication, *',
      token: 'prod',
      o: 'https://en.wiktionary.org/wiki/productum#Latin',
    },
    _div: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[binary] division, \u002F',
      token: 'kvot',
      o: 'https://en.wiktionary.org/wiki/quotiens#Latin',
    },
    _mod: {
      d: '2024-08-24',
      c: Klass.Numeral,
      tokened: '[binary] modulo, %',
      token: 'mod',
      o: 'https://en.wiktionary.org/wiki/modulus#Latin',
    },
    _exp: {
      d: '2024-08-24',
      c: Klass.Numeral,
      tokened: '[binary] exponential, ^',
      token: 'pot',
      o: 'https://en.wiktionary.org/wiki/potere#Latin',
    },
    _log: {
      d: '2024-08-24',
      c: Klass.Numeral,
      tokened: '[binary] logarithm',
      token: 'loc',
      o: 'https://en.wiktionary.org/wiki/logarithmo#Latin',
    },

    _ord: {
      d: '2024-08-02',
      c: Klass.Other,
      tokened: '@0 is @{number}-th',
      token: 'te',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-i%C3%BE%C5%8D',
    },
    _card: {
      d: '2024-08-02',
      c: Klass.Other,
      tokened: '@0 contains @{number} elements',
      token: 'ko',
      o: 'https://en.wiktionary.org/wiki/%E5%80%8B',
    },

    first: {
      d: '2024-09-14',
      c: Klass.Verb,
      tokened: '@0 is (0th, first, primary)',
      idiom: ['_ord', 'zero'],
    },
    second: {
      d: '2024-09-14',
      c: Klass.Verb,
      tokened: '@0 is (1st, second, other)',
      idiom: ['_ord', 'one'],
    },
    last: {
      d: '2024-09-14',
      c: Klass.Verb,
      tokened: '@0 is (last, final)',
      idiom: ['_ord', 'each'],
    },

    i: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is me',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mek',
      token: 'ma',
    },
    thou: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is thee',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEek',
      token: 'da',
    },
    he: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is (him, it, this, that, the definite entity)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiz',
      token: 'xa',
    },
    self: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is oneself',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sek',
      token: 'sa',
    },
    who: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[interogative] @0 is who',
      token: 'va',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwaz',
    },

    this: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '@0 is this',
      idiom: ['he', 'near'],
    },
    yon: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '@0 is that',
      idiom: ['he', 'far'],
    },

    normal: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened:
        '[extent.subjective] @0 is of (normal, moderate, default, usual, ordinary) extent, at subjective norm',
      token: 'mes',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gamet',
    },
    high: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened:
        '[extent.subjective] @0 is of (high, great) extent, above subjective norm',
      token: 'man',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/managaz',
    },
    low: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened:
        '[extent.subjective] @0 is of (low, small) extent, below subjective norm',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fawaz',
      token: 'fau',
    },
    positive: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened: '[extent.polarity] @0 is (positive, above objective norm)',
      token: 'veu',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wela',
    },
    negative: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened: '[extent.polarity] @0 is (negative, below objective norm)',
      token: 'mis',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/missa-',
    },
    up: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened:
        '[extent.dynamic] @0 is (riseth, goeth up, ascends) along with @1',
      token: 'ris',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABsan%C4%85',
    },
    down: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened:
        '[extent.dynamic] @0 is (falleth, goeth down, descends) along with @1',
      token: 'fau',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fallan%C4%85',
    },
    most: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[extent.extreme] @0 is (maximal, possibly highest)',
      token: 'mai',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/maiz',
    },
    least: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[extent.extreme] @0 is (minimal, possibly lowest)',
      token: 'min',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/minniz%C3%B4',
    },

    [name]: {
      d: '2024-02-17',
      c: Klass.Verb,
      tokened: `@0 is the language ${name}`,
      token: name,
      o: 'a priori',
    },

    // basic
    deny: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '@0 (contradicteth, negateth, denieth) @1',
      token: 'nai',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne',
    },
    let: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 (causeth, leteth) @{1:result, effect}',
      token: 'let',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93tan%C4%85',
    },
    back: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '@0 is temporally (inverse, opposite) of @1',
      token: 'rei',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/wre-',
    },
    counter: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '@0 (complementeth, is dual of) @1',
      token: 'jan',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-',
    },
    relate: {
      d: '2024-09-14',
      c: Klass.Verb,
      tokened: '@0 is (related to @1, @1-ish), ',
      token: 'rix',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-l%C4%ABkaz',
    },

    happen: {
      d: '2024-08-23',
      c: Klass.Verb,
      tokened:
        '@0 (existeth, happeneth, occureth, realiseth, is actual, is an event)',
      token: 'skek',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skehan%C4%85',
    },

    make: {
      d: '2024-08-02',
      c: Klass.Verb,
      tokened:
        '@0 (maketh, buildeth, createth) @1 from @{2:material, component}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skapjan%C4%85',
      origins: {
        gmc: 'skapajaną',
        ice: 'skapaa',
        eng: 'shape',
        deu: 'schaffen',
      },
      token: 'skaf',
    },
    break: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '@0 (breaketh, destructeth) @1 into @{2:pieces, components}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brekan%C4%85',
      origins: {
        gmc: 'brekaną',
        eng: 'break',
        deu: 'brechen',
      },
      token: 'brek',
      complex: ['back', 'make'],
    },

    have: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '@0 (hath, owneth) @{1:property}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/habjan%C4%85',
      origins: {
        pie: 'keh₂p-',
        gmc: 'habjaną',
        ice: 'hafa',
        eng: 'have',
        deu: 'haben',
      },
      token: 'kaf',
    },
    give: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 giveth @1 to @{2:receiver}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/geban%C4%85',
      origins: {
        pie: 'gʰebʰ-',
        gmc: 'gebaną',
        ice: 'gefa',
        eng: 'give',
        deu: 'geben',
      },
      token: 'cif',
    },
    take: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '@0 {taketh, receiveth} @1 from @2',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neman%C4%85',
      origins: {
        pie: 'ném-e',
        gmc: 'nemaną',
        ice: 'nema',
        eng: 'nim',
        deu: 'nehmen',
      },
      token: 'nen',
      complex: ['back', 'give'],
    },

    from: {
      d: '2024-08-26',
      c: Klass.Verb,
      tokened: '@0 (is, cometh) (from, since) @{1:source, origin, start}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fan%C4%93',
      origins: {
        pie: 'pro-',
        gmc: 'fram',
        ice: 'frá',
        eng: 'from',
      },
      token: 'fan',
    },
    unto: {
      d: '2024-08-26',
      c: Klass.Verb,
      tokened: '@0 (is, goeth) (to, until) @{1:sink, destination, goal}',
      token: 'tiu',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/til%C4%85',
    },
    through: {
      d: '2024-08-26',
      c: Klass.Verb,
      tokened: '@0 (is, passeth) (through, via) @{1:process, route, medium}',
      token: 'dur',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEurhw',
    },
    at: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is at @{1:position, location, place}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wesan%C4%85',
      token: 'ves',
    },

    element: {
      d: '2024-08-06',
      c: Klass.Verb,
      tokened: '@0 is in @{1:collection, set, group, list}',
      token: 'cat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gad',
    },
    part: {
      d: '2024-08-06',
      c: Klass.Verb,
      tokened: '@0 is a (part, component) of @{1:whole}',
      token: 'deu',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dailiz',
    },
    complex: {
      d: '2024-08-25',
      c: Klass.Verb,
      tokened: '@0 (is complex, consisteth of many parts)',
      complex: ['done', 'part', 'high'],
    },
    simple: {
      d: '2024-08-25',
      c: Klass.Verb,
      tokened: '@0 (is simple, consisteth of few parts)',
      complex: ['done', 'part', 'low'],
    },
    atom: {
      d: '2024-08-25',
      c: Klass.Verb,
      tokened: '@0 is an atom',
      complex: ['done', 'part', 'one'],
    },

    contain: {
      d: '2024-08-02',
      c: Klass.Verb,
      tokened: '@0 is containeth @{1:within}',
      o: 'https://en.wiktionary.org/wiki/belucan#Old_English',
      token: 'luk',
    },
    full: {
      d: '2024-08-02',
      c: Klass.Verb,
      tokened: '@0 is full of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fullaz',
      complex: ['most', 'contain'],
      token: 'fou',
    },
    empty: {
      d: '2024-08-02',
      c: Klass.Verb,
      tokened: '@0 is empty of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C5%8Dmaz',
      complex: ['least', 'contain'],
      token: 'tom',
    },

    move: {
      d: '2024-08-31',
      c: Klass.Verb,
      tokened: '@0 (moveth, is dynamic)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wegan%C4%85',
      token: 'vej',
    },
    stop: {
      d: '2024-08-31',
      c: Klass.Verb,
      tokened: '@0 (stopeth, halteth, is static)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/stopp%C5%8Dn',
      complex: ['least', 'move'],
      token: 'stof',
    },

    point: {
      d: '2024-10-01',
      c: Klass.Verb,
      tokened: '@0 is a (point, position, dot)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bruzdaz',
      token: 'brut',
    },
    interval: {
      d: '2024-10-01',
      c: Klass.Verb,
      tokened: '@0 is (an interval, an area, a volume, a domain)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/braidaz',
      token: 'bret',
    },

    world: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is a (world, universe)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haimaz',
      token: 'xem',
    },
    space: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is the 3-dimensional physical spacial continuum',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABm%C4%85',
      token: 'rum',
    },
    time: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is the 1-dimensional physical temporal continuum',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABm%C3%B4',
      token: 'tim',
    },
    thing: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is a (thing, matter) located in a spacetime',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEing%C4%85',
      token: 'dig',
    },
    mass: {
      d: '2024-08-31',
      c: Klass.Verb,
      tokened: '@0 is mass of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/balk%C3%B4',
      token: 'baux',
    },

    energy: {
      d: '2024-08-31',
      c: Klass.Verb,
      tokened: '@0 is energy of @1',
      token: 'cnau',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/gn%C4%81wos',
    },
    heat: {
      d: '2024-09-06',
      c: Klass.Verb,
      tokened: '@0 is heat in @1',
      complex: ['hot', 'energy'],
    },
    electric: {
      d: '2024-08-31',
      c: Klass.Verb,
      tokened: '@0 hath electric charge in @1',
      token: 'spak',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sparkaz',
    },
    force: {
      d: '2024-10-01',
      c: Klass.Verb,
      tokened: '@0 is force',
      token: 'vaut',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wald%C4%85',
    },

    wave: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '@{0:medium} waveth @{1:form}',
      token: 'buj',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bulgij%C5%8D',
    },
    light: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[wave] @0 is (a light, an electromagnetic wave)',
      token: 'liut',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leuht%C4%85',
    },
    sound: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[wave] @0 is a sound from @1',
      token: 'klig',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/klingan%C4%85',
    },
    turn: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '@0 (turneth, rotateth, spineth) around @{1:pivot, center}',
      token: 'dren',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%93an%C4%85',
    },

    fire: {
      d: '2024-12-08',
      c: Klass.Verb,
      tokened: '@0 burneth @1',
      token: 'brant',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brandaz',
    },

    // physical attribute
    big: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is (big, great)',
      token: 'crot',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grautaz',
    },
    small: {
      d: '2024-09-26',
      c: Klass.Verb,
      tokened: '@0 is small',
      token: 'smau',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smalaz',
      complex: ['low', 'big'],
    },
    long: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is (long, big in 1 dimension and small in others)',
      token: 'lag',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/langaz',
    },
    short: {
      d: '2024-09-26',
      c: Klass.Verb,
      tokened: '@0 is (short, small in 1 dimension and small in others)',
      token: 'skurt',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skurtaz',
      complex: ['low', 'long'],
    },

    thick: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is thick',
      token: 'dik',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEekuz',
    },
    sharp: {
      d: '2024-07-28',
      c: Klass.Verb,
      tokened: '@{0:angle} is sharp',
      token: 'skarf',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skarpaz',
    },
    heavy: {
      d: '2024-07-14',
      c: Klass.Verb,
      tokened: '@0 is heavy',
      token: 'suer',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%93raz',
    },
    dense: {
      d: '2024-07-15',
      c: Klass.Verb,
      tokened: '@0 is (dense, heavy per volume)',
      token: 'dint',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEinhtaz',
    },

    swift: {
      d: '2024-06-18',
      c: Klass.Verb,
      tokened: '@0 is (swift, quick)',
      token: 'sneu',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snellaz',
    },
    slow: {
      d: '2024-09-06',
      c: Klass.Verb,
      tokened: '@0 is suau',
      token: 'siai',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slaiwaz',
      complex: ['low', 'swift'],
    },
    rough: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '@0 (is rough, is coarse, hath high friction) against @1',
      token: 'ruk',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABhaz',
    },
    smooth: {
      d: '2024-09-26',
      c: Klass.Verb,
      tokened: '@0 (is smooth, is sleek, hath low friction) against @1',
      token: 'suik',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sl%C4%ABkan%C4%85',
      complex: ['low', 'rough'],
    },
    soft: {
      d: '2024-09-26',
      c: Klass.Verb,
      tokened: '@0 is soft against @1',
      token: 'vik',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABkwan%C4%85',
    },
    hard: {
      d: '2024-09-26',
      c: Klass.Verb,
      tokened: '@0 is (hard, firm) against @1',
      token: 'fast',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fastuz',
      complex: ['low', 'soft'],
    },
    hot: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '[temparature] @0 is (hot, warm)',
      token: 'varm',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/warmaz',
    },
    cold: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '[temparature] @0 (cold, cool)',
      token: 'kau',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kalan%C4%85',
      complex: ['low', 'hot'],
    },
    far: {
      d: '2024-08-08',
      c: Klass.Verb,
      tokened: '[proximity] @0 is (far, distant, remote) from @1',
      token: 'fer',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ferrai',
    },
    near: {
      d: '2024-08-08',
      c: Klass.Verb,
      tokened: '[proximity] @0 is (near, close to) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/n%C4%93hwaz',
      complex: ['low', 'far'],
      token: 'nex',
    },
    contact: {
      d: '2024-08-08',
      tokened: '[proximity] @0 (toucheth, is adjacent, is in contact with) @1',
      c: Klass.Verb,
      complex: ['least', 'far'],
    },

    before: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[position.global] @0 is before @{1:after}',
      token: 'for',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai',
    },
    below: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[position] @0 is below @{1:above, far against gravity}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ni%C3%BEan%C4%93',
      token: 'nid',
    },
    hind: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[position.local] @0 is behind @{1:front}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hinder',
      token: 'xint',
    },
    front: {
      d: '2025-02-07',
      c: Klass.Verb,
      tokened: '[position.local] @0 is in front of @{1:behind}',
      idiom: ['done', 'hind'],
    },
    left: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[position] @0 is to the left of @{1:right}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Old_High_German/link',
      token: 'ligk',
    },
    right: {
      d: '2025-02-07',
      c: Klass.Verb,
      tokened: '[position] @0 is to the right of @{1:left}',
      idiom: ['done', 'left'],
    },

    west: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened:
        '[position.global] @0 is to the west of @{1:to the east, far agaisnt rotation}',
      token: 'vest',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/westraz',
    },
    east: {
      d: '2025-03-01',
      c: Klass.Verb,
      tokened:
        '[position.global] @0 is to the east of @{1:to the west, far along rotation}',
      idiom: ['done', 'west'],
    },
    north: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '[position.global] @0 is to the north of @{1:to the south}',
      token: 'nurd',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nur%C3%BEraz',
    },
    south: {
      d: '2025-03-01',
      c: Klass.Verb,
      tokened: '[position.global] @0 is to the south of @{1:to the north}',
      idiom: ['done', 'north'],
    },

    solid: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[state-of-matter] @0 is solid',
      token: 'stif',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%ABfaz',
    },
    liquid: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[state-of-matter] @0 is liquid',
      token: 'flut',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flut%C4%85',
    },
    gas: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[state-of-matter] @0 is gas',
      token: 'cas',
      o: 'https://en.wiktionary.org/wiki/gas#Dutch',
    },
    plasm: {
      d: '2024-07-15',
      c: Klass.Verb,
      tokened: '[state-of-matter] @0 is plasm',
      token: 'flam',
      o: 'https://en.wiktionary.org/wiki/flamma#Latin',
    },

    water: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[matter] @0 is water',
      token: 'vat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wat%C5%8Dr',
    },
    salt: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[matter] @0 is salt',
      token: 'salt',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/salt%C4%85',
    },
    stone: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[matter] @0 is stone',
      token: 'sten',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stainaz',
    },
    smoke: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '[matter] @0 is smoke',
      token: 'dvem',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dwemr%C4%85',
    },
    ash: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '[matter] @0 is ash',
      token: 'ax',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ask%C7%AD',
    },

    wet: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '@0 is (wet, moist)',
      token: 'vet',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%93taz',
      complex: ['contain', 'water'],
    },
    dry: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '@0 is dry',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/druknaz',
      token: 'drux',
      complex: ['low', 'contain', 'water'],
    },

    color: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[color] @0 is the color of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/farwaz',
      token: 'farv',
    },
    hue: {
      d: '2024-11-20',
      c: Klass.Verb,
      tokened: '[color] @0 is {a hue, a frequency of a light} of @1',
      token: 'xiv',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiwj%C4%85',
    },
    red: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[color.hue] @0 is red',
      token: 'rod',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raudaz',
    },
    orange: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[color.hue] @0 is orange',
      token: 'rag',
      o: 'https://en.wiktionary.org/wiki/%D9%86%D8%A7%D8%B1%D9%86%DA%AF#Persian',
    },
    yellow: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'cul',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gulaz',
      tokened: '[color.hue] @0 is yellow',
    },
    green: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'cron',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C5%8Dniz',
      tokened: '[color.hue] @0 is green',
    },
    blue: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'blev',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C4%93waz',
      tokened: '[color.hue] @0 is blue',
    },
    purple: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'vjon',
      o: 'https://en.wiktionary.org/wiki/%E1%BC%B4%CE%BF%CE%BD#Ancient_Greek',
      tokened: '[color.hue] @0 is purple',
    },
    vivid: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'xin',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%ABnan%C4%85',
      tokened: '[color.saturation] @0 is vivid-colored',
    },
    dull: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[color.saturation] @0 is dull-colored',
      complex: ['low', 'vivid'],
    },
    gray: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'crev',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C4%93waz',
      tokened: '[color.saturation] @0 is gray',
      complex: ['least', 'vivid'],
    },
    white: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'xvit',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C4%ABtaz',
      tokened: '[color.brightness] @0 is white',
    },
    black: {
      d: '2024-04-26',
      c: Klass.Verb,
      token: 'svat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swartaz',
      tokened: '[color.brightness] @0 is black',
      complex: ['least', 'white'],
    },

    // light
    bright: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'bert',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/berhtaz',
      tokened: '@0 (is bright, reflecteth much light)',
    },
    dark: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'dim',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dimmaz',
      tokened: '@0 is dark',
      complex: ['low', 'bright'],
    },

    // celestial
    sun: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'sun',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD',
      tokened: '[celestial] @0 is sun',
    },
    earth: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'jerd',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/er%C3%BE%C5%8D',
      tokened: '[celestial] @0 is earth',
    },
    moon: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'men',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/m%C4%93n%C3%B4',
      tokened: '[celestial] @0 is moon',
    },

    year: {
      d: '2024-08-30',
      c: Klass.Verb,
      token: 'jer',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/j%C4%93r%C4%85',
      tokened: '[celestial.interval] @0 is year of @{1:earth}',
    },
    season: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '[celestial.time] @0 is season of @{1:earth}',
      complex: ['part', 'year'],
    },
    winter: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '@0 is (winter, coldest interval) of @{1:earth}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wintruz',
      token: 'vinter',
      complex: ['season', 'low'],
    },
    spring: {
      d: '2024-11-21',
      c: Klass.Verb,
      token: 'vazar',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wazr%C4%85',
      tokened: '@0 is (spring, second hottest interval) of @{1:earth}',
      complex: ['season', 'up'],
    },
    summer: {
      d: '2024-08-30',
      c: Klass.Verb,
      token: 'sumar',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sumaraz',
      tokened: '@0 is (summer, hottest interval) of @{1:earth}',
      complex: ['season', 'high'],
    },
    autumn: {
      d: '2024-11-21',
      c: Klass.Verb,
      token: 'karbis',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/harbistaz',
      tokened: '@0 is (autumn, second coldest interval) of @{1:earth}',
      complex: ['season', 'down'],
    },

    day: {
      d: '2024-08-19',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABnaz',
      tokened: '[celestial.interval] @0 is day of @{1:earth}',
      token: 'tin',
    },
    morning: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'murc',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/murginaz',
      tokened: '[celestial.interval] @0 is (morning, daytime) of @{1:earth}',
      complex: ['part', 'day', 'bright'],
    },
    night: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'nat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nahts',
      tokened: '[celestial.interval] @0 is night of @{1:earth}',
      complex: ['part', 'day', 'dark'],
    },

    // terrain
    land: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'land',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/land%C4%85',
      tokened: '[terrain] @0 is land',
    },
    sea: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[terrain] @0 is a sea',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mari',
      token: 'mar',
    },
    hill: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[terrain] @0 is a (mountain, hill)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bergaz',
      token: 'berj',
    },
    river: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[terrain] @0 is river',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/straumaz',
      token: 'srom',
    },
    sky: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[terrain] @0 is sky',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiwj%C4%85',
      token: 'skiv',
    },

    // weather
    cloud: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[weather] @0 is cloud',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulkn%C4%85',
      token: 'volk',
    },
    fog: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[weather] @0 is (fog, mist)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mihstaz',
      token: 'mist',
    },
    rain: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[weather] @0 is rain',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/regn%C4%85',
      token: 'ren',
    },
    snow: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[weather] @0 is snow',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sn%C4%ABwan%C4%85',
      token: 'snev',
    },
    hail: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[weather] @0 is hail',
      o: 'https://en.wiktionary.org/wiki/h%C3%A6gl#Old_English',
      token: 'kel',
    },
    thunder: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[weather] @0 is thunder',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEunraz',
      token: 'dun',
    },

    // feel
    feel: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'sent',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/sent-',
      tokened: '@0 (feeleth, senseth) @{1:stimulus}',
    },
    hear: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'xlev',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hleum%C3%B4',
      tokened: '[sense] @0 hears @{1:sound}',
    },
    see: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'sek',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wl%C4%ABtan%C4%85',
      tokened: '[sense] @0 sees @{1:sight}',
    },
    smell: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'rjuk',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reukan%C4%85',
      tokened: '[sense] @0 smells @1',
    },
    taste: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'smak',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/smak%C4%93n',
      tokened: '[sense] @0 tastes @1',
    },
    touch: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'tek',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%93kan%C4%85',
      tokened: '[sense] @0 (palpeth, toucheth) @1',
    },
    hurt: {
      d: '2025-03-01',
      c: Klass.Verb,
      token: 'ser',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sairaz',
      tokened: '[sense] @0 (hurteth, feeleth pain) from @1',
    },

    differ: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'skil',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiljan%C4%85',
      tokened: '[comparison] @0 (differeth, varieth) from @1',
    },
    same: {
      d: '2024-08-27',
      c: Klass.Verb,
      token: 'sam',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/samaz',
      tokened: '[comparison] @0 is (the same as, identical to, equal to) @1',
      complex: ['least', 'differ'],
    },

    simulate: {
      d: '2024-08-27',
      c: Klass.Verb,
      tokened:
        '@{0} (simulateth, mimiceth, imitateth, mocketh, faketh) @{1:original}',
      o: 'https://en.wiktionary.org/wiki/mock#English',
      token: 'mok',
    },
    test: {
      d: '2024-07-26',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/keusan%C4%85',
      tokened: '@0 (checketh, examineth, inspecteth) @1',
      token: 'xus',
    },
    compare: {
      d: '2024-07-26',
      c: Klass.Verb,
      tokened: '@0 compares @{1:individuals}',
      complex: ['differ', 'test'],
    },

    // life
    live: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'liv',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libjan%C4%85',
      tokened: '@0 (liveth, is alive)',
    },
    die: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '@0 (dieth, is dead)',
      idiom: ['end', 'live'],
    },
    //kill: { d: '2024-08-24', c: Klass.Verb, ...toComplex(['let', 'die']), tokened: '@0 kills @1' },
    wake: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'vax',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wakan%C4%85',
      tokened: '@0 (waketh, is awake)',
    },
    sleep: {
      d: '2024-04-26',
      c: Klass.Verb,
      token: 'svef',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swefan%C4%85',
      tokened: '@0 (sleepeth, is asleep)',
      complex: ['least', 'wake'],
    },

    // motion
    lie: {
      d: '2024-08-30',
      c: Klass.Verb,
      token: 'lic',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ligjan%C4%85',
      tokened: '[behavior] @0 (lieth, horizontally stays) on @1',
    },
    sit: {
      d: '2024-08-30',
      c: Klass.Verb,
      token: 'set',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sitjan%C4%85',
      tokened: '[behavior] @0 sits on @1',
    },
    stand: {
      d: '2024-08-30',
      c: Klass.Verb,
      token: 'stan',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%81n%C4%85',
      tokened: '@0 stands on @1',
    },
    walk: {
      d: '2024-06-18',
      c: Klass.Verb,
      token: 'valk',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/walkan%C4%85',
      tokened: '[behavior] @0 walk on @{1:ground}',
    },
    run: {
      d: '2024-06-18',
      c: Klass.Verb,
      token: 'rin',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rinnan%C4%85',
      tokened: '[behavior] @0 run on @{1:ground}',
    },
    leap: {
      d: '2024-07-28',
      c: Klass.Verb,
      token: 'lof',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlaupan%C4%85',
      tokened: '[behavior] @0 (jump, leap, skip, hop) over @1',
    },
    swim: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'svim',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swimman%C4%85',
      tokened: '[behavior] @0 (swimeth, flieth) in @{1:fluid}',
    },
    fly: {
      d: '2024-07-28',
      c: Klass.Verb,
      token: 'fljuc',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleugan%C4%85',
      tokened: '[behavior] @0 flieth in @{1:air}',
    },
    dream: {
      d: '2024-10-16',
      c: Klass.Verb,
      token: 'drom',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/draumaz',
      tokened: '[behavior] @0 dreams @{1:dream}',
    },

    // physiological
    eat: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'jet',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/etan',
      tokened: '[physiological] @0 eats @{1:food}',
    },
    bite: {
      d: '2024-08-24',
      c: Klass.Verb,
      token: 'bit',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABtan%C4%85',
      tokened: '[physiological.eat] @0 bites @{1:food}',
    },
    chew: {
      d: '2024-08-24',
      c: Klass.Verb,
      token: 'xev',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kewwan%C4%85',
      tokened: '[physiological.eat] @0 chews @{1:food}',
    },
    swallow: {
      d: '2024-08-24',
      c: Klass.Verb,
      token: 'svel',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swelgan%C4%85',
      tokened: '[physiological.eat] @0 swallows @{1:food}',
    },
    vomit: {
      d: '2024-06-14',
      c: Klass.Verb,
      token: 'puk',
      o: 'https://en.wiktionary.org/wiki/puke',
      tokened: '[physiological] @0 vomits @{1:excreta}',
      complex: ['back', 'eat'],
    },
    shit: {
      d: '2024-06-14',
      c: Klass.Verb,
      token: 'drit',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/drit%C4%85',
      tokened: '[physiological] @0 shits @{1:excreta}',
      complex: ['counter', 'eat'],
    },

    digest: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'melt',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meltan%C4%85',
      tokened: '[physiological] @0 digests @{1:food}',
    },
    fuck: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'fok',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fukk%C5%8Dn%C4%85',
      tokened: '[physiological] @0 fucketh A',
    },
    sick: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'sjuk',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/seukaz',
      tokened: '[physiological] @0 (is sick, malfunctioneth)',
    },
    healthy: {
      d: '2024-08-24',
      c: Klass.Verb,
      token: 'sunt',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz',
      tokened: '[physiological] @0 is healthy',
      complex: ['low', 'sick'],
    },
    recover: {
      d: '2024-12-24',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz',
      tokened: '[physiological] @0 recovers',
      complex: ['down', 'sick'],
    },

    // emotion
    emotion: {
      d: '2024-08-02',
      c: Klass.Verb,
      token: 'kuc',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hugiz',
      tokened: '@0 feeleth @{1:emotion, feeling}',
    },
    bad: {
      d: '2024-08-02',
      c: Klass.Verb,
      token: 'led',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lai%C3%BEaz',
      tokened:
        '[emotion] @0 (disliketh, feeleth bad about, hath a negative impression of) @{1:bad} @{#:desired change of distance}',
    },
    good: {
      d: '2024-08-02',
      c: Klass.Verb,
      token: 'cod',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/g%C5%8Ddaz',
      tokened:
        '[emotion] @0 (liketh, feeleth good about, hath a positive impression of) @{1:good}',
      complex: ['low', 'bad'],
    },
    sad: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'surc',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/surg%C5%8D',
      tokened: '[emotion] @0 is (sad, depressed) about @1',
    },
    glad: {
      d: '2024-08-02',
      c: Klass.Verb,
      token: 'frav',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/frawaz',
      tokened: '[emotion] @0 is (happy, glad, merry) about @1',
      complex: ['low', 'sad'],
    },

    care: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'kar',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kar%C5%8D',
      tokened: '[emotion] @0 (regardeth, careth about) @{1:important}',
    },
    fear: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'fort',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furhtaz',
      tokened:
        '[emotion.care] @0 (worries, feareth, is afraid of, negatively cares about) @1',
      complex: ['care', 'bad'],
    },
    respect: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'verd',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wer%C3%BEaz',
      tokened:
        '[emotion.care] @0 (respecteth, honoureth, positively cares about) @1',
      complex: ['care', 'good'],
    },
    neglect: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened:
        '[emotion] @0 (neglecteth, is indifferent to, cares less about) @1',
      complex: ['low', 'care'],
    },
    serene: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'rov',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%8D%C5%8D',
      tokened:
        '[emotion.neglect] @0 is (calm about, serene about, positively neglects) @1',
      complex: ['neglect', 'good'],
    },
    scorn: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened:
        '[emotion.neglect] @0 (scorneth, disdaineth, disrespecteth, negatively neglects) @1',
      complex: ['neglect', 'bad'],
    },
    hate: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'xat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hataz',
      tokened: '[emotion] @0 is (hateth, detests) @1',
    },
    angry: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'vred',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wrai%C3%BEaz',
      tokened: '[emotion] @0 is (angry with, mad at) @1',
    },
    expect: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'bid',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABdan%C4%85',
      tokened: '[emotion] @0 (expecteth, is not surprised at) @1',
    },
    amaze: {
      d: '2024-08-02',
      c: Klass.Verb,
      token: 'vont',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wundr%C4%85',
      tokened: '[emotion] @0 is (surprised, amazed) at @1',
      complex: ['low', 'expect'],
    },
    bore: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'bur',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bur%C5%8Dn%C4%85',
      tokened: '[emotion] @0 (is bored with, is far from surprised with) @1',
    },
    enjoy: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'njut',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neutan%C4%85',
      tokened: '[emotion] @0 enjoys @1',
    },
    trust: {
      d: '2024-08-02',
      c: Klass.Verb,
      token: 'truv',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tr%C5%ABw%C4%81n%C4%85',
      tokened: '[emotion] @0 trusts @1',
    },
    doubt: {
      d: '2024-09-10',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tw%C4%ABflaz',
      tokened: '[emotion] @0 doubts @1',
      complex: ['low', 'trust'],
    },
    pride: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'sturt',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stultaz',
      tokened: '[emotion] @0 is proud of @1',
    },
    shame: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'skam',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skam%C5%8D',
      tokened: '[emotion] @0 is ashamed of @1',
      complex: ['low', 'pride'],
    },
    shun: {
      d: '2024-09-27',
      c: Klass.Verb,
      token: 'skjuk',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skeuhaz',
      tokened: '[emotion] @0 is (shuneth, avoideth) @1',
    },
    want: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'vil',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wiljan%C4%85',
      tokened: '[emotion] @0 wants @1',
      complex: ['low', 'shun'],
    },
    love: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'jern',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gernaz',
      tokened: '[emotion] @0 (loveth, is romantically attracted to) @1',
    },
    randy: {
      d: '2024-09-12',
      c: Klass.Verb,
      token: 'cel',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gailaz',
      tokened:
        '[emotion] @0 is (randy, aroused, lustful, horny, sexual) for @1',
    },
    envy: {
      d: '2024-09-12',
      c: Klass.Verb,
      token: 'zel',
      o: 'https://en.wiktionary.org/wiki/zelo#Latin',
      tokened: '[emotion.hate] @0 envieth @1',
    },
    pity: {
      d: '2024-09-10',
      c: Klass.Verb,
      token: 'nad',
      o: 'https://en.wiktionary.org/wiki/ginatha#Old_Dutch',
      tokened: '[emotion] @0 (pitieth, feel sympathy) @1',
    },

    // facial
    laugh: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'lak',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlahjan%C4%85',
      tokened: '[facial-expression] @0 laugheth',
    },
    smile: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'smil',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sm%C4%ABlijan%C4%85',
      tokened: '[facial-expression] @0 smileth',
    },
    frown: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'skel',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skelhaz',
      tokened: '[facial-expression] @0 frowneth',
    },
    weep: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'vof',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C5%8Dpijan%C4%85',
      tokened: '[facial-expression] @0 weepeth @{1:tear}',
    },
    yell: {
      d: '2024-06-14',
      c: Klass.Verb,
      token: 'stun',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stun%C5%8Dn%C4%85',
      tokened: '@0 (yelleth, crieth, shouteth) @{1:voice}',
    },

    // mental
    know: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[mental] @0 knoweth @{1:fact, idea}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/witan%C4%85',
      token: 'vit',
    },
    learn: {
      d: '2024-08-01',
      c: Klass.Verb,
      tokened: '[mental] @0 learneth @{1:idea}',
      idiom: ['begin', 'know'],
    },
    forget: {
      d: '2024-08-01',
      c: Klass.Verb,
      tokened: '[mental] @0 forgeteth @{1:idea}',
      idiom: ['end', 'know'],
    },

    think: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'dagk',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEankijan%C4%85',
      tokened: '[mental] @0 thinketh @{1:idea}',
    },
    reason: {
      d: '2024-08-31',
      c: Klass.Verb,
      token: 'rad',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ra%C3%BEj%C7%AD',
      tokened: '[mental] @0 hath @{1:reason}',
    },

    // communicate
    name: {
      d: '2024-07-28',
      c: Klass.Verb,
      token: 'nam',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4',
      tokened: '[communicate] @0 (meaneth, signifieth, is a name of) @1',
    },
    speak: {
      d: '2024-06-14',
      c: Klass.Verb,
      token: 'tal',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tal%C5%8D',
      tokened: '[communicate] @0 speaketh in @{1:language, protocol}',
    },
    language: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '[communicate] @0 language',
      idiom: ['done', 'speak'],
    },
    say: {
      d: '2024-06-14',
      c: Klass.Verb,
      token: 'sac',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sagjan%C4%85',
      tokened:
        '[communicate] @0 (sayeth, encodes) @{1:idea} as @{2:expression}',
    },
    understand: {
      d: '2024-06-14',
      c: Klass.Verb,
      token: 'xlust',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlustiz',
      tokened:
        '[communicate] @0 (understandeth, decodeth) @{1:idea} from @{2:expression}',
      complex: ['counter', 'say'],
    },
    write: {
      d: '2024-06-14',
      c: Klass.Verb,
      token: 'vrit',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C4%ABtan%C4%85',
      tokened: '[communicate] @0 writeth @{1:idea} to @{2:expression}',
    },
    read: {
      d: '2024-06-14',
      c: Klass.Verb,
      token: 'red',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%93dan%C4%85',
      tokened: '[communicate] @0 readeth @{1:idea} from @{2:expression}',
      complex: ['counter', 'write'],
    },
    ask: {
      d: '2024-07-28',
      c: Klass.Verb,
      token: 'frej',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fr%C4%93g%C5%8D',
      tokened: '[communicate] @0 asketh @{1:question} to @{2:questionee}',
    },
    answer: {
      d: '2024-07-28',
      c: Klass.Verb,
      token: 'svar',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swar%C5%8Dn%C4%85',
      tokened: '[communicate] @0 answereth @{1:answer} to @{2:questioner}',
      complex: ['counter', 'ask'],
    },

    // performative
    greet: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'salut',
      o: 'https://en.wiktionary.org/wiki/salus#Latin',
      tokened: '[performative] @0 greeteth @{1:person}',
    },
    forgive: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'don',
      o: 'https://en.wiktionary.org/wiki/donare#Latin',
      tokened: '[performative] @0 forgiveth @{1:event}',
    },
    thank: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'crat',
      o: 'https://en.wiktionary.org/wiki/gratus#Latin',
      tokened: '[performative] @0 thanketh @{1:event}',
    },
    promise: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'ket',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitan%C4%85',
      tokened: '[performative] @0 (promiseth, guaranteeth, voweth) @{1:event}',
    },
    command: {
      d: '2024-09-29',
      c: Klass.Verb,
      token: 'stjur',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stiurijan%C4%85',
      tokened: '[performative] @0 (command, request, recommend) @{1:must}',
    },

    // culture
    sing: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'sig',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/singwan%C4%85',
      tokened: '[culture] @0 singeth @{1:music, song}, play',
    },
    dance: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'dans',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEans%C5%8Dn',
      tokened: '[culture] @0 danceth @{1:choreography}',
    },

    // biochemistry
    rot: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'rut',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rut%C4%81n%C4%85',
      tokened: '@0 is rotten',
    },
    fresh: {
      d: '2024-07-24',
      c: Klass.Verb,
      token: 'frix',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/friskaz',
      tokened: '@0 is fresh',
      complex: ['low', 'rot'],
    },

    // reproduce
    beget: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '@0 (beareth, reproducteth, is a parent of) @{1:child}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/burdiz',
      token: 'burd',
    },
    man: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'jum',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gum%C3%B4',
      tokened: '@0 (is male, produceth sperms)',
    },
    woman: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'viv',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABb%C4%85',
      tokened: '@0 (is female, produceth ova)',
    },

    // familly
    sibling: {
      d: '2025-02-08',
      c: Klass.Verb,
      tokened: '@0 (is a sibiling of, shareth a parent with) @{1}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sibjaz',
      token: 'siv',
      complex: ['done', 'beget', 'same'],
    },
    family: {
      d: '2025-02-08',
      c: Klass.Verb,
      tokened: '@0 belongeth to the same family with @1',
      etymology:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kunj%C4%85',
      token: 'xun',
    },

    // animal
    mammal: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'mamal',
      o: 'https://en.wiktionary.org/wiki/mammalis',
      tokened: '[life.animal] @0 is a mammal',
    },
    human: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'man',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mann-',
      tokened: '[life.animal.mammal] @0 is a human',
    },
    rat: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'rat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rattaz',
      tokened: '[life.animal.mammal] @0 is a (rat, mouse)',
    },
    hare: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'xas',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/has%C3%B4',
      tokened: '[life.animal.mammal] @0 is a (hare, rabbit)',
    },
    cat: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'kat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kattuz',
      tokened: '[life.animal.mammal] @0 is a cat',
    },
    fox: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'fox',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuhsaz',
      tokened: '[life.animal.mammal] @0 is a (fox, vixen)',
    },
    dog: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'xunt',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hundaz',
      tokened: '[life.animal.mammal] @0 is a {dog, bitch}',
    },
    wolf: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'volf',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulfaz',
      tokened: '[life.animal.mammal] @0 is a wolf',
    },
    bear: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'ber',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ber%C3%B4',
      tokened: '[life.animal.mammal] @0 is a bear',
    },
    sheep: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'skef',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%93p%C4%85',
      tokened: '[life.animal.mammal] @0 is a sheep',
    },
    goat: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'cet',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gaits',
      tokened: '[life.animal.mammal] @0 is a goat',
    },
    deer: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'rek',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raih%C3%B4',
      tokened: '[life.animal.mammal] @0 is a deer',
    },
    horse: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'krus',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hruss%C4%85',
      tokened: '[life.animal.mammal] @0 is a {horse, stallion, mare}',
    },
    cow: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'kuv',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/k%C5%ABz',
      tokened: '[life.animal.mammal] @0 is a cow',
    },
    pig: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'svin',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%ABn%C4%85',
      tokened: '[life.animal.mammal] @0 is a pig',
    },

    reptile: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal] @0 is a reptile',
      o: 'https://en.wiktionary.org/wiki/reptilis#Latin',
      token: 'reptil',
    },
    snake: {
      d: '2024-07-15',
      c: Klass.Verb,
      token: 'snec',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snegan%C4%85',
      tokened: '[life.animal.reptile] @0 is a snake',
    },

    bird: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'focl',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuglaz',
      tokened: '[life.animal] @0 is a bird',
    },
    crow: {
      d: '2024-07-15',
      c: Klass.Verb,
      token: 'ravn',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrabnaz',
      tokened: '[life.animal.bird] @0 is a (crow, raven)',
    },

    fish: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'fisk',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fiskaz',
      tokened: '[life.animal] @0 is a fish',
    },

    amphibia: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'anfiv',
      o: 'https://en.wiktionary.org/wiki/amphibius#Latin',
      tokened: '[life.animal] @0 is a amphibia',
    },
    frog: {
      d: '2024-07-15',
      c: Klass.Verb,
      token: 'frusk',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fruskaz',
      tokened: '[life.animal.amphibia] @0 is a frog',
    },

    // plant
    plant: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'plant',
      o: 'https://en.wiktionary.org/wiki/planta#Latin',
      tokened: '[life] @0 is a plant',
    },
    tree: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'bacm',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bagmaz',
      tokened: '[life.plant] @0 is a tree',
    },

    // body
    body: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'kref',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrefaz',
      tokened: '@0 is a body of @1',
    },
    bone: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'ben',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bain%C4%85',
      tokened: '[body] @0 is a bone of @1',
    },
    spine: {
      d: '2025-02-06',
      c: Klass.Verb,
      token: 'spin',
      o: 'https://en.wiktionary.org/wiki/spina#Latin',
      tokened: '[body] @0 is a spine of @{1:vertebrata}',
    },
    flesh: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'flex',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaiski',
      tokened: '[body] @0 is a (flesh, meat, muscle) of @1',
    },
    fat: {
      d: '2024-09-16',
      c: Klass.Verb,
      token: 'fet',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/faitaz',
      tokened: '[body] @0 is a fat of @1',
    },
    skin: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'skin',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skin%C3%BE%C4%85',
      tokened: '[body] @0 is a (skin, peel) of @1',
    },
    head: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'kavd',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haubud%C4%85',
      tokened: '[body] @0 is a head of @1',
    },
    neck: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'nak',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnakk%C3%B4',
      tokened: '[body] @0 is a neck of @1',
    },
    shoulder: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'skult',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/skuldru',
      tokened: '[body] @0 is a (shoulder, buttock) of @1',
    },

    limb: {
      d: '2024-02-13',
      c: Klass.Verb,

      token: 'lim',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/limuz',
      origins: {
        gem: 'limuz',
        eng: 'limb',
        ice: 'limur',
      },
      tokened: '[body] @0 is a (limb, leg, arm, branch) of @1',
    },
    arm: {
      d: '2024-11-24',
      c: Klass.Verb,

      tokened: '[body.limb] @0 is an arm',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/armaz',
      origins: {
        gem: 'armaz',
        eng: 'arm',
        deu: 'arm',
      },
      token: 'arm',
    },
    leg: {
      d: '2024-11-24',
      c: Klass.Verb,

      tokened: '[body.limb] @0 is a leg',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lagjaz',
      origins: {
        gem: 'lagjaz',
        ice: 'leggur',
      },
      token: 'lac',
    },

    //extremity: { d: '2024-02-13', c: Klass.Verb, token: 'and', o: 'https://en.wiktionary.org/wiki/reconstruction:proto-germanic/handuz', tokened: '[body] @0 is a (extremity, hand, foot) of @1' },
    foot: {
      d: '2024-11-24',
      c: Klass.Verb,
      token: 'fot',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/f%C5%8Dts',
      origins: {
        gem: 'fōts',
        eng: 'foot',
        deu: 'fuß',
        ice: 'fótur',
        lat: 'pede',
        chu: 'пѣшь',
      },
      tokened: '[body.extremity] @0 is a foot',
    },
    hand: {
      d: '2024-11-24',
      c: Klass.Verb,
      token: 'munt',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mund%C5%8D',
      tokened: '[body.extremity] @0 is a hand',
    },
    trunk: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'stam',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stamniz',
      tokened: '[body] @0 is a (trunk, torso, stem) of @1',
    },
    breast: {
      d: '2024-09-22',
      c: Klass.Verb,
      token: 'brust',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brusts',
      tokened: '[body] @0 is a (chest, breast) of @1',
    },
    belly: {
      d: '2024-09-22',
      c: Klass.Verb,
      token: 'kved',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kwe%C3%BEuz',
      tokened: '[body] @0 is a (chest, breast) of @1',
    },
    tail: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'stert',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stertaz',
      tokened: '[body] @0 is a tail of @1',
    },
    hair: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'kes',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hazdaz',
      tokened: '[body] @0 is a (hair, fur) of @1',
    },
    horn: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'xurn',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hurn%C4%85',
      tokened: '[body] @0 is a horn of @1',
    },
    tooth: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'tan',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tan%C3%BEs',
      tokened: '[body] @0 is a (tooth, fang) of @1',
    },
    nail: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'nel',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/naglaz',
      tokened: '[body] @0 is a (nail, claw) of @1',
    },
    eye: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'voc',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aug%C3%B4',
      tokened: '[body.face] @0 is an eye of @1',
    },
    ear: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'vos',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aus%C3%B4',
      tokened: '[body.face] @0 is an ear of @1',
    },
    nose: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'nas',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nas%C5%8D',
      tokened: '[body.face] @0 is a nose of @1',
    },
    mouth: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'mun',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mun%C3%BEaz',
      tokened: '[body.face] @0 is a mouth of @1',
    },
    lip: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'lif',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lep%C3%B4',
      tokened: '[body.face] @0 is a lip of @1',
    },
    tongue: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'tug',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tung%C7%AD',
      tokened: '[body.face] @0 is a tongue of @1',
    },

    viscera: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'darm',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEarmaz',
      tokened: '[body] @0 is a (viscera, inner organ) of @1',
    },
    lung: {
      d: '2024-09-02',
      c: Klass.Verb,
      token: 'lug',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lung%C3%B4',
      tokened: '[body.viscera] @0 is a lung of @1',
    },
    heart: {
      d: '2024-09-02',
      c: Klass.Verb,
      token: 'xerd',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hert%C3%B4',
      tokened: '[body.viscera] @0 is a heart of @1',
    },
    maw: {
      d: '2024-09-02',
      c: Klass.Verb,
      token: 'mac',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mag%C3%B4',
      tokened: '[body.viscera] @0 is a (maw, stomach) of @1',
    },
    liver: {
      d: '2024-09-02',
      c: Klass.Verb,
      token: 'livr',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libr%C5%8D',
      tokened: '[body.viscera] @0 is a liver of @1',
    },

    womb: {
      d: '2024-09-22',
      c: Klass.Verb,
      token: 'vam',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wamb%C5%8D',
      tokened: '[body.genitalia] @0 is a (prostate, womb) of @1',
    },
    vagina: {
      d: '2024-09-22',
      c: Klass.Verb,
      token: 'fod',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fu%C3%BEiz',
      tokened: '[body.genitalia] @0 is a vagina of @1',
    },
    penis: {
      d: '2024-09-22',
      c: Klass.Verb,
      token: 'pint',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/pinti',
      tokened: '[body.genitalia] @0 is a (penis, clitoris) of @1',
    },

    egg: {
      d: '2024-09-16',
      c: Klass.Verb,
      token: 'aj',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ajj%C4%85',
      tokened: '[body.egg] @0 is an egg of @1',
    },

    blood: {
      d: '2024-07-29',
      c: Klass.Verb,
      token: 'blod',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8D%C3%BE%C4%85',
      tokened: '[body.liquid] @0 is blood of @1',
    },
    milk: {
      d: '2024-08-31',
      c: Klass.Verb,
      token: 'melk',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meluks',
      tokened: '[body.liquid] @0 is milk of @1',
    },
    lymph: {
      d: '2024-08-31',
      c: Klass.Verb,
      token: 'nenf',
      o: 'https://en.wiktionary.org/wiki/%CE%BD%CF%8D%CE%BC%CF%86%CE%B7#Ancient_Greek',
      tokened: '[body.liquid] @0 is lymph of @1',
    },

    flower: {
      d: '2024-09-02',
      c: Klass.Verb,
      token: 'blov',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8Dan%C4%85',
      tokened: '[body.plant] @0 is a (flower, bloom, blossom) of @1',
    },
    leaf: {
      d: '2024-09-02',
      c: Klass.Verb,
      token: 'lov',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/laub%C4%85',
      tokened: '[body.plant] @0 is a leaf of @1',
    },
    root: {
      d: '2024-09-02',
      c: Klass.Verb,
      token: 'rot',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C5%8Dts',
      tokened: '[body.plant] @0 is a root of @1',
    },

    // civilization
    person: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[civilisation] @0 is (a person, an individual, a citizen)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/liudiz',
      origins: {
        pie: 'h₁léwdʰis',
        gmc: 'liudiz',
        eng: 'lede',
        deu: 'Leute',
        ice: 'lýður',
      },
      token: 'ljud',
    },
    nation: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '[civilisation] @0 is a country',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mark%C5%8D',
      origins: {
        pie: 'morǵ-',
        gmc: 'markō',
        eng: 'mark',
        deu: 'Mark',
        ice: 'mörk',
      },
      token: 'marx',
    },
    rule: {
      d: '2024-07-28',
      c: Klass.Verb,
      token: 'rej',
      o: 'https://en.wiktionary.org/wiki/rego#Latin',
      tokened: '[civilisation] @0 (ruleth, ordereth, dictateth) @1',
    },

    noble: {
      d: '2024-10-01',
      c: Klass.Verb,
      token: 'rik',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABkijaz',
      tokened: '@0 is noble',
    },
    humble: {
      d: '2024-10-01',
      c: Klass.Verb,
      token: 'mjuk',
      o: 'https://en.wiktionary.org/wiki/mj%C3%BAkr#Old_Norse',
      tokened: '@0 is humble',
      complex: ['low', 'noble'],
    },

    work: {
      d: '2024-02-13',
      c: Klass.Verb,
      token: 'verx',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werk%C4%85',
      tokened: '@0 worketh @{1:operation}',
    },
    dwell: {
      d: '2024-12-20',
      c: Klass.Verb,
      token: 'buv',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C5%ABan%C4%85',
      tokened: '@0 dwelleth in @{1:house}',
    },
    use: {
      d: '2024-06-14',
      c: Klass.Verb,
      token: 'nut',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nut%C5%8D',
      tokened: '@0 useth @{1:tool} for @{2:purpose}',
    },
    help: {
      d: '2024-06-18',
      c: Klass.Verb,
      token: 'xelf',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/helpan%C4%85',
      tokened: '@0 helpeth @{1:event}',
    },
    harm: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'skad',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ska%C3%BE%C3%B4',
      tokened: '@0 (harmeth, hurteth, damageth) @1',
    },

    wont: {
      d: '2024-09-01',
      c: Klass.Verb,
      token: 'von',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wun%C4%81n%C4%85',
      tokened: '@0 is used to @{1:custom, habit, routine, usual, regular}',
    },
    lead: {
      d: '2024-09-01',
      c: Klass.Verb,
      token: 'drac',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dragan%C4%85',
      tokened: '@0 (leadeth, guideth) @{1:follower}',
    },

    stab: {
      d: '2024-11-24',
      c: Klass.Verb,
      token: 'stik',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stikan%C4%85',
      tokened: '@{0:sharp} stabeth',
    },
    cut: {
      d: '2024-11-21',
      c: Klass.Verb,
      token: 'sned',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sn%C4%AB%C3%BEan%C4%85',
      tokened: '@{0:sharp} cuteth @1',
    },

    // human action
    pick: {
      d: '2024-09-09',
      c: Klass.Verb,
      token: 'jak',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/jakk%C5%8Dn%C4%85',
      tokened: '@0 (picketh, hunteth, gathereth, collects) @{1:harvest, prey}',
    },

    // human-human action
    lick: {
      d: '2024-08-19',
      c: Klass.Verb,
      token: 'lix',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/likk%C5%8Dn%C4%85',
      tokened: '[body-interaction] @0 licketh @1',
      complex: ['tongue', 'touch'],
    },

    kiss: {
      d: '2024-11-23',
      c: Klass.Verb,
      token: 'kus',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kussaz',
      tokened: '[body-interaction] @0 kisseth @1',
      complex: ['lip', 'touch'],
    },
    caress: {
      d: '2024-11-23',
      c: Klass.Verb,
      token: 'stjuk',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/streukan%C4%85',
      tokened: '[body-interaction] @0 carreseth @1',
    },
    hug: {
      d: '2024-11-23',
      c: Klass.Verb,
      token: 'fadm',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fa%C3%BEmaz',
      tokened: '[body-interaction] @0 hugeth @1',
    },
    hit: {
      d: '2024-11-23',
      c: Klass.Verb,
      token: 'kit',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hittijan%C4%85',
      tokened: '[body-interaction] @0 (hiteth, kicketh, puncheth) @1',
    },
    kick: {
      d: '2024-11-23',
      c: Klass.Verb,
      token: 'spurn',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spurnan%C4%85',
      tokened: '[body-interaction] @0 kicketh @1',
      complex: ['foot', 'hit'],
    },
    punch: {
      d: '2024-11-23',
      c: Klass.Verb,
      token: 'slak',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slahan%C4%85',
      tokened: '[body-interaction] @0 puncheth @1',
      complex: ['hand', 'hit'],
    },

    rope: {
      d: '2025-02-08',
      c: Klass.Verb,
      tokened: '[artifact] @0 is a {rope, cord, string}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/taug%C5%8D',
      token: 'toc',
    },
    knife: {
      d: '2024-07-28',
      c: Klass.Verb,
      tokened: '[artifact] @{0:sword, knife, blade} cuteth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sahs%C4%85',
      token: 'saks',
      complex: ['cut', 'done', 'use'],
    },
    scissor: {
      d: '2024-07-28',
      c: Klass.Verb,
      tokened: '[artifact] @0 is a pair of scissors',
      complex: ['two', 'knife'],
    },
    spear: {
      d: '2024-07-28',
      c: Klass.Verb,
      token: 'sper',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/speru',
      tokened: '[artifact] @{0:spear, pin} stingeth @1',
    },
    rod: {
      d: '2024-07-28',
      c: Klass.Verb,
      token: 'rud',
      o: 'https://en.wiktionary.org/wiki/rod',
      tokened: '[artifact] @{0:rod, stuff, wand, club} supporteth @1',
    },
    dish: {
      d: '2024-12-23',
      c: Klass.Verb,
      token: 'knaf',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnappaz',
      tokened: '[artifact] @{0:dish, bowl, cup, container} containeth @1',
    },
    fork: {
      d: '2024-12-23',
      c: Klass.Verb,
      token: 'cavl',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Celtic/gabl%C4%81',
      tokened: '[artifact] @{0:fork} stingeth @1',
    },
    spoon: {
      d: '2024-12-23',
      c: Klass.Verb,
      token: 'spen',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sp%C4%93nuz',
      tokened: '[artifact] @{0:spoon, scoop} scoopeth @1',
    },
    tong: {
      d: '2024-12-23',
      c: Klass.Verb,
      token: 'tag',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tang%C5%8D',
      tokened: '[artifact] @{0:tong, plier, chopstick} grabeth @1',
    },
    money: {
      d: '2024-08-25',
      c: Klass.Verb,
      token: 'fex',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fehu',
      tokened: '[artifact] @0 is (money, coin, bill)',
    },
    ship: {
      d: '2024-10-05',
      c: Klass.Verb,
      token: 'bet',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/baitaz',
      tokened: '[artifact] @0 is a (ship, boat)',
    },
    bridge: {
      d: '2025-02-08',
      c: Klass.Verb,
      token: 'bruc',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brugj%C7%AD',
      tokened: '@0 {is a bridge between, connects} of @{1}',
    },

    // misc
    knot: {
      d: '2024-12-23',
      c: Klass.Verb,
      token: 'knut',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/knutt%C3%B4',
      tokened: '@0 is a (knot, tangle, tie, bond) of @{1}',
    },
    age: {
      d: '2024-12-07',
      c: Klass.Verb,
      token: 'al',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/alan%C4%85',
      tokened: '@0 is at age of @{1:interval}',
    },

    sentence: {
      d: '2024-10-05',
      c: Klass.Verb,
      token: 'fras',
      o: 'https://en.wiktionary.org/wiki/%CF%86%CF%81%CE%AC%CF%83%CE%B9%CF%82#Ancient_Greek',
      tokened: '[grammar] @0 is a sentence',
    },
    clause: {
      d: '2024-10-05',
      c: Klass.Verb,
      token: 'klavs',
      o: 'https://en.wiktionary.org/wiki/clauso#Latin',
      tokened: '[grammar] @0 is a clause',
    },
    word: {
      d: '2024-10-05',
      c: Klass.Verb,
      token: 'vord',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wurd%C4%85',
      tokened: '[grammar] @0 is a word',
    },

    verb: {
      d: '2024-10-05',
      c: Klass.Verb,
      token: 'verb',
      o: 'https://en.wiktionary.org/wiki/verbo#Latin',
      tokened: '[grammar] @0 is a verb',
    },
    case: {
      d: '2024-10-05',
      c: Klass.Verb,
      token: 'kas',
      o: 'https://en.wiktionary.org/wiki/casu#Latin',
      tokened: '[grammar] @0 is an case of @1',
    },
    nominative: {
      d: '2024-12-23',
      c: Klass.Verb,
      tokened: '[grammar] @0 is nominative',
      complex: ['verb', 'head'],
    },
    oblique: {
      d: '2024-12-23',
      c: Klass.Verb,
      tokened: '[grammar] @0 is oblique',
      complex: ['verb', 'arm'],
    },
    accusative: {
      d: '2024-12-23',
      c: Klass.Verb,
      tokened: '[grammar] @0 is accusative',
      complex: ['verb', 'zero', '_ord', 'arm'],
    },
    dative: {
      d: '2024-12-23',
      c: Klass.Verb,
      tokened: '[grammar] @0 is dative',
      complex: ['verb', 'one', '_ord', 'arm'],
    },

    continent_eurasia: {
      d: '2025-02-28',
      c: Klass.Verb,
      tokened: '@0 is the continent eurasia',
      token: 'jevras',
    },
    continent_africa: {
      d: '2025-02-28',
      c: Klass.Verb,
      tokened: '@0 is the continent africa',
      etymology: 'https://en.wiktionary.org/wiki/africus#Latin',
      token: 'afrik',
    },
    continent_north_america: {
      d: '2025-02-28',
      c: Klass.Verb,
      tokened: '@0 is the continent north america',
      etymology: 'https://en.wiktionary.org/wiki/australis#Latin',
      complex: ['$amrik', 'north'],
    },
    continent_australia: {
      d: '2025-02-28',
      c: Klass.Verb,
      tokened: '@0 is the continent australia',
      etymology: 'https://en.wiktionary.org/wiki/australis#Latin',
      token: 'avstral',
    },
    continent_south_america: {
      d: '2025-02-28',
      c: Klass.Verb,
      tokened: '@0 is the continent south america',
      etymology: 'https://en.wiktionary.org/wiki/australis#Latin',
      complex: ['$amrik', 'done', 'north'],
    },

    // country
    ...Object.fromEntries(
      [
        [
          'us',
          'the united states',
          '2024-08-25',
          //'amrik',
          //'https://en.wiktionary.org/wiki/America#Latin',
        ],
        [
          'cn',
          'china',
          '2024-08-25',
          //'zjugcok',
          //'https://en.wiktionary.org/wiki/%E4%B8%AD%E5%9C%8B',
        ],
        [
          'de',
          'germany',
          '2024-08-25',
          //'devdisk',
          //'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEiudisk',
        ],
        [
          'jp',
          'japan',
          '2024-08-25',
          //'nitfon',
          //'https://en.wiktionary.org/wiki/%E6%97%A5%E6%9C%AC',
        ],
        [
          'in',
          'india',
          '2024-11-22',
          //'varat',
          //'https://en.wiktionary.org/wiki/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4#Sanskrit',
        ],
        [
          'gb',
          'the united kingdom',
          '2024-08-25',
          //'britan',
          //'https://en.wiktionary.org/wiki/Britannia#Latin',
        ],
        [
          'fr',
          'france',
          '2024-08-25',
          //'fragk',
          //'https://en.wiktionary.org/wiki/Francia#Latin',
        ],
        [
          'it',
          'italy',
          '2024-11-22',
          //'ital',
          //'https://en.wiktionary.org/wiki/Italia#Latin',
        ],
        [
          'ca',
          'canada',
          '2024-11-22',
          //'kanat',
          //'https://en.wiktionary.org/wiki/kanata#Laurentian',
        ],
        [
          'br',
          'brazil',
          '2024-11-22',
          //'brasil',
          //'https://en.wiktionary.org/wiki/Brasil#Portuguese',
        ],
        [
          'ru',
          'russia',
          '2025-02-08',
          //'rusi',
          //'https://en.wiktionary.org/wiki/%D0%A0%D1%83%D1%81%D1%8C#Old_East_Slavic',
        ],
        ['tw', 'taiwan', '2025-02-28'],
      ].map(([iso, name, date]) => [
        `nation_${iso.toLowerCase()}`,
        {
          date,
          c: Klass.Verb,
          tokened: `[country] @0 is ${name} (${iso})`,
          o: 'ISO 3166-1 alpha-2',
          //idiom: ['nation', 'called', '$' + fromAcronym(iso)],
          complex: ['nation', '$' + fromAcronym(iso)],
        },
      ])
    ),

    // language
    ...Object.fromEntries(
      [
        ['eng', '2024-08-31', 'english'],
        ['cmn', '2024-08-31', 'mandarin'],
        ['hin', '2024-08-31', 'hindustani (hindi, urdu) '],
        ['spa', '2024-08-31', 'spanish'],
        ['ara', '2024-08-31', 'arabic'],
        ['fra', '2024-08-31', 'french'],
        ['rus', '2024-08-31', 'russian'],
        ['deu', '2024-08-31', 'german'],
        ['jpn', '2024-08-31', 'japanese'],
      ].map(([iso, date, adjective]) => [
        `language_${iso}`,
        {
          date,
          c: Klass.Verb,
          complex: ['done', 'speak', '$' + fromAcronym(iso)],
          tokened: `[language] @0 is ${adjective} language (${iso})`,
        },
      ])
    ),
  }).flatMap(([k, v]) => {
    const r = [];

    const { token, o: origin, complex, idiom, ...vRest } = v;

    if (token)
      r.push([k, { ...vRest, formation: Formation.Simplex, origin, token }]);
    if (complex)
      r.push([
        k + '*',
        {
          ...vRest,
          ...(token ? { tokened: `=${k}` } : {}),
          formation: Formation.Complex,
          o: complex.join('+'),
          complex,
        },
      ]);
    if (idiom)
      r.push([
        k + '#',
        {
          ...vRest,
          ...(token ? { tokened: `=${token}` } : {}),
          formation: Formation.Idiom,
          o: idiom.join('␣'),
          idiom,
        },
      ]);

    return r;
  })
);

const toBetokeners = (ks: string[]) =>
  ks.map((k) =>
    k.startsWith('$')
      ? k.substring(1)
      : dicPre.get(k)?.token ??
        dicPre.get(k + '*')?.token ??
        dicPre.get(k + '#')?.token
  );

// generate
for (let i = 0; i < dicPre.size + 1; i++)
  for (const [k, v] of dicPre.entries())
    if ('complex' in v) {
      if (v.complex.some((it) => !dicPre.has(k))) dicPre.delete(k);

      const tokens = toBetokeners(v.complex);

      if (tokens.every((it) => typeof it === 'string')) {
        delete v.complex;
        dicPre.set(k, {
          ...v,
          token: tokens.join(''),
        });
      }
    } else if ('idiom' in v) {
      if (v.idiom.some((it) => !dicPre.has(k))) dicPre.delete(k);

      const tokens = toBetokeners(v.idiom);

      if (tokens.every((it) => typeof it === 'string')) {
        delete v.idiom;
        dicPre.set(k, {
          ...v,
          token: tokens.join(' '),
        });
      }
    }

// delete failed
for (const k of dicPre.keys())
  if (!dicPre.get(k).token) {
    dicPre.delete(k);
    console.warn(`.${k} deleted`);
  }

interface Value {
  d: string;
  c: string;
  tokened: string;
  formation: Formation;
  o: string;
  token: string;
}

const dic = dicPre as Map<string, Value>;

// check homograph
const keys = [...dic.keys()];
for (let i = 0; i < dic.size; i++)
  for (let j = i + 1; j < dic.size; j++) {
    const k0: string = keys[i];
    const k1: string = keys[j];

    if (dic.get(k0)?.token === dic.get(k1)?.token)
      console.error(`homograph: [${k0}, ${k1}] = ${dic.get(k0)?.token}`);
  }

for (const [k, { token, formation }] of dic.entries()) {
  if (formation === Formation.Simplex)
    if (7 <= token.length)
      console.error(`invalid: long simplex: .${k} = ${token}`);

  if (formation !== Formation.Idiom) {
    const invalidity = invalid(token);
    if (invalidity) console.error(`invalid: ${invalidity}: .${k} = ${token}`);
  }
}

export const translate = (code: string) =>
  code.replace(
    /[a-z_]+\{?|[\[\]\}\*\#]|\,/g,
    (k) =>
      dic.get(k)?.token ??
      dic.get(k + '*')?.token ??
      dic.get(k + '#')?.token ??
      k
  );

export default dic;
