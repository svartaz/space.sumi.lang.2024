import { replaceEach } from "./common";
import { checkSonority, invalid } from "./phonology";

export const name = 'kxim';

const fromAcronym = (acronym: string) => replaceEach(acronym, [
  [/K/g, 'ka'],
  [/C/g, 'ca'],
  [/H/g, 'xa'],
  [/G/g, 'ga'],

  [/X/g, 'xi'],
  [/J/g, 'ji'],

  [/T/g, 'te'],
  [/D/g, 'de'],
  [/S/g, 'se'],
  [/Z/g, 'ze'],
  [/N/g, 'ne'],
  [/L/g, 'le'],
  [/R/g, 're'],

  [/P/g, 'pu'],
  [/B/g, 'bu'],
  [/F/g, 'fu'],
  [/V/g, 'vu'],
  [/M/g, 'mu'],

  [/Q/g, 'ku'],
  [/W/g, 'vi'],

  [/I/g, 'hi'],
  [/Y/g, 'hy'],
  [/E/g, 'he'],
  [/A/g, 'ha'],
  [/O/g, 'ho'],
  [/U/g, 'hu'],
]);

const makeComplex = (betokeners: string[]) =>
  replaceEach(betokeners.join('-'), [
    [
      /([ktpcdbhxsfjz]+)-([ktpcdbhxsfjz]+)/g, (_, tail, head) => {
        const voicedTail = /[cdbjzv]/.test(tail);
        const voicedHead = /[cdbjzv]/.test(head);

        return [
          3 <= (tail + head).length,
          !checkSonority(tail + head),
          !voicedTail && voicedHead,
          voicedTail && !voicedHead,
        ].some(it => it)
          ? tail + 'y' + head
          : tail + head;
      }
    ],
    [/(?<=([ieaou])[^ieaou]+)V/g, '$1'],
    [/-/g, ''],

    [/(.)\1+/g, '$1'],
    [/[nm](?=[kcg])/g, 'g'],
    [/[gm](?=[tdnrlhxsfjzvn])/g, 'n'],
    [/[gn](?=[pbm])/g, 'm'],
  ]);

const valueKlass = (klass: string) => {
  while (/^.+?\\|\/.+?$/.test(klass))
    klass = klass
      .replace(/^.+?\\/, '')
      .replace(/\/.+?$/, '')

  return klass;
}

export enum Formation {
  simplex,
  complex,
  idiom,
}

const toIdiom = (betokener: string[]) => ({
  betokener,
  origin: betokener.join('_'),
  formation: Formation.idiom,
});

const dual = (
  k: string,
  date: string,
  klass: string,
  betokened: string,
  valueSimplex: { betokener: string | string[], origin: string },
  keysComplex: string[],
) => ({
  [k]: { date, klass, ...valueSimplex, formation: Formation.simplex, betokened },
  [k + '_']: { date, klass, betokener: keysComplex, formation: Formation.complex, betokened, },
});

interface ValuePre {
  date: string,
  betokener: string | string[],
  klass: string,
  betokened: string,
  formation?: Formation,
  origin?: string,
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

const dicPre = new Map<string, ValuePre>(Object.entries({
  _acc: { date: '2024-02-13', klass: 'case', betokener: `-e`, origin: 'a priori', betokened: 'accusative' },
  _dat: { date: '2024-02-13', klass: 'case', betokener: `-o`, origin: 'a priori', betokened: 'dative' },
  _adv: { date: '2024-02-13', klass: 'case', betokener: `-ai`, origin: 'a priori', betokened: 'adverb' },

  not: { date: '2024-02-13', klass: 'connective', betokener: 'ni', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne', betokened: '[logic] not, negation' },
  and: { date: '2024-02-13', klass: 'connective', betokener: 'he', origin: 'https://en.wiktionary.org/wiki/et#Latin', betokened: '[logic] and, both, conjunction' },
  or: { date: '2024-02-13', klass: 'connective', betokener: 'ho', origin: 'https://en.wiktionary.org/wiki/aut#Latin', betokened: '[logic] or, either, disjunction' },
  iff: { date: '2024-02-13', klass: 'connective', betokener: 'ha', origin: 'a priori', betokened: '[logic] if and only iff, biimplication' },

  begin: { date: '2024-02-13', klass: 'preverb', betokener: `-i`, origin: 'a priori', betokened: '[aspect] begin, inchoative' },
  end: { date: '2024-02-13', klass: 'preverb', betokener: `-u`, origin: 'https://en.wiktionary.org/wiki/%D0%B4%D0%BE-#Russian', betokened: '[aspect] end, completive' },

  did: { date: '2024-02-13', klass: 'postverb', betokener: `-k`, origin: 'a priori', betokened: '[tense] did, in the past' },
  do: { date: '2024-02-13', klass: 'postverb', betokener: `-n`, origin: 'a priori', betokened: '[tense] now, at present' },
  shall: { date: '2024-02-13', klass: 'postverb', betokener: `-p`, origin: 'a priori', betokened: '[tense] shall, in the future' },

  would: { date: '2024-02-13', klass: 'preverb', betokener: '-s', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Slavic/by', betokened: '[mood] would, were, may, irrealis, subjunctive' },

  so: { date: '2024-02-13', klass: 'preverb', betokener: 'du', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEus', betokened: '[restrictiveness] which is, so (non-restrictive)' },
  may: { date: '2024-02-13', klass: 'preverb', betokener: 'me', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/magan%C4%85', betokened: '[mood] may, possibly' },
  must: { date: '2024-02-13', klass: 'preverb', betokener: 'ku', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85', betokened: '[mood] must, necessarily' },
  done: { date: '2024-02-13', klass: 'preverb', betokener: 'ce', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-', betokened: '[voice] accusative, is done by' },
  done_to: { date: '2024-02-13', klass: 'preverb', betokener: 'co', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-', betokened: '[voice] dative, is done to by' },
  in_essence: { date: '2024-10-19', klass: 'preverb', betokener: 'se', origin: 'https://en.wiktionary.org/wiki/esse#Latin', betokened: '[essentiality] in essence, in a nominal sense' },
  by_accident: { date: '2024-10-19', klass: 'preverb', betokener: 'ta', origin: 'https://en.wiktionary.org/wiki/stare#Latin', betokened: '[essentiality] by accident, in a verbal sense' },

  // clause
  which: { date: '2024-02-13', klass: 'v/sentence', betokener: 've', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwat', betokened: '@0 is that which @{sentence}' },
  that: { date: '2024-02-13', klass: 'v/sentence', betokener: 'de', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEat', betokened: '@0 is the (event, statement) that @{sentence}' },
  whether: { date: '2024-07-28', klass: 'v/sentence', betokener: 'je', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ja', betokened: '@0 is whether @{sentence}' },
  ness: { date: '2024-10-20', klass: 'v/sentence', betokener: 'ke', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haiduz', betokened: '@0 is the extent how much @{sentence}' },

  _period: { date: '2024-02-13', klass: 'other', betokener: 'lo', origin: 'https://en.wiktionary.org/wiki/%E5%9B%89#Etymology_2', betokened: 'end of clause' },
  called: { date: '2024-02-13', klass: 'other', betokener: 'na', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4', betokened: '@0 is called @{name}' },

  // base numeral
  zero: { date: '2024-02-13', klass: 'numeral', betokener: 'zi', origin: 'https://en.wiktionary.org/wiki/%D8%B5%D9%81%D8%B1#Arabic', betokened: '[digit] 0' },
  one: { date: '2024-02-13', klass: 'numeral', betokener: 'ka', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/H%C3%A1ykas', betokened: '[digit] 1' },
  two: { date: '2024-02-13', klass: 'numeral', betokener: 'tav', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twai', betokened: '[digit] 2' },
  three: { date: '2024-02-13', klass: 'numeral', betokener: 'dir', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%ABz', betokened: '[digit] 3' },
  four: { date: '2024-02-13', klass: 'numeral', betokener: 'fed', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fedw%C5%8Dr', betokened: '[digit] 4' },
  five: { date: '2024-02-13', klass: 'numeral', betokener: 'pan', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/p%C3%A1n%C4%8Da', betokened: '[digit] 5' },
  six: { date: '2024-02-13', klass: 'numeral', betokener: 'xax', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/%C5%A1w%C3%A1%C4%87%C5%A1', betokened: '[digit] 6' },
  seven: { date: '2024-02-13', klass: 'numeral', betokener: 'seb', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sebun', betokened: '[digit] 7' },
  eight: { date: '2024-02-13', klass: 'numeral', betokener: 'vot', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aht%C5%8Du', betokened: '[digit] 8' },
  nine: { date: '2024-02-13', klass: 'numeral', betokener: 'nin', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/newun', betokened: '[digit] 9' },

  infinite: { date: '2024-09-06', klass: 'numeral', betokener: 'sin', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sin-', betokened: 'infinite' },

  kilo: { date: '2024-02-13', klass: 'numeral', betokener: 'dus', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BE%C5%ABsund%C4%AB', betokened: '[separator] 1000, `,`' },
  _decimal: { date: '2024-02-13', klass: 'numeral', betokener: 'pug', origin: 'https://en.wiktionary.org/wiki/pungo#Latin', betokened: '[separator] decimal separator, `.`' },

  how_many: { date: '2024-02-13', klass: 'numeral', betokener: 'vo', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C5%8D', betokened: '[interogative] how many', },

  each: { date: '2024-02-13', klass: 'numeral', betokener: 'pa', origin: 'https://en.wiktionary.org/wiki/%CF%80%E1%BE%B6%CF%82#Ancient_Greek', betokened: 'each, every, all', },

  at_least: { date: '2024-02-13', klass: 'numeral', betokener: 'mes', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/maiz%C3%B4', betokened: '[comparative] at least' },
  at_most: { date: '2024-09-17', klass: 'numeral', ...toIdiom(['done', 'at_least']), betokened: '[comparative] at most' },
  less_than: { date: '2024-08-31', klass: 'numeral', betokener: 'les', origin: 'laisiz', betokened: '[comparative] less than' },
  more_than: { date: '2024-09-17', klass: 'numeral', ...toIdiom(['done', 'less_than']), betokened: '[comparative] more than' },

  plural: { date: '2024-09-17', klass: 'numeral', betokener: 'mag', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/managaz', betokened: 'plural, more than one', },

  // arithmetic
  Add: { date: '2024-02-13', klass: 'numeral', betokener: 'pul', origin: 'https://en.wiktionary.org/wiki/plus#Latin', betokened: '[binary] addition, `+`' },
  Sub: { date: '2024-02-13', klass: 'numeral', betokener: 'min', origin: 'https://en.wiktionary.org/wiki/minor#Latin', betokened: '[binary] subtraction, `-`' },
  Mul: { date: '2024-02-13', klass: 'numeral', betokener: 'mul', origin: 'https://en.wiktionary.org/wiki/multiplicare#Latin', betokened: '[binary] multiplication, `*`' },
  Div: { date: '2024-02-13', klass: 'numeral', betokener: 'div', origin: 'https://en.wiktionary.org/wiki/dividere#Latin', betokened: '[binary] division, `\u002F`' },
  Mod: { date: '2024-08-24', klass: 'numeral', betokener: 'mod', origin: 'https://en.wiktionary.org/wiki/modulo#Latin', betokened: '[binary] modulo, `%`' },
  Exp: { date: '2024-08-24', klass: 'numeral', betokener: 'poter', origin: 'https://en.wiktionary.org/wiki/potere#Latin', betokened: '[binary] exponential, `^`' },
  Log: { date: '2024-08-24', klass: 'numeral', betokener: 'rocar', origin: 'https://en.wiktionary.org/wiki/logarithmo#Latin', betokened: '[binary] logarithm' },
  Root: { date: '2024-08-24', klass: 'numeral', betokener: 'radik', origin: 'https://en.wiktionary.org/wiki/radice#Latin', betokened: '[binary] root' },

  _ordinal: { date: '2024-08-02', klass: 'v/number', betokener: 'do', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-i%C3%BE%C5%8D', betokened: '@0 is @{number}-th' },
  _cardinal: { date: '2024-08-02', klass: 'v/number', betokener: 'fe', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/felu', betokened: '@0 contains @{number} elements' },

  first: { date: '2024-09-14', klass: 'verb', ...toIdiom(['Ordinal', 'zero']), betokened: '@0 is (0th, first, primary)' },
  second: { date: '2024-09-14', klass: 'verb', ...toIdiom(['Ordinal', 'one']), betokened: '@0 is (1st, second, other)' },
  last: { date: '2024-09-14', klass: 'verb', ...toIdiom(['Ordinal', 'each']), betokened: '@0 is (last, final)' },

  // pronoun
  i: { date: '2024-02-13', klass: 'v', betokener: 'ma', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mek', betokened: '[definite] @0 is me' },
  thou: { date: '2024-02-13', klass: 'v', betokener: 'da', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEek', betokened: '[definite] @0 is thee' },
  he: { date: '2024-02-13', klass: 'v', betokener: 'xa', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiz', betokened: '[definite] @0 is (him, it, this,  that, the definite entity)' },
  self: { date: '2024-02-13', klass: 'v', betokener: 'sa', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sek', betokened: '@0 is oneself' },
  now: { date: '2024-02-13', klass: 'v', betokener: 'nu', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nu', betokened: '[definite] @0 is (now, here, the present point in spacetime)' },
  who: { date: '2024-02-13', klass: 'v', betokener: 'va', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwaz', betokened: '[interogative] @0 is who' },

  this: { date: '2024-09-16', klass: 'v', ...toIdiom(['he', 'near']), betokened: '@0 is this' },
  yon: { date: '2024-09-16', klass: 'v', ...toIdiom(['he', 'far']), betokened: '@0 is that' },

  // extent
  normal: { date: '2024-09-29', klass: 'v', betokener: 'van', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wanaz', betokened: '[extent.subjective] @0 is of (normal, default, usual, ordinary) extent, at subjective norm' },
  high: { date: '2024-09-29', klass: 'v', betokener: 'mik', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mikilaz', betokened: '[extent.subjective] @0 is of (high, great) extent, above subjective norm' },
  low: { date: '2024-09-29', klass: 'v', betokener: 'lit', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%ABtilaz', betokened: '[extent.subjective] @0 is of (low, small) extent, below subjective norm' },
  positive: { date: '2024-09-29', klass: 'v', betokener: 'vel', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wela', betokened: '[extent.polarity] @0 is (positive, above objective norm)' },
  negative: { date: '2024-09-29', klass: 'v', betokener: 'mis', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/missa-', betokened: '[extent.polarity] @0 is (negative, below objective norm)' },
  up: { date: '2024-09-29', klass: 'v', betokener: 'ris', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABsan%C4%85', betokened: '[extent.dynamic] @0 is (rises, goes up, ascends) along with @1' },
  down: { date: '2024-09-29', klass: 'v', betokener: 'fal', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fallan%C4%85', betokened: '[extent.dynamic] @0 is (falls, goes down, descends) along with @1' },
  maximal: { date: '2024-02-13', klass: 'v', betokener: 'tup', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tuppaz', betokened: '[extent.extreme] @0 is (maximal, possibly highest)' },
  minimal: { date: '2024-02-13', klass: 'v', betokener: 'but', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/butmaz', betokened: '[extent.extreme] @0 is (minimal, possibly lowest)' },

  [name]: { date: '2024-02-17', klass: 'v', betokener: name, origin: undefined, betokened: `@0 is the language ${name}` },

  // basic
  deny: { date: '2024-08-30', klass: 'v', betokener: 'ne', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne', betokened: '@0 (contradicts, negates, denies) @1', },
  back: { date: '2024-06-14', klass: 'v', betokener: 're', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/wre-', betokened: '@0 is temporally (inverse, opposite) of @1', },
  counter: { date: '2024-06-14', klass: 'v', betokener: 'ja', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-', betokened: '@0 (complements, is dual of) @1', },
  relate: { date: '2024-09-14', klass: 'v', betokener: 'hisk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-iskaz', betokened: '@0 is (related to @1, @1-ish), ', },
  exist: { date: '2024-02-13', klass: 'v', betokener: 'ves', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wesan%C4%85', betokened: '@0 (exists, is a thing, is an object)', },
  happen: { date: '2024-08-23', klass: 'v', betokener: 'skek', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skehan%C4%85', betokened: '@0 (happens, occurs, realises, is actual, is an event)', },
  let: { date: '2024-02-13', klass: 'v', betokener: 'let', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93tan%C4%85', betokened: '@0 (causes, lets) @{1:result, effect}', },

  make: { date: '2024-08-02', klass: 'v', betokener: 'skap', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skapjan%C4%85', betokened: '@0 (makes, builds, creates) @1 from @{2:material, component}', },
  ...dual('break', '2024-06-14', 'v', '@0 (breaks, destructs) @1 into @{2:pieces, components}', { betokener: 'brek', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brekan%C4%85' }, ['back', 'make']),

  have: { date: '2024-08-19', klass: 'v', betokener: 'hab', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/habjan%C4%85', betokened: '@0  (has, owns) @{1:property}', },
  give: { date: '2024-02-13', klass: 'v', betokener: 'ceb', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/geban%C4%85', betokened: '@0 gives @1 to @{2:receiver}', },
  ...dual('take', '2024-08-24', 'v', '@0 takes @1 from @2', { betokener: 'nem', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neman%C4%85' }, ['back', 'give']),

  // abstract
  from: { date: '2024-08-26', klass: 'v', betokener: 'kem', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kweman%C4%85', betokened: '@0 is from @{1:source, origin}', },
  to: { date: '2024-08-26', klass: 'v', betokener: 'jan', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/g%C4%81n%C4%85', betokened: '@0 is to @{1:sink, destination}', },
  at: { date: '2024-08-26', klass: 'v', betokener: 'lib', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%ABban%C4%85', betokened: '@0 is at @{1:position, location, place}', },
  in: { date: '2024-08-19', klass: 'v', betokener: 'hin', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/in', betokened: '@0 is in @{1:range, area}', },

  group: { date: '2024-08-06', klass: 'v', betokener: 'cad', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gad', betokened: '@0 is (collection, set, group, list)', },
  part: { date: '2024-08-06', klass: 'v', betokener: 'dail', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dailiz', betokened: '@0 is a (part, component) of @{1:whole}', },
  //kind: { date: '2024-07-15', klass: 'v', betokener: '', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kin%C3%BEiz', betokened: '@0 is a (klass, kind, type, subset) of @{1:whole}' },
  complex: { date: '2024-08-25', klass: 'v', betokener: ['high', 'done', 'part'], betokened: '@0 (is complex, consists of many parts)' },
  simple: { date: '2024-08-25', klass: 'v', betokener: ['low', 'done', 'part'], betokened: '@0 (is simple, consists of few parts)' },
  atom: { date: '2024-08-25', klass: 'v', betokener: ['one', 'done', 'part'], betokened: '@0 is an atom' },

  contain: { date: '2024-08-02', klass: 'v', betokener: 'hald', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haldan%C4%85', betokened: '@0 is contains @1' },
  //...dual('full', '2024-08-02', 'v', '@0 is (perfect, complete, full of @1)', fromGem(''), toComplex(['maximal', 'contain'])),
  //...dual('empty', '2024-09-26', 'v', '@0 is (empty, blank) of @1 ', fromGem(''), toComplex(['minimal', 'contain'])),

  move: { date: '2024-08-31', klass: 'v', betokener: 'vec', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wegan%C4%85', betokened: '@0 (moves, is dynamic)' },
  ...dual('stop', '2024-08-31', 'v', '@0 (stops, halts, is static)', { betokener: 'stup', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/stopp%C5%8Dn' }, ['minimal', 'move']),

  point: { date: '2024-10-01', klass: 'v', betokener: 'stal', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stallaz', betokened: '@0 is a (point, position, dot)' },
  interval: { date: '2024-10-01', klass: 'v', betokener: 'tvisk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twiskaz', betokened: '@0 is (an interval, an area, a volume, a domain)' },

  // physics
  world: { date: '2024-02-13', klass: 'v', betokener: 'xaim', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haimaz', betokened: '@0 is a (world, universe)' },
  space: { date: '2024-02-13', klass: 'v', betokener: 'rum', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABm%C4%85', betokened: '@0 is the 3-dimensional physical spacial continuum' },
  time: { date: '2024-02-13', klass: 'v', betokener: 'tim', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABm%C3%B4', betokened: '@0 is the 1-dimensional physical temporal continuum' }, // https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABdiz
  thing: { date: '2024-02-13', klass: 'v', betokener: 'dig', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEing%C4%85', betokened: '@0 is a (thing, matter) located in a spacetime' },
  mass: { date: '2024-08-31', klass: 'v', betokener: 'viht', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wihtiz', betokened: '@0 is a mass of @1' },

  energy: { date: '2024-08-31', klass: 'v', betokener: 'xun', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kunnan%C4%85', betokened: '@0 is energy of @1' },
  heat: { date: '2024-09-06', klass: 'v', betokener: ['hot', 'energy'], betokened: '@0 is heat in @1' },
  electric: { date: '2024-08-31', klass: 'v', betokener: 'spark', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sparkaz', betokened: '@0 is (electricity, electric charge) in @1' },
  force: { date: '2024-10-01', klass: 'v', betokener: 'vald', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wald%C4%85', betokened: '@0 is force' },

  wave: { date: '2024-08-19', klass: 'v', betokener: 'hund', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/un%C3%BE%C4%AB', betokened: '@0 is a wave of @{1:medium}' },
  light: { date: '2024-02-13', klass: 'v', betokener: 'lyht', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leuht%C4%85', betokened: '[wave] @0 is (a light, an electromagnetic wave)' },
  sound: { date: '2024-08-19', klass: 'v', betokener: 'klig', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/klingan%C4%85', betokened: '[wave] @0 is a sound from @1' },
  turn: { date: '2024-08-19', klass: 'v', betokener: 'spin', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spinnan%C4%85', betokened: '@0 (turns, rotates, spins) around @{1:pivot, center}' },

  // physical attribute
  big: { date: '2024-02-13', klass: 'v', betokener: 'crot', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grautaz', betokened: '@0 is (big, great)', },
  ...dual('small', '2024-09-26', 'v', '@0 is small', { betokener: 'smar', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smalaz' }, ['low', 'big']),
  long: { date: '2024-02-13', klass: 'v', betokener: 'lag', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/langaz', betokened: '@0 is (long, big in 1 dimension and small in others)', },
  ...dual('short', '2024-09-26', 'v', '@0 is (short, small in 1 dimension and small in others)', { betokener: 'skurt', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skurtaz' }, ['low', 'long']),

  thick: { date: '2024-02-13', klass: 'v', betokener: 'dek', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEekuz', betokened: '@0 is thick' },
  sharp: { date: '2024-07-28', klass: 'v', betokener: 'skarp', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skarpaz', betokened: '@{0:angle} is sharp' },
  heavy: { date: '2024-07-14', klass: 'v', betokener: 'sver', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%93raz', betokened: '@0 is heavy' },
  dense: { date: '2024-07-15', klass: 'v', betokener: 'dint', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEinhtaz', betokened: '@0 is (dense, heavy per volume)' },

  swift: { date: '2024-06-18', klass: 'v', betokener: 'snel', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snellaz', betokened: '@0 is (swift, quick)' },
  ...dual('slow', '2024-09-06', 'v', '@0 is slow', { betokener: 'slaiv', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slaiwaz' }, ['low', 'swift']),
  rough: { date: '2024-08-24', klass: 'v', betokener: 'ruk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABhaz', betokened: '@0 (is rough, is coarse, has friction) against @1' },
  ...dual('smooth', '2024-09-26', 'v', '@0 (is smooth, is sleek, has low friction)', { betokener: 'srik', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sl%C4%ABkan%C4%85' }, ['low', 'rough']),
  soft: { date: '2024-09-26', klass: 'v', betokener: 'vik', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABkwan%C4%85', betokened: '@0 is soft against @1' },
  ...dual('hard', '2024-09-26', 'v', '@0 is (hard, firm) against @1', { betokener: 'fast', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fastuz' }, ['low', 'soft']),
  hot: { date: '2024-08-30', klass: 'v', betokener: 'varm', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/warmaz', betokened: '@0 is (hot, warm)' },
  ...dual('cold', '2024-08-30', 'v', '@0 (cold, cool)', { betokener: 'fric', origin: 'https://en.wiktionary.org/wiki/frigus' }, ['low', 'hot']),
  far: { date: '2024-08-08', klass: 'v', betokener: 'fer', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ferrai', betokened: '@0 is (far, distant, remote) from @1' },
  ...dual('near', '2024-08-08', 'v', '@0 is (near, close to) @1', { betokener: 'nex', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/n%C4%93hwaz' }, ['low', 'far']),
  contact: { date: '2024-08-08', klass: 'v', betokener: ['minimal', 'far'], betokened: '@0 (touches, is adjacent, is in contact with) @1' },

  // local position
  below: { date: '2024-02-13', klass: 'v', betokener: 'nid', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ni%C3%BEan%C4%93', betokened: '[position] @0 is below @{1:above, far against gravity}', },
  hind: { date: '2024-02-13', klass: 'v', betokener: 'hind', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hinder', betokened: '[position.local] @0 is behind @{1:front}', },
  left: { date: '2024-02-13', klass: 'v', betokener: 'ligk', origin: 'hlinkaz', betokened: '[position] @0 is to the left of @{1:right}' },

  // global position
  before: { date: '2024-02-13', klass: 'v', betokener: 'fur', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai', betokened: '[position.global] @0 is before @{1:after}' },
  east: { date: '2024-08-24', klass: 'v', betokener: 'host', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/austraz', betokened: '[position.global] @0 is to the west of @{1:to the east, far agaisnt rotation}' },
  north: { date: '2024-08-24', klass: 'v', betokener: 'nurd', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nur%C3%BEraz', betokened: '[position.global] @0 is to the north of @{1:to the south}' },

  // state of matters
  solid: { date: '2024-02-13', klass: 'v', betokener: 'stif', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%ABfaz', betokened: '[state-of-matter] @0 is solid' },
  liquid: { date: '2024-02-13', klass: 'v', betokener: 'flyt', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleutan%C4%85', betokened: '[state-of-matter] @0 is liquid' },
  gas: { date: '2024-02-13', klass: 'v', betokener: 'cas', origin: 'https://en.wiktionary.org/wiki/gas#Dutch', betokened: '[state-of-matter] @0 is gas', },
  plasm: { date: '2024-07-15', klass: 'v', betokener: 'plasm', origin: 'https://en.wiktionary.org/wiki/%CF%80%CE%BB%CE%AC%CF%83%CE%BC%CE%B1#Ancient_Greek', betokened: '[state-of-matter] @0 is plasm', },

  // matter
  water: { date: '2024-02-13', klass: 'v', betokener: 'vat', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wat%C5%8Dr', betokened: '[matter] @0 is water' },
  salt: { date: '2024-02-13', klass: 'v', betokener: 'salt', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/salt%C4%85', betokened: '[matter] @0 is salt' },
  stone: { date: '2024-08-19', klass: 'v', betokener: 'sten', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stainaz', betokened: '[matter] @0 is stone' },
  smoke: { date: '2024-09-16', klass: 'v', betokener: 'dverm', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dwemr%C4%85', betokened: '[matter] @0 is smoke' },
  ash: { date: '2024-09-16', klass: 'v', betokener: 'hask', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ask%C7%AD', betokened: '[matter] @0 is ash' },

  ...dual('wet', '2024-09-16', 'v', '@0 is (wet, moist)', { betokener: 'nat', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nataz' }, ['contain', 'water']),
  ...dual('dry', '2024-09-16', 'v', '@0 is dry', { betokener: 'drux', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/druknaz' }, ['low', 'contain', 'water']),

  // colour
  colour: { date: '2024-02-13', klass: 'v', betokener: 'farv', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/farwaz', betokened: '[colour] @0 is the colour of @1' },
  hue: { date: '2024-11-20', klass: 'v', betokener: 'bliv', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/bl%C4%ABu', betokened: '[colour] @0 is hue of @1' },
  red: { date: '2024-02-13', klass: 'v', betokener: 'rod', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raudaz', betokened: '[colour.hue] @0 is red' },
  orange: { date: '2024-02-13', klass: 'v', betokener: 'naranj', origin: 'https://en.wiktionary.org/wiki/%D9%86%D8%A7%D8%B1%D9%86%DA%AF#Persian', betokened: '[colour.hue] @0 is orange', },
  yellow: { date: '2024-02-13', klass: 'v', betokener: 'cul', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gulaz', betokened: '[colour.hue] @0 is yellow' },
  green: { date: '2024-02-13', klass: 'v', betokener: 'cron', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C5%8Dniz', betokened: '[colour.hue] @0 is green' },
  blue: { date: '2024-02-13', klass: 'v', betokener: 'blev', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C4%93waz', betokened: '[colour.hue] @0 is blue' },
  purple: { date: '2024-02-13', klass: 'v', betokener: 'porfur', origin: 'https://en.wiktionary.org/wiki/%CF%80%CE%BF%CF%81%CF%86%CF%8D%CF%81%CE%B1#Ancient_Greek', betokened: '[colour.hue] @0 is purple', },
  vivid: { date: '2024-08-19', klass: 'v', betokener: 'skin', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%ABnan%C4%85', betokened: '[colour.saturation] @0 is vivid-coloured', },
  dull: { date: '2024-08-19', klass: 'v', betokener: ['low', 'vivid'], betokened: '[colour.saturation] @0 is dull-coloured' },
  ...dual('gray', '2024-08-19', 'v', '[colour.saturation] @0 is gray', { betokener: 'crev', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C4%93waz' }, ['minimal', 'vivid']),
  white: { date: '2024-02-13', klass: 'v', betokener: 'hvit', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C4%ABtaz', betokened: '[colour.brightness] @0 is white' },
  ...dual('black', '2024-04-26', 'v', '[colour.brightness] @0 is black', { betokener: 'svart', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swartaz' }, ['minimal', 'white']),

  // light
  bright: { date: '2024-08-19', klass: 'v', betokener: 'bert', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/berhtaz', betokened: '@0 (is bright, reflects much light)' },
  ...dual('dark', '2024-08-19', 'v', '@0 is dark', { betokener: 'dim', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dimmaz' }, ['low', 'bright']),

  // celestial
  sun: { date: '2024-02-13', klass: 'v', betokener: 'sun', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD', betokened: '[celestial] @0 is sun' },
  earth: { date: '2024-02-13', klass: 'v', betokener: 'herd', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/er%C3%BE%C5%8D', betokened: '[celestial] @0 is earth' },
  moon: { date: '2024-02-13', klass: 'v', betokener: 'men', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/m%C4%93n%C3%B4', betokened: '[celestial] @0 is moon' },

  year: { date: '2024-08-30', klass: 'v', betokener: 'jer', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/j%C4%93r%C4%85', betokened: '[celestial.interval] @0 is year of @{1:earth}' },
  season: { date: '2024-08-30', klass: 'v', betokener: ['year', 'part'], betokened: '[celestial.time] @0 is season of @{1:earth}', },
  ...dual('winter', '2024-08-30', 'v', '@0 is (winter, coldest interval) of @{1:earth}', { betokener: 'vintur', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wintruz' }, ['cold', 'season']),
  ...dual('spring', '2024-11-21', 'v', '@0 is (spring, second hottest interval) of @{1:earth}', { betokener: 'vazar', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wazr%C4%85' }, ['up', 'hot', 'season']),
  ...dual('summer', '2024-08-30', 'v', '@0 is (summer, hottest interval) of @{1:earth}', { betokener: 'sumar', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sumaraz' }, ['hot', 'season']),
  ...dual('autumn', '2024-11-21', 'v', '@0 is (autumn, second coldest interval) of @{1:earth}', { betokener: 'harbist', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/harbistaz' }, ['down', 'hot', 'season']),

  day: { date: '2024-08-19', klass: 'v', betokener: 'tin', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABnaz', betokened: '[celestial.interval] @0 is day of @{1:earth}' },
  ...dual('morning', '2024-08-19', 'v', '[celestial.interval] @0 is morning of @{1:earth}', { betokener: 'murc', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/murginaz' }, ['bright', 'day', 'part']),
  ...dual('night', '2024-08-19', 'v', '[celestial.interval] @0 is night of @{1:earth}', { betokener: 'naht', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nahts' }, ['dark', 'day', 'part']),

  // terrain
  land: { date: '2024-02-13', klass: 'v', betokener: 'land', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/land%C4%85', betokened: '[terrain] @0 is land' },
  sea: { date: '2024-02-13', klass: 'v', betokener: 'mar', origin: 'hhttps://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mari', betokened: '[terrain] @0 sea' },
  hill: { date: '2024-02-13', klass: 'v', betokener: 'berj', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bergaz', betokened: '[terrain] @0 mountain', },
  river: { date: '2024-02-13', klass: 'v', betokener: 'sraum', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/straumaz', betokened: '[terrain] @0 river' },
  sky: { date: '2024-08-19', klass: 'v', betokener: 'skiv', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiwj%C4%85', betokened: '[terrain] @0 sky' },

  // weather
  cloud: { date: '2024-08-19', klass: 'v', betokener: 'mic', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/h%E2%82%83meyg%CA%B0-', betokened: '[weather] @0 is cloud' },
  fog: { date: '2024-08-19', klass: 'v', betokener: 'mist', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mihstaz', betokened: '[weather] @0 is (fog, mist)' },
  rain: { date: '2024-08-19', klass: 'v', betokener: 'ren', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/regn%C4%85', betokened: '[weather] @0 is rain' },
  snow: { date: '2024-08-19', klass: 'v', betokener: 'sniv', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sn%C4%ABwan%C4%85', betokened: '[weather] @0 is snow' },
  hail: { date: '2024-08-19', klass: 'v', betokener: 'hacl', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haglaz', betokened: '[weather] @0 is hail' },
  thunder: { date: '2024-08-19', klass: 'v', betokener: 'dun', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEunraz', betokened: '[weather] @0 is thunder' },

  // feel
  feel: { date: '2024-02-13', klass: 'v', betokener: 'sent', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/sent-', betokened: '@0 (feels, senses) @{1:stimulus}' },
  hear: { date: '2024-02-13', klass: 'v', betokener: 'xlym', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hleum%C3%B4', betokened: '[feel] @0 hears @{1:sound}' },
  see: { date: '2024-02-13', klass: 'v', betokener: 'sek', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wl%C4%ABtan%C4%85', betokened: '[feel] @0 sees @{1:sight}' },
  smell: { date: '2024-02-13', klass: 'v', betokener: 'ryk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reukan%C4%85', betokened: '[feel] @0 smells @1' },
  taste: { date: '2024-02-13', klass: 'v', betokener: 'smak', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/smak%C4%93n', betokened: '[feel] @0 tastes @1' },
  touch: { date: '2024-02-13', klass: 'v', betokener: 'tek', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%93kan%C4%85', betokened: '[feel] @0 (palps, touches) @1' },

  differ: { date: '2024-02-13', klass: 'v', betokener: 'skil', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiljan%C4%85', betokened: '[comparison] @0 (differs, varies) from @1', },
  ...dual('same', '2024-08-27', 'v', '[comparison] @0 is (the same as, identical to, equal to) @1', { betokener: 'sam', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/samaz' }, ['minimal', 'differ']),

  //simulate: { date: '2024-08-27', klass: 'v', ...toComplex(['non', 'similar']), betokened: 'simulate A, imitate, fake' },
  test: { date: '2024-07-26', klass: 'v', betokener: 'xus', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/keusan%C4%85', betokened: '@0 (checks, examines, inspects) @1' },
  compare: { date: '2024-07-26', klass: 'v', betokener: ['differ', 'test'], betokened: '@0 compares @{1:individuals}' },

  // life
  live: { date: '2024-02-13', klass: 'v', betokener: 'lib', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libjan%C4%85', betokened: '@0 (lives, is alive)' },
  //die: { date: '2024-08-24', klass: 'v', ...toComplex(['end', 'live']), betokened: '@0 (dies, is dead)' },
  //kill: { date: '2024-08-24', klass: 'v', ...toComplex(['let', 'die']), betokened: '@0 kills @1' },
  wake: { date: '2024-02-13', klass: 'v', betokener: 'vax', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wakan%C4%85', betokened: '@0 (wakes, is awake)' },
  ...dual('sleep', '2024-04-26', 'v', '@0 (sleeps, is asleep)', { betokener: 'svef', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swefan%C4%85' }, ['minimal', 'wake']),

  // motion
  lie: { date: '2024-08-30', klass: 'v', betokener: 'lic', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ligjan%C4%85', betokened: '[behavior] @0 (lies, horizontally stays) on @1' },
  sit: { date: '2024-08-30', klass: 'v', betokener: 'sit', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sitjan%C4%85', betokened: '[behavior] @0 sits on @1' },
  stand: { date: '2024-08-30', klass: 'v', betokener: 'stan', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%81n%C4%85', betokened: '@0 stands on @1' },
  walk: { date: '2024-06-18', klass: 'v', betokener: 'valk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/walkan%C4%85', betokened: '[behavior] @0 walk on @{1:ground}' },
  run: { date: '2024-06-18', klass: 'v', betokener: 'rin', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rinnan%C4%85', betokened: '[behavior] @0 run on @{1:ground}' },
  leap: { date: '2024-07-28', klass: 'v', betokener: 'laup', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlaupan%C4%85', betokened: '[behavior] @0 (jump, leap, skip, hop) over @1' },
  swim: { date: '2024-08-19', klass: 'v', betokener: 'svim', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swimman%C4%85', betokened: '[behavior] @0 (swims, flies) in @{1:fluid}' },
  fly: { date: '2024-07-28', klass: 'v', betokener: 'flyc', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleugan%C4%85', betokened: '[behavior] @0 flies in @{1:air}' },
  dream: { date: '2024-10-16`', klass: 'v', betokener: 'draum', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/draumaz', betokened: '[behavior] @0 dreams @{1:dream}' },

  // physiological
  eat: { date: '2024-02-13', klass: 'v', betokener: 'mand', origin: 'https://en.wiktionary.org/wiki/mandere#Latin', betokened: '[physiological] @0 eats @{1:food}' },
  bite: { date: '2024-08-24', klass: 'v', betokener: 'bit', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABtan%C4%85', betokened: '[physiological.eat] @0 bites @{1:food}' },
  chew: { date: '2024-08-24', klass: 'v', betokener: 'xev', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kewwan%C4%85', betokened: '[physiological.eat] @0 chews @{1:food}' },
  swallow: { date: '2024-08-24', klass: 'v', betokener: 'svel', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swelgan%C4%85', betokened: '[physiological.eat] @0 swallows @{1:food}' },
  ...dual('vomit', '2024-06-14', 'v', '[physiological] @0 vomits @{1:excreta}', { betokener: 'puk', origin: 'pukaną' }, ['back', 'eat']),
  ...dual('shit', '2024-06-14', 'v', '[physiological] @0 shits @{1:excreta}', { betokener: 'drit', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/drit%C4%85' }, ['counter', 'eat']),

  digest: { date: '2024-02-13', klass: 'v', betokener: 'melt', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meltan%C4%85', betokened: '[physiological] @0 digests @{1:food}' },
  fuck: { date: '2024-02-13', klass: 'v', betokener: 'fuk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fukk%C5%8Dn%C4%85', betokened: '[physiological] @0 fucks A' },
  sick: { date: '2024-02-13', klass: 'v', betokener: 'syk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/seukaz', betokened: '[physiological] @0 is sick' },
  ...dual('healthy', '2024-08-24', 'v', '[physiological] @0 is healthy', { betokener: 'sund', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz' }, ['low', 'sick']),

  // emotion
  emotion: { date: '2024-08-02', klass: 'v', betokener: 'huc', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hugiz', betokened: '@0 is (emotion, feeling) of @1' },

  like: { date: '2024-08-02', klass: 'v', betokener: 'lub', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lub%C5%8D', betokened: '[emotion] @0 (likes, feels (good, positive) about) @{1:good}' },
  ...dual('dislike', '2024-08-02', 'v', '[emotion] @0 (dislikes, feels (bad, negative) about) @{1:bad}', { betokener: 'raid', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lai%C3%BEaz' }, ['low', 'like']),

  happy: { date: '2024-08-02', klass: 'v', betokener: 'frav', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/frawaz', betokened: '[emotion] @0 is (happy, glad, merry) about @1' },
  ...dual('sad', '2024-09-10', 'v', '[emotion] @0 is (sad, depressed) about @1', { betokener: 'surc', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/surg%C5%8D' }, ['low', 'happy']),

  care: { date: '2024-09-10', klass: 'v', betokener: 'kar', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kar%C5%8D', betokened: '[emotion] @0 (regards, cares about) @{1:important}' },
  respect: { date: '2024-09-10', klass: 'v', betokener: 'verd', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wer%C3%BEaz', betokened: '[emotion] @0 (respects, honors, positively cares about) @1' },
  fear: { date: '2024-09-10', klass: 'v', betokener: 'furt', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furhtaz', betokened: '[emotion] @0 (fears, is afraid of, negatively cares about) @1' },

  neglect: { date: '2024-09-10', klass: 'v', betokener: ['low', 'care'], betokened: '[emotion] @0 (neglects, is indifferent to, cares less about) @1' },
  serene: { date: '2024-09-10', klass: 'v', betokener: ['like', 'neglect'], betokened: '[emotion.neglect] @0 is (calm about, serene about, positively neglects) @1' }, //s: 'rov', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%8D%C5%8D'
  scorn: { date: '2024-09-10', klass: 'v', betokener: ['dislike', 'neglect'], betokened: '[emotion.neglect] @0 (scorns, disdains, disrespects, negatively neglects) @1' },

  hate: { date: '2024-09-10', klass: 'v', betokener: 'hat', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hataz', betokened: '[emotion] @0 is (hates, detests) @1' },
  angry: { date: '2024-09-10', klass: 'v', betokener: 'vraid', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wrai%C3%BEaz', betokened: '[emotion] @0 is (angry with, mad at) @1' },

  amaze: { date: '2024-08-02', klass: 'v', betokener: 'vund', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wundr%C4%85', betokened: '[emotion] @0 is (surprised, amazed) at @1' },
  expect: { date: '2024-09-10', klass: 'v', betokener: 'bid', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABdan%C4%85', betokened: '[emotion] @0 (expects, is not surprised at) @1' },
  bore: { date: '2024-09-10', klass: 'v', betokener: 'bur', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bur%C5%8Dn%C4%85', betokened: '[emotion] @0 (is bored with, is far from surprised with) @1' },

  enjoy: { date: '2024-09-10', klass: 'v', betokener: 'nyt', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neutan%C4%85', betokened: '[emotion] @0 enjoys @1' },

  trust: { date: '2024-08-02', klass: 'v', betokener: 'truv', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tr%C5%ABw%C4%81n%C4%85', betokened: '[enjoy] @0 trusts @1' },
  ...dual('doubt', '2024-09-10', 'v', '[emotion] @0 doubts @1', { betokener: 'tvifal', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tw%C4%ABflaz' }, ['low', 'trust']),

  pride: { date: '2024-09-10', klass: 'v', betokener: 'sturt', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stultaz', betokened: '[emotion] @0 is proud of @1' },
  ...dual('shame', '2024-09-10', 'v', '[emotion] @0 is ashamed of @1', { betokener: 'skam', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skam%C5%8D' }, ['low', 'pride']),

  shun: { date: '2024-09-27', klass: 'v', betokener: 'skyk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skeuhaz', betokened: '[emotion] @0 is (shuns, avoids) @1' },
  ...dual('want', '2024-02-13', 'v', '[emotion] @0 wants @1', { betokener: 'vil', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wiljan%C4%85' }, ['low', 'shun']),

  love: { date: '2024-09-10', klass: 'v', betokener: 'jern', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gernaz', betokened: '[emotion] @0 (loves, is romantically attracted to) @1' },
  randy: { date: '2024-09-12', klass: 'v', betokener: 'cail', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gailaz', betokened: '[emotion] @0 is (randy, aroused, lustful, horny, sexual) for @1' },

  envy: { date: '2024-09-12', klass: 'v', betokener: 'zel', origin: 'https://en.wiktionary.org/wiki/zelo#Latin', betokened: '[emotion.hate] @0 envies @1' },
  pity: { date: '2024-09-10', klass: 'v', betokener: 'miser', origin: 'https://en.wiktionary.org/wiki/misero#Latin', betokened: '[emotion] @0 (pities, feel sympathy) @1' },

  // facial
  laugh: { date: '2024-02-13', klass: 'v', betokener: 'lak', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlahjan%C4%85', betokened: '[facial-expression] @0 laughs' },
  smile: { date: '2024-02-13', klass: 'v', betokener: 'smil', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sm%C4%ABlijan%C4%85', betokened: '[facial-expression] @0 smiles' },
  frown: { date: '2024-02-13', klass: 'v', betokener: 'skel', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skelhaz', betokened: '[facial-expression] @0 frowns' },
  weep: { date: '2024-02-13', klass: 'v', betokener: 'vop', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C5%8Dpijan%C4%85', betokened: '[facial-expression] @0 weeps @{1:tear}' },
  yell: { date: '2024-06-14', klass: 'v', betokener: 'stun', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stun%C5%8Dn%C4%85', betokened: '@0 (yells, cry, shout) @{1:voice}' },

  // mental
  know: { date: '2024-02-13', klass: 'v', betokener: 'vit', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/witan%C4%85', betokened: '[mental] @0 knows @1' },

  //learn: { date: '2024-08-01', klass: 'v', ...toIdiom(['begin', 'know']), betokened: '[mental] @0 learns @{1:idea}' },
  //forget: { date: '2024-08-01', klass: 'v', ...toIdiom(['end', 'know']), betokened: '[mental] @0 forgets @{1:idea}' },
  //...dual('learn', '2024-08-01', 'v/mental'], '@0 learns @{1:idea}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lizan%C4%85'), toComplex(['begin', 'know'])),
  //...dual('forget', '2024-08-01', 'v/mental'], '@0 forgets @{1:idea}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/marzijan%C4%85'), toComplex(['end', 'know'])),
  think: { date: '2024-02-13', klass: 'v', betokener: 'dagk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEankijan%C4%85', betokened: '[mental] @0 thinks @{1:idea}' },
  reason: { date: '2024-08-31', klass: 'v', betokener: 'rad', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ra%C3%BEj%C7%AD', betokened: '[mental] @0 have @{1:reason}' },

  // communicate
  name: { date: '2024-07-28', klass: 'v', betokener: 'nam', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4', betokened: '[communicate] @0 (means, signifies, is a name of) @1' },
  speak: { date: '2024-06-14', klass: 'v', betokener: 'tal', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tal%C5%8D', betokened: '[communicate] @0 speaks in @{1:language, protocol}' },
  language: { date: '2024-06-14', klass: 'v', betokener: ['done', 'speak'], betokened: '[communicate] @0 language' },
  say: { date: '2024-06-14', klass: 'v', betokener: 'sac', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sagjan%C4%85', betokened: '[communicate] @0 says @{1:idea} @{2:expression}' },
  ...dual('understand', '2024-06-14', 'v', '[communicate] @0 understands @{1:idea} from @{2:expression}', { betokener: 'hrust', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlustiz' }, ['counter', 'say']),
  write: { date: '2024-06-14', klass: 'v', betokener: 'vrit', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C4%ABtan%C4%85', betokened: '[communicate] @0 writes @{1:idea} to @{2:expression}' },
  ...dual('read', '2024-06-14', 'v', '[communicate] @0 reads @{1:idea} from @{2:expression}', { betokener: 'red', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%93dan%C4%85' }, ['counter', 'write']),
  ask: { date: '2024-07-28', klass: 'v', betokener: 'frej', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fr%C4%93g%C5%8D', betokened: '[communicate] @0 asks @{1:question} to @{2:questionee}' },
  ...dual('answer', '2024-07-28', 'v', '[communicate] @0 answers @{1:answer} to @{2:questioner}', { betokener: 'svar', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swar%C5%8Dn%C4%85' }, ['counter', 'ask']),

  // performative
  greet: { date: '2024-02-13', klass: 'v', betokener: 'sarut', origin: 'https://en.wiktionary.org/wiki/salus#Latin', betokened: '[performative] @0 greets @{1:person}' },
  forgive: { date: '2024-02-13', klass: 'v', betokener: 'don', origin: 'https://en.wiktionary.org/wiki/donare#Latin', betokened: '[performative] @0 forgives @{1:event}' },
  thank: { date: '2024-02-13', klass: 'v', betokener: 'crat', origin: 'https://en.wiktionary.org/wiki/gratus#Latin', betokened: '[performative] @0 thanks @{1:event}' },
  promise: { date: '2024-08-19', klass: 'v', betokener: 'hait', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitan%C4%85', betokened: '[performative] @0 (promises, guarantee, vow) @{1:event}' },
  command: { date: '2024-09-29', klass: 'v', betokener: 'styr', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stiurijan%C4%85', betokened: '[performative] @0 (command, request, recommend) @{1:must}' },

  // culture
  sing: { date: '2024-02-13', klass: 'v', betokener: 'sig', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/singwan%C4%85', betokened: '[culture] @0 sings @{1:music, song}, play' },
  dance: { date: '2024-02-13', klass: 'v', betokener: 'dans', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEans%C5%8Dn', betokened: '[culture] @0 dances @{1:choreography}', },

  // biochemistry
  rot: { date: '2024-02-13', klass: 'v', betokener: 'rut', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rut%C4%81n%C4%85', betokened: '@0 is rotten' },
  ...dual('fresh', '2024-07-24', 'v', '@0 is fresh', { betokener: 'frisk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/friskaz' }, ['low', 'rot']),

  // reproduction
  beget: { date: '2024-08-19', klass: 'v', betokener: 'burd', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/burdiz', betokened: '@0 (bears, reproducts) @{1:child}, parent' },
  man: { date: '2024-08-19', klass: 'v', betokener: 'jum', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gum%C3%B4', betokened: '@0 is (a man, male)' },
  woman: { date: '2024-08-19', klass: 'v', betokener: 'vib', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABb%C4%85', betokened: '@0 is (a woman, female)' },

  // animal
  mammal: { date: '2024-02-13', klass: 'v', betokener: 'mamal', origin: 'https://en.wiktionary.org/wiki/mammalis', betokened: '[life.animal] @0 is a mammal' },
  human: { date: '2024-02-13', klass: 'v', betokener: 'man', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mann-', betokened: '[life.animal.mammal] @0 is a human' },
  rat: { date: '2024-02-13', klass: 'v', betokener: 'rat', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rattaz', betokened: '[life.animal.mammal] @0 is a (rat, mouse)' },
  hare: { date: '2024-02-13', klass: 'v', betokener: 'xas', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/has%C3%B4', betokened: '[life.animal.mammal] @0 is a (hare, rabbit)' },
  cat: { date: '2024-02-13', klass: 'v', betokener: 'kat', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kattuz', betokened: '[life.animal.mammal] @0 is a cat' },
  fox: { date: '2024-02-13', klass: 'v', betokener: 'fux', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuhsaz', betokened: '[life.animal.mammal] @0 is a fox' },
  dog: { date: '2024-02-13', klass: 'v', betokener: 'xund', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hundaz', betokened: '[life.animal.mammal] @0 is a dog' },
  wolf: { date: '2024-02-13', klass: 'v', betokener: 'vulf', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulfaz', betokened: '[life.animal.mammal] @0 is a wolf' },
  bear: { date: '2024-02-13', klass: 'v', betokener: 'ber', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ber%C3%B4', betokened: '[life.animal.mammal] @0 is a bear' },
  sheep: { date: '2024-02-13', klass: 'v', betokener: 'skep', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%93p%C4%85', betokened: '[life.animal.mammal] @0 is a sheep' },
  goat: { date: '2024-02-13', klass: 'v', betokener: 'cait', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gaits', betokened: '[life.animal.mammal] @0 is a goat' },
  deer: { date: '2024-02-13', klass: 'v', betokener: 'raik', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raih%C3%B4', betokened: '[life.animal.mammal] @0 is a deer' },
  horse: { date: '2024-02-13', klass: 'v', betokener: 'xrus', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hruss%C4%85', betokened: '[life.animal.mammal] @0 is a horse' },
  cow: { date: '2024-02-13', klass: 'v', betokener: 'kuv', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/k%C5%ABz', betokened: '[life.animal.mammal] @0 is a cow' },
  pig: { date: '2024-02-13', klass: 'v', betokener: 'svin', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%ABn%C4%85', betokened: '[life.animal.mammal] @0 is a pig' },

  reptile: { date: '2024-02-13', klass: 'v', betokener: 'reptil', origin: 'https://en.wiktionary.org/wiki/reptilis#Latin', betokened: '[life.animal] @0 is a reptile' },
  snake: { date: '2024-07-15', klass: 'v', betokener: 'snec', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snegan%C4%85', betokened: '[life.animal.reptile] @0 is a snake' },

  bird: { date: '2024-02-13', klass: 'v', betokener: 'fucal', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuglaz', betokened: '[life.animal] @0 is a bird' },
  crow: { date: '2024-07-15', klass: 'v', betokener: 'raban', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrabnaz', betokened: '[life.animal.bird] @0 is a (crow, raven)' },

  fish: { date: '2024-02-13', klass: 'v', betokener: 'fisk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fiskaz', betokened: '[life.animal] @0 is a fish' },

  amphibia: { date: '2024-02-13', klass: 'v', betokener: 'anfib', origin: 'https://en.wiktionary.org/wiki/amphibius#Latin', betokened: '[life.animal] @0 is a amphibia' },
  frog: { date: '2024-07-15', klass: 'v', betokener: 'frusk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fruskaz', betokened: '[life.animal.amphibia] @0 is a frog' },

  // plant
  plant: { date: '2024-08-19', klass: 'v', betokener: 'plant', origin: 'https://en.wiktionary.org/wiki/planta#Latin', betokened: '[life] @0 is a plant' },
  tree: { date: '2024-08-19', klass: 'v', betokener: 'bacam', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bagmaz', betokened: '[life.plant] @0 is a tree' },

  // body
  body: { date: '2024-02-13', klass: 'v', betokener: 'ref', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrefaz', betokened: '@0 is a body of @1' },
  bone: { date: '2024-02-13', klass: 'v', betokener: 'bain', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bain%C4%85', betokened: '[body] @0 is a bone of @1' },
  flesh: { date: '2024-02-13', klass: 'v', betokener: 'flaisk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaiski', betokened: '[body] @0 is a (flesh, meat, muscle) of @1' },
  fat: { date: '2024-09-16', klass: 'v', betokener: 'fait', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/faitaz', betokened: '[body] @0 is a fat of @1' },
  skin: { date: '2024-02-13', klass: 'v', betokener: 'skind', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skin%C3%BE%C4%85', betokened: '[body] @0 is a (skin, peel) of @1' },
  head: { date: '2024-02-13', klass: 'v', betokener: 'habud', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haubud%C4%85', betokened: '[body] @0 is a head of @1', },
  neck: { date: '2024-02-13', klass: 'v', betokener: 'nak', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnakk%C3%B4', betokened: '[body] @0 is a neck of @1' },
  shoulder: { date: '2024-02-13', klass: 'v', betokener: 'skuld', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/skuldru', betokened: '[body] @0 is a (shoulder, buttock) of @1' },
  limb: { date: '2024-02-13', klass: 'v', betokener: 'lim', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/limuz', betokened: '[body] @0 is a (limb, leg, arm, branch) of @1' },
  ...dual('leg', '2024-11-24', 'v', '[body.limb] @0 is a leg', { betokener: 'lac', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lagjaz' }, ['below', 'extremity']),
  ...dual('arm', '2024-11-24', 'v', '[body.limb] @0 is an arm', { betokener: 'harm', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/armaz' }, ['done', 'below', 'extremity']),
  //extremity: { date: '2024-02-13', klass: 'v', betokener: 'hand', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/handuz', betokened: '[body] @0 is a (extremity, hand, foot) of @1' },
  ...dual('foot', '2024-11-24', 'v', '[body.extremity] @0 is a foot', { betokener: 'fot', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/f%C5%8Dts' }, ['below', 'extremity']),
  ...dual('hand', '2024-11-24', 'v', '[body.extremity] @0 is a hand', { betokener: 'hand', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/handuz' }, ['done', 'below', 'extremity']),
  trunk: { date: '2024-02-13', klass: 'v', betokener: 'stam', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stamniz', betokened: '[body] @0 is a (trunk, torso, stem) of @1' },
  breast: { date: '2024-09-22', klass: 'v', betokener: 'brust', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brusts', betokened: '[body] @0 is a (chest, breast) of @1' },
  belly: { date: '2024-09-22', klass: 'v', betokener: 'kved', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kwe%C3%BEuz', betokened: '[body] @0 is a (chest, breast) of @1' },
  tail: { date: '2024-02-13', klass: 'v', betokener: 'stert', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stertaz', betokened: '[body] @0 is a tail of @1' },
  hair: { date: '2024-02-13', klass: 'v', betokener: 'her', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/h%C4%93r%C4%85', betokened: '[body] @0 is a (hair, fur) of @1' },
  horn: { date: '2024-02-13', klass: 'v', betokener: 'xurn', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hurn%C4%85', betokened: '[body] @0 is a horn of @1' },
  tooth: { date: '2024-02-13', klass: 'v', betokener: 'tand', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tan%C3%BEs', betokened: '[body] @0 is a (tooth, fang) of @1' },
  nail: { date: '2024-02-13', klass: 'v', betokener: 'nad', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/naglaz', betokened: '[body] @0 is a (nail, claw) of @1' },
  eye: { date: '2024-02-13', klass: 'v', betokener: 'hauc', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aug%C3%B4', betokened: '[body.face] @0 is an eye of @1' },
  ear: { date: '2024-02-13', klass: 'v', betokener: 'haus', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aus%C3%B4', betokened: '[body.face] @0 is an ear of @1' },
  nose: { date: '2024-02-13', klass: 'v', betokener: 'nas', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nas%C5%8D', betokened: '[body.face] @0 is a nose of @1' },
  mouth: { date: '2024-02-13', klass: 'v', betokener: 'mund', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mun%C3%BEaz', betokened: '[body.face] @0 is a mouth of @1' },
  lip: { date: '2024-02-13', klass: 'v', betokener: 'lip', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lep%C3%B4', betokened: '[body.face] @0 is a lip of @1' },
  tongue: { date: '2024-02-13', klass: 'v', betokener: 'tug', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tung%C7%AD', betokened: '[body.face] @0 is a tongue of @1' },

  viscera: { date: '2024-02-13', klass: 'v', betokener: 'darm', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEarmaz', betokened: '[body] @0 is a (viscera, inner organ) of @1' },
  lung: { date: '2024-09-02', klass: 'v', betokener: 'lug', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lung%C3%B4', betokened: '[body.viscera] @0 is a lung of @1' },
  heart: { date: '2024-09-02', klass: 'v', betokener: 'xerd', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hert%C3%B4', betokened: '[body.viscera] @0 is a heart of @1' },
  maw: { date: '2024-09-02', klass: 'v', betokener: 'mac', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mag%C3%B4', betokened: '[body.viscera] @0 is a (maw, stomach) of @1' },
  liver: { date: '2024-09-02', klass: 'v', betokener: 'libir', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libr%C5%8D', betokened: '[body.viscera] @0 is a liver of @1' },

  womb: { date: '2024-09-22', klass: 'v', betokener: 'vamb', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wamb%C5%8D', betokened: '[body.genitalia] @0 is a (prostate, womb) of @1' },
  vagina: { date: '2024-09-22', klass: 'v', betokener: 'fud', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fu%C3%BEiz', betokened: '[body.genitalia] @0 is a vagina of @1' },
  penis: { date: '2024-09-22', klass: 'v', betokener: 'pint', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/pinti', betokened: '[body.genitalia] @0 is a (penis, clitoris) of @1', },

  egg: { date: '2024-09-16', klass: 'v', betokener: 'haj', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ajj%C4%85', betokened: '[body.egg] @0 is an egg of @1' },

  blood: { date: '2024-07-29', klass: 'v', betokener: 'blod', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8D%C3%BE%C4%85', betokened: '[body.liquid] @0 is blood of @1' },
  milk: { date: '2024-08-31', klass: 'v', betokener: 'melk', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meluks', betokened: '[body.liquid] @0 is milk of @1' },
  lymph: { date: '2024-08-31', klass: 'v', betokener: 'ninf', origin: 'https://en.wiktionary.org/wiki/%CE%BD%CF%8D%CE%BC%CF%86%CE%B7#Ancient_Greek', betokened: '[body.liquid] @0 is lymph of @1' },

  flower: { date: '2024-09-02', klass: 'v', betokener: 'blov', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8Dan%C4%85', betokened: '[body.plant] @0 is a (flower, bloom, blossom) of @1' },
  leaf: { date: '2024-09-02', klass: 'v', betokener: 'laub', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/laub%C4%85', betokened: '[body.plant] @0 is a leaf of @1' },
  root: { date: '2024-09-02', klass: 'v', betokener: 'rot', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C5%8Dts', betokened: '[body.plant] @0 is a root of @1' },

  // civilization
  person: { date: '2024-02-13', klass: 'v', betokener: 'lyd', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/liudiz', betokened: '[civilisation] @0 is (a person, an individual, a citizen)' },
  country: { date: '2024-08-24', klass: 'v', betokener: 'mark', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mark%C5%8D', betokened: '[civilisation] @0 is a country' },
  rule: { date: '2024-07-28', klass: 'v', betokener: 'rej', origin: 'https://en.wiktionary.org/wiki/rego#Latin', betokened: '[civilisation] @0 (rules, orders, dictates) @1' },

  noble: { date: '2024-10-01', klass: 'v', betokener: 'rix', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABkijaz', betokened: '@0 is noble' },
  ...dual('humble', '2024-10-01', 'v', '@0 is humble', { betokener: 'myk', origin: 'https://en.wiktionary.org/wiki/mj%C3%BAkr#Old_Norse' }, ['low', 'noble']),

  work: { date: '2024-02-13', klass: 'v', betokener: 'verx', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werk%C4%85', betokened: '@0 works @{1:operation}' },
  use: { date: '2024-06-14', klass: 'v', betokener: 'nut', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nut%C5%8D', betokened: '@0 uses @{1:tool} for @{2:purpose}' },
  help: { date: '2024-06-18', klass: 'v', betokener: 'xelp', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/helpan%C4%85', betokened: '@0 helps @{1:event}' },
  harm: { date: '2024-08-19', klass: 'v', betokener: 'harm', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/harmaz', betokened: '@0 (harms, hurts, damages) @1' },
  ...dual('heal', '2024-08-19', 'v', '@0 heals @1', { betokener: 'hail', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hailijan%C4%85' }, ['back', 'harm']),

  wont: { date: '2024-09-01', klass: 'v', betokener: 'vun', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wun%C4%81n%C4%85', betokened: '@0 is (a custom, a habit, usual, routine, regular) to @1' }, // https://en.wiktionary.org/wiki/suescere#Latin
  lead: { date: '2024-09-01', klass: 'v', betokener: 'drac', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dragan%C4%85', betokened: '@0 (leads, guides) @{1:follower}' },
  pick: { date: '2024-09-09', klass: 'v', betokener: 'jak', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/jakk%C5%8Dn%C4%85', betokened: '@0 (picks, hunts, gathers, collects) @{1:harvest, prey}' },
  cut: { date: '2024-11-21', klass: 'v', betokener: 'snid', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sn%C4%AB%C3%BEan%C4%85', betokened: '@0 cuts @1' },

  ...dual('lick', '2024-08-19', 'v', '[body-interaction] @0 licks @1', { betokener: 'lik', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/likk%C5%8Dn%C4%85' }, ['tongue', 'touch']),
  ...dual('kiss', '2024-11-23', 'v', '[body-interaction] @0 kisses @1', { betokener: 'kuss', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kussaz' }, ['lip', 'touch']),
  //...dual('caress', '2024-11-23', 'v', '[body-interaction] @0 carreses @1', { betokener: 'kuss', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kussaz' }, ['arm', 'capture']),
  //...dual('hug', '2024-11-23', 'v', '[body-interaction] @0 hugs @1', { betokener: 'spurn', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spurnan%C4%85' }, ['arm', 'capture']),
  //...dual('kick', '2024-11-23', 'v', '[body-interaction] @0 kicks @1', { betokener: 'spurn', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spurnan%C4%85' }, ['foot', 'hit']),
  //...dual('punch', '2024-11-23', 'v', '[body-interaction] @0 punches @1', { betokener: 'hit', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hittijan%C4%85' }, ['hand', 'hit']),

  // artifact
  knife: { date: '2024-07-28', klass: 'v', betokener: ['cut', 'done', 'use'], betokened: '[artifact] @0 is a (sword, knife, blade)' },
  scissor: { date: '2024-07-28', klass: 'v', betokener: ['two', 'knife'], betokened: '[artifact] @0 is a pair of scissors' },
  spear: { date: '2024-07-28', klass: 'v', betokener: 'sper', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/speru', betokened: '[artifact] @0 is a (spear, pin)' },
  rod: { date: '2024-07-28', klass: 'v', betokener: 'stik', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stikk%C3%B4', betokened: '[artifact] @0 is a (rod, stuff, wand, club)' },
  money: { date: '2024-08-25', klass: 'v', betokener: 'fex', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fehu', betokened: '[artifact] @0 is (money, coin, bill)' },
  ship: { date: '2024-10-05', klass: 'v', betokener: 'bait', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/baitaz', betokened: '[artifact] @0 is a (ship, boat)' },

  // grammar
  sentence: { date: '2024-10-05', klass: 'v', betokener: 'fras', origin: 'https://en.wiktionary.org/wiki/%CF%86%CF%81%CE%AC%CF%83%CE%B9%CF%82#Ancient_Greek', betokened: '[grammar] @0 is a sentence', },
  clause: { date: '2024-10-05', klass: 'v', betokener: 'klaus', origin: 'https://en.wiktionary.org/wiki/clauso#Latin', betokened: '[grammar] @0 is a clause' },
  word: { date: '2024-10-05', klass: 'v', betokener: 'vurd', origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wurd%C4%85', betokened: '[grammar] @0 is a word' },
  verb: { date: '2024-10-05', klass: 'v', betokener: 'verb', origin: 'https://en.wiktionary.org/wiki/verbo#Latin', betokened: '[grammar] @0 is a verb' },
  case: { date: '2024-10-05', klass: 'v', betokener: 'kas', origin: 'https://en.wiktionary.org/wiki/casu#Latin', betokened: '[grammar] @0 is an case of @1' },

  // country
  ...Object.fromEntries(
    [
      ['us', '2024-08-25', 'the united states'],
      ['cn', '2024-08-25', 'china'],
      ['de', '2024-08-25', 'germany'],
      ['jp', '2024-08-25', 'japan'],
      ['in', '2024-11-22', 'india'],
      ['gb', '2024-08-25', 'the united kingdom'],
      ['fr', '2024-08-25', 'france'],
      ['it', '2024-11-22', 'italy'],
      ['it', '2024-11-22', 'italy'],
      ['br', '2024-11-22', 'brazil'],
    ].map(([iso, date, name]) =>
      [`country_${iso}`, { date, klass: 'v', ...toIdiom(['country', 'called', '$' + fromAcronym(iso.toUpperCase())]), betokened: `[country] @0 is ${name} (https://www.iso.org/obp/ui/#iso:code:3166:${iso.toUpperCase()})` }]
    )
  ),

  // language
  ...Object.fromEntries(
    [
      ['eng', '2024-08-31', 'english'],
      ['cmn', '2024-08-31', 'mandarin'],
      ['hin', '2024-08-31', 'hindustani'],
      ['spa', '2024-08-31', 'spanish'],
      ['ara', '2024-08-31', 'arabic'],
      ['fra', '2024-08-31', 'french'],
      ['rus', '2024-08-31', 'russian'],
      ['deu', '2024-08-31', 'german'],
      ['jpn', '2024-08-31', 'japanese'],
    ].map(([iso, date, adjective]) =>
      [`language_${iso}`, { date, klass: 'v', ...toIdiom(['country', 'called', '$' + fromAcronym(iso.toUpperCase())]), betokened: `[language] @0 is ${adjective} language (https://iso639-3.sil.org/code/${iso})` }]
    )
  ),
}));

// set formation
for (const k of dicPre.keys())
  if (!dicPre.get(k).formation)
    dicPre.set(k, {
      ...dicPre.get(k),
      formation:
        typeof dicPre.get(k).betokener === 'string'
          ? Formation.simplex
          : Formation.complex
    });

// process simplex
for (const [k, v] of dicPre.entries())
  if (typeof v.betokener === 'string') {
    const simplified = replaceEach(v.betokener, [
    ]);

    if (simplified !== v.betokener) {
      console.log(`simplify: .${k} = ${v.betokener} -> ${simplified}`)
      dicPre.set(k, {
        ...v,
        betokener: simplified
      });
    }

  }

// generate non-simplex
for (let i = 0; i < dicPre.size + 1; i++)
  for (const [k, v] of dicPre.entries())
    if (Array.isArray(v?.betokener)) {
      const betokeners = v.betokener.map((kComponent: string) =>
        kComponent.startsWith('$')
          ? kComponent.substring(1)
          : dicPre.get(kComponent)?.betokener
      );

      if (betokeners.every(it => typeof it === 'string'))
        switch (v.formation) {
          case Formation.idiom:
            dicPre.set(k, {
              ...v,
              betokener: betokeners.join(' '),
              origin: v.betokener.join('␣')
            });
            break;
          case Formation.complex:
            dicPre.set(k, {
              ...v,
              betokener: makeComplex(betokeners),
              origin: v.betokener.join('-')
            });
            break;
        }
    }

interface Value {
  date: string,
  betokener: string,
  klass: string,
  betokened: string,
  formation: Formation,
  origin: string,
}

const dic = new Map<string, Value>(
  [...dicPre.entries()]
    .filter(([k, v]) => typeof v.betokener === 'string' && 'formation' in v) as [string, Value][]
);

// check homograph
const keys = [...dic.keys()];
for (let i0 = 0; i0 < dic.size; i0++)
  for (let i1 = i0 + 1; i1 < dic.size; i1++) {
    const k0: string = keys[i0];
    const k1: string = keys[i1];

    if (dic.get(k0)?.betokener && dic.get(k0)?.betokener === dic.get(k1)?.betokener)
      console.error(`homograph: [${k0}, ${k1}] = ${dic.get(k0)?.betokener}`);
  }

for (const [k, { klass, betokener, formation }] of dic.entries())
  if (formation !== Formation.idiom) {
    // check invalid betokener
    const invalidity = invalid(betokener);
    if (invalidity)
      console.error(`invalid: ${invalidity}: .${k} = ${betokener}`);

    // cheeck vowel-ending verb
    //if (valueKlass(klass) === 'v' && /[iyueoa]$/.test(betokener))
    //  console.error(`vowel-ending verb: .${k} = ${betokener}`);

    if (!checkSonority(betokener))
      console.error(`sonority caldera: .${k} = ${betokener}`);
  }

export const translate = (code: string) =>
  code
    .replace(/[a-z_]+/g, k => dic.get(k)?.betokener ?? '?' + k)
    .replace(/ +-/g, '-')
    .replace(/[^ ]+/g, it =>
      it
        .replace('-', '(((HYPHEN)))') // first occurence
        .replace(/-/g, '')
        .replace('(((HYPHEN)))', '-')
    )
  ;

export default dic;