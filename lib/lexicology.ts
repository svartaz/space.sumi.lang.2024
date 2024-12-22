import { replaceEach } from './common';
import { checkSonority, invalid } from './phonology';

export const name = 'KXIM';

const fromAcronym = (acronym: string) =>
  replaceEach(acronym, [
    [/K/g, 'ka'],
    [/C/g, 'ca'],
    [/H/g, 'xa'],
    [/G/g, 'ga'],

    [/X/g, 'xi'],
    [/J/g, 'ji'],

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
    [/A/g, 'ha'],
    [/O/g, 'ho'],
    [/U/g, 'hu'],
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
    '[': {
      date: '2024-02-13',
      klass: Klass.Other,
      betokened: 'opens term list',
      betokener: 'I',
      origin: 'a priori',
    },
    ']': {
      date: '2024-02-13',
      klass: Klass.Other,
      betokened: 'closes term list',
      betokener: 'U',
      origin: 'a priori',
    },

    DER: {
      zh: '將',
      date: '2024-02-13',
      klass: Klass.Case,
      betokened: 'nominative',
      betokener: 'CO',
      origin: 'https://en.wiktionary.org/wiki/が#Particle',
    },
    DEN: {
      zh: '將',
      date: '2024-02-13',
      klass: Klass.Case,
      betokened: 'accusative',
      betokener: 'NO',
      origin: 'https://en.wiktionary.org/wiki/-ν#Ancient_Greek',
    },
    DEM: {
      date: '2024-02-13',
      klass: Klass.Case,
      betokened: 'dative',
      betokener: 'FO',
      origin: 'https://en.wiktionary.org/wiki/へ#Particle',
    },
    LY: {
      date: '2024-02-13',
      klass: Klass.Case,
      betokened: 'adverb',
      betokener: 'LI',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-līkaz',
    },

    DONE: {
      zh: '被',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened:
        '[voice] passive. precedes a case marker (default: accusative).',
      betokener: 'CE',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-',
    },

    BEGIN: {
      zh: '始',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[aspect] inchoative',
      betokener: 'ZA',
      origin: 'https://en.wiktionary.org/wiki/за-#Russian',
    },
    END: {
      zh: '終',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[aspect] completive',
      betokener: 'PO',
      origin: 'https://en.wiktionary.org/wiki/по-#Russian',
    },
    REPEAT: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[aspect] frequentative',
      betokener: 'LO',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-lōną',
    },

    DID: {
      zh: '了',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[tense] past',
      betokener: 'DI',
      origin: '*-dē',
    },
    DO: {
      zh: '今',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[tense] present',
      betokener: 'NU',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nu',
    },
    SHALL: {
      zh: '今',
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[tense] future',
      betokener: 'XU',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85',
    },

    WOULD: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[mood] irrealis, optative, imperative',
      betokener: 'SO',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swa',
    },

    MAY: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokener: 'ME',
      betokened: '[mood] may, possibly',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/maganą',
    },
    MUST: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[mood] must, necessarily',
      betokener: 'KU',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulaną',
    },

    SO: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      betokened: '[restrictiveness] which is, so (non-restrictive)',
      betokener: 'DU',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/þus',
    },

    ESSENTIALLY: {
      date: '2024-10-19',
      klass: Klass.Preverb,
      betokened: '[essentiality] in essence, in a nominal sense',
      betokener: 'SE',
      origin: 'https://en.wiktionary.org/wiki/esse#Latin',
    },
    ACCIDENTALLY: {
      date: '2024-10-19',
      klass: Klass.Preverb,
      betokened: '[essentiality] by accident, in a verbal sense',
      betokener: 'TA',
      origin: 'https://en.wiktionary.org/wiki/stare#Latin',
    },

    NOT: {
      date: '2024-02-13',
      klass: Klass.Joiner,
      betokened: '[logic] not, negation',
      betokener: 'NI',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne',
    },
    AND: {
      date: '2024-02-13',
      klass: Klass.Joiner,
      betokened: '[logic] and, both, conjunction',
      betokener: 'HE',
      origin: 'https://en.wiktionary.org/wiki/et#Latin',
    },
    OR: {
      date: '2024-02-13',
      klass: Klass.Joiner,
      betokened: '[logic] or, either, disjunction',
      betokener: 'HO',
      origin: 'https://en.wiktionary.org/wiki/aut#Latin',
    },
    IFF: {
      date: '2024-02-13',
      klass: Klass.Joiner,
      betokened: '[logic] if and only iff, equivalence',
      betokener: 'HA',
      origin: 'a priori',
    },

    'WHICH{': {
      date: '2024-02-13',
      klass: Klass.Clause,
      betokened: 'opens relative clause. @0 is that which @{sentence}',
      betokener: 'VE',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwat',
    },
    'THAT{': {
      date: '2024-02-13',
      klass: Klass.Clause,
      betokened:
        'opens statement clause. @0 is the (event, statement) that @{sentence}',
      betokener: 'DE',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEat',
    },
    'WHETHER{': {
      date: '2024-07-28',
      klass: Klass.Clause,
      betokened: 'opens truthfulness clause. @0 is whether @{sentence}',
      betokener: 'JE',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ja',
    },
    'HOW_MUCH{': {
      date: '2024-10-20',
      klass: Klass.Clause,
      betokened: 'opens extent clause. @0 is the extent how much @{sentence}',
      betokener: 'KE',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haiduz',
    },
    '}': {
      date: '2024-02-13',
      klass: Klass.Other,
      betokened: 'closes clause',
      betokener: 'LA',
      origin: 'https://en.wiktionary.org/wiki/啦#Chinese',
    },

    CALLED: {
      date: '2024-02-13',
      klass: Klass.Other,
      betokened: '@0 is called @{name}',
      betokener: 'NA',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/namô',
    },

    ZERO: {
      zh: '零',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 0',
      betokener: 'ZI',
      origin: 'https://en.wiktionary.org/wiki/%D8%B5%D9%81%D8%B1#Arabic',
    },
    ONE: {
      zh: '一',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 1',
      betokener: 'KA',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/Háykas',
    },
    TWO: {
      zh: '二',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 2',
      betokener: 'TAV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twai',
    },
    THREE: {
      zh: '三',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 3',
      betokener: 'DIR',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%ABz',
    },
    FOUR: {
      zh: '四',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 4',
      betokener: 'FED',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fedw%C5%8Dr',
    },
    FIVE: {
      zh: '五',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 5',
      betokener: 'PAN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/p%C3%A1n%C4%8Da',
    },
    SIX: {
      zh: '六',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 6',
      betokener: 'XAX',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/%C5%A1w%C3%A1%C4%87%C5%A1',
    },
    SEVEN: {
      zh: '七',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 7',
      betokener: 'SEB',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sebun',
    },
    EIGHT: {
      zh: '八',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 8',
      betokener: 'VOT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aht%C5%8Du',
    },
    NINE: {
      zh: '九',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[digit] 9',
      betokener: 'NIN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/newun',
    },

    INFINITE: {
      date: '2024-09-06',
      klass: Klass.Numeral,
      betokened: 'infinite, ∞',
      betokener: 'SIN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sin-',
    },
    KILO: {
      zh: '千',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[separator] 1000, `,`',
      betokener: 'DUS',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BE%C5%ABsund%C4%AB',
    },
    _DECIMAL: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[separator] decimal separator, `.`',
      betokener: 'PUG',
      origin: 'https://en.wiktionary.org/wiki/pungo#Latin',
    },

    HOW_MANY: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[interogative] how many',
      betokener: 'VO',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C5%8D',
    },

    EACH: {
      zh: '全',
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: 'each, every, all',
      betokener: 'PA',
      origin:
        'https://en.wiktionary.org/wiki/%CF%80%E1%BE%B6%CF%82#Ancient_Greek',
    },

    AT_LEAST: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[comparative] at least',
      betokener: 'MES',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/maiz%C3%B4',
    },
    AT_MOST: {
      date: '2024-09-17',
      klass: Klass.Numeral,
      betokened: '[comparative] at most',
      idiom: ['DONE', 'AT_LEAST'],
    },
    LESS_THAN: {
      date: '2024-08-31',
      klass: Klass.Numeral,
      betokened: '[comparative] less than',
      betokener: 'LES',
      origin: 'laisiz',
    },
    MORE_THAN: {
      date: '2024-09-17',
      klass: Klass.Numeral,
      betokened: '[comparative] more than',
      idiom: ['DONE', 'LESS_THAN'],
    },

    PLURAL: {
      date: '2024-09-17',
      klass: Klass.Numeral,
      betokened: 'plural, more than one',
      betokener: 'MAG',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/managaz',
    },

    _ADD: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[binary] addition, +',
      betokener: 'PUL',
      origin: 'https://en.wiktionary.org/wiki/plus#Latin',
    },
    _SUB: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[binary] subtraction, -',
      betokener: 'MIN',
      origin: 'https://en.wiktionary.org/wiki/minor#Latin',
    },
    _MUL: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[binary] multiplication, *',
      betokener: 'MUL',
      origin: 'https://en.wiktionary.org/wiki/multiplicare#Latin',
    },
    _DIV: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      betokened: '[binary] division, \u002F',
      betokener: 'DIV',
      origin: 'https://en.wiktionary.org/wiki/dividere#Latin',
    },
    _MOD: {
      date: '2024-08-24',
      klass: Klass.Numeral,
      betokened: '[binary] modulo, %',
      betokener: 'MOD',
      origin: 'https://en.wiktionary.org/wiki/modulo#Latin',
    },
    _EXP: {
      date: '2024-08-24',
      klass: Klass.Numeral,
      betokened: '[binary] exponential, ^',
      betokener: 'POT',
      origin: 'https://en.wiktionary.org/wiki/potere#Latin',
    },
    _LOG: {
      date: '2024-08-24',
      klass: Klass.Numeral,
      betokened: '[binary] logarithm',
      betokener: 'LOC',
      origin: 'https://en.wiktionary.org/wiki/logarithmo#Latin',
    },

    ORDINAL: {
      date: '2024-08-02',
      klass: Klass.Other,
      betokened: '@0 is @{number}-th',
      betokener: 'DO',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-i%C3%BE%C5%8D',
    },
    _CARD: {
      date: '2024-08-02',
      klass: Klass.Other,
      betokened: '@0 contains @{number} elements',
      betokener: 'FE',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/felu',
    },

    FIRST: {
      date: '2024-09-14',
      klass: Klass.Verb,
      betokened: '@0 is (0th, first, primary)',
      idiom: ['ORDINAL', 'ZERO'],
    },
    SECOND: {
      date: '2024-09-14',
      klass: Klass.Verb,
      betokened: '@0 is (1st, second, other)',
      idiom: ['ORDINAL', 'ONE'],
    },
    LAST: {
      date: '2024-09-14',
      klass: Klass.Verb,
      betokened: '@0 is (last, final)',
      idiom: ['ORDINAL', 'EACH'],
    },

    I: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[definite] @0 is me',
      betokener: 'MA',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mek',
    },
    THOU: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[definite] @0 is thee',
      betokener: 'DA',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEek',
    },
    HE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[definite] @0 is (him, it, this,  that, the definite entity)',
      betokener: 'XA',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiz',
    },
    SELF: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is oneself',
      betokener: 'SA',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sek',
    },
    WHO: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[interogative] @0 is who',
      betokener: 'VA',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwaz',
    },

    THIS: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokened: '@0 is this',
      idiom: ['HE', 'NEAR'],
    },
    YON: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokened: '@0 is that',
      idiom: ['HE', 'FAR'],
    },

    NORMAL: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened:
        '[extent.subjective] @0 is of (normal, default, usual, ordinary) extent, at subjective norm',
      betokener: 'VAN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wanaz',
    },
    HIGH: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened:
        '[extent.subjective] @0 is of (high, great) extent, above subjective norm',
      betokener: 'KO',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hauhaz',
    },
    LOW: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened:
        '[extent.subjective] @0 is of (low, small) extent, below subjective norm',
      betokener: 'LE',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93gaz',
    },
    POSITIVE: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened: '[extent.polarity] @0 is (positive, above objective norm)',
      betokener: 'VEL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wela',
    },
    NEGATIVE: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened: '[extent.polarity] @0 is (negative, below objective norm)',
      betokener: 'MIS',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/missa-',
    },
    UP: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened:
        '[extent.dynamic] @0 is (rises, goes up, ascends) along with @1',
      betokener: 'RIS',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABsan%C4%85',
    },
    DOWN: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokened:
        '[extent.dynamic] @0 is (falls, goes down, descends) along with @1',
      betokener: 'FAL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fallan%C4%85',
    },
    MOST: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[extent.extreme] @0 is (maximal, possibly highest)',
      betokener: 'MIX',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mikilaz',
    },
    LEAST: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[extent.extreme] @0 is (minimal, possibly lowest)',
      betokener: 'LUT',
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
    DENY: {
      zh: '否',
      date: '2024-08-30',
      klass: Klass.Verb,
      betokened: '@0 (contradicts, negates, denies) @1',
      betokener: 'NE',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne',
    },
    BACK: {
      zh: '回',
      date: '2024-06-14',
      klass: Klass.Verb,
      betokened: '@0 is temporally (inverse, opposite) of @1',
      betokener: 'RE',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/wre-',
    },
    COUNTER: {
      zh: '非',
      date: '2024-06-14',
      klass: Klass.Verb,
      betokened: '@0 (complements, is dual of) @1',
      betokener: 'JA',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-',
    },
    RELATE: {
      date: '2024-09-14',
      klass: Klass.Verb,
      betokened: '@0 is (related to @1, @1-ish), ',
      betokener: 'LIX',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-l%C4%ABkaz',
    },
    EXIST: {
      zh: '在',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 (exists, is a thing, is an object)',
      betokener: 'VES',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wesan%C4%85',
    },
    HAPPEN: {
      zh: '發',
      date: '2024-08-23',
      klass: Klass.Verb,
      betokened: '@0 (happens, occurs, realises, is actual, is an event)',
      betokener: 'SKEK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skehan%C4%85',
    },
    LET: {
      zh: '令',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 (causes, lets) @{1:result, effect}',
      betokener: 'LET',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93tan%C4%85',
    },

    MAKE: {
      zh: '作',
      date: '2024-08-02',
      klass: Klass.Verb,
      betokened: '@0 (makes, builds, creates) @1 from @{2:material, component}',
      betokener: 'SKAP',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skapjan%C4%85',
    },
    BREAK: {
      zh: '壞',
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'BREK',
      betokened: '@0 (breaks, destructs) @1 into @{2:pieces, components}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brekan%C4%85',
      complex: ['BACK', 'MAKE'],
    },

    HAVE: {
      zh: '有',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '@0  (has, owns) @{1:property}',
      betokener: 'KAB',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/habjan%C4%85',
    },
    GIVE: {
      zh: '與',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 gives @1 to @{2:receiver}',
      betokener: 'CEB',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/geban%C4%85',
    },
    TAKE: {
      zh: '取',
      date: '2024-08-24',
      klass: Klass.Verb,
      betokened: '@0 takes @1 from @2',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/geban%C4%85',
      betokener: 'NEM',
      complex: ['BACK', 'GIVE'],
    },

    COME: {
      zh: '來',
      date: '2024-08-26',
      klass: Klass.Verb,
      betokened: '@0 (is, comes) (from, since) @{1:source, origin, start}',
      betokener: 'FRAM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fram',
    },
    GO: {
      zh: '往',
      date: '2024-08-26',
      klass: Klass.Verb,
      betokened: '@0 (is, goes) (to, until) @{1:sink, destination, goal}',
      betokener: 'TIL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/til%C4%85',
    },
    PASS: {
      zh: '過',
      date: '2024-08-26',
      klass: Klass.Verb,
      betokened: '@0 (is, passes) (through, via) @{1:process, route, medium}',
      betokener: 'DURH',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEurhw',
    },
    AT: {
      zh: '於',
      date: '2024-08-26',
      klass: Klass.Verb,
      betokened: '@0 is at @{1:position, location, place}',
      betokener: 'HAT',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/at',
    },
    IN: {
      zh: '中',
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '@0 is in @{1:range, area}',
      betokener: 'HIN',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/in',
    },

    GROUP: {
      zh: '群',
      date: '2024-08-06',
      klass: Klass.Verb,
      betokened: '@0 is (collection, set, group, list)',
      betokener: 'CAD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gad',
    },
    PART: {
      zh: '部',
      date: '2024-08-06',
      klass: Klass.Verb,
      betokened: '@0 is a (part, component) of @{1:whole}',
      betokener: 'DEL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dailiz',
    },
    COMPLEX: {
      zh: '複',
      date: '2024-08-25',
      klass: Klass.Verb,
      betokened: '@0 (is complex, consists of many parts)',
      complex: ['HIGH', 'DONE', 'PART'],
    },
    SIMPLE: {
      zh: '單',
      date: '2024-08-25',
      klass: Klass.Verb,
      betokened: '@0 (is simple, consists of few parts)',
      complex: ['LOW', 'DONE', 'PART'],
    },
    ATOM: {
      zh: '素',
      date: '2024-08-25',
      klass: Klass.Verb,
      betokened: '@0 is an atom',
      complex: ['ONE', 'DONE', 'PART'],
    },

    CONTAIN: {
      zh: '含',
      date: '2024-08-02',
      klass: Klass.Verb,
      betokened: '@0 is contains @1',
      betokener: 'KALD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haldan%C4%85',
    },
    FULL: {
      zh: '滿',
      date: '2024-08-02',
      klass: Klass.Verb,
      betokened: '@0 is full of @1',
      betokener: 'FOL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fullaz',
      complex: ['MOST', 'CONTAIN'],
    },
    EMPTY: {
      zh: '虛',
      date: '2024-08-02',
      klass: Klass.Verb,
      betokened: '@0 is empty of @1',
      betokener: 'TOM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C5%8Dmaz',
      complex: ['LEAST', 'CONTAIN'],
    },

    MOVE: {
      zh: '動',
      date: '2024-08-31',
      klass: Klass.Verb,
      betokened: '@0 (moves, is dynamic)',
      betokener: 'VEC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wegan%C4%85',
    },
    STOP: {
      zh: '止',
      date: '2024-08-31',
      klass: Klass.Verb,
      betokened: '@0 (stops, halts, is static)',
      betokener: 'STOP',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/stopp%C5%8Dn',
      complex: ['LEAST', 'MOVE'],
    },

    POINT: {
      zh: '點',
      date: '2024-10-01',
      klass: Klass.Verb,
      betokened: '@0 is a (point, position, dot)',
      betokener: 'BRUZD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bruzdaz',
    },
    INTERVAL: {
      zh: '間',
      date: '2024-10-01',
      klass: Klass.Verb,
      betokened: '@0 is (an interval, an area, a volume, a domain)',
      betokener: 'TVISK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twiskaz',
    },

    WORLD: {
      zh: '界',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is a (world, universe)',
      betokener: 'XEM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haimaz',
    },
    SPACE: {
      zh: '空',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is the 3-dimensional physical spacial continuum',
      betokener: 'RUM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABm%C4%85',
    },
    TIME: {
      zh: '時',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is the 1-dimensional physical temporal continuum',
      betokener: 'TIM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABm%C3%B4',
    },
    THING: {
      zh: '物',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is a (thing, matter) located in a spacetime',
      betokener: 'DIG',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEing%C4%85',
    },
    MASS: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokened: '@0 is a mass of @1',
      betokener: 'VIHT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wihtiz',
    },

    ENERGY: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokened: '@0 is energy of @1',
      betokener: 'XUN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kunnan%C4%85',
    },
    HEAT: {
      date: '2024-09-06',
      klass: Klass.Verb,
      betokened: '@0 is heat in @1',
      complex: ['HOT', 'ENERGY'],
    },
    ELECTRIC: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokened: '@0 is (electricity, electric charge) in @1',
      betokener: 'SPARK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sparkaz',
    },
    FORCE: {
      date: '2024-10-01',
      klass: Klass.Verb,
      betokened: '@0 is force',
      betokener: 'VALD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wald%C4%85',
    },

    WAVE: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '@{0:medium} waves @{1:form}',
      betokener: 'KRAZ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrazn%C5%8D',
    },
    LIGHT: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[wave] @0 is (a light, an electromagnetic wave)',
      betokener: 'LJUT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leuht%C4%85',
    },
    SOUND: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '[wave] @0 is a sound from @1',
      betokener: 'KLIG',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/klingan%C4%85',
    },
    TURN: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '@0 (turns, rotates, spins) around @{1:pivot, center}',
      betokener: 'SPIN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spinnan%C4%85',
    },

    FIRE: {
      date: '2024-12-08',
      klass: Klass.Verb,
      betokened: '@0 burns @1',
      betokener: 'FOR',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/f%C5%8Dr',
    },

    // physical attribute
    BIG: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is (big, great)',
      betokener: 'CROT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grautaz',
    },
    SMALL: {
      date: '2024-09-26',
      klass: Klass.Verb,
      betokened: '@0 is small',
      betokener: 'SMAL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smalaz',
      complex: ['LOW', 'BIG'],
    },
    LONG: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is (long, big in 1 dimension and small in others)',
      betokener: 'LAG',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/langaz',
    },
    SHORT: {
      date: '2024-09-26',
      klass: Klass.Verb,
      betokened: '@0 is (short, small in 1 dimension and small in others)',
      betokener: 'SKURT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skurtaz',
      complex: ['LOW', 'LONG'],
    },

    THICK: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '@0 is thick',
      betokener: 'DEK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEekuz',
    },
    SHARP: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokened: '@{0:angle} is sharp',
      betokener: 'SKARP',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skarpaz',
    },
    HEAVY: {
      date: '2024-07-14',
      klass: Klass.Verb,
      betokened: '@0 is heavy',
      betokener: 'SVER',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%93raz',
    },
    DENSE: {
      date: '2024-07-15',
      klass: Klass.Verb,
      betokened: '@0 is (dense, heavy per volume)',
      betokener: 'DINT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEinhtaz',
    },

    SWIFT: {
      zh: '速',
      date: '2024-06-18',
      klass: Klass.Verb,
      betokened: '@0 is (swift, quick)',
      betokener: 'SNEL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snellaz',
    },
    SLOW: {
      zh: '遅',
      date: '2024-09-06',
      klass: Klass.Verb,
      betokened: '@0 is slow',
      betokener: 'SLEV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slaiwaz',
      complex: ['LOW', 'SWIFT'],
    },
    ROUGH: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokened: '@0 (is rough, is coarse, has friction) against @1',
      betokener: 'RUK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABhaz',
    },
    SMOOTH: {
      zh: '滑',
      date: '2024-09-26',
      klass: Klass.Verb,
      betokened: '@0 (is smooth, is sleek, has low friction)',
      betokener: 'SLIK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sl%C4%ABkan%C4%85',
      complex: ['LOW', 'ROUGH'],
    },
    SOFT: {
      zh: '柔',
      date: '2024-09-26',
      klass: Klass.Verb,
      betokened: '@0 is soft against @1',
      betokener: 'VIK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABkwan%C4%85',
    },
    HARD: {
      zh: '硬',
      date: '2024-09-26',
      klass: Klass.Verb,
      betokened: '@0 is (hard, firm) against @1',
      betokener: 'FAST',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fastuz',
      complex: ['LOW', 'SOFT'],
    },
    HOT: {
      zh: '熱',
      date: '2024-08-30',
      klass: Klass.Verb,
      betokened: '@0 is (hot, warm)',
      betokener: 'VARM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/warmaz',
    },
    COLD: {
      zh: '冷',
      date: '2024-08-30',
      klass: Klass.Verb,
      betokened: '@0 (cold, cool)',
      betokener: 'KAL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kalan%C4%85',
      complex: ['LOW', 'HOT'],
    },
    FAR: {
      zh: '遠',
      date: '2024-08-08',
      klass: Klass.Verb,
      betokened: '@0 is (far, distant, remote) from @1',
      betokener: 'FER',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ferrai',
    },
    NEAR: {
      zh: '近',
      date: '2024-08-08',
      klass: Klass.Verb,
      betokened: '@0 is (near, close to) @1',
      betokener: 'NEX',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/n%C4%93hwaz',
      complex: ['LOW', 'FAR'],
    },
    CONTACT: {
      zh: '接',
      date: '2024-08-08',
      betokened: '@0 (touches, is adjacent, is in contact with) @1',
      klass: Klass.Verb,
      complex: ['LEAST', 'FAR'],
    },

    BELOW: {
      zh: '下',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[position] @0 is below @{1:above, far against gravity}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ni%C3%BEan%C4%93',
      betokener: 'NID',
    },
    HIND: {
      zh: '後',
      date: '2024-02-13',
      betokened: '[position.local] @0 is behind @{1:front}',
      klass: Klass.Verb,
      betokener: 'XIN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hinder',
    },
    LEFT: {
      zh: '左',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[position] @0 is to the left of @{1:right}',
      origin: 'hlinkaz',
      betokener: 'LIGK',
    },

    BEFORE: {
      zh: '前',
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[position.global] @0 is before @{1:after}',
      betokener: 'FUR',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai',
    },
    EAST: {
      zh: '東',
      date: '2024-08-24',
      klass: Klass.Verb,
      betokened:
        '[position.global] @0 is to the west of @{1:to the east, far agaisnt rotation}',
      betokener: 'VOST',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/austraz',
    },
    NORTH: {
      zh: '北',
      date: '2024-08-24',
      klass: Klass.Verb,
      betokened: '[position.global] @0 is to the north of @{1:to the south}',
      betokener: 'NURD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nur%C3%BEraz',
    },

    SOLID: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[state-of-matter] @0 is solid',
      betokener: 'STIF',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%ABfaz',
    },
    LIQUID: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[state-of-matter] @0 is liquid',
      betokener: 'FLJUT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleutan%C4%85',
    },
    GAS: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[state-of-matter] @0 is gas',
      betokener: 'CAS',
      origin: 'https://en.wiktionary.org/wiki/gas#Dutch',
    },
    PLASM: {
      date: '2024-07-15',
      klass: Klass.Verb,
      betokened: '[state-of-matter] @0 is plasm',
      betokener: 'PLASM',
      origin:
        'https://en.wiktionary.org/wiki/%CF%80%CE%BB%CE%AC%CF%83%CE%BC%CE%B1#Ancient_Greek',
    },

    WATER: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[matter] @0 is water',
      betokener: 'VAT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wat%C5%8Dr',
    },
    SALT: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[matter] @0 is salt',
      betokener: 'SALT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/salt%C4%85',
    },
    STONE: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '[matter] @0 is stone',
      betokener: 'STEN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stainaz',
    },
    SMOKE: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokened: '[matter] @0 is smoke',
      betokener: 'DVERM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dwemr%C4%85',
    },
    ASH: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokened: '[matter] @0 is ash',
      betokener: 'HASK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ask%C7%AD',
    },

    WET: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokened: '@0 is (wet, moist)',
      betokener: 'NAT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nataz',
      complex: ['CONTAIN', 'WATER'],
    },
    DRY: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokener: 'DRUX',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/druknaz',
      betokened: '@0 is dry',
      complex: ['LOW', 'CONTAIN', 'WATER'],
    },

    COLOUR: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[colour] @0 is the colour of @1',
      betokener: 'FARV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/farwaz',
    },
    HUE: {
      date: '2024-11-20',
      klass: Klass.Verb,
      betokened: '[colour] @0 is hue of @1',
      betokener: 'BLIV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/bl%C4%ABu',
    },
    RED: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[colour.hue] @0 is red',
      betokener: 'ROD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raudaz',
    },
    ORANGE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokened: '[colour.hue] @0 is orange',
      betokener: 'NARANJ',
      origin:
        'https://en.wiktionary.org/wiki/%D9%86%D8%A7%D8%B1%D9%86%DA%AF#Persian',
    },
    YELLOW: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'CUL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gulaz',
      betokened: '[colour.hue] @0 is yellow',
    },
    GREEN: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'CRON',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C5%8Dniz',
      betokened: '[colour.hue] @0 is green',
    },
    BLUE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'BLEV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C4%93waz',
      betokened: '[colour.hue] @0 is blue',
    },
    PURPLE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'PORFUR',
      origin:
        'https://en.wiktionary.org/wiki/%CF%80%CE%BF%CF%81%CF%86%CF%8D%CF%81%CE%B1#Ancient_Greek',
      betokened: '[colour.hue] @0 is purple',
    },
    VIVID: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'SKIN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%ABnan%C4%85',
      betokened: '[colour.saturation] @0 is vivid-coloured',
    },
    DULL: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokened: '[colour.saturation] @0 is dull-coloured',
      complex: ['LOW', 'VIVID'],
    },
    GRAY: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'CREV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C4%93waz',
      betokened: '[colour.saturation] @0 is gray',
      complex: ['LEAST', 'VIVID'],
    },
    WHITE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'XVIT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C4%ABtaz',
      betokened: '[colour.brightness] @0 is white',
    },
    BLACK: {
      date: '2024-04-26',
      klass: Klass.Verb,
      betokener: 'SVART',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swartaz',
      betokened: '[colour.brightness] @0 is black',
      complex: ['LEAST', 'WHITE'],
    },

    // light
    BRIGHT: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'BERT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/berhtaz',
      betokened: '@0 (is bright, reflects much light)',
    },
    DARK: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'DIM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dimmaz',
      betokened: '@0 is dark',
      complex: ['LOW', 'BRIGHT'],
    },

    // celestial
    SUN: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SUN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD',
      betokened: '[celestial] @0 is sun',
    },
    EARTH: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'HERD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/er%C3%BE%C5%8D',
      betokened: '[celestial] @0 is earth',
    },
    MOON: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'MEN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/m%C4%93n%C3%B4',
      betokened: '[celestial] @0 is moon',
    },

    YEAR: {
      date: '2024-08-30',
      klass: Klass.Verb,
      betokener: 'JER',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/j%C4%93r%C4%85',
      betokened: '[celestial.interval] @0 is year of @{1:earth}',
    },
    SEASON: {
      date: '2024-08-30',
      klass: Klass.Verb,
      betokened: '[celestial.time] @0 is season of @{1:earth}',
      complex: ['YEAR', 'PART'],
    },
    WINTER: {
      date: '2024-08-30',
      klass: Klass.Verb,
      betokened: '@0 is (winter, coldest interval) of @{1:earth}',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wintruz',
      betokener: 'VITUR',
      complex: ['LOW', 'SEASON'],
    },
    SPRING: {
      date: '2024-11-21',
      klass: Klass.Verb,
      betokener: 'VAZAR',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wazr%C4%85',
      betokened: '@0 is (spring, second hottest interval) of @{1:earth}',
      complex: ['UP', 'SEASON'],
    },
    SUMMER: {
      date: '2024-08-30',
      klass: Klass.Verb,
      betokener: 'SUMAR',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sumaraz',
      betokened: '@0 is (summer, hottest interval) of @{1:earth}',
      complex: ['HIGH', 'SEASON'],
    },
    AUTUMN: {
      date: '2024-11-21',
      klass: Klass.Verb,
      betokener: 'HAZAN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/azaniz',
      betokened: '@0 is (autumn, second coldest interval) of @{1:earth}',
      complex: ['DOWN', 'SEASON'],
    },

    DAY: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'TIN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABnaz',
      betokened: '[celestial.interval] @0 is day of @{1:earth}',
    },
    MORNING: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'MURC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/murginaz',
      betokened: '[celestial.interval] @0 is morning of @{1:earth}',
      complex: ['BRIGHT', 'DAY', 'PART'],
    },
    NIGHT: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'NAHT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nahts',
      betokened: '[celestial.interval] @0 is night of @{1:earth}',
      complex: ['DARK', 'DAY', 'PART'],
    },

    // terrain
    LAND: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'LAND',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/land%C4%85',
      betokened: '[terrain] @0 is land',
    },
    SEA: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'MAR',
      origin:
        'hhttps://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mari',
      betokened: '[terrain] @0 is sea',
    },
    HILL: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'BERJ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bergaz',
      betokened: '[terrain] @0 is mountain',
    },
    RIVER: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'STAVM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/straumaz',
      betokened: '[terrain] @0 is river',
    },
    SKY: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'SKIV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiwj%C4%85',
      betokened: '[terrain] @0 is sky',
    },

    // weather
    CLOUD: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'MIC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/h%E2%82%83meyg%CA%B0-',
      betokened: '[weather] @0 is cloud',
    },
    FOG: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'MIST',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mihstaz',
      betokened: '[weather] @0 is (fog, mist)',
    },
    RAIN: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'REN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/regn%C4%85',
      betokened: '[weather] @0 is rain',
    },
    SNOW: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'SNIV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sn%C4%ABwan%C4%85',
      betokened: '[weather] @0 is snow',
    },
    HAIL: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'KEL',
      origin: 'https://en.wiktionary.org/wiki/h%C3%A6gl#Old_English',
      betokened: '[weather] @0 is hail',
    },
    THUNDER: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'DUN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEunraz',
      betokened: '[weather] @0 is thunder',
    },

    // feel
    FEEL: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SENT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/sent-',
      betokened: '@0 (feels, senses) @{1:stimulus}',
    },
    HEAR: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'XLJUM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hleum%C3%B4',
      betokened: '[feel] @0 hears @{1:sound}',
    },
    SEE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SEK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wl%C4%ABtan%C4%85',
      betokened: '[feel] @0 sees @{1:sight}',
    },
    SMELL: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'RJUK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reukan%C4%85',
      betokened: '[feel] @0 smells @1',
    },
    TASTE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SMAK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/smak%C4%93n',
      betokened: '[feel] @0 tastes @1',
    },
    TOUCH: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'TEK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%93kan%C4%85',
      betokened: '[feel] @0 (palps, touches) @1',
    },

    DIFFER: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SKIL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiljan%C4%85',
      betokened: '[comparison] @0 (differs, varies) from @1',
    },
    SAME: {
      date: '2024-08-27',
      klass: Klass.Verb,
      betokener: 'SAM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/samaz',
      betokened: '[comparison] @0 is (the same as, identical to, equal to) @1',
      complex: ['LEAST', 'DIFFER'],
    },

    SIMULATE: {
      date: '2024-08-27',
      klass: Klass.Verb,
      betokened: '@{0} (simulate, mimic, imitate, mock, fake)s @{1}',
      origin: 'https://en.wiktionary.org/wiki/mock#English',
      betokener: 'MOK',
    },
    TEST: {
      date: '2024-07-26',
      klass: Klass.Verb,
      betokener: 'XUS',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/keusan%C4%85',
      betokened: '@0 (checks, examines, inspects) @1',
    },
    COMPARE: {
      date: '2024-07-26',
      klass: Klass.Verb,
      betokened: '@0 compares @{1:individuals}',
      complex: ['DIFFER', 'TEST'],
    },

    // life
    LIVE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'LIB',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libjan%C4%85',
      betokened: '@0 (lives, is alive)',
    },
    DIE: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokened: '@0 (dies, is dead)',
      complex: ['END', 'LIVE'],
    },
    //KILL: { date: '2024-08-24', klass: Klass.Verb, ...toComplex(['let', 'die']), betokened: '@0 kills @1' },
    WAKE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'VAX',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wakan%C4%85',
      betokened: '@0 (wakes, is awake)',
    },
    SLEEP: {
      date: '2024-04-26',
      klass: Klass.Verb,
      betokener: 'SVEF',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swefan%C4%85',
      betokened: '@0 (sleeps, is asleep)',
      complex: ['LEAST', 'WAKE'],
    },

    // motion
    LIE: {
      date: '2024-08-30',
      klass: Klass.Verb,
      betokener: 'LIC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ligjan%C4%85',
      betokened: '[behavior] @0 (lies, horizontally stays) on @1',
    },
    SIT: {
      date: '2024-08-30',
      klass: Klass.Verb,
      betokener: 'SIT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sitjan%C4%85',
      betokened: '[behavior] @0 sits on @1',
    },
    STAND: {
      date: '2024-08-30',
      klass: Klass.Verb,
      betokener: 'STAN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%81n%C4%85',
      betokened: '@0 stands on @1',
    },
    WALK: {
      date: '2024-06-18',
      klass: Klass.Verb,
      betokener: 'VALK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/walkan%C4%85',
      betokened: '[behavior] @0 walk on @{1:ground}',
    },
    RUN: {
      date: '2024-06-18',
      klass: Klass.Verb,
      betokener: 'RIN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rinnan%C4%85',
      betokened: '[behavior] @0 run on @{1:ground}',
    },
    LEAP: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'LAVP',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlaupan%C4%85',
      betokened: '[behavior] @0 (jump, leap, skip, hop) over @1',
    },
    SWIM: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'SVIM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swimman%C4%85',
      betokened: '[behavior] @0 (swims, flies) in @{1:fluid}',
    },
    FLY: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'FLJUC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleugan%C4%85',
      betokened: '[behavior] @0 flies in @{1:air}',
    },
    DREAM: {
      date: '2024-10-16',
      klass: Klass.Verb,
      betokener: 'DRAVM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/draumaz',
      betokened: '[behavior] @0 dreams @{1:dream}',
    },

    // physiological
    EAT: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'MAND',
      origin: 'https://en.wiktionary.org/wiki/mandere#Latin',
      betokened: '[physiological] @0 eats @{1:food}',
    },
    BITE: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokener: 'BIT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABtan%C4%85',
      betokened: '[physiological.eat] @0 bites @{1:food}',
    },
    CHEW: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokener: 'XEV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kewwan%C4%85',
      betokened: '[physiological.eat] @0 chews @{1:food}',
    },
    SWALLOW: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokener: 'SVEL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swelgan%C4%85',
      betokened: '[physiological.eat] @0 swallows @{1:food}',
    },
    VOMIT: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'PUK',
      origin: 'pukaną',
      betokened: '[physiological] @0 vomits @{1:excreta}',
      complex: ['BACK', 'EAT'],
    },
    SHIT: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'DRIT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/drit%C4%85',
      betokened: '[physiological] @0 shits @{1:excreta}',
      complex: ['COUNTER', 'EAT'],
    },

    DIGEST: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'MELT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meltan%C4%85',
      betokened: '[physiological] @0 digests @{1:food}',
    },
    FUCK: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'FUK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fukk%C5%8Dn%C4%85',
      betokened: '[physiological] @0 fucks A',
    },
    SICK: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SJUK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/seukaz',
      betokened: '[physiological] @0 is sick',
    },
    HEALTHY: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokener: 'SUND',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz',
      betokened: '[physiological] @0 is healthy',
      complex: ['LOW', 'SICK'],
    },

    // emotion
    EMOTION: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'KUC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hugiz',
      betokened: '@0 feels @{1:emotion, feeling}',
    },
    GOOD: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'LUB',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lub%C5%8D',
      betokened: '[emotion] @0 (likes, feels (good, positive) about) @{1:good}',
    },
    BAD: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'LAJD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lai%C3%BEaz',
      betokened:
        '[emotion] @0 (dislikes, feels (bad, negative) about) @{1:bad}',
      complex: ['LOW', 'GOOD'],
    },
    GLAD: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'FRAV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/frawaz',
      betokened: '[emotion] @0 is (happy, glad, merry) about @1',
    },
    SAD: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'SURC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/surg%C5%8D',
      betokened: '[emotion] @0 is (sad, depressed) about @1',
      complex: ['LOW', 'GLAD'],
    },

    CARE: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'KAR',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kar%C5%8D',
      betokened: '[emotion] @0 (regards, cares about) @{1:important}',
    },
    RESPECT: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'VERD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wer%C3%BEaz',
      betokened: '[emotion] @0 (respects, honors, positively cares about) @1',
      complex: ['GOOD', 'CARE'],
    },
    FEAR: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'FURT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furhtaz',
      betokened:
        '[emotion] @0 (fears, is afraid of, negatively cares about) @1',
      complex: ['BAD', 'CARE'],
    },
    NEGLECT: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokened:
        '[emotion] @0 (neglects, is indifferent to, cares less about) @1',
      complex: ['LOW', 'CARE'],
    },
    SERENE: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'ROV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%8D%C5%8D',
      betokened:
        '[emotion.neglect] @0 is (calm about, serene about, positively neglects) @1',
      complex: ['GOOD', 'NEGLECT'],
    },
    SCORN: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokened:
        '[emotion.neglect] @0 (scorns, disdains, disrespects, negatively neglects) @1',
      complex: ['BAD', 'NEGLECT'],
    },
    HATE: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'XAT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hataz',
      betokened: '[emotion] @0 is (hates, detests) @1',
    },
    ANGRY: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'VRED',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wrai%C3%BEaz',
      betokened: '[emotion] @0 is (angry with, mad at) @1',
    },
    AMAZE: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'VOND',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wundr%C4%85',
      betokened: '[emotion] @0 is (surprised, amazed) at @1',
    },
    EXPECT: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'BID',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABdan%C4%85',
      betokened: '[emotion] @0 (expects, is not surprised at) @1',
      complex: ['LOW', 'AMAZE'],
    },
    BORE: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'BUR',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bur%C5%8Dn%C4%85',
      betokened: '[emotion] @0 (is bored with, is far from surprised with) @1',
      complex: ['LEAST', 'AMAZE'],
    },
    ENJOY: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'NJUT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neutan%C4%85',
      betokened: '[emotion] @0 enjoys @1',
    },
    TRUST: {
      date: '2024-08-02',
      klass: Klass.Verb,
      betokener: 'TRUV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tr%C5%ABw%C4%81n%C4%85',
      betokened: '[emotion] @0 trusts @1',
    },
    DOUBT: {
      date: '2024-09-10',
      klass: Klass.Verb,
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tw%C4%ABflaz',
      betokened: '[emotion] @0 doubts @1',
      complex: ['LOW', 'TRUST'],
    },
    PRIDE: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'STURT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stultaz',
      betokened: '[emotion] @0 is proud of @1',
    },
    SHAME: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'SKAM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skam%C5%8D',
      betokened: '[emotion] @0 is ashamed of @1',
      complex: ['LOW', 'PRIDE'],
    },
    SHUN: {
      date: '2024-09-27',
      klass: Klass.Verb,
      betokener: 'SKJUK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skeuhaz',
      betokened: '[emotion] @0 is (shuns, avoids) @1',
    },
    WANT: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'VIL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wiljan%C4%85',
      betokened: '[emotion] @0 wants @1',
      complex: ['LOW', 'SHUN'],
    },
    LOVE: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'JERN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gernaz',
      betokened: '[emotion] @0 (loves, is romantically attracted to) @1',
    },
    RANDY: {
      date: '2024-09-12',
      klass: Klass.Verb,
      betokener: 'CAJL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gailaz',
      betokened:
        '[emotion] @0 is (randy, aroused, lustful, horny, sexual) for @1',
    },
    ENVY: {
      date: '2024-09-12',
      klass: Klass.Verb,
      betokener: 'ZEL',
      origin: 'https://en.wiktionary.org/wiki/zelo#Latin',
      betokened: '[emotion.hate] @0 envies @1',
    },
    PITY: {
      date: '2024-09-10',
      klass: Klass.Verb,
      betokener: 'NAD',
      origin: 'https://en.wiktionary.org/wiki/ginatha#Old_Dutch',
      betokened: '[emotion] @0 (pities, feel sympathy) @1',
    },

    // facial
    LAUGH: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'LAK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlahjan%C4%85',
      betokened: '[facial-expression] @0 laughs',
    },
    SMILE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SMIL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sm%C4%ABlijan%C4%85',
      betokened: '[facial-expression] @0 smiles',
    },
    FROWN: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SKEL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skelhaz',
      betokened: '[facial-expression] @0 frowns',
    },
    WEEP: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'VOP',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C5%8Dpijan%C4%85',
      betokened: '[facial-expression] @0 weeps @{1:tear}',
    },
    YELL: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'STUN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stun%C5%8Dn%C4%85',
      betokened: '@0 (yells, cry, shout) @{1:voice}',
    },

    // mental
    KNOW: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'VIT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/witan%C4%85',
      betokened: '[mental] @0 knows @1',
    },

    //LEARN: { date: '2024-08-01', klass: Klass.Verb, ...toIdiom(['BEGIN', 'KNOW']), betokened: '[mental] @0 learns @{1:idea}' },
    //FORGET: { date: '2024-08-01', klass: Klass.Verb, ...toIdiom(['END', 'KNOW']), betokened: '[mental] @0 forgets @{1:idea}' },
    //...DUAL('LEARN', '2024-08-01', 'V/MENTAL'], '@0 LEARNS @{1:idea}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lizan%C4%85'), toComplex(['begin', 'know'])),
    //...DUAL('FORGET', '2024-08-01', 'V/MENTAL'], '@0 FORGETS @{1:idea}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/marzijan%C4%85'), toComplex(['end', 'know'])),
    THINK: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'DAGK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEankijan%C4%85',
      betokened: '[mental] @0 thinks @{1:idea}',
    },
    REASON: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokener: 'RAD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ra%C3%BEj%C7%AD',
      betokened: '[mental] @0 have @{1:reason}',
    },

    // communicate
    NAME: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'NAM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4',
      betokened: '[communicate] @0 (means, signifies, is a name of) @1',
    },
    SPEAK: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'TAL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tal%C5%8D',
      betokened: '[communicate] @0 speaks in @{1:language, protocol}',
    },
    LANGUAGE: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokened: '[communicate] @0 language',
      idiom: ['DONE', 'SPEAK'],
    },
    SAY: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'SAC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sagjan%C4%85',
      betokened: '[communicate] @0 says @{1:idea} @{2:expression}',
    },
    UNDERSTAND: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'XLUST',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlustiz',
      betokened: '[communicate] @0 understands @{1:idea} from @{2:expression}',
      complex: ['COUNTER', 'SAY'],
    },
    WRITE: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'VRIT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C4%ABtan%C4%85',
      betokened: '[communicate] @0 writes @{1:idea} to @{2:expression}',
    },
    READ: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'RED',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%93dan%C4%85',
      betokened: '[communicate] @0 reads @{1:idea} from @{2:expression}',
      complex: ['COUNTER', 'WRITE'],
    },
    ASK: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'FREJ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fr%C4%93g%C5%8D',
      betokened: '[communicate] @0 asks @{1:question} to @{2:questionee}',
    },
    ANSWER: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'SVAR',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swar%C5%8Dn%C4%85',
      betokened: '[communicate] @0 answers @{1:answer} to @{2:questioner}',
      complex: ['COUNTER', 'ASK'],
    },

    // performative
    GREET: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SALUT',
      origin: 'https://en.wiktionary.org/wiki/salus#Latin',
      betokened: '[performative] @0 greets @{1:person}',
    },
    FORGIVE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'DON',
      origin: 'https://en.wiktionary.org/wiki/donare#Latin',
      betokened: '[performative] @0 forgives @{1:event}',
    },
    THANK: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'CRAT',
      origin: 'https://en.wiktionary.org/wiki/gratus#Latin',
      betokened: '[performative] @0 thanks @{1:event}',
    },
    PROMISE: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'KET',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitan%C4%85',
      betokened: '[performative] @0 (promises, guarantee, vow) @{1:event}',
    },
    COMMAND: {
      date: '2024-09-29',
      klass: Klass.Verb,
      betokener: 'STJUR',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stiurijan%C4%85',
      betokened: '[performative] @0 (command, request, recommend) @{1:must}',
    },

    // culture
    SING: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SIG',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/singwan%C4%85',
      betokened: '[culture] @0 sings @{1:music, song}, play',
    },
    DANCE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'DANS',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEans%C5%8Dn',
      betokened: '[culture] @0 dances @{1:choreography}',
    },

    // biochemistry
    ROT: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'RUT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rut%C4%81n%C4%85',
      betokened: '@0 is rotten',
    },
    FRESH: {
      date: '2024-07-24',
      klass: Klass.Verb,
      betokener: 'FRISK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/friskaz',
      betokened: '@0 is fresh',
      complex: ['LOW', 'ROT'],
    },

    // reproduction
    BEGET: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'BURD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/burdiz',
      betokened: '@0 (bears, reproducts) @{1:child}, parent',
    },
    MAN: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'JUM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gum%C3%B4',
      betokened: '@0 is (a man, male)',
    },
    WOMAN: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'VIB',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABb%C4%85',
      betokened: '@0 is (a woman, female)',
    },

    // animal
    MAMMAL: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'MAMAL',
      origin: 'https://en.wiktionary.org/wiki/mammalis',
      betokened: '[life.animal] @0 is a mammal',
    },
    HUMAN: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'MAN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mann-',
      betokened: '[life.animal.mammal] @0 is a human',
    },
    RAT: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'RAT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rattaz',
      betokened: '[life.animal.mammal] @0 is a (rat, mouse)',
    },
    HARE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'XAS',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/has%C3%B4',
      betokened: '[life.animal.mammal] @0 is a (hare, rabbit)',
    },
    CAT: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'KAT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kattuz',
      betokened: '[life.animal.mammal] @0 is a cat',
    },
    FOX: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'FUX',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuhsaz',
      betokened: '[life.animal.mammal] @0 is a (fox, vixen)',
    },
    DOG: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'XUND',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hundaz',
      betokened: '[life.animal.mammal] @0 is a dog',
    },
    WOLF: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'VOLF',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulfaz',
      betokened: '[life.animal.mammal] @0 is a wolf',
    },
    BEAR: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'BER',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ber%C3%B4',
      betokened: '[life.animal.mammal] @0 is a bear',
    },
    SHEEP: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SKEP',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%93p%C4%85',
      betokened: '[life.animal.mammal] @0 is a sheep',
    },
    GOAT: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'CAJT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gaits',
      betokened: '[life.animal.mammal] @0 is a goat',
    },
    DEER: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'RAJK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raih%C3%B4',
      betokened: '[life.animal.mammal] @0 is a deer',
    },
    HORSE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'XRUS',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hruss%C4%85',
      betokened: '[life.animal.mammal] @0 is a horse',
    },
    COW: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'KUV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/k%C5%ABz',
      betokened: '[life.animal.mammal] @0 is a cow',
    },
    PIG: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SVIN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%ABn%C4%85',
      betokened: '[life.animal.mammal] @0 is a pig',
    },

    REPTILE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'REPTIL',
      origin: 'https://en.wiktionary.org/wiki/reptilis#Latin',
      betokened: '[life.animal] @0 is a reptile',
    },
    SNAKE: {
      date: '2024-07-15',
      klass: Klass.Verb,
      betokener: 'SNEC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snegan%C4%85',
      betokened: '[life.animal.reptile] @0 is a snake',
    },

    BIRD: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'FUCAL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuglaz',
      betokened: '[life.animal] @0 is a bird',
    },
    CROW: {
      date: '2024-07-15',
      klass: Klass.Verb,
      betokener: 'RABAN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrabnaz',
      betokened: '[life.animal.bird] @0 is a (crow, raven)',
    },

    FISH: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'FISK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fiskaz',
      betokened: '[life.animal] @0 is a fish',
    },

    AMPHIBIA: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'HANFIB',
      origin: 'https://en.wiktionary.org/wiki/amphibius#Latin',
      betokened: '[life.animal] @0 is a amphibia',
    },
    FROG: {
      date: '2024-07-15',
      klass: Klass.Verb,
      betokener: 'FRUK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fruskaz',
      betokened: '[life.animal.amphibia] @0 is a frog',
    },

    // plant
    PLANT: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'PLANT',
      origin: 'https://en.wiktionary.org/wiki/planta#Latin',
      betokened: '[life] @0 is a plant',
    },
    TREE: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'BACAM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bagmaz',
      betokened: '[life.plant] @0 is a tree',
    },

    // body
    BODY: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'KREF',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrefaz',
      betokened: '@0 is a body of @1',
    },
    BONE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'BAJN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bain%C4%85',
      betokened: '[body] @0 is a bone of @1',
    },
    FLESH: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'FLEX',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaiski',
      betokened: '[body] @0 is a (flesh, meat, muscle) of @1',
    },
    FAT: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokener: 'FAJT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/faitaz',
      betokened: '[body] @0 is a fat of @1',
    },
    SKIN: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SKIND',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skin%C3%BE%C4%85',
      betokened: '[body] @0 is a (skin, peel) of @1',
    },
    HEAD: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'KAVD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haubud%C4%85',
      betokened: '[body] @0 is a head of @1',
    },
    NECK: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'NAK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnakk%C3%B4',
      betokened: '[body] @0 is a neck of @1',
    },
    SHOULDER: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'SKULD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/skuldru',
      betokened: '[body] @0 is a (shoulder, buttock) of @1',
    },
    LIMB: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'LIM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/limuz',
      betokened: '[body] @0 is a (limb, leg, arm, branch) of @1',
    },
    LEG: {
      date: '2024-11-24',
      klass: Klass.Verb,
      betokener: 'LAC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lagjaz',
      betokened: '[body.limb] @0 is a leg',
    },
    ARM: {
      date: '2024-11-24',
      klass: Klass.Verb,
      betokener: 'HARM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/armaz',
      betokened: '[body.limb] @0 is an arm',
    },
    //EXTREMITY: { date: '2024-02-13', klass: Klass.Verb, betokener: 'HAND', ORIGIN: 'HTTPS://EN.WIKTIONARY.ORG/WIKI/RECONSTRUCTION:PROTO-GERMANIC/HANDUZ', betokened: '[body] @0 is a (extremity, hand, foot) of @1' },
    FOOT: {
      date: '2024-11-24',
      klass: Klass.Verb,
      betokener: 'FOT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/f%C5%8Dts',
      betokened: '[body.extremity] @0 is a foot',
    },
    HAND: {
      date: '2024-11-24',
      klass: Klass.Verb,
      betokener: 'MUND',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mund%C5%8D',
      betokened: '[body.extremity] @0 is a hand',
    },
    TRUNK: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'STAM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stamniz',
      betokened: '[body] @0 is a (trunk, torso, stem) of @1',
    },
    BREAST: {
      date: '2024-09-22',
      klass: Klass.Verb,
      betokener: 'BRUST',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brusts',
      betokened: '[body] @0 is a (chest, breast) of @1',
    },
    BELLY: {
      date: '2024-09-22',
      klass: Klass.Verb,
      betokener: 'KVED',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kwe%C3%BEuz',
      betokened: '[body] @0 is a (chest, breast) of @1',
    },
    TAIL: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'STERT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stertaz',
      betokened: '[body] @0 is a tail of @1',
    },
    HAIR: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'KAZD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hazdaz',
      betokened: '[body] @0 is a (hair, fur) of @1',
    },
    HORN: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'XURN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hurn%C4%85',
      betokened: '[body] @0 is a horn of @1',
    },
    TOOTH: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'TAND',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tan%C3%BEs',
      betokened: '[body] @0 is a (tooth, fang) of @1',
    },
    NAIL: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'NEL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/naglaz',
      betokened: '[body] @0 is a (nail, claw) of @1',
    },
    EYE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'HOC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aug%C3%B4',
      betokened: '[body.face] @0 is an eye of @1',
    },
    EAR: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'HOS',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aus%C3%B4',
      betokened: '[body.face] @0 is an ear of @1',
    },
    NOSE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'NAS',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nas%C5%8D',
      betokened: '[body.face] @0 is a nose of @1',
    },
    MOUTH: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'MUN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mun%C3%BEaz',
      betokened: '[body.face] @0 is a mouth of @1',
    },
    LIP: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'LIP',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lep%C3%B4',
      betokened: '[body.face] @0 is a lip of @1',
    },
    TONGUE: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'TUG',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tung%C7%AD',
      betokened: '[body.face] @0 is a tongue of @1',
    },

    VISCERA: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'DARM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEarmaz',
      betokened: '[body] @0 is a (viscera, inner organ) of @1',
    },
    LUNG: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'LUG',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lung%C3%B4',
      betokened: '[body.viscera] @0 is a lung of @1',
    },
    HEART: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'XERD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hert%C3%B4',
      betokened: '[body.viscera] @0 is a heart of @1',
    },
    MAW: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'MAC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mag%C3%B4',
      betokened: '[body.viscera] @0 is a (maw, stomach) of @1',
    },
    LIVER: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'LIBIR',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libr%C5%8D',
      betokened: '[body.viscera] @0 is a liver of @1',
    },

    WOMB: {
      date: '2024-09-22',
      klass: Klass.Verb,
      betokener: 'VAMB',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wamb%C5%8D',
      betokened: '[body.genitalia] @0 is a (prostate, womb) of @1',
    },
    VAGINA: {
      date: '2024-09-22',
      klass: Klass.Verb,
      betokener: 'FUD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fu%C3%BEiz',
      betokened: '[body.genitalia] @0 is a vagina of @1',
    },
    PENIS: {
      date: '2024-09-22',
      klass: Klass.Verb,
      betokener: 'PINT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/pinti',
      betokened: '[body.genitalia] @0 is a (penis, clitoris) of @1',
    },

    EGG: {
      date: '2024-09-16',
      klass: Klass.Verb,
      betokener: 'HAJ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ajj%C4%85',
      betokened: '[body.egg] @0 is an egg of @1',
    },

    BLOOD: {
      date: '2024-07-29',
      klass: Klass.Verb,
      betokener: 'BLOD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8D%C3%BE%C4%85',
      betokened: '[body.liquid] @0 is blood of @1',
    },
    MILK: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokener: 'MELK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meluks',
      betokened: '[body.liquid] @0 is milk of @1',
    },
    LYMPH: {
      date: '2024-08-31',
      klass: Klass.Verb,
      betokener: 'NINF',
      origin:
        'https://en.wiktionary.org/wiki/%CE%BD%CF%8D%CE%BC%CF%86%CE%B7#Ancient_Greek',
      betokened: '[body.liquid] @0 is lymph of @1',
    },

    FLOWER: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'BLOV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8Dan%C4%85',
      betokened: '[body.plant] @0 is a (flower, bloom, blossom) of @1',
    },
    LEAF: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'LAVB',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/laub%C4%85',
      betokened: '[body.plant] @0 is a leaf of @1',
    },
    ROOT: {
      date: '2024-09-02',
      klass: Klass.Verb,
      betokener: 'ROT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C5%8Dts',
      betokened: '[body.plant] @0 is a root of @1',
    },

    // civilization
    PERSON: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'LJUD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/liudiz',
      betokened: '[civilisation] @0 is (a person, an individual, a citizen)',
    },
    NATION: {
      date: '2024-08-24',
      klass: Klass.Verb,
      betokener: 'MARK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mark%C5%8D',
      betokened: '[civilisation] @0 is a country',
    },
    RULE: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'REJ',
      origin: 'https://en.wiktionary.org/wiki/rego#Latin',
      betokened: '[civilisation] @0 (rules, orders, dictates) @1',
    },

    NOBLE: {
      date: '2024-10-01',
      klass: Klass.Verb,
      betokener: 'RIK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABkijaz',
      betokened: '@0 is noble',
    },
    HUMBLE: {
      date: '2024-10-01',
      klass: Klass.Verb,
      betokener: 'MJUK',
      origin: 'https://en.wiktionary.org/wiki/mj%C3%BAkr#Old_Norse',
      betokened: '@0 is humble',
      complex: ['LOW', 'NOBLE'],
    },

    WORK: {
      date: '2024-02-13',
      klass: Klass.Verb,
      betokener: 'VERX',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werk%C4%85',
      betokened: '@0 works @{1:operation}',
    },
    DWELL: {
      date: '2024-12-20',
      klass: Klass.Verb,
      betokener: 'BUV',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C5%ABan%C4%85',
      betokened: '@0 dwells in @{1:house}',
    },
    USE: {
      date: '2024-06-14',
      klass: Klass.Verb,
      betokener: 'NUT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nut%C5%8D',
      betokened: '@0 uses @{1:tool} for @{2:purpose}',
    },
    HELP: {
      date: '2024-06-18',
      klass: Klass.Verb,
      betokener: 'XELP',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/helpan%C4%85',
      betokened: '@0 helps @{1:event}',
    },
    HARM: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'SKAD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ska%C3%BE%C3%B4',
      betokened: '@0 (harms, hurts, damages) @1',
    },
    HEAL: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'KAJL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hailaz',
      betokened: '@0 heals @1',
      complex: ['BACK', 'HARM'],
    },

    WONT: {
      date: '2024-09-01',
      klass: Klass.Verb,
      betokener: 'VON',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wun%C4%81n%C4%85',
      betokened: '@0 is used to @{1:custom, habit, routine, usual, regular}',
    },
    LEAD: {
      date: '2024-09-01',
      klass: Klass.Verb,
      betokener: 'DRAC',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dragan%C4%85',
      betokened: '@0 (leads, guides) @{1:follower}',
    },

    STAB: {
      date: '2024-11-24',
      klass: Klass.Verb,
      betokener: 'STAB',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hittijan%C4%85',
      betokened: '@{0:sharp} stabs',
    },
    CUT: {
      date: '2024-11-21',
      klass: Klass.Verb,
      betokener: 'SNID',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sn%C4%AB%C3%BEan%C4%85',
      betokened: '@{0:sharp} cuts @1',
    },

    // human action
    PICK: {
      date: '2024-09-09',
      klass: Klass.Verb,
      betokener: 'JAK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/jakk%C5%8Dn%C4%85',
      betokened: '@0 (picks, hunts, gathers, collects) @{1:harvest, prey}',
    },

    // human-human action
    LICK: {
      date: '2024-08-19',
      klass: Klass.Verb,
      betokener: 'LIK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/likk%C5%8Dn%C4%85',
      betokened: '[body-interaction] @0 licks @1',
      complex: ['TONGUE', 'TOUCH'],
    },

    KISS: {
      date: '2024-11-23',
      klass: Klass.Verb,
      betokener: 'KUS',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kussaz',
      betokened: '[body-interaction] @0 kisses @1',
      complex: ['LIP', 'TOUCH'],
    },
    CARESS: {
      date: '2024-11-23',
      klass: Klass.Verb,
      betokener: 'STJUK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/streukan%C4%85',
      betokened: '[body-interaction] @0 carreses @1',
    },
    HUG: {
      date: '2024-11-23',
      klass: Klass.Verb,
      betokener: 'FADAM',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fa%C3%BEmaz',
      betokened: '[body-interaction] @0 hugs @1',
    },
    HIT: {
      date: '2024-11-23',
      klass: Klass.Verb,
      betokener: 'KIT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hittijan%C4%85',
      betokened: '[body-interaction] @0 (hits, kicks, punches) @1',
    },
    KICK: {
      date: '2024-11-23',
      klass: Klass.Verb,
      /* betokener: 'SPURN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spurnan%C4%85',*/
      betokened: '[body-interaction] @0 kicks @1',
      complex: ['FOOT', 'HIT'],
    },
    PUNCH: {
      date: '2024-11-23',
      klass: Klass.Verb,
      /*betokener: 'KIT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hittijan%C4%85',*/
      betokened: '[body-interaction] @0 punches @1',
      complex: ['HAND', 'HIT'],
    },

    KNIFE: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokened: '[artifact] @{0:sword, knife, blade} cuts @1',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sahs%C4%85',
      betokener: 'saks',
      complex: ['CUT', 'DONE', 'USE'],
    },
    SCISSOR: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokened: '[artifact] @0 is a pair of scissors',
      complex: ['TWO', 'KNIFE'],
    },
    SPEAR: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'SPER',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/speru',
      betokened: '[artifact] @{0:spear, pin} stings @1',
    },
    ROD: {
      date: '2024-07-28',
      klass: Klass.Verb,
      betokener: 'STIK',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stikk%C3%B4',
      betokened: '[artifact] @{0:rod, stuff, wand, club} supports @1',
    },
    DISH: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokener: 'KNAP',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnappaz',
      betokened: '[artifact] @{0:dish, bowl, cup, container} contains @1',
    },
    FORK: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokener: 'CAVL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Celtic/gabl%C4%81',
      betokened: '[artifact] @{0:fork} stings @1',
    },
    SPOON: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokener: 'SPEN',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sp%C4%93nuz',
      betokened: '[artifact] @{0:spoon, scoop} scoops @1',
    },
    TONG: {
      date: '2024-12-23',
      klass: Klass.Verb,
      betokener: 'TAG',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tang%C5%8D',
      betokened: '[artifact] @{0:TONG, PLIER, CHOPSTICK} grabs @1',
    },
    MONEY: {
      date: '2024-08-25',
      klass: Klass.Verb,
      betokener: 'FEX',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fehu',
      betokened: '[artifact] @0 is (money, coin, bill)',
    },
    SHIP: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'BAJT',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/baitaz',
      betokened: '[artifact] @0 is a (ship, boat)',
    },

    // grammar
    SENTENCE: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'FRAS',
      origin:
        'https://en.wiktionary.org/wiki/%CF%86%CF%81%CE%AC%CF%83%CE%B9%CF%82#Ancient_Greek',
      betokened: '[grammar] @0 is a sentence',
    },
    CLAUSE: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'KLAVS',
      origin: 'https://en.wiktionary.org/wiki/clauso#Latin',
      betokened: '[grammar] @0 is a clause',
    },
    WORD: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'VORD',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wurd%C4%85',
      betokened: '[grammar] @0 is a word',
    },
    VERB: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'VERB',
      origin: 'https://en.wiktionary.org/wiki/verbo#Latin',
      betokened: '[grammar] @0 is a verb',
    },
    CASE: {
      date: '2024-10-05',
      klass: Klass.Verb,
      betokener: 'KAS',
      origin: 'https://en.wiktionary.org/wiki/casu#Latin',
      betokened: '[grammar] @0 is an case of @1',
    },

    AGE: {
      date: '2024-12-07',
      klass: Klass.Verb,
      betokener: 'HAL',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/alan%C4%85',
      betokened: '@0 is at age of @{1:interval}',
    },

    // country
    ...Object.fromEntries(
      [
        [
          'US',
          'the united states',
          '2024-08-25',
          'HAMERIK',
          'https://en.wiktionary.org/wiki/America#Latin',
        ],
        [
          'CN',
          'china',
          '2024-08-25',
          'ZJUGCOK',
          'https://en.wiktionary.org/wiki/%E4%B8%AD%E5%9C%8B',
        ],
        [
          'DE',
          'germany',
          '2024-08-25',
          'DEVDIX',
          'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEiudisk',
        ],
        [
          'JP',
          'japan',
          '2024-08-25',
          'NITPON',
          'https://en.wiktionary.org/wiki/%E6%97%A5%E6%9C%AC',
        ],
        [
          'IN',
          'india',
          '2024-11-22',
          'BARAT',
          'https://en.wiktionary.org/wiki/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4#Sanskrit',
        ],
        [
          'GB',
          'the united kingdom',
          '2024-08-25',
          'BRITAN',
          'https://en.wiktionary.org/wiki/Britannia#Latin',
        ],
        [
          'FR',
          'france',
          '2024-08-25',
          'FRAGK',
          'https://en.wiktionary.org/wiki/Francia#Latin',
        ],
        [
          'IT',
          'italy',
          '2024-11-22',
          'VITAL',
          'https://en.wiktionary.org/wiki/%E1%BC%B8%CF%84%CE%B1%CE%BB%CE%AF%CE%B1#Ancient_Greek',
        ],
        [
          'CA',
          'canada',
          '2024-11-22',
          'KANAT',
          'https://en.wiktionary.org/wiki/kanata#Laurentian',
        ],
        [
          'BR',
          'brazil',
          '2024-11-22',
          'BRASIL',
          'https://en.wiktionary.org/wiki/Brasil#Portuguese',
        ],
      ].map(([iso, name, date, betokener, origin]) => [
        `NATION_${iso}`,
        {
          date,
          klass: Klass.Verb,
          betokened: `[country] @0 is ${name} (${iso})`,
          betokener,
          origin,
          idiom: ['NATION', 'CALLED', '$' + fromAcronym(iso)],
        },
      ])
    ),

    // language
    ...Object.fromEntries(
      [
        ['ENG', '2024-08-31', 'english'],
        ['CMN', '2024-08-31', 'mandarin'],
        ['HIN', '2024-08-31', 'hindustani (hindi, urudu) '],
        ['SPA', '2024-08-31', 'spanish'],
        ['ARA', '2024-08-31', 'arabic'],
        ['FRA', '2024-08-31', 'french'],
        ['RUS', '2024-08-31', 'russian'],
        ['DEU', '2024-08-31', 'german'],
        ['JPN', '2024-08-31', 'japanese'],
      ].map(([iso, date, adjective]) => [
        `LANGUAGE_${iso}`,
        {
          date,
          klass: Klass.Verb,
          idiom: ['DONE', 'SPEAK', 'CALLED', '$' + fromAcronym(iso)],
          betokened: `[language] @0 is ${adjective} language (${iso.toUpperCase()})`,
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
        k + '_',
        {
          ...vRest,
          ...(betokener ? { betokened: `=${betokener}` } : {}),
          formation: Formation.Complex,
          origin: complex.join('+'),
          complex,
        },
      ]);
    if (idiom)
      r.push([
        k + '__',
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
  ks.map((k) => {
    if (k.startsWith('$')) return k.substring(1);

    const v = dicPre.get(k);
    if (v && 'betokener' in v) return v.betokener;

    const v_ = dicPre.get(k.replace(/_?$/, '_'));
    if (v_ && 'betokener' in v_) return v_.betokener;

    return null;
  });

const toComplex = (betokeners: string[]): string =>
  betokeners.reduce((joined, betokener) => {
    const joinedNew = (joined + betokener).replace(/(.)\1/, '$1');

    return invalid(joinedNew) || !checkSonority(joinedNew)
      ? joined + joined.match(/[IUEOA](?=[^IUEOA]*?$)/) + betokener
      : joinedNew;
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

for (const [k, { betokener, formation }] of dic.entries())
  if (formation !== Formation.Idiom) {
    const invalidity = invalid(betokener);
    if (invalidity)
      console.error(`invalid: ${invalidity}: .${k} = ${betokener}`);

    if (!checkSonority(betokener))
      console.error(`invalid sonority: .${k} = ${betokener}`);
  }

export const translate = (code: string) =>
  code
    .replace(/[A-Z_]+\{?|[\[\]\.\}]/g, (k) => dic.get(k)?.betokener ?? '?' + k)
    .replace(/ +-/g, '-')
    .replace(/[^ ]+/g, (it) =>
      it
        .replace('-', '(((HYPHEN)))') // first occurence
        .replace(/-/g, '')
        .replace('(((HYPHEN)))', '-')
    );

export default dic;
