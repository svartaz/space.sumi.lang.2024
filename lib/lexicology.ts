import { invalid } from './phonology';
// @ts-ignore
import { replaceEach } from 'https://sumi.space/js/string.js';

export const name = 'kxal';

const ofAcronym = (acronym: string) =>
  replaceEach(acronym.toUpperCase(), [
    [/^[AEIOU]/g, (it) => it.toLowerCase()],
    [/[AEIOU]/g, (it) => 'h' + it.toLowerCase()],
    [/[B-DFGJ-NP-TVXZ]/g, (it) => it.toLowerCase() + 'a'],
    [/H/g, 'ko'],
    [/W/g, 'vi'],
    [/Y/g, 'ju'],
    [/(?<![iueoa])a$/g, ''],
  ]);

enum Klass {
  Case = 'case',
  Preverb = 'fore-verb',
  Postverb = 'after-verb',
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
    that_is: {
      d: '2025-02-06',
      c: Klass.Other,
      tokened: "separator ','",
      token: 'xe',
    },

    by: {
      d: '2024-02-13',
      c: Klass.Case,
      tokened: 'nominative',
      o: 'https://en.wiktionary.org/wiki/-us#Latin',
      token: 'se',
    },
    den: {
      d: '2024-02-13',
      c: Klass.Case,
      tokened: 'accusative',
      o: 'https://en.wiktionary.org/wiki/-um#Latin',
      token: 'me',
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
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/b%C4%AB',
      token: 'be',
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
      token: 'ce',
    },
    repeat: {
      d: '2024-02-13',
      c: Klass.Preverb,
      tokened: '[aspect] frequentative',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-lōną',
      token: 'lo',
    },

    began: {
      d: '2025-05-26',
      c: Klass.Postverb,
      tokened: '[aspect-mood-tense] past inchoative (began to do)',
      token: '-it',
    },
    did: {
      d: '2024-02-13',
      c: Klass.Postverb,
      tokened: '[aspect-mood-tense] past continuative (was doing)',
      token: '-at',
    },
    ended: {
      d: '2024-05-26',
      c: Klass.Postverb,
      tokened: '[aspect-mood-tense] past completive (ended to do)',
      token: '-ut',
    },
    do: {
      d: '2024-02-13',
      c: Klass.Postverb,
      tokened: '[aspect-mood-tense] present continuative (is doing)',
      token: '-a',
    },
    shall_begin: {
      d: '2025-05-26',
      c: Klass.Postverb,
      tokened: '[aspect-mood-tense] future inchoative (shall begin to do)',
      token: '-ix',
    },
    shall: {
      d: '2024-02-13',
      c: Klass.Postverb,
      tokened: '[aspect-mood-tense] future continuative (shall be doing)',
      token: '-ax',
    },
    shall_end: {
      d: '2024-05-26',
      c: Klass.Postverb,
      tokened: '[aspect-mood-tense] future completive (shall end to do)',
      token: '-ux',
    },

    naturally: {
      d: '2024-02-13',
      c: Klass.Preverb,
      tokened: '[restrictiveness] which is, so (non-restrictive)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/þus',
      token: 'do',
    },

    not: {
      d: '2024-02-13',
      c: Klass.Joiner,
      tokened: '[logic] not, negation',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne',
      token: 'n',
    },
    and: {
      d: '2024-02-13',
      c: Klass.Joiner,
      tokened: '[logic] and, both, conjunction',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bai',
      token: 'pse',
    },
    or: {
      d: '2024-02-13',
      c: Klass.Joiner,
      tokened: '[logic] or, at least one, disjunction',
      token: 'pso',
    },
    iff: {
      d: '2024-02-13',
      c: Klass.Joiner,
      tokened: '[logic] if and only iff, equivalence',
      token: 'psa',
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
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwat',
      token: 'vi',
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
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ja',
      token: 'ji',
    },
    'how_much{': {
      d: '2024-10-20',
      c: Klass.Clause,
      tokened: 'openeth extent clause. @0 is the extent how much @{sentence}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haiduz',
      token: 'hi',
    },
    '}': {
      d: '2024-02-13',
      c: Klass.Other,
      tokened: 'closeth clause',
      o: 'https://en.wiktionary.org/wiki/啦#Chinese',
      token: 'lu',
    },

    called: {
      d: '2024-02-13',
      c: Klass.Other,
      tokened: '@0 is called @{name}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/namô',
      token: 'ne',
    },

    _var: {
      d: '2025-02-27',
      c: Klass.Other,
      tokened: 'bound variable',
      token: 'ku',
    },

    zero: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 0',
      o: 'https://en.wiktionary.org/wiki/%D8%B5%D9%81%D8%B1#Arabic',
      token: 'zi',
    },
    one: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/Háykas',
      token: 'ka',
    },
    two: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 2',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twai',
      token: 'tu',
    },
    three: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 3',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%ABz',
      token: 'de',
    },
    four: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 4',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fedw%C5%8Dr',
      token: 'fed',
    },
    five: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 5',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/p%C3%A1n%C4%8Da',
      token: 'pan',
    },
    six: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 6',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/%C5%A1w%C3%A1%C4%87%C5%A1',
      token: 'xek',
    },
    seven: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 7',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sebun',
      token: 'seb',
    },
    eight: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 8',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aht%C5%8Du',
      token: 'vak',
    },
    nine: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[digit] 9',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/newun',
      token: 'nin',
    },

    infinite: {
      d: '2024-09-06',
      c: Klass.Numeral,
      tokened: 'infinite, ∞',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sin-',
      token: 'sin',
    },
    kilo: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: "[separator] 1000, ','",
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BE%C5%ABsund%C4%AB',
      token: 'kil',
    },
    deci: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: "[separator] decimal separator, '.'",
      o: 'https://en.wiktionary.org/wiki/pungo#Latin',
      token: 'pu',
    },

    how_many: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[interogative] how many',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C5%8D',
      token: 'vo',
    },

    each: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: 'each, every, all',
      o: 'https://en.wiktionary.org/wiki/%CF%80%E1%BE%B6%CF%82#Ancient_Greek',
      token: 'pa',
    },

    at_most: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[comparative] at most. ≤',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%ABtilaz',
      token: 'li',
    },
    less_than: {
      d: '2024-08-31',
      c: Klass.Numeral,
      tokened: '[comparative] less than. <',
      o: 'https://en.wiktionary.org/wiki/l%C3%A6s#Etymology_2_2',
      token: 'la',
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
      o: 'https://en.wiktionary.org/wiki/summa#Latin',
      token: 'ad',
    },
    _sub: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[binary] subtraction, -',
      o: 'https://en.wiktionary.org/wiki/differentia#Latin',
      token: 'sub',
    },
    _mul: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[binary] multiplication, *',
      o: 'https://en.wiktionary.org/wiki/productum#Latin',
      token: 'mul',
    },
    _div: {
      d: '2024-02-13',
      c: Klass.Numeral,
      tokened: '[binary] division, \u002F',
      o: 'https://en.wiktionary.org/wiki/quotiens#Latin',
      token: 'div',
    },
    _mod: {
      d: '2024-08-24',
      c: Klass.Numeral,
      tokened: '[binary] modulo, %',
      o: 'https://en.wiktionary.org/wiki/modulus#Latin',
      token: 'mod',
    },
    _exp: {
      d: '2024-08-24',
      c: Klass.Numeral,
      tokened: '[binary] exponential, ^',
      o: 'https://en.wiktionary.org/wiki/potere#Latin',
      token: 'pot',
    },
    _log: {
      d: '2024-08-24',
      c: Klass.Numeral,
      tokened: '[binary] logarithm',
      o: 'https://en.wiktionary.org/wiki/logarithmo#Latin',
      token: 'loc',
    },

    _ordinal: {
      d: '2024-08-02',
      c: Klass.Other,
      tokened: '@0 is @{number}-th',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-i%C3%BE%C5%8D',
      token: 'to',
    },
    _cardinal: {
      d: '2024-08-02',
      c: Klass.Other,
      tokened: '@0 contains @{number} elements',
      o: 'https://en.wiktionary.org/wiki/%E5%80%8B',
      token: 'ko',
    },

    first: {
      d: '2024-09-14',
      c: Klass.Verb,
      tokened: '@0 is (0th, first, primary)',
      idiom: ['_ordinal', 'zero'],
    },
    second: {
      d: '2024-09-14',
      c: Klass.Verb,
      tokened: '@0 is (1st, second, other)',
      idiom: ['_ordinal', 'one'],
    },
    last: {
      d: '2024-09-14',
      c: Klass.Verb,
      tokened: '@0 is (last, final)',
      idiom: ['_ordinal', 'each'],
    },

    i: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[pronoun] @0 is me',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mek',
      token: 'ma',
    },
    thou: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[pronoun] @0 is thee',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEek',
      token: 'da',
    },
    he: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[pronoun] @0 is (him, it, this, that, the definite entity)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiz',
      token: 'ha',
    },
    self: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[pronoun] @0 is oneself',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sek',
      token: 'sa',
    },
    who: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[pronoun,interogative] @0 is who',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwaz',
      token: 'va',
    },

    this: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '[pronoun] @0 is this',
      idiom: ['he', 'near'],
    },
    yon: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '[pronoun] @0 is that',
      idiom: ['he', 'far'],
    },

    level: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened:
        '[extent] @0 is to a (normal, moderate, default, usual, ordinary) extent',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gamet',
      token: 'mu',
    },
    least: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[extent] @0 is to the largest negative extent',
      token: 'faj',
    },
    little: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened: '[extent] @0 is to a large extent',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fawaz',
      token: 'fa',
    },
    much: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened: '[extent] @0 is to a large extent',
      o: 'https://en.wiktionary.org/wiki/hoch#German',
      token: 'ho',
    },
    most: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[extent] @0 is to the largest extent',
      token: 'hoj',
    },

    positive: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened: '[extent] @0 is to a positive extent',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wela',
      token: 've',
    },
    negative: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened: '[extent] @0 is to a negative extent',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/missa-',
      token: 'mi',
    },

    down: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened: '[extent] @0 (falleth, goeth down, descends) along with @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fallan%C4%85',
      token: 'fal',
    },
    up: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened: '[extent] @0 (riseth, goeth up, ascends) along with @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABsan%C4%85',
      token: 'ris',
    },

    [name]: {
      d: '2024-02-17',
      c: Klass.Verb,
      tokened: `@0 is the language ${name}`,
      token: name,
    },

    // basic
    deny: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '@0 (contradicteth, negateth, denieth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne',
      token: 'na',
    },
    let: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 (causeth, leteth) @{1:result, effect}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93tan%C4%85',
      token: 'le',
    },
    back: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '@0 is temporally (inverse, opposite) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/wre-',
      token: 're',
    },
    counter: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '@0 (complementeth, is dual of) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-',
      token: 'ja',
    },
    relate: {
      d: '2024-09-14',
      c: Klass.Verb,
      tokened: '@0 is (related to @1, @1-ish), ',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-l%C4%ABkaz',
      token: 'lik',
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
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/mak%C5%8Dn',
      token: 'mak',
    },
    break: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '@0 (breaketh, destructeth) @1 into @{2:pieces, components}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brekan%C4%85',
      token: 'brek',
      complex: ['back', 'make'],
    },

    have: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '@0 (hath, owneth) @{1:property}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/habjan%C4%85',
      token: 'hab',
    },
    give: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 giveth @1 to @{2:receiver}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/geban%C4%85',
      token: 'ceb',
    },
    take: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '@0 {taketh, receiveth} @1 from @2',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neman%C4%85',
      token: 'nem',
      complex: ['back', 'give'],
    },

    from: {
      d: '2024-08-26',
      c: Klass.Verb,
      tokened: '@0 (is, cometh) (from, since) @{1:source, origin, start}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fan%C4%93',
      token: 'fan',
    },
    unto: {
      d: '2024-08-26',
      c: Klass.Verb,
      tokened: '@0 (is, goeth) (to, until) @{1:sink, destination, goal}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/til%C4%85',
      token: 'til',
    },
    through: {
      d: '2024-08-26',
      c: Klass.Verb,
      tokened: '@0 (is, passeth) (through, via) @{1:process, route, medium}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEurhw',
      token: 'dur',
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
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gad',
      token: 'cad',
    },
    part: {
      d: '2024-08-06',
      c: Klass.Verb,
      tokened: '@0 is a (part, component) of @{1:whole}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dailiz',
      token: 'del',
    },
    complex: {
      d: '2024-08-25',
      c: Klass.Verb,
      tokened: '@0 (is complex, consisteth of many parts)',
      complex: ['done', 'part', 'much'],
    },
    simple: {
      d: '2024-08-25',
      c: Klass.Verb,
      tokened: '@0 (is simple, consisteth of few parts)',
      complex: ['done', 'part', 'little'],
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
      token: 'fol',
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
      token: 'stop',
    },

    point: {
      d: '2024-10-01',
      c: Klass.Verb,
      tokened: '@0 is a (point, position, dot)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bruzdaz',
      token: 'brud',
    },
    interval: {
      d: '2024-10-01',
      c: Klass.Verb,
      tokened: '@0 is (an interval, an area, a volume, a domain)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/braidaz',
      token: 'bred',
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
      token: 'balx',
    },

    energy: {
      d: '2024-08-31',
      c: Klass.Verb,
      tokened: '@0 is energy of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/gn%C4%81wos',
      token: 'nav',
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
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sparkaz',
      token: 'spak',
    },
    force: {
      d: '2024-10-01',
      c: Klass.Verb,
      tokened: '@0 is force',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wald%C4%85',
      token: 'vad',
    },

    wave: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '@{0:medium} waveth @{1:form}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bulgij%C5%8D',
      token: 'buj',
    },
    light: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[wave] @0 is (a light, an electromagnetic wave)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leuht%C4%85',
      token: 'ljut',
    },
    sound: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[wave] @0 is a sound from @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/klingan%C4%85',
      token: 'klig',
    },
    turn: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '@0 (turneth, rotateth, spineth) around @{1:pivot, center}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%93an%C4%85',
      token: 'dren',
    },

    fire: {
      d: '2024-12-08',
      c: Klass.Verb,
      tokened: '@0 burneth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brandaz',
      token: 'bran',
    },

    big: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is (big, great)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grautaz',
      token: 'crot',
    },
    small: {
      d: '2024-09-26',
      c: Klass.Verb,
      tokened: '@0 is small',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smalaz',
      token: 'smal',
      complex: ['little', 'big'],
    },
    long: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is (long, big in 1 dimension and small in others)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/langaz',
      token: 'lag',
    },
    short: {
      d: '2024-09-26',
      c: Klass.Verb,
      tokened: '@0 is (short, small in 1 dimension and small in others)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skurtaz',
      token: 'skut',
      complex: ['little', 'long'],
    },

    thick: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is thick',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEekuz',
      token: 'dek',
    },
    sharp: {
      d: '2024-07-28',
      c: Klass.Verb,
      tokened: '@{0:angle} is sharp',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skarpaz',
      token: 'skap',
    },
    heavy: {
      d: '2024-07-14',
      c: Klass.Verb,
      tokened: '@0 is heavy',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%93raz',
      token: 'sver',
    },
    dense: {
      d: '2024-07-15',
      c: Klass.Verb,
      tokened: '@0 is (dense, heavy per volume)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEinhtaz',
      token: 'dint',
    },

    swift: {
      d: '2024-06-18',
      c: Klass.Verb,
      tokened: '@0 is (swift, quick)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snellaz',
      token: 'snel',
    },
    slow: {
      d: '2024-09-06',
      c: Klass.Verb,
      tokened: '@0 is suau',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slaiwaz',
      token: 'slev',
      complex: ['slow', 'swift'],
    },
    rough: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '@0 (is rough, is coarse, hath much friction) against @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABhaz',
      token: 'ruk',
    },
    smooth: {
      d: '2024-09-26',
      c: Klass.Verb,
      tokened: '@0 (is smooth, is sleek, hath little friction) against @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sl%C4%ABkan%C4%85',
      token: 'slik',
      complex: ['little', 'rough'],
    },
    soft: {
      d: '2024-09-26',
      c: Klass.Verb,
      tokened: '@0 is soft against @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABkwan%C4%85',
      token: 'vik',
    },
    hard: {
      d: '2024-09-26',
      c: Klass.Verb,
      tokened: '@0 is (hard, firm) against @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fastuz',
      token: 'fast',
      complex: ['little', 'soft'],
    },
    hot: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '[temparature] @0 is (hot, warm)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/warmaz',
      token: 'varm',
    },
    cold: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '[temparature] @0 (cold, cool)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kalan%C4%85',
      token: 'kal',
      complex: ['little', 'hot'],
    },
    far: {
      d: '2024-08-08',
      c: Klass.Verb,
      tokened: '[proximity] @0 is (far, distant, remote) from @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ferrai',
      token: 'fer',
    },
    near: {
      d: '2024-08-08',
      c: Klass.Verb,
      tokened: '[proximity] @0 is (near, close to) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/n%C4%93hwaz',
      complex: ['little', 'far'],
      token: 'nex',
    },
    contact: {
      d: '2024-08-08',
      c: Klass.Verb,
      tokened: '[proximity] @0 (toucheth, is adjacent, is in contact with) @1',
      complex: ['least', 'far'],
    },

    before: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[position.global] @0 is before @{1:after}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai',
      token: 'for',
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
      token: 'xin',
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
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nur%C3%BEraz',
      token: 'nud',
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
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%ABfaz',
      token: 'stif',
    },
    liquid: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[state-of-matter] @0 is liquid',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flut%C4%85',
      token: 'flut',
    },
    gas: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[state-of-matter] @0 is gas',
      o: 'https://en.wiktionary.org/wiki/gas#Dutch',
      token: 'cas',
    },
    plasm: {
      d: '2024-07-15',
      c: Klass.Verb,
      tokened: '[state-of-matter] @0 is plasm',
      o: 'https://en.wiktionary.org/wiki/flamma#Latin',
      token: 'flam',
    },

    water: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[matter] @0 is water',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wat%C5%8Dr',
      token: 'vat',
    },
    salt: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[matter] @0 is salt',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/salt%C4%85',
      token: 'salt',
    },
    stone: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[matter] @0 is stone',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stainaz',
      token: 'sten',
    },
    smoke: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '[matter] @0 is smoke',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dwemr%C4%85',
      token: 'dvem',
    },
    ash: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '[matter] @0 is ash',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ask%C7%AD',
      token: 'hax',
    },

    wet: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '@0 is (wet, moist)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%93taz',
      token: 'vet',
      complex: ['contain', 'water'],
    },
    dry: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '@0 is dry',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/druknaz',
      token: 'drux',
      complex: ['little', 'contain', 'water'],
    },

    color: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[color] @0 is the color of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/farwaz',
      token: 'fav',
    },
    hue: {
      d: '2024-11-20',
      c: Klass.Verb,
      tokened: '[color] @0 is {a hue, a frequency of a light} of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiwj%C4%85',
      token: 'xiv',
    },
    red: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[color.hue] @0 is red',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raudaz',
      token: 'rod',
    },
    orange: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[color.hue] @0 is orange',
      o: 'https://en.wiktionary.org/wiki/%D9%86%D8%A7%D8%B1%D9%86%DA%AF#Persian',
      token: 'rag',
    },
    yellow: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[color.hue] @0 is yellow',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gulaz',
      token: 'cul',
    },
    green: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[color.hue] @0 is green',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C5%8Dniz',
      token: 'cron',
    },
    blue: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[color.hue] @0 is blue',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C4%93waz',
      token: 'blev',
    },
    purple: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[color.hue] @0 is purple',
      o: 'https://en.wiktionary.org/wiki/%E1%BC%B4%CE%BF%CE%BD#Ancient_Greek',
      token: 'vjon',
    },
    vivid: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[color] @0 is (vivid, of high-saturation color)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%ABm%C3%B4',
      token: 'skim',
    },
    dull: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[color] @0 is (dull, of low-saturation color)',
      complex: ['little', 'vivid'],
    },
    gray: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '@0 is (gray, of lowest-saturation color)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C4%93waz',
      token: 'crev',
      complex: ['least', 'vivid'],
    },
    white: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[color] @0 is (white, of lightest color)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C4%ABtaz',
      token: 'xvit',
    },
    black: {
      d: '2024-04-26',
      c: Klass.Verb,
      tokened: '[color] @0 is (black, of least light color)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swartaz',
      token: 'svat',
      complex: ['least', 'white'],
    },

    bright: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '@0 (is bright, reflecteth much light)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/berhtaz',
      token: 'bert',
    },
    dark: {
      d: '2024-08-19',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dimmaz',
      tokened: '@0 is dark',
      complex: ['little', 'bright'],
      token: 'dim',
    },

    // celestial
    sun: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[celestial] @0 is sun',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD',
      token: 'sun',
    },
    earth: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[celestial] @0 is earth',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/er%C3%BE%C5%8D',
      token: 'herd',
    },
    moon: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[celestial] @0 is moon',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/m%C4%93n%C3%B4',
      token: 'men',
    },

    year: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '[celestial.interval] @0 is year of @{1:earth}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/j%C4%93r%C4%85',
      token: 'jer',
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
      complex: ['season', 'little'],
    },
    spring: {
      d: '2024-11-21',
      c: Klass.Verb,
      tokened: '@0 is (spring, second hottest interval) of @{1:earth}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wazr%C4%85',
      token: 'vazar',
      complex: ['season', 'up'],
    },
    summer: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '@0 is (summer, hottest interval) of @{1:earth}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sumaraz',
      token: 'sumar',
      complex: ['season', 'much'],
    },
    autumn: {
      d: '2024-11-21',
      c: Klass.Verb,
      tokened: '@0 is (autumn, second coldest interval) of @{1:earth}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/harbistaz',
      complex: ['season', 'down'],
      token: 'harbis',
    },

    day: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[celestial.interval] @0 is day of @{1:earth}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABnaz',
      token: 'tin',
    },
    morning: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[celestial.interval] @0 is (morning, daytime) of @{1:earth}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/murginaz',
      token: 'muc',
      complex: ['part', 'day', 'bright'],
    },
    night: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[celestial.interval] @0 is night of @{1:earth}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nahts',
      token: 'nat',
      complex: ['part', 'day', 'dark'],
    },

    land: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[terrain] @0 is land',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/land%C4%85',
      token: 'land',
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
      token: 'stom',
    },
    sky: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[terrain] @0 is sky',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiwj%C4%85',
      token: 'skiv',
    },

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
      token: 'hel',
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
      tokened: '@0 (feeleth, senseth) @{1:stimulus}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/sent-',
      token: 'sent',
    },
    hear: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[sense] @0 hears @{1:sound}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hleum%C3%B4',
      token: 'xlev',
    },
    see: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[sense] @0 sees @{1:sight}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wl%C4%ABtan%C4%85',
      token: 'vlit',
    },
    smell: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[sense] @0 smells @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reukan%C4%85',
      token: 'rjuk',
    },
    taste: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[sense] @0 tastes @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/smak%C4%93n',
      token: 'smak',
    },
    touch: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[sense] @0 (palpeth, toucheth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%93kan%C4%85',
      token: 'tek',
    },
    hurt: {
      d: '2025-03-01',
      c: Klass.Verb,
      tokened: '[sense] @0 (hurteth, feeleth pain) from @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sairaz',
      token: 'ser',
    },

    differ: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[comparison] @0 (differeth, varieth) from @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiljan%C4%85',
      token: 'skil',
    },
    same: {
      d: '2024-08-27',
      c: Klass.Verb,
      tokened: '[comparison] @0 is (the same as, identical to, equal to) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/samaz',
      token: 'sam',
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
      tokened: '@0 (checketh, examineth, inspecteth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/keusan%C4%85',
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
      tokened: '@0 (liveth, is alive)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libjan%C4%85',
      token: 'liv',
    },
    die: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '@0 (dieth, is dead)',
      idiom: ['end', 'live'],
    },
    kill: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '@0 kills @1',
      complex: ['let', 'die'],
    },
    wake: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 (waketh, is awake)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wakan%C4%85',
      token: 'vax',
    },
    sleep: {
      d: '2024-04-26',
      c: Klass.Verb,
      tokened: '@0 (sleepeth, is asleep)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swefan%C4%85',
      token: 'svef',
      complex: ['least', 'wake'],
    },

    // motion
    lie: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '[behavior] @0 (lieth, horizontally stays) on @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ligjan%C4%85',
      token: 'lic',
    },
    sit: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '[behavior] @0 sits on @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sitjan%C4%85',
      token: 'sit',
    },
    stand: {
      d: '2024-08-30',
      c: Klass.Verb,
      tokened: '@0 stands on @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%81n%C4%85',
      token: 'stan',
    },
    walk: {
      d: '2024-06-18',
      c: Klass.Verb,
      tokened: '[behavior] @0 walk on @{1:ground}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/walkan%C4%85',
      token: 'valk',
    },
    run: {
      d: '2024-06-18',
      c: Klass.Verb,
      tokened: '[behavior] @0 run on @{1:ground}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rinnan%C4%85',
      token: 'rin',
    },
    leap: {
      d: '2024-07-28',
      c: Klass.Verb,
      tokened: '[behavior] @0 (jump, leap, skip, hop) over @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlaupan%C4%85',
      token: 'klop',
    },
    swim: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[behavior] @0 (swimeth, flieth) in @{1:fluid}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swimman%C4%85',
      token: 'svim',
    },
    fly: {
      d: '2024-07-28',
      c: Klass.Verb,
      tokened: '[behavior] @0 flieth in @{1:air}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleugan%C4%85',
      token: 'fljuc',
    },
    dream: {
      d: '2024-10-16',
      c: Klass.Verb,
      tokened: '[behavior] @0 dreams @{1:dream}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/draumaz',
      token: 'drom',
    },

    // physiological
    eat: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[physiological] @0 eats @{1:food}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/etan',
      token: 'et',
    },
    bite: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '[physiological.eat] @0 bites @{1:food}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABtan%C4%85',
      token: 'bit',
    },
    chew: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '[physiological.eat] @0 chews @{1:food}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kewwan%C4%85',
      token: 'xev',
    },
    swallow: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '[physiological.eat] @0 swallow @{1:food}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swelgan%C4%85',
      token: 'svel',
    },
    vomit: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '[physiological] @0 vomits @{1:excreta}',
      o: 'https://en.wiktionary.org/wiki/puke',
      token: 'puk',
      complex: ['back', 'eat'],
    },
    shit: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '[physiological] @0 shits @{1:excreta}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/drit%C4%85',
      token: 'drit',
      complex: ['counter', 'eat'],
    },

    digest: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[physiological] @0 digests @{1:food}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meltan%C4%85',
      token: 'melt',
    },
    fuck: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[physiological] @0 fucketh A',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fukk%C5%8Dn%C4%85',
      token: 'fok',
    },
    sick: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[physiological] @0 (is sick, malfunctioneth)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/seukaz',
      token: 'sik',
    },
    healthy: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '[physiological] @0 is healthy',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz',
      token: 'sunt',
      complex: ['little', 'sick'],
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
      tokened: '@0 feeleth @{1:emotion, feeling}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hugiz',
      token: 'huc',
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
      complex: ['little', 'bad'],
    },
    sad: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened: '[emotion] @0 is (sad, depressed) about @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/surg%C5%8D',
      token: 'surc',
    },
    glad: {
      d: '2024-08-02',
      c: Klass.Verb,
      tokened: '[emotion] @0 is (happy, glad, merry) about @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/frawaz',
      token: 'frav',
      complex: ['little', 'sad'],
    },

    care: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened: '[emotion] @0 (regardeth, careth about) @{1:important}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kar%C5%8D',
      token: 'kar',
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
      complex: ['little', 'care'],
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
      tokened: '[emotion] @0 is (hateth, detests) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hataz',
      token: 'xat',
    },
    angry: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened: '[emotion] @0 is (angry with, mad at) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wrai%C3%BEaz',
      token: 'vred',
    },
    expect: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened: '[emotion] @0 (expecteth, is not surprised at) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABdan%C4%85',
      token: 'bid',
    },
    amaze: {
      d: '2024-08-02',
      c: Klass.Verb,
      tokened: '[emotion] @0 is (surprised, amazed) at @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wundr%C4%85',
      token: 'von',
      complex: ['little', 'expect'],
    },
    bore: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened: '[emotion] @0 (is bored with, is far from surprised with) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bur%C5%8Dn%C4%85',
      token: 'bur',
    },
    enjoy: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened: '[emotion] @0 enjoys @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neutan%C4%85',
      token: 'njut',
    },
    trust: {
      d: '2024-08-02',
      c: Klass.Verb,
      tokened: '[emotion] @0 trusts @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tr%C5%ABw%C4%81n%C4%85',
      token: 'truv',
    },
    doubt: {
      d: '2024-09-10',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tw%C4%ABflaz',
      tokened: '[emotion] @0 doubts @1',
      complex: ['little', 'trust'],
    },
    pride: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened: '[emotion] @0 is proud of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stultaz',
      token: 'stut',
    },
    shame: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened: '[emotion] @0 is ashamed of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skam%C5%8D',
      token: 'skam',
      complex: ['little', 'pride'],
    },
    shun: {
      d: '2024-09-27',
      c: Klass.Verb,
      tokened: '[emotion] @0 is (shuneth, avoideth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skeuhaz',
      token: 'skjuk',
    },
    want: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[emotion] @0 wants @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wiljan%C4%85',
      token: 'vil',
      complex: ['little', 'shun'],
    },
    love: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened: '[emotion] @0 (loveth, is romantically attracted to) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gernaz',
      token: 'jern',
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
      tokened: '[emotion.hate] @0 envieth @1',
      o: 'https://en.wiktionary.org/wiki/zelo#Latin',
      token: 'zel',
    },
    pity: {
      d: '2024-09-10',
      c: Klass.Verb,
      tokened: '[emotion] @0 (pitieth, feel sympathy) @1',
      o: 'https://en.wiktionary.org/wiki/ginatha#Old_Dutch',
      token: 'nad',
    },

    // facial
    laugh: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[facial-expression] @0 laugheth',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlahjan%C4%85',
      token: 'klah',
    },
    smile: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[facial-expression] @0 smileth',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sm%C4%ABlijan%C4%85',
      token: 'smil',
    },
    frown: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[facial-expression] @0 frowneth',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skelhaz',
      token: 'skel',
    },
    weep: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[facial-expression] @0 weepeth @{1:tear}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C5%8Dpijan%C4%85',
      token: 'vop',
    },
    yell: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '@0 (yelleth, crieth, shouteth) @{1:voice}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stun%C5%8Dn%C4%85',
      token: 'stun',
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
      tokened: '[mental] @0 thinketh @{1:idea}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEankijan%C4%85',
      token: 'dagk',
    },
    reason: {
      d: '2024-08-31',
      c: Klass.Verb,
      tokened: '[mental] @0 hath @{1:reason}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ra%C3%BEj%C7%AD',
      token: 'rad',
    },

    // communicate
    name: {
      d: '2024-07-28',
      c: Klass.Verb,
      tokened: '[communicate] @0 (meaneth, signifieth, is a name of) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4',
      token: 'nam',
    },
    speak: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '[communicate] @0 speaketh in @{1:language, protocol}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tal%C5%8D',
      token: 'tal',
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
      token: 'xlus',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlustiz',
      tokened:
        '[communicate] @0 (understandeth, decodeth) @{1:idea} from @{2:expression}',
      complex: ['counter', 'say'],
    },
    write: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '[communicate] @0 writeth @{1:idea} to @{2:expression}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C4%ABtan%C4%85',
      token: 'vrit',
    },
    read: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '[communicate] @0 readeth @{1:idea} from @{2:expression}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%93dan%C4%85',
      token: 'red',
      complex: ['counter', 'write'],
    },
    ask: {
      d: '2024-07-28',
      c: Klass.Verb,
      tokened: '[communicate] @0 asketh @{1:question} to @{2:questionee}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fr%C4%93g%C5%8D',
      token: 'frej',
    },
    answer: {
      d: '2024-07-28',
      c: Klass.Verb,
      tokened: '[communicate] @0 answereth @{1:answer} to @{2:questioner}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swar%C5%8Dn%C4%85',
      token: 'svar',
      complex: ['counter', 'ask'],
    },

    // performative
    greet: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[performative] @0 greeteth @{1:person}',
      o: 'https://en.wiktionary.org/wiki/salus#Latin',
      token: 'salut',
    },
    forgive: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[performative] @0 forgiveth @{1:event}',
      o: 'https://en.wiktionary.org/wiki/donare#Latin',
      token: 'don',
    },
    thank: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[performative] @0 thanketh @{1:event}',
      o: 'https://en.wiktionary.org/wiki/gratus#Latin',
      token: 'crat',
    },
    promise: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[performative] @0 (promiseth, guaranteeth, voweth) @{1:event}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitan%C4%85',
      token: 'het',
    },
    command: {
      d: '2024-09-29',
      c: Klass.Verb,
      tokened: '[performative] @0 (command, request, recommend) @{1:must}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stiurijan%C4%85',
      token: 'stjur',
    },

    // culture
    sing: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[culture] @0 singeth @{1:music, song}, play',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/singwan%C4%85',
      token: 'sig',
    },
    dance: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[culture] @0 danceth @{1:choreography}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEans%C5%8Dn',
      token: 'dans',
    },

    // biochemistry
    rot: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is rotten',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rut%C4%81n%C4%85',
      token: 'rut',
    },
    fresh: {
      d: '2024-07-24',
      c: Klass.Verb,
      tokened: '@0 is fresh',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/friskaz',
      token: 'frix',
      complex: ['little', 'rot'],
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
      tokened: '@0 (is male, produceth sperms)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gum%C3%B4',
      token: 'jum',
    },
    woman: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '@0 (is female, produceth ova)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABb%C4%85',
      token: 'viv',
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
      tokened: '[life.animal] @0 is a mammal',
      o: 'https://en.wiktionary.org/wiki/mammalis',
      token: 'mamal',
    },
    human: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a human',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mann-',
      token: 'man',
    },
    rat: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a (rat, mouse)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rattaz',
      token: 'rat',
    },
    hare: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a (hare, rabbit)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/has%C3%B4',
      token: 'xas',
    },
    cat: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a cat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kattuz',
      token: 'kat',
    },
    fox: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a (fox, vixen)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuhsaz',
      token: 'fox',
    },
    dog: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a {dog, bitch}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hundaz',
      token: 'xunt',
    },
    wolf: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a wolf',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulfaz',
      token: 'volf',
    },
    bear: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a bear',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ber%C3%B4',
      token: 'ber',
    },
    sheep: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a sheep',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%93p%C4%85',
      token: 'skep',
    },
    goat: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a goat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gaits',
      token: 'cet',
    },
    deer: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a deer',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raih%C3%B4',
      token: 'rek',
    },
    horse: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a {horse, stallion, mare}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hruss%C4%85',
      token: 'krus',
    },
    cow: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a cow',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/k%C5%ABz',
      token: 'kuv',
    },
    pig: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal.mammal] @0 is a pig',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%ABn%C4%85',
      token: 'svin',
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
      tokened: '[life.animal.reptile] @0 is a snake',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snegan%C4%85',
      token: 'snec',
    },

    bird: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal] @0 is a bird',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuglaz',
      token: 'focl',
    },
    crow: {
      d: '2024-07-15',
      c: Klass.Verb,
      tokened: '[life.animal.bird] @0 is a (crow, raven)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrabnaz',
      token: 'krab',
    },

    fish: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal] @0 is a fish',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fiskaz',
      token: 'fisk',
    },

    amphibia: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[life.animal] @0 is a amphibia',
      o: 'https://en.wiktionary.org/wiki/amphibius#Latin',
      token: 'anfib',
    },
    frog: {
      d: '2024-07-15',
      c: Klass.Verb,
      tokened: '[life.animal.amphibia] @0 is a frog',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fruskaz',
      token: 'frusk',
    },

    // plant
    plant: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[life] @0 is a plant',
      o: 'https://en.wiktionary.org/wiki/planta#Latin',
      token: 'plant',
    },
    tree: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[life.plant] @0 is a tree',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bagmaz',
      token: 'bacm',
    },

    // body
    body: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 is a body of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrefaz',
      token: 'kref',
    },
    bone: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a bone of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bain%C4%85',
      token: 'ben',
    },
    spine: {
      d: '2025-02-06',
      c: Klass.Verb,
      tokened: '[body] @0 is a spine of @{1:vertebrata}',
      o: 'https://en.wiktionary.org/wiki/spina#Latin',
      token: 'spin',
    },
    flesh: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a (flesh, meat, muscle) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaiski',
      token: 'flex',
    },
    fat: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '[body] @0 is a fat of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/faitaz',
      token: 'fet',
    },
    skin: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a (skin, peel) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skin%C3%BE%C4%85',
      token: 'skin',
    },
    head: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a head of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haubud%C4%85',
      token: 'hod',
    },
    neck: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a neck of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnakk%C3%B4',
      token: 'nak',
    },
    shoulder: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a (shoulder, buttock) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/skuldru',
      token: 'skud',
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
      tokened: '[body.extremity] @0 is a hand',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mund%C5%8D',
      token: 'munt',
    },
    trunk: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a (trunk, torso, stem) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stamniz',
      token: 'stam',
    },
    breast: {
      d: '2024-09-22',
      c: Klass.Verb,
      tokened: '[body] @0 is a (chest, breast) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brusts',
      token: 'brust',
    },
    belly: {
      d: '2024-09-22',
      c: Klass.Verb,
      tokened: '[body] @0 is a (chest, breast) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kwe%C3%BEuz',
      token: 'kved',
    },
    tail: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a tail of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stertaz',
      token: 'stet',
    },
    hair: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a (hair, fur) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hazdaz',
      token: 'haz',
    },
    horn: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a horn of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hurn%C4%85',
      token: 'xurn',
    },
    tooth: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a (tooth, fang) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tan%C3%BEs',
      token: 'tan',
    },
    nail: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a (nail, claw) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/naglaz',
      token: 'nel',
    },
    eye: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body.face] @0 is an eye of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aug%C3%B4',
      token: 'voc',
    },
    ear: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body.face] @0 is an ear of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aus%C3%B4',
      token: 'vos',
    },
    nose: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body.face] @0 is a nose of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nas%C5%8D',
      token: 'nas',
    },
    mouth: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body.face] @0 is a mouth of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mun%C3%BEaz',
      token: 'mun',
    },
    lip: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body.face] @0 is a lip of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lep%C3%B4',
      token: 'lep',
    },
    tongue: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body.face] @0 is a tongue of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tung%C7%AD',
      token: 'tug',
    },

    viscera: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[body] @0 is a (viscera, inner organ) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEarmaz',
      token: 'darm',
    },
    lung: {
      d: '2024-09-02',
      c: Klass.Verb,
      tokened: '[body.viscera] @0 is a lung of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lung%C3%B4',
      token: 'lug',
    },
    heart: {
      d: '2024-09-02',
      c: Klass.Verb,
      tokened: '[body.viscera] @0 is a heart of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hert%C3%B4',
      token: 'xerd',
    },
    maw: {
      d: '2024-09-02',
      c: Klass.Verb,
      tokened: '[body.viscera] @0 is a (maw, stomach) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mag%C3%B4',
      token: 'mac',
    },
    liver: {
      d: '2024-09-02',
      c: Klass.Verb,
      tokened: '[body.viscera] @0 is a liver of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libr%C5%8D',
      token: 'livr',
    },

    womb: {
      d: '2024-09-22',
      c: Klass.Verb,
      tokened: '[body.genitalia] @0 is a (prostate, womb) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wamb%C5%8D',
      token: 'vam',
    },
    vagina: {
      d: '2024-09-22',
      c: Klass.Verb,
      tokened: '[body.genitalia] @0 is a vagina of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fu%C3%BEiz',
      token: 'fod',
    },
    penis: {
      d: '2024-09-22',
      c: Klass.Verb,
      tokened: '[body.genitalia] @0 is a (penis, clitoris) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/pinti',
      token: 'pint',
    },

    egg: {
      d: '2024-09-16',
      c: Klass.Verb,
      tokened: '[body.egg] @0 is an egg of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ajj%C4%85',
      token: 'aj',
    },

    blood: {
      d: '2024-07-29',
      c: Klass.Verb,
      tokened: '[body.liquid] @0 is blood of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8D%C3%BE%C4%85',
      token: 'blod',
    },
    milk: {
      d: '2024-08-31',
      c: Klass.Verb,
      tokened: '[body.liquid] @0 is milk of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meluks',
      token: 'melk',
    },
    lymph: {
      d: '2024-08-31',
      c: Klass.Verb,
      tokened: '[body.liquid] @0 is lymph of @1',
      o: 'https://en.wiktionary.org/wiki/%CE%BD%CF%8D%CE%BC%CF%86%CE%B7#Ancient_Greek',
      token: 'ninf',
    },

    flower: {
      d: '2024-09-02',
      c: Klass.Verb,
      tokened: '[body.plant] @0 is a (flower, bloom, blossom) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8Dan%C4%85',
      token: 'bloh',
    },
    leaf: {
      d: '2024-09-02',
      c: Klass.Verb,
      tokened: '[body.plant] @0 is a leaf of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/laub%C4%85',
      token: 'lob',
    },
    root: {
      d: '2024-09-02',
      c: Klass.Verb,
      tokened: '[body.plant] @0 is a root of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C5%8Dts',
      token: 'vrot',
    },

    // civilization
    person: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '[civilisation] @0 is (a person, an individual, a citizen)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/liudiz',
      token: 'ljud',
    },
    nation: {
      d: '2024-08-24',
      c: Klass.Verb,
      tokened: '[civilisation] @0 is a country',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mark%C5%8D',
      token: 'marx',
    },
    rule: {
      d: '2024-07-28',
      c: Klass.Verb,
      tokened: '[civilisation] @0 (ruleth, ordereth, dictateth) @1',
      o: 'https://en.wiktionary.org/wiki/rego#Latin',
      token: 'rej',
    },

    noble: {
      d: '2024-10-01',
      c: Klass.Verb,
      tokened: '@0 is noble',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABkijaz',
      token: 'rik',
    },
    humble: {
      d: '2024-10-01',
      c: Klass.Verb,
      tokened: '@0 is humble',
      o: 'https://en.wiktionary.org/wiki/mj%C3%BAkr#Old_Norse',
      token: 'mjuk',
      complex: ['little', 'noble'],
    },

    work: {
      d: '2024-02-13',
      c: Klass.Verb,
      tokened: '@0 worketh @{1:operation}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werk%C4%85',
      token: 'verx',
    },
    dwell: {
      d: '2024-12-20',
      c: Klass.Verb,
      tokened: '@0 dwelleth in @{1:house}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C5%8D%C3%BE%C5%8D',
      token: 'bod',
    },
    use: {
      d: '2024-06-14',
      c: Klass.Verb,
      tokened: '@0 useth @{1:tool} for @{2:purpose}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nut%C5%8D',
      token: 'nut',
    },
    help: {
      d: '2024-06-18',
      c: Klass.Verb,
      tokened: '@0 helpeth @{1:event}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/helpan%C4%85',
      token: 'xelp',
    },
    harm: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '@0 (harmeth, hurteth, damageth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ska%C3%BE%C3%B4',
      token: 'skad',
    },

    wont: {
      d: '2024-09-01',
      c: Klass.Verb,
      tokened: '@0 is used to @{1:custom, habit, routine, usual, regular}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wun%C4%81n%C4%85',
      token: 'vont',
    },
    lead: {
      d: '2024-09-01',
      c: Klass.Verb,
      tokened: '@0 (leadeth, guideth) @{1:follower}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dragan%C4%85',
      token: 'drac',
    },

    stab: {
      d: '2024-11-24',
      c: Klass.Verb,
      tokened: '@{0:sharp} stabeth',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stikan%C4%85',
      token: 'stik',
    },
    cut: {
      d: '2024-11-21',
      c: Klass.Verb,
      tokened: '@{0:sharp} cuteth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sn%C4%AB%C3%BEan%C4%85',
      token: 'sned',
    },

    // human action
    pick: {
      d: '2024-09-09',
      c: Klass.Verb,
      tokened: '@0 (picketh, hunteth, gathereth, collects) @{1:harvest, prey}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/jakk%C5%8Dn%C4%85',
      token: 'jak',
    },

    // human-human action
    lick: {
      d: '2024-08-19',
      c: Klass.Verb,
      tokened: '[body-interaction] @0 licketh @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/likk%C5%8Dn%C4%85',
      token: 'lix',
      complex: ['tongue', 'touch'],
    },

    kiss: {
      d: '2024-11-23',
      c: Klass.Verb,
      tokened: '[body-interaction] @0 kisseth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kussaz',
      token: 'kus',
      complex: ['lip', 'touch'],
    },
    caress: {
      d: '2024-11-23',
      c: Klass.Verb,
      tokened: '[body-interaction] @0 carreseth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/streukan%C4%85',
      token: 'stjuk',
    },
    hug: {
      d: '2024-11-23',
      c: Klass.Verb,
      tokened: '[body-interaction] @0 hugeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fa%C3%BEmaz',
      token: 'fadm',
    },
    hit: {
      d: '2024-11-23',
      c: Klass.Verb,
      tokened: '[body-interaction] @0 (hiteth, kicketh, puncheth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hittijan%C4%85',
      token: 'hit',
    },
    kick: {
      d: '2024-11-23',
      c: Klass.Verb,
      tokened: '[body-interaction] @0 kicketh @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spurnan%C4%85',
      token: 'spun',
      complex: ['foot', 'hit'],
    },
    punch: {
      d: '2024-11-23',
      c: Klass.Verb,
      tokened: '[body-interaction] @0 puncheth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slahan%C4%85',
      token: 'slak',
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
      tokened: '[artifact] @{0:spear, pin} stingeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/speru',
      token: 'sper',
    },
    rod: {
      d: '2024-07-28',
      c: Klass.Verb,
      tokened: '[artifact] @{0:rod, stuff, wand, club} supporteth @1',
      o: 'https://en.wiktionary.org/wiki/rod',
      token: 'rud',
    },
    dish: {
      d: '2024-12-23',
      c: Klass.Verb,
      tokened: '[artifact] @{0:dish, bowl, cup, container} containeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnappaz',
      token: 'knap',
    },
    fork: {
      d: '2024-12-23',
      c: Klass.Verb,
      tokened: '[artifact] @{0:fork} stingeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Celtic/gabl%C4%81',
      token: 'cavl',
    },
    spoon: {
      d: '2024-12-23',
      c: Klass.Verb,
      tokened: '[artifact] @{0:spoon, scoop} scoopeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sp%C4%93nuz',
      token: 'spen',
    },
    tong: {
      d: '2024-12-23',
      c: Klass.Verb,
      tokened: '[artifact] @{0:tong, plier, chopstick} grabeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tang%C5%8D',
      token: 'tag',
    },
    money: {
      d: '2024-08-25',
      c: Klass.Verb,
      tokened: '[artifact] @0 is (money, coin, bill)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fehu',
      token: 'fex',
    },
    ship: {
      d: '2024-10-05',
      c: Klass.Verb,
      tokened: '[artifact] @0 is a (ship, boat)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/baitaz',
      token: 'bet',
    },
    bridge: {
      d: '2025-02-08',
      c: Klass.Verb,
      tokened: '@0 {is a bridge between, connects} of @{1}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brugj%C7%AD',
      token: 'bruc',
    },

    // misc
    knot: {
      d: '2024-12-23',
      c: Klass.Verb,
      tokened: '@0 is a (knot, tangle, tie, bond) of @{1}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/knutt%C3%B4',
      token: 'knut',
    },
    age: {
      d: '2024-12-07',
      c: Klass.Verb,
      tokened: '@0 is at age of @{1:interval}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/alan%C4%85',
      token: 'al',
    },

    sentence: {
      d: '2024-10-05',
      c: Klass.Verb,
      tokened: '[grammar] @0 is a sentence',
      o: 'https://en.wiktionary.org/wiki/%CF%86%CF%81%CE%AC%CF%83%CE%B9%CF%82#Ancient_Greek',
      token: 'fras',
    },
    clause: {
      d: '2024-10-05',
      c: Klass.Verb,
      tokened: '[grammar] @0 is a clause',
      o: 'https://en.wiktionary.org/wiki/clauso#Latin',
      token: 'klavs',
    },
    word: {
      d: '2024-10-05',
      c: Klass.Verb,
      tokened: '[grammar] @0 is a word',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wurd%C4%85',
      token: 'vord',
    },

    verb: {
      d: '2024-10-05',
      c: Klass.Verb,
      tokened: '[grammar] @0 is a verb',
      o: 'https://en.wiktionary.org/wiki/verbo#Latin',
      token: 'verb',
    },
    case: {
      d: '2024-10-05',
      c: Klass.Verb,
      tokened: '[grammar] @0 is an case of @1',
      o: 'https://en.wiktionary.org/wiki/casu#Latin',
      token: 'kas',
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
      complex: ['verb', 'zero', '_ordinal', 'arm'],
    },
    dative: {
      d: '2024-12-23',
      c: Klass.Verb,
      tokened: '[grammar] @0 is dative',
      complex: ['verb', 'one', '_ordinal', 'arm'],
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
          //idiom: ['nation', 'called', '$' + ofAcronym(iso)],
          complex: ['nation', '$' + ofAcronym(iso)],
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
          complex: ['done', 'speak', '$' + ofAcronym(iso)],
          tokened: `[language] @0 is ${adjective} language (${iso})`,
        },
      ])
    ),
  }).flatMap(([k, v]) => {
    const r = [];

    const { token, o, complex, idiom, ...vRest } = v;

    if (token)
      r.push([k, { ...vRest, formation: Formation.Simplex, o, token }]);
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
  code
    .replace(
      /[a-z_]+\{?|[\[\]\}\*\#]|\,/g,
      (k) =>
        dic.get(k)?.token ??
        dic.get(k + '*')?.token ??
        dic.get(k + '#')?.token ??
        k
    )
    .replace(/ =/g, '');

export default dic;
