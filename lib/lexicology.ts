import { replaceEach } from './common';
import { invalid } from './phonology';

export const name = 'kxala';

const fromAcronym = (acronym: string) =>
  replaceEach(acronym, [
    [/K/g, 'ka'],
    [/C/g, 'ca'],
    [/G/g, 'ga'],
    [/H/g, 'xa'],

    [/X/g, 'xe'],
    [/J/g, 'je'],

    [/T/g, 'ta'],
    [/D/g, 'da'],
    [/S/g, 'sa'],
    [/Z/g, 'za'],
    [/N/g, 'na'],
    [/L/g, 'la'],
    [/R/g, 'ra'],

    [/P/g, 'pa'],
    [/B/g, 'ba'],
    [/F/g, 'fa'],
    [/V/g, 'va'],
    [/M/g, 'ma'],

    [/Q/g, 'ku'],
    [/Y/g, 'ju'],
    [/W/g, 'vi'],

    [/I/g, 'hi'],
    [/E/g, 'he'],
    [/U/g, 'hu'],
    [/O/g, 'ho'],
    [/A/g, 'ha'],
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
  date: string;
  klass: Klass;
  betokened: string;
  formation: Formation;
  origin: string;
  origins?: {
    pie?: string;
    gmc?: string;
    eng?: string;
    deu?: string;
    ice?: string;
    lat?: string;
  };
  betokener?: string;
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

const dicPre = new Map<string, ValuePre>(
  Object.entries({
    then: {
      date: '2025-02-06',
      klass: Klass.Other,
      betokened: 'separateth predicates',
      origin: 'a priori',
      betokener: 'zu',
    },

    der: {
      zh: '將',
      date: '2024-02-13',
      klass: Klass.Case,
      betokened: 'nominative',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fan%C4%93',
      betokener: 'fa',
    },
    den: {
      zh: '將',
      date: '2024-02-13',
      klass: Klass.Case,
      betokened: 'accusative',
      origin: 'https://en.wiktionary.org/wiki/%D8%B1%D8%A7#Persian',
      betokener: 'ra',
    },
    to: {
      date: '2024-02-13',
      klass: Klass.Case,
      betokened: 'dative',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C5%8D',
      betokener: 'ta',
    },
    along: {
      date: '2024-12-24',
      klass: Klass.Case,
      betokened: 'unspecified case',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bi',
      betokener: 'bi',
    },
    ish: {
      date: '2024-02-13',
      klass: Klass.Case,
      betokened: 'adverb',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-līkaz',
      betokener: 'iska',
    },

    done: {
      zh: '被',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened:
        '[voice] passive. foregoeth a case marker (default: accusative).',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-',
      betokener: 'ce',
    },

    begin: {
      zh: '始',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[aspect] inchoative. begineth to',
      origin: 'https://en.wiktionary.org/wiki/за-#Russian',
      betokener: 'za',
    },
    end: {
      zh: '終',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[aspect] completive. endeth to',
      origin: 'https://en.wiktionary.org/wiki/по-#Russian',
      betokener: 'po',
    },
    repeat: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[aspect] frequentative',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-lōną',
      betokener: 'lon',
    },

    did: {
      zh: '了',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[tense] past',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ded%C7%AD',
      betokener: 'do',
    },
    do: {
      zh: '今',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[tense] present',
      betokener: 'nu',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nu',
    },
    shall: {
      zh: '今',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[tense] future',
      betokener: 'xu',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85',
    },

    would: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[mood] irrealis, optative, imperative',
      betokener: 'so',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swa',
    },

    may: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokener: 'me',
      betokened: '[mood] may, possibly',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/maganą',
    },
    must: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[mood] must, necessarily',
      betokener: 'ku',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulaną',
    },

    SO: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[restrictiveness] which is, so (non-restrictive)',
      betokener: 'du',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/þus',
    },

    essentially: {
      date: '2024-10-19',
      klass: Klass.Preverb,
      betokened: '[essentiality] in essence, in a nominal sense',
      betokener: 'se',
      origin: 'https://en.wiktionary.org/wiki/esse#Latin',
    },

    not: {
      zh: '不',
      date: '2024-02-13',
      klass: Klass.Joiner,
      betokened: '[logic] not, negation',
      betokener: 'na',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne',
    },
    and: {
      zh: '而',
      date: '2024-02-13',
      klass: Klass.Joiner,
      betokened: '[logic] and, both, conjunction',
      betokener: 'be',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bai',
    },
    or: {
      zh: '或',
      date: '2024-02-13',
      klass: Klass.Joiner,
      betokened: '[logic] or, at least one, disjunction',
      betokener: 'bo',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bai',
    },
    iff: {
      zh: '則',
      date: '2024-02-13',
      klass: Klass.Joiner,
      betokened: '[logic] if and only iff, equivalence',
      betokener: 'a',
      origin: 'a priori',
    },
    xor: {
      date: '2025-01-02',
      klass: Klass.Joiner,
      betokened: '[logic] either',
      idiom: ['not', 'iff'],
    },

    'which{': {
      date: '2024-02-13',
      klass: Klass.Clause,
      betokened: 'openeth relative clause. @0 is that which @{sentence}',
      betokener: 've',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwat',
    },
    'that{': {
      date: '2024-02-13',
      klass: Klass.Clause,
      betokened:
        'openeth statement clause. @0 is the (event, statement) that @{sentence}',
      betokener: 'de',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEat',
    },
    'whether{': {
      date: '2024-07-28',
      klass: Klass.Clause,
      betokened: 'openeth truthfulness clause. @0 is whether @{sentence}',
      betokener: 'je',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ja',
    },
    'how_much{': {
      date: '2024-10-20',
      klass: Klass.Clause,
      betokened: 'openeth extent clause. @0 is the extent how much @{sentence}',
      betokener: 'ke',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haiduz',
    },
    '}': {
      date: '2024-02-13',
      klass: Klass.Other,
      betokened: 'closeth clause',
      betokener: 'la',
      origin: 'https://en.wiktionary.org/wiki/啦#Chinese',
    },

    called: {
      date: '2024-02-13',
      klass: Klass.Other,
      betokened: '@0 is called @{name}',
      betokener: 'no',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/namô',
    },

    zero: {
      zh: '零',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 0',
      betokener: 'ze',
      origin: 'https://en.wiktionary.org/wiki/%D8%B5%D9%81%D8%B1#Arabic',
    },
    one: {
      zh: '一',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 1',
      betokener: 'ka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/Háykas',
    },
    two: {
      zh: '二',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 2',
      betokener: 'tav',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twai',
    },
    three: {
      zh: '三',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 3',
      betokener: 'der',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%ABz',
    },
    four: {
      zh: '四',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 4',
      betokener: 'fed',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fedw%C5%8Dr',
    },
    five: {
      zh: '五',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 5',
      betokener: 'pan',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/p%C3%A1n%C4%8Da',
    },
    six: {
      zh: '六',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 6',
      betokener: 'xax',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/%C5%A1w%C3%A1%C4%87%C5%A1',
    },
    seven: {
      zh: '七',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 7',
      betokener: 'seb',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sebun',
    },
    eight: {
      zh: '八',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 8',
      betokener: 'vot',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aht%C5%8Du',
    },
    nine: {
      zh: '九',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 9',
      betokener: 'nin',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/newun',
    },

    infinite: {
      date: '2024-09-06',
      klass: Klass.Numeral,
      betokened: 'infinite, ∞',
      betokener: 'sin',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sin-',
    },
    kilo: {
      zh: '千',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[separator] 1000, `,`',
      betokener: 'dus',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BE%C5%ABsund%C4%AB',
    },
    deci: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[separator] decimal separator, `.`',
      betokener: 'pu',
      origin: 'https://en.wiktionary.org/wiki/pungo#Latin',
    },

    how_many: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[interogative] how many',
      betokener: 'vo',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C5%8D',
    },

    each: {
      zh: '全',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: 'each, every, all',
      betokener: 'pa',
      origin:
        'https://en.wiktionary.org/wiki/%CF%80%E1%BE%B6%CF%82#Ancient_Greek',
    },

    at_most: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[comparative] at most. ≤',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%ABtilaz',
      betokener: 'lu',
    },
    less_than: {
      date: '2024-08-31',
      klass: Klass.Numeral,
      betokened: '[comparative] less than. <',
      betokener: 'mi',
      origin: 'https://en.wiktionary.org/wiki/l%C3%A6s#Etymology_2_2',
    },

    plural: {
      date: '2024-09-17',
      klass: Klass.Numeral,
      betokened: 'plural, at least two',
      idiom: ['two', 'at_most'],
    },

    _add: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[binary] addition, +',
      betokener: 'pul',
      origin: 'https://en.wiktionary.org/wiki/plus#Latin',
    },
    _sub: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[binary] subtraction, -',
      betokener: 'min',
      origin: 'https://en.wiktionary.org/wiki/minor#Latin',
    },
    _mul: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[binary] multiplication, *',
      betokener: 'mul',
      origin: 'https://en.wiktionary.org/wiki/multiplicare#Latin',
    },
    _div: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[binary] division, \u002F',
      betokener: 'div',
      origin: 'https://en.wiktionary.org/wiki/dividere#Latin',
    },
    _mod: {
      date: '2024-08-24',
      klass: Klass.Numeral,
      betokened: '[binary] modulo, %',
      betokener: 'mod',
      origin: 'https://en.wiktionary.org/wiki/modulo#Latin',
    },
    _exp: {
      date: '2024-08-24',
      klass: Klass.Numeral,
      betokened: '[binary] exponential, ^',
      betokener: 'pot',
      origin: 'https://en.wiktionary.org/wiki/potere#Latin',
    },
    _log: {
      date: '2024-08-24',
      klass: Klass.Numeral,
      betokened: '[binary] logarithm',
      betokener: 'loc',
      origin: 'https://en.wiktionary.org/wiki/logarithmo#Latin',
    },

    _ord: {
      date: '2024-08-02',
      klass: Klass.Other,
      betokened: '@0 is @{number}-th',
      betokener: 'te',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-i%C3%BE%C5%8D',
    },
    _card: {
      date: '2024-08-02',
      klass: Klass.Other,
      betokened: '@0 contains @{number} elements',
      betokener: 'ko',
      origin: 'https://en.wiktionary.org/wiki/%E5%80%8B',
    },

    first: {
      date: '2024-09-14',
      klass: Klass.Verb,
      betokened: '@0 is (0th, first, primary)',
      idiom: ['_ord', 'zero'],
    },
    second: {
      date: '2024-09-14',
      klass: Klass.Verb,
      betokened: '@0 is (1st, second, other)',
      idiom: ['_ord', 'one'],
    },
    last: {
      date: '2024-09-14',
      klass: Klass.Verb,
      betokened: '@0 is (last, final)',
      idiom: ['_ord', 'each'],
    },

    i: {
      zh: '我',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is me',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mek',
      betokener: 'ma',
    },
    thou: {
      zh: '汝',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is thee',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEek',
      betokener: 'da',
    },
    HE: {
      zh: '彼',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is (him, it, this, that, the definite entity)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiz',
      betokener: 'xa',
    },
    self: {
      zh: '己',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is oneself',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sek',
      betokener: 'sa',
    },
    who: {
      zh: '誰',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[interogative] @0 is who',
      betokener: 'va',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwaz',
    },

    this: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokened: '@0 is this',
      idiom: ['HE', 'near'],
    },
    yon: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokened: '@0 is that',
      idiom: ['HE', 'far'],
    },

    normal: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened:
        '[extent.subjective] @0 is of (normal, default, usual, ordinary) extent, at subjective norm',
      betokener: 'ru',
      origin: 'a priori',
    },
    high: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened:
        '[extent.subjective] @0 is of (high, great) extent, above subjective norm',
      betokener: 'fe',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/felu',
    },
    low: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened:
        '[extent.subjective] @0 is of (low, small) extent, below subjective norm',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93gaz',
      betokener: 'lo',
    },
    positive: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened: '[extent.polarity] @0 is (positive, above objective norm)',
      betokener: 'vela',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wela',
    },
    negative: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened: '[extent.polarity] @0 is (negative, below objective norm)',
      betokener: 'misa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/missa-',
    },
    up: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened:
        '[extent.dynamic] @0 is (riseth, goeth up, ascends) along with @1',
      betokener: 'risa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABsan%C4%85',
    },
    down: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened:
        '[extent.dynamic] @0 is (falleth, goeth down, descends) along with @1',
      betokener: 'fala',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fallan%C4%85',
    },
    most: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[extent.extreme] @0 is (maximal, possibly highest)',
      betokener: 'mixa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mikilaz',
    },
    least: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[extent.extreme] @0 is (minimal, possibly lowest)',
      betokener: 'luta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%ABtilaz',
    },

    [name]: {
      date: '2024-02-17',
      klass: Klass.Verb,
      betokened: `@0 is the language ${name}`,
      betokener: name,
      origin: 'a priori',
    },

    // basic
    deny: {
      zh: '否',
      date: '2024-08-30',
      klass: Klass.Verb,
      betokened: '@0 (contradicteth, negateth, denieth) @1',
      betokener: 'ne',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne',
    },
    let: {
      zh: '令',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 (causeth, leteth) @{1:result, effect}',
      betokener: 'le',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93tan%C4%85',
    },
    back: {
      zh: '回',
      date: '2024-06-14',
      klass: Klass.Verb,
      betokened: '@0 is temporally (inverse, opposite) of @1',
      betokener: 're',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/wre-',
    },
    counter: {
      zh: '非',
      date: '2024-06-14',
      klass: Klass.Verb,
      betokened: '@0 (complementeth, is dual of) @1',
      betokener: 'ja',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-',
    },
    relate: {
      date: '2024-09-14',
      klass: Klass.Verb,
      betokened: '@0 is (related to @1, @1-ish), ',
      betokener: 'li',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-l%C4%ABkaz',
    },
    exist: {
      zh: '在',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 (existeth, is a thing, is an object)',
      betokener: 'vesa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wesan%C4%85',
    },
    happen: {
      zh: '發',
      date: '2024-08-23',
      klass: Klass.Verb,
      betokened: '@0 (happeneth, occureth, realiseth, is actual, is an event)',
      betokener: 'skeka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skehan%C4%85',
    },

    make: {
      zh: '作',
      date: '2024-08-02',
      klass: Klass.Verb,
      betokened:
        '@0 (maketh, buildeth, createth) @1 from @{2:material, component}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skapajan%C4%85',
      origins: {
        gmc: 'skapajaną',
        ice: 'skapaa',
        eng: 'shape',
        deu: 'schaffen',
      },
      betokener: 'skapa',
    },
    break: {
      zh: '壞',
      date: '2024-06-14',
      klass: Klass.Verb,
      betokened: '@0 (breaketh, destructeth) @1 into @{2:pieces, components}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brekan%C4%85',
      origins: {
        gmc: 'brekaną',
        eng: 'break',
        deu: 'brechen',
      },
      betokener: 'breka',
      complex: ['back', 'make'],
    },

    have: {
      zh: '有',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '@0 (hath, owneth) @{1:property}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/habjan%C4%85',
      origins: {
        pie: 'keh₂p-',
        gmc: 'habjaną',
        ice: 'hafa',
        eng: 'have',
        deu: 'haben',
      },
      betokener: 'kaba',
    },
    give: {
      zh: '與',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 giveth @1 to @{2:receiver}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/geban%C4%85',
      origins: {
        pie: 'gʰebʰ-',
        gmc: 'gebaną',
        ice: 'gefa',
        eng: 'give',
        deu: 'geben',
      },
      betokener: 'ceba',
    },
    take: {
      zh: '取',
      date: '2024-08-24',
      klass: Klass.Verb,
      betokened: '@0 takes @1 from @2',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neman%C4%85',
      origins: {
        pie: 'ném-e',
        gmc: 'nemaną',
        ice: 'nema',
        eng: 'nim',
        deu: 'nehmen',
      },
      betokener: 'nema',
      complex: ['back', 'give'],
    },

    come: {
      zh: '來',
      date: '2024-08-26',
      klass: Klass.Verb,
      betokened: '@0 (is, cometh) (from, since) @{1:source, origin, start}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fan%C4%93',
      origins: {
        pie: 'pro-',
        gmc: 'fram',
        ice: 'frá',
        eng: 'from',
      },
      betokener: 'fana',
    },
    go: {
      zh: '往',
      date: '2024-08-26',
      klass: Klass.Verb,
      betokened: '@0 (is, goeth) (to, until) @{1:sink, destination, goal}',
      betokener: 'tila',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/til%C4%85',
    },
    pass: {
      zh: '過',
      date: '2024-08-26',
      klass: Klass.Verb,
      betokened: '@0 (is, passeth) (through, via) @{1:process, route, medium}',
      betokener: 'durka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEurhw',
    },
    at: {
      zh: '於',
      date: '2024-08-26',
      klass: Klass.Verb,
      betokened: '@0 is at @{1:position, location, place}',
      betokener: 'ata',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/at',
    },
    in: {
      zh: '中',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '@0 is in @{1:range, area}',
      betokener: 'ina',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/in',
    },

    element: {
      zh: '元',
      date: '2024-08-06',
      klass: Klass.Verb,
      betokened: '@0 is in @{1:collection, set, group, list}',
      betokener: 'cada',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gad',
    },
    part: {
      zh: '部',
      date: '2024-08-06',
      klass: Klass.Verb,
      betokened: '@0 is a (part, component) of @{1:whole}',
      betokener: 'dela',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dailiz',
    },
    complex: {
      zh: '複',
      date: '2024-08-25',
      klass: Klass.Verb,
      betokened: '@0 (is complex, consisteth of many parts)',
      complex: ['high', 'done', 'part'],
    },
    simple: {
      zh: '單',
      date: '2024-08-25',
      klass: Klass.Verb,
      betokened: '@0 (is simple, consisteth of few parts)',
      complex: ['low', 'done', 'part'],
    },
    atom: {
      zh: '素',
      date: '2024-08-25',
      klass: Klass.Verb,
      betokened: '@0 is an atom',
      complex: ['one', 'done', 'part'],
    },

    contain: {
      zh: '含',
      date: '2024-08-02',
      klass: Klass.Verb,
      betokened: '@0 is containeth @1',
      betokener: 'kalta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haldan%C4%85',
    },
    full: {
      zh: '滿',
      date: '2024-08-02',
      klass: Klass.Verb,
      betokened: '@0 is full of @1',
      betokener: 'fola',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fullaz',
      complex: ['most', 'contain'],
    },
    empty: {
      zh: '虛',
      date: '2024-08-02',
      klass: Klass.Verb,
      betokened: '@0 is empty of @1',
      betokener: 'toma',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C5%8Dmaz',
      complex: ['least', 'contain'],
    },

    move: {
      zh: '動',
      date: '2024-08-31',
      klass: Klass.Verb,
      betokened: '@0 (moveth, is dynamic)',
      betokener: 'veja',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wegan%C4%85',
    },
    stop: {
      zh: '止',
      date: '2024-08-31',
      klass: Klass.Verb,
      betokened: '@0 (stopeth, halteth, is static)',
      betokener: 'stopa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/stopp%C5%8Dn',
      complex: ['least', 'move'],
    },

    point: {
      zh: '點',
      date: '2024-10-01',
      klass: Klass.Verb,
      betokened: '@0 is a (point, position, dot)',
      betokener: 'bruda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bruzdaz',
    },
    interval: {
      zh: '間',
      date: '2024-10-01',
      klass: Klass.Verb,
      betokened: '@0 is (an interval, an area, a volume, a domain)',
      betokener: 'kopa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haupaz',
    },

    world: {
      zh: '界',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is a (world, universe)',
      betokener: 'xema',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haimaz',
    },
    space: {
      zh: '空',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is the 3-dimensional physical spacial continuum',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABm%C4%85',
      betokener: 'ruma',
    },
    time: {
      zh: '時',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is the 1-dimensional physical temporal continuum',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABm%C3%B4',
      betokener: 'tima',
    },
    thing: {
      zh: '物',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is a (thing, matter) located in a spacetime',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEing%C4%85',
      betokener: 'diga',
    },
    mass: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokened: '@0 is mass of @1',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/balk%C3%B4',
      betokener: 'balxa',
    },

    energy: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokened: '@0 is energy of @1',
      betokener: 'xuna',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kunnan%C4%85',
    },
    heat: {
      date: '2024-09-06',
      klass: Klass.Verb,
      betokened: '@0 is heat in @1',
      complex: ['hot', 'energy'],
    },
    electric: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokened: '@0 hath electric charge in @1',
      betokener: 'spaka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sparkaz',
    },
    force: {
      date: '2024-10-01',
      klass: Klass.Verb,
      betokened: '@0 is force',
      betokener: 'valta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wald%C4%85',
    },

    wave: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '@{0:medium} waveth @{1:form}',
      betokener: 'bulja',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bulgij%C5%8D',
    },
    light: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[wave] @0 is (a light, an electromagnetic wave)',
      betokener: 'ljuta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leuht%C4%85',
    },
    sound: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '[wave] @0 is a sound from @1',
      betokener: 'kliga',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/klingan%C4%85',
    },
    turn: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '@0 (turneth, rotateth, spineth) around @{1:pivot, center}',
      betokener: 'drena',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%93an%C4%85',
    },

    fire: {
      date: '2024-12-08',
      klass: Klass.Verb,
      betokened: '@0 burneth @1',
      betokener: 'branta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brandaz',
    },

    // physical attribute
    big: {
      zh: '大',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is (big, great)',
      betokener: 'crota',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grautaz',
    },
    small: {
      zh: '小',
      date: '2024-09-26',
      klass: Klass.Verb,
      betokened: '@0 is small',
      betokener: 'smala',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smalaz',
      complex: ['low', 'big'],
    },
    long: {
      zh: '長',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is (long, big in 1 dimension and small in others)',
      betokener: 'laga',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/langaz',
    },
    short: {
      zh: '短',
      date: '2024-09-26',
      klass: Klass.Verb,
      betokened: '@0 is (short, small in 1 dimension and small in others)',
      betokener: 'skurta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skurtaz',
      complex: ['low', 'long'],
    },

    thick: {
      zh: '厚',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is thick',
      betokener: 'dika',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEekuz',
    },
    sharp: {
      zh: '鋭',
      date: '2024-07-28',
      klass: Klass.Verb,
      betokened: '@{0:angle} is sharp',
      betokener: 'skarpa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skarpaz',
    },
    heavy: {
      zh: '重',
      date: '2024-07-14',
      klass: Klass.Verb,
      betokened: '@0 is heavy',
      betokener: 'svera',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%93raz',
    },
    dense: {
      zh: '密',
      date: '2024-07-15',
      klass: Klass.Verb,
      betokened: '@0 is (dense, heavy per volume)',
      betokener: 'dinta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEinhtaz',
    },

    swift: {
      zh: '速',
      date: '2024-06-18',
      klass: Klass.Verb,
      betokened: '@0 is (swift, quick)',
      betokener: 'snela',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snellaz',
    },
    slow: {
      zh: '遅',
      date: '2024-09-06',
      klass: Klass.Verb,
      betokened: '@0 is slow',
      betokener: 'sleva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slaiwaz',
      complex: ['low', 'swift'],
    },
    rough: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokened: '@0 (is rough, is coarse, hath high friction) against @1',
      betokener: 'ruka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABhaz',
    },
    smooth: {
      zh: '滑',
      date: '2024-09-26',
      klass: Klass.Verb,
      betokened: '@0 (is smooth, is sleek, hath low friction) against @1',
      betokener: 'slika',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sl%C4%ABkan%C4%85',
      complex: ['low', 'rough'],
    },
    soft: {
      zh: '柔',
      date: '2024-09-26',
      klass: Klass.Verb,
      betokened: '@0 is soft against @1',
      betokener: 'vika',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABkwan%C4%85',
    },
    hard: {
      zh: '硬',
      date: '2024-09-26',
      klass: Klass.Verb,
      betokened: '@0 is (hard, firm) against @1',
      betokener: 'fasta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fastuz',
      complex: ['low', 'soft'],
    },
    hot: {
      zh: '熱',
      date: '2024-08-30',
      klass: Klass.Verb,
      betokened: '[temparature] @0 is (hot, warm)',
      betokener: 'varma',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/warmaz',
    },
    cold: {
      zh: '冷',
      date: '2024-08-30',
      klass: Klass.Verb,
      betokened: '[temparature] @0 (cold, cool)',
      betokener: 'kala',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kalan%C4%85',
      complex: ['low', 'hot'],
    },
    far: {
      zh: '遠',
      date: '2024-08-08',
      klass: Klass.Verb,
      betokened: '[proximity] @0 is (far, distant, remote) from @1',
      betokener: 'fera',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ferrai',
    },
    near: {
      zh: '近',
      date: '2024-08-08',
      klass: Klass.Verb,
      betokened: '[proximity] @0 is (near, close to) @1',
      betokener: 'nexa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/n%C4%93hwaz',
      complex: ['low', 'far'],
    },
    contact: {
      zh: '接',
      date: '2024-08-08',
      betokened:
        '[proximity] @0 (toucheth, is adjacent, is in contact with) @1',
      klass: Klass.Verb,
      complex: ['least', 'far'],
    },

    before: {
      zh: '前',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[position.global] @0 is before @{1:after}',
      betokener: 'fora',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai',
    },
    below: {
      zh: '下',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[position] @0 is below @{1:above, far against gravity}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ni%C3%BEan%C4%93',
      betokener: 'nida',
    },
    hind: {
      zh: '後',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[position.local] @0 is behind @{1:front}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hinder',
      betokener: 'xinta',
    },
    front: {
      zh: '前',
      date: '2025-02-07',
      klass: Klass.Verb,
      betokened: '[position.local] @0 is in front of @{1:behind}',
      idiom: ['done', 'hind'],
    },
    left: {
      zh: '左',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[position] @0 is to the left of @{1:right}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Old_High_German/link',
      betokener: 'ligka',
    },
    right: {
      zh: '右',
      date: '2025-02-07',
      klass: Klass.Verb,
      betokened: '[position] @0 is to the right of @{1:left}',
      idiom: ['done', 'left'],
    },

    west: {
      zh: '西',
      date: '2024-08-24',
      klass: Klass.Verb,
      betokened:
        '[position.global] @0 is to the west of @{1:to the east, far agaisnt rotation}',
      betokener: 'vesta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/westraz',
    },
    north: {
      zh: '北',
      date: '2024-08-24',
      klass: Klass.Verb,
      betokened: '[position.global] @0 is to the north of @{1:to the south}',
      betokener: 'nurda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nur%C3%BEraz',
    },

    solid: {
      zh: '固',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[state-of-matter] @0 is solid',
      betokener: 'stifa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%ABfaz',
    },
    liquid: {
      zh: '液',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[state-of-matter] @0 is liquid',
      betokener: 'fluta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flut%C4%85',
    },
    gas: {
      zh: '氣',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[state-of-matter] @0 is gas',
      betokener: 'casa',
      origin: 'https://en.wiktionary.org/wiki/gas#Dutch',
    },
    plasm: {
      zh: '漿',
      date: '2024-07-15',
      klass: Klass.Verb,
      betokened: '[state-of-matter] @0 is plasm',
      betokener: 'flama',
      origin: 'https://en.wiktionary.org/wiki/flamma#Latin',
    },

    water: {
      zh: '水',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[matter] @0 is water',
      betokener: 'vata',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wat%C5%8Dr',
    },
    salt: {
      zh: '鹽',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[matter] @0 is salt',
      betokener: 'salta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/salt%C4%85',
    },
    stone: {
      zh: '石',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '[matter] @0 is stone',
      betokener: 'stena',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stainaz',
    },
    smoke: {
      zh: '煙',
      date: '2024-09-16',
      klass: Klass.Verb,
      betokened: '[matter] @0 is smoke',
      betokener: 'dvema',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dwemr%C4%85',
    },
    ash: {
      zh: '灰',
      date: '2024-09-16',
      klass: Klass.Verb,
      betokened: '[matter] @0 is ash',
      betokener: 'axa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ask%C7%AD',
    },

    wet: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokened: '@0 is (wet, moist)',
      betokener: 'veta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%93taz',
      complex: ['contain', 'water'],
    },
    dry: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokener: 'druxa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/druknaz',
      betokened: '@0 is dry',
      complex: ['low', 'contain', 'water'],
    },

    color: {
      zh: '色',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[color] @0 is the color of @1',
      betokener: 'farva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/farwaz',
    },
    hue: {
      date: '2024-11-20',
      klass: Klass.Verb,
      betokened: '[color] @0 is {a hue, a frequency of a light} of @1',
      betokener: 'xiva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiwj%C4%85',
    },
    red: {
      zh: '赤',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[color.hue] @0 is red',
      betokener: 'roda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raudaz',
    },
    orange: {
      zh: '橙',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[color.hue] @0 is orange',
      betokener: 'raga',
      origin:
        'https://en.wiktionary.org/wiki/%D9%86%D8%A7%D8%B1%D9%86%DA%AF#Persian',
    },
    yellow: {
      zh: '黃',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'cula',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gulaz',
      betokened: '[color.hue] @0 is yellow',
    },
    green: {
      zh: '綠',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'crona',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C5%8Dniz',
      betokened: '[color.hue] @0 is green',
    },
    blue: {
      zh: '靑',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'bleva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C4%93waz',
      betokened: '[color.hue] @0 is blue',
    },
    purple: {
      zh: '紫',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'vjona',
      origin:
        'https://en.wiktionary.org/wiki/%E1%BC%B4%CE%BF%CE%BD#Ancient_Greek',
      betokened: '[color.hue] @0 is purple',
    },
    vivid: {
      zh: '鮮',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'xina',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%ABnan%C4%85',
      betokened: '[color.saturation] @0 is vivid-colored',
    },
    dull: {
      zh: '鈍',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '[color.saturation] @0 is dull-colored',
      complex: ['low', 'vivid'],
    },
    gray: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'creva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C4%93waz',
      betokened: '[color.saturation] @0 is gray',
      complex: ['least', 'vivid'],
    },
    white: {
      zh: '白',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'xvita',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C4%ABtaz',
      betokened: '[color.brightness] @0 is white',
    },
    black: {
      zh: '黑',
      date: '2024-04-26',
      klass: Klass.Verb,
      betokener: 'svarta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swartaz',
      betokened: '[color.brightness] @0 is black',
      complex: ['least', 'white'],
    },

    // light
    bright: {
      zh: '明',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'berta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/berhtaz',
      betokened: '@0 (is bright, reflecteth much light)',
    },
    dark: {
      zh: '暗',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'dima',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dimmaz',
      betokened: '@0 is dark',
      complex: ['low', 'bright'],
    },

    // celestial
    sun: {
      zh: '日',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'suna',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD',
      betokened: '[celestial] @0 is sun',
    },
    earth: {
      zh: '地',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'erda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/er%C3%BE%C5%8D',
      betokened: '[celestial] @0 is earth',
    },
    moon: {
      zh: '月',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'mena',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/m%C4%93n%C3%B4',
      betokened: '[celestial] @0 is moon',
    },

    year: {
      zh: '年',
      date: '2024-08-30',
      klass: Klass.Verb,
      betokener: 'jera',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/j%C4%93r%C4%85',
      betokened: '[celestial.interval] @0 is year of @{1:earth}',
    },
    season: {
      date: '2024-08-30',
      klass: Klass.Verb,
      betokened: '[celestial.time] @0 is season of @{1:earth}',
      complex: ['year', 'part'],
    },
    winter: {
      zh: '冬',
      date: '2024-08-30',
      klass: Klass.Verb,
      betokened: '@0 is (winter, coldest interval) of @{1:earth}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wintruz',
      betokener: 'vinta',
      complex: ['low', 'season'],
    },
    spring: {
      zh: '春',
      date: '2024-11-21',
      klass: Klass.Verb,
      betokener: 'vara',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wazr%C4%85',
      betokened: '@0 is (spring, second hottest interval) of @{1:earth}',
      complex: ['up', 'season'],
    },
    summer: {
      zh: '夏',
      date: '2024-08-30',
      klass: Klass.Verb,
      betokener: 'suma',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sumaraz',
      betokened: '@0 is (summer, hottest interval) of @{1:earth}',
      complex: ['high', 'season'],
    },
    autumn: {
      zh: '秋',
      date: '2024-11-21',
      klass: Klass.Verb,
      betokener: 'aza',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/azaniz',
      betokened: '@0 is (autumn, second coldest interval) of @{1:earth}',
      complex: ['down', 'season'],
    },

    day: {
      date: '2024-08-19',
      klass: Klass.Verb,
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABnaz',
      betokened: '[celestial.interval] @0 is day of @{1:earth}',
      betokener: 'tina',
    },
    morning: {
      zh: '晝',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'murca',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/murginaz',
      betokened: '[celestial.interval] @0 is (morning, daytime) of @{1:earth}',
      complex: ['bright', 'day', 'part'],
    },
    night: {
      zh: '夜',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'nata',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nahts',
      betokened: '[celestial.interval] @0 is night of @{1:earth}',
      complex: ['dark', 'day', 'part'],
    },

    // terrain
    land: {
      zh: '陸',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'lanta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/land%C4%85',
      betokened: '[terrain] @0 is land',
    },
    sea: {
      zh: '海',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'mara',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mari',
      betokened: '[terrain] @0 is sea',
    },
    hill: {
      zh: '山',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'berja',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bergaz',
      betokened: '[terrain] @0 is mountain',
    },
    river: {
      zh: '川',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'stoma',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/straumaz',
      betokened: '[terrain] @0 is river',
    },
    sky: {
      zh: '空',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'skiva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiwj%C4%85',
      betokened: '[terrain] @0 is sky',
    },

    // weather
    cloud: {
      zh: '雲',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'volka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulkn%C4%85',
      betokened: '[weather] @0 is cloud',
    },
    fog: {
      zh: '霧',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'mista',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mihstaz',
      betokened: '[weather] @0 is (fog, mist)',
    },
    rain: {
      zh: '雨',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'rena',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/regn%C4%85',
      betokened: '[weather] @0 is rain',
    },
    snow: {
      zh: '雪',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'sneva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sn%C4%ABwan%C4%85',
      betokened: '[weather] @0 is snow',
    },
    hail: {
      zh: '霰',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'kela',
      origin: 'https://en.wiktionary.org/wiki/h%C3%A6gl#Old_English',
      betokened: '[weather] @0 is hail',
    },
    thunder: {
      zh: '雷',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'duna',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEunraz',
      betokened: '[weather] @0 is thunder',
    },

    // feel
    feel: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'senta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/sent-',
      betokened: '@0 (feeleth, senseth) @{1:stimulus}',
    },
    hear: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'xleva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hleum%C3%B4',
      betokened: '[sense] @0 hears @{1:sound}',
    },
    see: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'seka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wl%C4%ABtan%C4%85',
      betokened: '[sense] @0 sees @{1:sight}',
    },
    smell: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'rjuka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reukan%C4%85',
      betokened: '[sense] @0 smells @1',
    },
    taste: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'smaka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/smak%C4%93n',
      betokened: '[sense] @0 tastes @1',
    },
    touch: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'teka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%93kan%C4%85',
      betokened: '[sense] @0 (palpeth, toucheth) @1',
    },

    differ: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'skila',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiljan%C4%85',
      betokened: '[comparison] @0 (differeth, varieth) from @1',
    },
    same: {
      date: '2024-08-27',
      klass: Klass.Verb,
      betokener: 'sama',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/samaz',
      betokened: '[comparison] @0 is (the same as, identical to, equal to) @1',
      complex: ['least', 'differ'],
    },

    simulate: {
      date: '2024-08-27',
      klass: Klass.Verb,
      betokened: '@{0} (simulate, mimic, imitate, mock, fake)s @{1}',
      origin: 'https://en.wiktionary.org/wiki/mock#English',
      betokener: 'moka',
    },
    test: {
      date: '2024-07-26',
      klass: Klass.Verb,
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/keusan%C4%85',
      betokened: '@0 (checketh, examineth, inspecteth) @1',
      betokener: 'xusa',
    },
    compare: {
      date: '2024-07-26',
      klass: Klass.Verb,
      betokened: '@0 compares @{1:individuals}',
      complex: ['differ', 'test'],
    },

    // life
    live: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'liba',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libjan%C4%85',
      betokened: '@0 (liveth, is alive)',
    },
    die: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokened: '@0 (dieth, is dead)',
      idiom: ['end', 'live'],
    },
    //kill: { date: '2024-08-24', klass: Klass.Verb, ...toComplex(['let', 'die']), betokened: '@0 kills @1' },
    wake: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'vaxa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wakan%C4%85',
      betokened: '@0 (waketh, is awake)',
    },
    sleep: {
      date: '2024-04-26',
      klass: Klass.Verb,
      betokener: 'svefa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swefan%C4%85',
      betokened: '@0 (sleepeth, is asleep)',
      complex: ['least', 'wake'],
    },

    // motion
    lie: {
      date: '2024-08-30',
      klass: Klass.Verb,
      betokener: 'lica',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ligjan%C4%85',
      betokened: '[behavior] @0 (lieth, horizontally stays) on @1',
    },
    sit: {
      date: '2024-08-30',
      klass: Klass.Verb,
      betokener: 'seta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sitjan%C4%85',
      betokened: '[behavior] @0 sits on @1',
    },
    stand: {
      date: '2024-08-30',
      klass: Klass.Verb,
      betokener: 'stana',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%81n%C4%85',
      betokened: '@0 stands on @1',
    },
    walk: {
      date: '2024-06-18',
      klass: Klass.Verb,
      betokener: 'valka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/walkan%C4%85',
      betokened: '[behavior] @0 walk on @{1:ground}',
    },
    run: {
      date: '2024-06-18',
      klass: Klass.Verb,
      betokener: 'rina',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rinnan%C4%85',
      betokened: '[behavior] @0 run on @{1:ground}',
    },
    leap: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'lopa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlaupan%C4%85',
      betokened: '[behavior] @0 (jump, leap, skip, hop) over @1',
    },
    swim: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'svima',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swimman%C4%85',
      betokened: '[behavior] @0 (swimeth, flieth) in @{1:fluid}',
    },
    fly: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'fljuca',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleugan%C4%85',
      betokened: '[behavior] @0 flieth in @{1:air}',
    },
    dream: {
      date: '2024-10-16',
      klass: Klass.Verb,
      betokener: 'droma',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/draumaz',
      betokened: '[behavior] @0 dreams @{1:dream}',
    },

    // physiological
    eat: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'eta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/etan',
      betokened: '[physiological] @0 eats @{1:food}',
    },
    bite: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokener: 'bita',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABtan%C4%85',
      betokened: '[physiological.eat] @0 bites @{1:food}',
    },
    chew: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokener: 'xeva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kewwan%C4%85',
      betokened: '[physiological.eat] @0 chews @{1:food}',
    },
    swallow: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokener: 'svela',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swelgan%C4%85',
      betokened: '[physiological.eat] @0 swallows @{1:food}',
    },
    vomit: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'puka',
      origin: 'https://en.wiktionary.org/wiki/puke',
      betokened: '[physiological] @0 vomits @{1:excreta}',
      complex: ['back', 'eat'],
    },
    shit: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'drita',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/drit%C4%85',
      betokened: '[physiological] @0 shits @{1:excreta}',
      complex: ['counter', 'eat'],
    },

    digest: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'melta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meltan%C4%85',
      betokened: '[physiological] @0 digests @{1:food}',
    },
    fuck: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'foka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fukk%C5%8Dn%C4%85',
      betokened: '[physiological] @0 fucks A',
    },
    sick: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'sjuka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/seukaz',
      betokened: '[physiological] @0 (is sick, malfunctions)',
    },
    healthy: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokener: 'sunta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz',
      betokened: '[physiological] @0 is healthy',
      complex: ['low', 'sick'],
    },
    recover: {
      date: '2024-12-24',
      klass: Klass.Verb,
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz',
      betokened: '[physiological] @0 recovers',
      complex: ['down', 'sick'],
    },

    // emotion
    emotion: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'kuca',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hugiz',
      betokened: '@0 feels @{1:emotion, feeling}',
    },
    bad: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'leda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lai%C3%BEaz',
      betokened:
        '[emotion] @0 (disliketh, feeleth (bad, negative) about) @{1:bad}',
    },
    good: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'coda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/g%C5%8Ddaz',
      betokened:
        '[emotion] @0 (liketh, feels (good, positive) about) @{1:good}',
      complex: ['low', 'bad'],
    },
    sad: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'surca',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/surg%C5%8D',
      betokened: '[emotion] @0 is (sad, depressed) about @1',
    },
    glad: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'frava',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/frawaz',
      betokened: '[emotion] @0 is (happy, glad, merry) about @1',
      complex: ['low', 'sad'],
    },

    care: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'kara',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kar%C5%8D',
      betokened: '[emotion] @0 (regardeth, cares about) @{1:important}',
    },
    respect: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'verda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wer%C3%BEaz',
      betokened:
        '[emotion] @0 (respecteth, honoureth, positively cares about) @1',
      complex: ['good', 'care'],
    },
    fear: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'forta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furhtaz',
      betokened:
        '[emotion] @0 (feareth, is afraid of, negatively cares about) @1',
      complex: ['bad', 'care'],
    },
    neglect: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokened:
        '[emotion] @0 (neglecteth, is indifferent to, cares less about) @1',
      complex: ['low', 'care'],
    },
    serene: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'rova',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%8D%C5%8D',
      betokened:
        '[emotion.neglect] @0 is (calm about, serene about, positively neglects) @1',
      complex: ['good', 'neglect'],
    },
    scorn: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokened:
        '[emotion.neglect] @0 (scorneth, disdaineth, disrespecteth, negatively neglects) @1',
      complex: ['bad', 'neglect'],
    },
    hate: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'xata',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hataz',
      betokened: '[emotion] @0 is (hateth, detests) @1',
    },
    angry: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'vreda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wrai%C3%BEaz',
      betokened: '[emotion] @0 is (angry with, mad at) @1',
    },
    amaze: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'vonta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wundr%C4%85',
      betokened: '[emotion] @0 is (surprised, amazed) at @1',
    },
    expect: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'bida',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABdan%C4%85',
      betokened: '[emotion] @0 (expecteth, is not surprised at) @1',
      complex: ['low', 'amaze'],
    },
    bore: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'bura',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bur%C5%8Dn%C4%85',
      betokened: '[emotion] @0 (is bored with, is far from surprised with) @1',
      complex: ['least', 'amaze'],
    },
    enjoy: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'njuta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neutan%C4%85',
      betokened: '[emotion] @0 enjoys @1',
    },
    trust: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'truva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tr%C5%ABw%C4%81n%C4%85',
      betokened: '[emotion] @0 trusts @1',
    },
    doubt: {
      date: '2024-09-10',
      klass: Klass.Verb,
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tw%C4%ABflaz',
      betokened: '[emotion] @0 doubts @1',
      complex: ['low', 'trust'],
    },
    pride: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'sturta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stultaz',
      betokened: '[emotion] @0 is proud of @1',
    },
    shame: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'skam',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skam%C5%8D',
      betokened: '[emotion] @0 is ashamed of @1',
      complex: ['low', 'pride'],
    },
    shun: {
      date: '2024-09-27',
      klass: Klass.Verb,
      betokener: 'skjuka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skeuhaz',
      betokened: '[emotion] @0 is (shuneth, avoideth) @1',
    },
    want: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'vila',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wiljan%C4%85',
      betokened: '[emotion] @0 wants @1',
      complex: ['low', 'shun'],
    },
    love: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'jerna',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gernaz',
      betokened: '[emotion] @0 (loveth, is romantically attracted to) @1',
    },
    randy: {
      date: '2024-09-12',
      klass: Klass.Verb,
      betokener: 'cela',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gailaz',
      betokened:
        '[emotion] @0 is (randy, aroused, lustful, horny, sexual) for @1',
    },
    envy: {
      date: '2024-09-12',
      klass: Klass.Verb,
      betokener: 'zela',
      origin: 'https://en.wiktionary.org/wiki/zelo#Latin',
      betokened: '[emotion.hate] @0 envies @1',
    },
    pity: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'nada',
      origin: 'https://en.wiktionary.org/wiki/ginatha#Old_Dutch',
      betokened: '[emotion] @0 (pitieth, feel sympathy) @1',
    },

    // facial
    laugh: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'laka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlahjan%C4%85',
      betokened: '[facial-expression] @0 laugheth',
    },
    smile: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'smila',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sm%C4%ABlijan%C4%85',
      betokened: '[facial-expression] @0 smileth',
    },
    frown: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'skela',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skelhaz',
      betokened: '[facial-expression] @0 frowneth',
    },
    weep: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'vopa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C5%8Dpijan%C4%85',
      betokened: '[facial-expression] @0 weepeth @{1:tear}',
    },
    yell: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'stuna',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stun%C5%8Dn%C4%85',
      betokened: '@0 (yelleth, crieth, shouteth) @{1:voice}',
    },

    // mental
    know: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[mental] @0 knoweth @1',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/witan%C4%85',
      betokener: 'vita',
    },
    learn: {
      date: '2024-08-01',
      klass: Klass.Verb,
      betokened: '[mental] @0 learneth @{1:idea}',
      idiom: ['begin', 'know'],
    },
    forget: {
      date: '2024-08-01',
      klass: Klass.Verb,
      betokened: '[mental] @0 forgeteth @{1:idea}',
      idiom: ['end', 'know'],
    },

    think: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'dagka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEankijan%C4%85',
      betokened: '[mental] @0 thinketh @{1:idea}',
    },
    reason: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokener: 'rada',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ra%C3%BEj%C7%AD',
      betokened: '[mental] @0 hath @{1:reason}',
    },

    // communicate
    name: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'nama',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4',
      betokened: '[communicate] @0 (meaneth, signifieth, is a name of) @1',
    },
    speak: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'tala',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tal%C5%8D',
      betokened: '[communicate] @0 speaketh in @{1:language, protocol}',
    },
    language: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokened: '[communicate] @0 language',
      idiom: ['done', 'speak'],
    },
    say: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'saca',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sagjan%C4%85',
      betokened:
        '[communicate] @0 (sayeth, encodes) @{1:idea} as @{2:expression}',
    },
    understand: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'xlusta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlustiz',
      betokened:
        '[communicate] @0 (understandeth, decodeth) @{1:idea} from @{2:expression}',
      complex: ['counter', 'say'],
    },
    write: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'vrita',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C4%ABtan%C4%85',
      betokened: '[communicate] @0 writeth @{1:idea} to @{2:expression}',
    },
    read: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'reda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%93dan%C4%85',
      betokened: '[communicate] @0 readeth @{1:idea} from @{2:expression}',
      complex: ['counter', 'write'],
    },
    ask: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'freja',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fr%C4%93g%C5%8D',
      betokened: '[communicate] @0 asketh @{1:question} to @{2:questionee}',
    },
    answer: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'svara',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swar%C5%8Dn%C4%85',
      betokened: '[communicate] @0 answereth @{1:answer} to @{2:questioner}',
      complex: ['counter', 'ask'],
    },

    // performative
    greet: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'saluta',
      origin: 'https://en.wiktionary.org/wiki/salus#Latin',
      betokened: '[performative] @0 greeteth @{1:person}',
    },
    forgive: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'dona',
      origin: 'https://en.wiktionary.org/wiki/donare#Latin',
      betokened: '[performative] @0 forgiveth @{1:event}',
    },
    thank: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'crata',
      origin: 'https://en.wiktionary.org/wiki/gratus#Latin',
      betokened: '[performative] @0 thanketh @{1:event}',
    },
    promise: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'keta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitan%C4%85',
      betokened:
        '[performative] @0 (promiseth, guaranteeth, voweth) @{1:event}',
    },
    command: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokener: 'stjura',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stiurijan%C4%85',
      betokened: '[performative] @0 (command, request, recommend) @{1:must}',
    },

    // culture
    sing: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'sega',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/singwan%C4%85',
      betokened: '[culture] @0 singeth @{1:music, song}, play',
    },
    dance: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'dansa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEans%C5%8Dn',
      betokened: '[culture] @0 danceth @{1:choreography}',
    },

    // biochemistry
    rot: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'ruta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rut%C4%81n%C4%85',
      betokened: '@0 is rotten',
    },
    fresh: {
      date: '2024-07-24',
      klass: Klass.Verb,
      betokener: 'frixa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/friskaz',
      betokened: '@0 is fresh',
      complex: ['low', 'rot'],
    },

    // reproduce
    beget: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '@0 (beareth, reproducteth, is a parent of) @{1:child}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/burdiz',
      betokener: 'burda',
    },
    man: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'juma',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gum%C3%B4',
      betokened: '@0 is (a man, male)',
    },
    woman: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'viba',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABb%C4%85',
      betokened: '@0 is (a woman, female)',
    },

    // familly
    sibling: {
      date: '2025-02-08',
      klass: Klass.Verb,
      betokened: '@0 (beareth, reproducteth) @{1:child}, parent',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sibjaz',
      betokener: 'siba',
      complex: ['done', 'beget', 'same'],
    },
    family: {
      date: '2025-02-08',
      klass: Klass.Verb,
      betokened: '@0 (beareth, reproducteth) @{1:child}, parent',
      complex: ['done', 'bridge', 'beget'],
    },

    // animal
    mammal: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'mamala',
      origin: 'https://en.wiktionary.org/wiki/mammalis',
      betokened: '[life.animal] @0 is a mammal',
    },
    human: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'mana',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mann-',
      betokened: '[life.animal.mammal] @0 is a human',
    },
    rat: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'rata',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rattaz',
      betokened: '[life.animal.mammal] @0 is a (rat, mouse)',
    },
    hare: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'xasa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/has%C3%B4',
      betokened: '[life.animal.mammal] @0 is a (hare, rabbit)',
    },
    cat: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'kata',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kattuz',
      betokened: '[life.animal.mammal] @0 is a cat',
    },
    fox: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'foxa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuhsaz',
      betokened: '[life.animal.mammal] @0 is a (fox, vixen)',
    },
    dog: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'xunta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hundaz',
      betokened: '[life.animal.mammal] @0 is a {dog, bitch}',
    },
    wolf: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'volfa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulfaz',
      betokened: '[life.animal.mammal] @0 is a wolf',
    },
    bear: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'bera',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ber%C3%B4',
      betokened: '[life.animal.mammal] @0 is a bear',
    },
    sheep: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'skepa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%93p%C4%85',
      betokened: '[life.animal.mammal] @0 is a sheep',
    },
    goat: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'ceta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gaits',
      betokened: '[life.animal.mammal] @0 is a goat',
    },
    deer: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'reka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raih%C3%B4',
      betokened: '[life.animal.mammal] @0 is a deer',
    },
    horse: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'krusa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hruss%C4%85',
      betokened: '[life.animal.mammal] @0 is a {horse, stallion, mare}',
    },
    cow: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'kuva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/k%C5%ABz',
      betokened: '[life.animal.mammal] @0 is a cow',
    },
    pig: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'svina',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%ABn%C4%85',
      betokened: '[life.animal.mammal] @0 is a pig',
    },

    reptile: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[life.animal] @0 is a reptile',
      origin: 'https://en.wiktionary.org/wiki/reptilis#Latin',
      betokener: 'reftila',
    },
    snake: {
      date: '2024-07-15',
      klass: Klass.Verb,
      betokener: 'sneca',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snegan%C4%85',
      betokened: '[life.animal.reptile] @0 is a snake',
    },

    bird: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'focla',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuglaz',
      betokened: '[life.animal] @0 is a bird',
    },
    crow: {
      date: '2024-07-15',
      klass: Klass.Verb,
      betokener: 'rabna',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrabnaz',
      betokened: '[life.animal.bird] @0 is a (crow, raven)',
    },

    fish: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'fiska',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fiskaz',
      betokened: '[life.animal] @0 is a fish',
    },

    amphibia: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'anfiba',
      origin: 'https://en.wiktionary.org/wiki/amphibius#Latin',
      betokened: '[life.animal] @0 is a amphibia',
    },
    frog: {
      date: '2024-07-15',
      klass: Klass.Verb,
      betokener: 'fruska',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fruskaz',
      betokened: '[life.animal.amphibia] @0 is a frog',
    },

    // plant
    plant: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'planta',
      origin: 'https://en.wiktionary.org/wiki/planta#Latin',
      betokened: '[life] @0 is a plant',
    },
    tree: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'bacma',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bagmaz',
      betokened: '[life.plant] @0 is a tree',
    },

    // body
    body: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'krefa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrefaz',
      betokened: '@0 is a body of @1',
    },
    bone: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'bena',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bain%C4%85',
      betokened: '[body] @0 is a bone of @1',
    },
    spine: {
      date: '2025-02-06',
      klass: Klass.Verb,
      betokener: 'spina',
      origin: 'https://en.wiktionary.org/wiki/spina#Latin',
      betokened: '[body] @0 is a spine of @{1:vertebrata}',
    },
    flesh: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'flexa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaiski',
      betokened: '[body] @0 is a (flesh, meat, muscle) of @1',
    },
    fat: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokener: 'feta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/faitaz',
      betokened: '[body] @0 is a fat of @1',
    },
    skin: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'skina',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skin%C3%BE%C4%85',
      betokened: '[body] @0 is a (skin, peel) of @1',
    },
    head: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'kavda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haubud%C4%85',
      betokened: '[body] @0 is a head of @1',
    },
    neck: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'naka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnakk%C3%B4',
      betokened: '[body] @0 is a neck of @1',
    },
    shoulder: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'skulta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/skuldru',
      betokened: '[body] @0 is a (shoulder, buttock) of @1',
    },

    limb: {
      date: '2024-02-13',
      klass: Klass.Verb,
      zh: '肢',
      betokener: 'lima',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/limuz',
      origins: {
        gem: 'limuz',
        eng: 'limb',
        ice: 'limur',
      },
      betokened: '[body] @0 is a (limb, leg, arm, branch) of @1',
    },
    arm: {
      date: '2024-11-24',
      klass: Klass.Verb,
      zh: '腕',
      betokener: 'arma',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/armaz',
      origins: {
        gem: 'armaz',
        eng: 'arm',
        deu: 'arm',
      },
      betokened: '[body.limb] @0 is an arm',
    },
    leg: {
      date: '2024-11-24',
      klass: Klass.Verb,
      zh: '脚',
      betokener: 'laca',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lagjaz',
      origins: {
        gem: 'lagjaz',
        ice: 'leggur',
      },
      betokened: '[body.limb] @0 is a leg',
    },

    //extremity: { date: '2024-02-13', klass: Klass.Verb, betokener: 'and', origin: 'https://en.wiktionary.org/wiki/reconstruction:proto-germanic/handuz', betokened: '[body] @0 is a (extremity, hand, foot) of @1' },
    foot: {
      date: '2024-11-24',
      klass: Klass.Verb,
      betokener: 'fota',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/f%C5%8Dts',
      origins: {
        gem: 'fōts',
        eng: 'foot',
        deu: 'fuß',
        ice: 'fótur',
        lat: 'pede',
        chu: 'пѣшь',
      },
      betokened: '[body.extremity] @0 is a foot',
    },
    hand: {
      date: '2024-11-24',
      klass: Klass.Verb,
      betokener: 'munta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mund%C5%8D',
      betokened: '[body.extremity] @0 is a hand',
    },
    trunk: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'stama',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stamniz',
      betokened: '[body] @0 is a (trunk, torso, stem) of @1',
    },
    breast: {
      date: '2024-09-22',
      klass: Klass.Verb,
      betokener: 'brusta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brusts',
      betokened: '[body] @0 is a (chest, breast) of @1',
    },
    belly: {
      date: '2024-09-22',
      klass: Klass.Verb,
      betokener: 'kveda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kwe%C3%BEuz',
      betokened: '[body] @0 is a (chest, breast) of @1',
    },
    tail: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'sterta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stertaz',
      betokened: '[body] @0 is a tail of @1',
    },
    hair: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'kesa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hazdaz',
      betokened: '[body] @0 is a (hair, fur) of @1',
    },
    horn: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'xurna',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hurn%C4%85',
      betokened: '[body] @0 is a horn of @1',
    },
    tooth: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'tana',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tan%C3%BEs',
      betokened: '[body] @0 is a (tooth, fang) of @1',
    },
    nail: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'nela',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/naglaz',
      betokened: '[body] @0 is a (nail, claw) of @1',
    },
    eye: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'oca',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aug%C3%B4',
      betokened: '[body.face] @0 is an eye of @1',
    },
    ear: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'osa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aus%C3%B4',
      betokened: '[body.face] @0 is an ear of @1',
    },
    nose: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'nasa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nas%C5%8D',
      betokened: '[body.face] @0 is a nose of @1',
    },
    mouth: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'muna',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mun%C3%BEaz',
      betokened: '[body.face] @0 is a mouth of @1',
    },
    lip: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'lipa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lep%C3%B4',
      betokened: '[body.face] @0 is a lip of @1',
    },
    tongue: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'tuga',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tung%C7%AD',
      betokened: '[body.face] @0 is a tongue of @1',
    },

    viscera: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'darma',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEarmaz',
      betokened: '[body] @0 is a (viscera, inner organ) of @1',
    },
    lung: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'luga',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lung%C3%B4',
      betokened: '[body.viscera] @0 is a lung of @1',
    },
    heart: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'xerda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hert%C3%B4',
      betokened: '[body.viscera] @0 is a heart of @1',
    },
    maw: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'maca',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mag%C3%B4',
      betokened: '[body.viscera] @0 is a (maw, stomach) of @1',
    },
    liver: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'libra',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libr%C5%8D',
      betokened: '[body.viscera] @0 is a liver of @1',
    },

    womb: {
      date: '2024-09-22',
      klass: Klass.Verb,
      betokener: 'vamba',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wamb%C5%8D',
      betokened: '[body.genitalia] @0 is a (prostate, womb) of @1',
    },
    vagina: {
      date: '2024-09-22',
      klass: Klass.Verb,
      betokener: 'foda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fu%C3%BEiz',
      betokened: '[body.genitalia] @0 is a vagina of @1',
    },
    penis: {
      date: '2024-09-22',
      klass: Klass.Verb,
      betokener: 'pinta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/pinti',
      betokened: '[body.genitalia] @0 is a (penis, clitoris) of @1',
    },

    egg: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokener: 'aja',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ajj%C4%85',
      betokened: '[body.egg] @0 is an egg of @1',
    },

    blood: {
      date: '2024-07-29',
      klass: Klass.Verb,
      betokener: 'bloda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8D%C3%BE%C4%85',
      betokened: '[body.liquid] @0 is blood of @1',
    },
    milk: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokener: 'melka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meluks',
      betokened: '[body.liquid] @0 is milk of @1',
    },
    lymph: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokener: 'nenfa',
      origin:
        'https://en.wiktionary.org/wiki/%CE%BD%CF%8D%CE%BC%CF%86%CE%B7#Ancient_Greek',
      betokened: '[body.liquid] @0 is lymph of @1',
    },

    flower: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'blova',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8Dan%C4%85',
      betokened: '[body.plant] @0 is a (flower, bloom, blossom) of @1',
    },
    leaf: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'loba',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/laub%C4%85',
      betokened: '[body.plant] @0 is a leaf of @1',
    },
    root: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'rota',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C5%8Dts',
      betokened: '[body.plant] @0 is a root of @1',
    },

    // civilization
    person: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[civilisation] @0 is (a person, an individual, a citizen)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/liudiz',
      origins: {
        pie: 'h₁léwdʰis',
        gmc: 'liudiz',
        eng: 'lede',
        deu: 'Leute',
        ice: 'lýður',
      },
      betokener: 'ljuda',
    },
    nation: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokened: '[civilisation] @0 is a country',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mark%C5%8D',
      origins: {
        pie: 'morǵ-',
        gmc: 'markō',
        eng: 'mark',
        deu: 'Mark',
        ice: 'mörk',
      },
      betokener: 'marka',
    },
    rule: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'reja',
      origin: 'https://en.wiktionary.org/wiki/rego#Latin',
      betokened: '[civilisation] @0 (ruleth, ordereth, dictateth) @1',
    },

    noble: {
      date: '2024-10-01',
      klass: Klass.Verb,
      betokener: 'rika',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABkijaz',
      betokened: '@0 is noble',
    },
    humble: {
      date: '2024-10-01',
      klass: Klass.Verb,
      betokener: 'mjuka',
      origin: 'https://en.wiktionary.org/wiki/mj%C3%BAkr#Old_Norse',
      betokened: '@0 is humble',
      complex: ['low', 'noble'],
    },

    work: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'verxa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werk%C4%85',
      betokened: '@0 worketh @{1:operation}',
    },
    dwell: {
      date: '2024-12-20',
      klass: Klass.Verb,
      betokener: 'buva',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C5%ABan%C4%85',
      betokened: '@0 dwelleth in @{1:house}',
    },
    use: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'nuta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nut%C5%8D',
      betokened: '@0 useth @{1:tool} for @{2:purpose}',
    },
    help: {
      date: '2024-06-18',
      klass: Klass.Verb,
      betokener: 'xelpa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/helpan%C4%85',
      betokened: '@0 helpeth @{1:event}',
    },
    harm: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'skada',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ska%C3%BE%C3%B4',
      betokened: '@0 (harmeth, hurteth, damageth) @1',
    },

    wont: {
      date: '2024-09-01',
      klass: Klass.Verb,
      betokener: 'vona',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wun%C4%81n%C4%85',
      betokened: '@0 is used to @{1:custom, habit, routine, usual, regular}',
    },
    lead: {
      date: '2024-09-01',
      klass: Klass.Verb,
      betokener: 'draca',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dragan%C4%85',
      betokened: '@0 (leadeth, guideth) @{1:follower}',
    },

    stab: {
      date: '2024-11-24',
      klass: Klass.Verb,
      betokener: 'staba',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hittijan%C4%85',
      betokened: '@{0:sharp} stabs',
    },
    cut: {
      date: '2024-11-21',
      klass: Klass.Verb,
      betokener: 'sneda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sn%C4%AB%C3%BEan%C4%85',
      betokened: '@{0:sharp} cuteth @1',
    },

    // human action
    pick: {
      date: '2024-09-09',
      klass: Klass.Verb,
      betokener: 'jaka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/jakk%C5%8Dn%C4%85',
      betokened:
        '@0 (picketh, hunteth, gathereth, collects) @{1:harvest, prey}',
    },

    // human-human action
    lick: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'lixa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/likk%C5%8Dn%C4%85',
      betokened: '[body-interaction] @0 licketh @1',
      complex: ['tongue', 'touch'],
    },

    kiss: {
      date: '2024-11-23',
      klass: Klass.Verb,
      betokener: 'kusa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kussaz',
      betokened: '[body-interaction] @0 kisseth @1',
      complex: ['lip', 'touch'],
    },
    caress: {
      date: '2024-11-23',
      klass: Klass.Verb,
      betokener: 'stjuka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/streukan%C4%85',
      betokened: '[body-interaction] @0 carreseth @1',
    },
    hug: {
      date: '2024-11-23',
      klass: Klass.Verb,
      betokener: 'fadama',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fa%C3%BEmaz',
      betokened: '[body-interaction] @0 hugeth @1',
    },
    hit: {
      date: '2024-11-23',
      klass: Klass.Verb,
      betokener: 'kita',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hittijan%C4%85',
      betokened: '[body-interaction] @0 (hiteth, kicketh, puncheth) @1',
    },
    kick: {
      date: '2024-11-23',
      klass: Klass.Verb,
      betokener: 'spurna',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spurnan%C4%85',
      betokened: '[body-interaction] @0 kicketh @1',
      complex: ['foot', 'hit'],
    },
    punch: {
      date: '2024-11-23',
      klass: Klass.Verb,
      betokener: 'slaka',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slahan%C4%85',
      betokened: '[body-interaction] @0 puncheth @1',
      complex: ['hand', 'hit'],
    },

    rope: {
      date: '2025-02-08',
      klass: Klass.Verb,
      betokened: '[artifact] @0 is a {rope, cord, string}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/taug%C5%8D',
      betokener: 'toca',
    },
    knife: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokened: '[artifact] @{0:sword, knife, blade} cuteth @1',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sahs%C4%85',
      betokener: 'saksa',
      complex: ['cut', 'done', 'use'],
    },
    scissor: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokened: '[artifact] @0 is a pair of scissors',
      complex: ['two', 'knife'],
    },
    spear: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'spera',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/speru',
      betokened: '[artifact] @{0:spear, pin} stingeth @1',
    },
    rod: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'stika',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stikk%C3%B4',
      betokened: '[artifact] @{0:rod, stuff, wand, club} supporteth @1',
    },
    dish: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokener: 'knapa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnappaz',
      betokened: '[artifact] @{0:dish, bowl, cup, container} containeth @1',
    },
    fork: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokener: 'cavla',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Celtic/gabl%C4%81',
      betokened: '[artifact] @{0:fork} stingeth @1',
    },
    spoon: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokener: 'spena',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sp%C4%93nuz',
      betokened: '[artifact] @{0:spoon, scoop} scoopeth @1',
    },
    tong: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokener: 'taga',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tang%C5%8D',
      betokened: '[artifact] @{0:tong, plier, chopstick} grabeth @1',
    },
    money: {
      date: '2024-08-25',
      klass: Klass.Verb,
      betokener: 'fexa',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fehu',
      betokened: '[artifact] @0 is (money, coin, bill)',
    },
    ship: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'beta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/baitaz',
      betokened: '[artifact] @0 is a (ship, boat)',
    },
    bridge: {
      date: '2025-02-08',
      klass: Klass.Verb,
      betokener: 'bruca',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brugj%C7%AD',
      betokened: '@0 {is a bridge between, connects} of @{1}',
    },

    // misc
    knot: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokener: 'knuta',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/knutt%C3%B4',
      betokened: '@0 is a (knot, tangle, tie, bond) of @{1}',
    },
    age: {
      date: '2024-12-07',
      klass: Klass.Verb,
      betokener: 'ala',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/alan%C4%85',
      betokened: '@0 is at age of @{1:interval}',
    },

    sentence: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'frasa',
      origin:
        'https://en.wiktionary.org/wiki/%CF%86%CF%81%CE%AC%CF%83%CE%B9%CF%82#Ancient_Greek',
      betokened: '[grammar] @0 is a sentence',
    },
    clause: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'klavsa',
      origin: 'https://en.wiktionary.org/wiki/clauso#Latin',
      betokened: '[grammar] @0 is a clause',
    },
    word: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'vorda',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wurd%C4%85',
      betokened: '[grammar] @0 is a word',
    },

    case: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'kasa',
      origin: 'https://en.wiktionary.org/wiki/casu#Latin',
      betokened: '[grammar] @0 is an case of @1',
    },
    verb: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'verba',
      origin: 'https://en.wiktionary.org/wiki/verbo#Latin',
      betokened: '[grammar] @0 is a verb',
    },
    nominative: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokened: '[grammar] @0 is nominative',
      complex: ['verb', 'head'],
    },
    oblique: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokened: '[grammar] @0 is oblique',
      complex: ['verb', 'arm'],
    },
    accusative: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokened: '[grammar] @0 is accusative',
      complex: ['verb', 'zero', '_ord', 'arm'],
    },
    dative: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokened: '[grammar] @0 is dative',
      complex: ['verb', 'one', '_ord', 'arm'],
    },

    // country
    ...Object.fromEntries(
      [
        [
          'us',
          'the united states',
          '2024-08-25',
          'amerika',
          'https://en.wiktionary.org/wiki/America#Latin',
        ],
        [
          'cn',
          'china',
          '2024-08-25',
          'zjugcoka',
          'https://en.wiktionary.org/wiki/%E4%B8%AD%E5%9C%8B',
        ],
        [
          'de',
          'germany',
          '2024-08-25',
          'devdiska',
          'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEiudisk',
        ],
        [
          'jp',
          'japan',
          '2024-08-25',
          'nitfona',
          'https://en.wiktionary.org/wiki/%E6%97%A5%E6%9C%AC',
        ],
        [
          'in',
          'india',
          '2024-11-22',
          'varata',
          'https://en.wiktionary.org/wiki/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4#Sanskrit',
        ],
        [
          'gb',
          'the united kingdom',
          '2024-08-25',
          'britanja',
          'https://en.wiktionary.org/wiki/Britannia#Latin',
        ],
        [
          'fr',
          'france',
          '2024-08-25',
          'fragkja',
          'https://en.wiktionary.org/wiki/Francia#Latin',
        ],
        [
          'it',
          'italy',
          '2024-11-22',
          'hitalja',
          'https://en.wiktionary.org/wiki/Italia#Latin',
        ],
        [
          'ca',
          'canada',
          '2024-11-22',
          'kanata',
          'https://en.wiktionary.org/wiki/kanata#Laurentian',
        ],
        [
          'br',
          'brazil',
          '2024-11-22',
          'brasila',
          'https://en.wiktionary.org/wiki/Brasil#Portuguese',
        ],
        [
          'ru',
          'russia',
          '2025-02-08',
          'rusi',
          'https://en.wiktionary.org/wiki/%D0%A0%D1%83%D1%81%D1%8C#Old_East_Slavic',
        ],
      ].map(([iso, name, date, betokener, origin]) => [
        `nation_${iso.toLowerCase()}`,
        {
          date,
          klass: Klass.Verb,
          betokened: `[country] @0 is ${name} (${iso})`,
          betokener,
          origin,
          idiom: ['nation', 'called', '$' + fromAcronym(iso.toUpperCase())],
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
          klass: Klass.Verb,
          idiom: [
            'done',
            'speak',
            'called',
            '$' + fromAcronym(iso.toUpperCase()),
          ],
          betokened: `[language] @0 is ${adjective} language (${iso})`,
        },
      ])
    ),
  }).flatMap(([k, v]) => {
    const r = [];

    const { betokener, origin, complex, idiom, ...vRest } = v;

    if (betokener)
      r.push([
        k,
        { ...vRest, formation: Formation.Simplex, origin, betokener },
      ]);
    if (complex)
      r.push([
        k + '*',
        {
          ...vRest,
          ...(betokener ? { betokened: `=${k}` } : {}),
          formation: Formation.Complex,
          origin: complex.join('+'),
          complex,
        },
      ]);
    if (idiom)
      r.push([
        k + '#',
        {
          ...vRest,
          ...(betokener ? { betokened: `=${betokener}` } : {}),
          formation: Formation.Idiom,
          origin: idiom.join('␣'),
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
      : dicPre.get(k)?.betokener ??
        dicPre.get(k + '*')?.betokener ??
        dicPre.get(k + '#')?.betokener
  );

const toComplex = (betokeners: string[]): string =>
  betokeners.reduce((acc, betokener) => {
    const a = acc.replace(/(?<=[ieaouw].*)a$/, '');
    const b = betokener.replace(/^h(?=[ieaouw].*[ieaouw])/, '');

    const connection = a.slice(-1) + b.slice(0, 1);

    // VV
    if (/[iueoaw]{2}/.test(connection)) return a + 'h' + b;
    // CV | VC
    else if (/[^iueoaw][iueoaw]|[iueoaw][^iueoaw]/.test(connection))
      return a + b;
    // CC
    else if (/[^iueoaw]{2}/.test(connection)) {
      return !invalid(a) && invalid(a + b) ? a + 'a' + betokener : a + b;
    }
  });

// generate
for (let i = 0; i < dicPre.size + 1; i++)
  for (const [k, v] of dicPre.entries())
    if ('complex' in v) {
      if (v.complex.some((it) => !dicPre.has(k))) dicPre.delete(k);

      const betokeners = toBetokeners(v.complex);

      if (betokeners.every((it) => typeof it === 'string')) {
        delete v.complex;
        dicPre.set(k, {
          ...v,
          betokener: toComplex(betokeners),
        });
      }
    } else if ('idiom' in v) {
      if (v.idiom.some((it) => !dicPre.has(k))) dicPre.delete(k);

      const betokeners = toBetokeners(v.idiom);

      if (betokeners.every((it) => typeof it === 'string')) {
        delete v.idiom;
        dicPre.set(k, {
          ...v,
          betokener: betokeners.join(' '),
        });
      }
    }

// delete failed
for (const k of dicPre.keys())
  if (!dicPre.get(k).betokener) {
    dicPre.delete(k);
    console.warn(`.${k} deleted`);
  }

interface Value {
  date: string;
  klass: string;
  betokened: string;
  formation: Formation;
  origin: string;
  betokener: string;
}

const dic = dicPre as Map<string, Value>;

// check homograph
const keys = [...dic.keys()];
for (let i = 0; i < dic.size; i++)
  for (let j = i + 1; j < dic.size; j++) {
    const k0: string = keys[i];
    const k1: string = keys[j];

    if (dic.get(k0)?.betokener === dic.get(k1)?.betokener)
      console.error(`homograph: [${k0}, ${k1}] = ${dic.get(k0)?.betokener}`);
  }

for (const [k, { betokener, formation }] of dic.entries()) {
  if (formation === Formation.Simplex)
    if (7 <= betokener.length)
      console.error(`invalid: long simplex: .${k} = ${betokener}`);

  if (formation !== Formation.Idiom) {
    const invalidity = invalid(betokener);
    if (invalidity)
      console.error(`invalid: ${invalidity}: .${k} = ${betokener}`);
  }
}

export const translate = (code: string) =>
  code.replace(
    /[a-z_]+\{?|[\[\]\}\*\#]/g,
    (k) =>
      dic.get(k)?.betokener ??
      dic.get(k + '*')?.betokener ??
      dic.get(k + '#')?.betokener ??
      k
  );

export default dic;
