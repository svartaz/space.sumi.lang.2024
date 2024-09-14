import { replaceAll } from "@/lib/sundry";

export interface Entry {
  date: string,
  signifier: string,
  signified: string,
  etym: string,
  compound?: boolean,
};

const choose = <A>(array: A[]): A =>
  array[Math.floor(array.length * Math.random())];

const consonants = 'gnmcdbktphxsfjzvrl';
const vowels = 'ieaou';

const phonotactics = (w: string) => {
  const fixed = replaceAll(w, [
    // geminate
    [/(.)\1+/g, it => it.slice(-1)],

    // adjacent nasal
    [/[gnm]+/g, it => it.slice(-1)],

    // final voiced
    /*[/[cjdzbv]$/g, it => replaceAll(it, [
      [/c/g, 'k'],
      [/j/g, 'x'],
      [/d/g, 't'],
      [/z/g, 's'],
      [/b/g, 'p'],
      [/v/g, 'f'],
    ])],*/

    // unmatched nasal
    [/gr/g, 'gcr'],
    [/nr/g, 'ndr'],
    [/mr/g, 'mbr'],
    [/[nm](?=[ckh])/g, 'g'],
    [/[gm](?=[xjdtszl])/g, 'n'],
    [/[gn](?=[bpfv])/g, 'm'],

    // nasal + unvoiced fricative
    [/(?<=g)(?=[jz])/g, 'd'],
    [/(?<=n)(?=[jz])/g, 'd'],
    [/(?<=m)v/g, 'b'],

    // L
    [/ld/g, 'd'],
    [/lr/g, 'r'],
    [/tl/g, 't'],
    [/dl/g, 'd'],
    [/l(?=[xjdtsz])/g, ''],

    // adjacent sibilants
    [/[xsjz]+/g, it => it.slice(-1)],

    // unvoiced + voiced
    [/[ckhxjdtszbpfv]{2,}/g, it => /[cjdzbv]$/.test(it)
      ? replaceAll(it, [
        [/k/g, 'c'],
        [/h/g, 'c'],
        [/x/g, 'j'],
        [/t/g, 'd'],
        [/s/g, 'z'],
        [/p/g, 'b'],
        [/f/g, 'v'],
      ])
      : replaceAll(it, [
        [/c/g, 'k'],
        [/j/g, 'x'],
        [/d/g, 't'],
        [/z/g, 's'],
        [/b/g, 'p'],
        [/v/g, 'f'],
      ])
    ],

    // plosive + matched nasal
    [/[ck](?=g)/g, ''],
    [/[dt](?=n)/g, ''],
    [/[bp](?=m)/g, ''],

    // similar voiced
    [/[bv]+/g, it => it.slice(-1)],

    // sibilant + R
    [/(?<=[xjsz])r/g, ''],

    // final H
    [/(?<=[rl])h$/g, ''],
  ]);

  return w === fixed
    ? fixed
    : phonotactics(fixed);
};

console.log(choose([...consonants + vowels]))

for (let i = 0; i < 8; i++) {
  const w = Array.from({ length: 8 }, () => choose((consonants + vowels).split(''))).join('');
  const fixed = phonotactics(w);

  console.debug('phonotactics test', w, fixed, w === fixed ? '' : '!');
};

export const literal = (s: string): string => replaceAll(s, [
  [/[BCDFHJKLMNPRSTVX]/g, it => it.toLowerCase() + 'a'],
  [/G/g, 'ki'],
  [/Q/g, 'ku'],
  [/Z/g, 'za'],

  [/Y/g, 'ju'],
  [/W/g, 'vi'],

  [/I/g, 'ji'],
  [/E/g, 'je'],
  [/A/g, 'ga'],
  [/O/g, 'vo'],
  [/U/g, 'vu'],
]);

const yearCreate =
  ((new Date('2023-12-17').getTime() - new Date('1995-07-25').getTime()) / 1000 / 60 / 60 / 24 / 365.25).toFixed(0);
console.log(yearCreate);

const componentsAutonym = [...yearCreate.toString()].map(it => ({
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  A: 'ten',
  B: 'eleven',
  '.': 'Decimal',
})[it]);

const from = (replacements) => (etym: string) => ({
  signifier: replaceAll(decodeURIComponent(etym), [
    // extract from URL
    [/^.+\//, ''],
    [/#.+$/, ''],

    ...replacements,

    [/(?<!^)z/g, 's'],
    [/(?<=[ieaou].*)[ieaou]$/g, ''],
    [/n(?=[ckh])/g, 'g'],

    // no initial vowel
    [/^(?=i)/g, 'j'],
    [/^(?=u)/g, 'v'],
    [/^(?=[eao])/g, 'g'],
  ]),
  etym,
});

const fromGem = from([
  // remove suffix
  [/(?<=[ieaouīēāōūîêâôû].*)(ōr|[iau]z|i?janą|[ōaā]ną|j?ą|(ō|ô|ǭ)|ā)$/, ''],

  // simplify vowel
  [/[eao]i/g, 'e'],
  [/[ao]u/g, 'o'],
  [/eu/g, 'i'],
  [/ī/g, 'i'],
  [/ē/g, 'e'],
  [/ā/g, 'a'],
  [/ō/g, 'o'],
  [/ū/g, 'u'],

  // simple substitution
  [/(.)\1/, '$1'],
  [/sk/g, 'x'],
  [/þ/g, 'd'],
  [/g/g, 'c'],
  [/nc/g, 'g'],
  [/w/g, 'v'],

  // sound change
  //[/(?<=[ieaou])h(?=[^ieaou])/g, ''],
  [/^h(?=[gnmrlv])/g, ''],
  //[/(?<=[^ieaou])v$/g, ''],
  [/ts$/g, 't'],
  [/mn(?![ieaou])/g, 'm'],
  [/(?<=[ieaou])ndr/g, 'dr'],

  // specific
  [/rdr$/g, 'rd'],
  [/str$/g, 'st'],
  [/^sv(?=[ieaou])/g, 'sf'],
  [/(?<=[ieaou][hg])v$/g, ''],
  [/(?<=[ieaou][hg])v$/g, ''],
  [/nr$/g, 'n'],
]);

const fromLat = from([
  // remove suffix
  [/((ā|ē|e|ī)re|ā|i?ō|e|ū|iē)$/, ''],

  // simplify vowel
  [/ī/g, 'i'],
  [/ē/g, 'e'],
  [/ā/g, 'a'],
  [/ō/g, 'o'],
  [/ū/g, 'u'],

  [/ae/g, 'e'],
  [/au/g, 'o'],
  [/ei/g, 'i'],
  [/eu/g, 'u'],
  [/oe/g, 'e'],

  // simple substitution
  [/c|q/g, 'k'],
  [/g/g, 'c'],

  //palatalise
  [/k(?=[ie])/g, 'x'],
  [/c(?=[ie])/g, 'j'],
]);

const fromSla = from([
  [/(iti|ь)$/g, ''],

  [/ь/g, 'i'],
  [/ъ/g, 'u'],
  [/y/g, 'w'],
  [/ě/g, 'je'],
  [/e/g, 'je'],
  [/ę/g, 'en'],
  [/ǫ/g, 'en'],

  [/x/g, 'h'],
  [/c/g, 'ts'],

  [/ň/g, 'nj'],
  [/ď/g, 'dj'],
  [/ť/g, 'tj'],
  [/ľ/g, 'lj'],
  [/ř/g, 'rj'],

  [/š/g, 'x'],
  [/ž/g, 'j'],
  [/j/g, 'i'],
]);

const dict = new Map<string, any>(Object.entries({
  Autonym: { date: '2024-02-17', signified: 'v/the language', signifier: componentsAutonym, etym: '' },

  Period: { date: '2024-02-13', signified: 'other/period', signifier: 'lo', etym: 'https://en.wiktionary.org/wiki/%E5%9B%89#Etymology_2' },

  not: { date: '2024-02-13', signified: 'logic/not', signifier: 'ne', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne' },
  and: { date: '2024-02-13', signified: 'logic/and', signifier: 'ge', etym: 'https://en.wiktionary.org/wiki/et#Latin' },
  or: { date: '2024-02-13', signified: 'logic/or', signifier: 'go', etym: 'https://en.wiktionary.org/wiki/aut#Latin' },
  iff: { date: '2024-02-13', signified: 'logic/iff', signifier: 'ga', etym: '' },

  Nom: { date: '2024-02-13', signified: 'case/nominative', signifier: '-a', etym: '' },
  Acc: { date: '2024-02-13', signified: 'case/accusative', signifier: '-e', etym: '' },
  Dat: { date: '2024-02-13', signified: 'case/dative', signifier: '-o', etym: '' },
  Adv: { date: '2024-02-13', signified: 'case/adverb', signifier: '-u', etym: '' },
  // u: compound

  did: { date: '2024-02-13', signified: 'preverb/tense/past', signifier: 'fu', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai' },
  now: { date: '2024-02-13', signified: 'preverb/tense/present', signifier: 'nu', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nu' },
  shall: { date: '2024-02-13', signified: 'preverb/tense/future', signifier: 'xu', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85' },
  were: { date: '2024-02-13', signified: 'preverb/mood/irrealis', signifier: 'me', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/magan%C4%85' },
  so: { date: '2024-02-13', signified: 'preverb/non-restrictive', signifier: 'du', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEus' },

  done: { date: '2024-02-13', signified: 'preverb/voice/accusative', signifier: 'ce', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-' },
  doneTo: { date: '2024-02-13', signified: 'preverb/voice/dative', signifier: 'co', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-' },

  Name: { date: '2024-02-13', signified: 'foreign-to-verb/@{0} is called (loan)', signifier: 'na', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4' },

  // clause
  what: { date: '2024-02-13', signified: 'clause/who, which', signifier: 've', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwat' },
  that: { date: '2024-02-13', signified: 'clause/that', signifier: 'de', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEat' },
  whether: { date: '2024-07-28', signified: 'clause/whether, if', signifier: 'je', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ja' },

  // base numeral
  zero: { date: '2024-02-13', signified: 'numeral/0', signifier: 'zi', etym: 'https://en.wiktionary.org/wiki/%D8%B5%D9%81%D8%B1#Arabic' },
  one: { date: '2024-02-13', signified: 'numeral/1', signifier: 'ka', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/H%C3%A1ykas' },
  two: { date: '2024-02-13', signified: 'numeral/2', signifier: 'tav', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twai' },
  three: { date: '2024-02-13', signified: 'numeral/3', signifier: 'dir', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%ABz' },
  four: { date: '2024-02-13', signified: 'numeral/4', signifier: 'fed', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fedw%C5%8Dr' },
  five: { date: '2024-02-13', signified: 'numeral/5', signifier: 'pan', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/p%C3%A1n%C4%8Da' },
  six: { date: '2024-02-13', signified: 'numeral/6', signifier: 'xax', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/%C5%A1w%C3%A1%C4%87%C5%A1' },
  seven: { date: '2024-02-13', signified: 'numeral/7', signifier: 'seb', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sebun' },
  eight: { date: '2024-02-13', signified: 'numeral/8', signifier: 'gat', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aht%C5%8Du' },
  nine: { date: '2024-02-13', signified: 'numeral/9', signifier: 'nin', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/newun' },
  //ten: { date: '2024-02-13', signified: 'numeral/10', signifier: 'rek', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/d%C3%A9%E1%B8%B1m%CC%A5' },
  //eleven: { date: '2024-02-13', signified: 'numeral/11', signifier: 'lif', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ainalif' },

  kilo: { date: '2024-02-13', signified: 'numeral/1000', signifier: 'dus', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BE%C5%ABsund%C4%AB' },
  Decimal: { date: '2024-02-13', signified: 'numeral/decimal separator', signifier: 'pu', etym: 'https://en.wiktionary.org/wiki/pungo#Latin' },

  infinite: { date: '2024-09-06', signified: 'numeral/infinite', ...fromLat('aevō'), etym: 'https://en.wiktionary.org/wiki/aevum#Latin' },

  howMany: { date: '2024-02-13', signified: 'numeral/how many', signifier: 'vo', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C5%8D' },

  each: { date: '2024-02-13', signified: 'numeral/each, every, all, maximum', signifier: 'pas', etym: 'https://en.wiktionary.org/wiki/%CF%80%E1%BE%B6%CF%82#Ancient_Greek' },
  atLeast: { date: '2024-02-13', signified: 'numeral/at-least', signifier: 'mes', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/maiz%C3%B4' },
  lessThan: { date: '2024-08-31', signified: 'numeral/less-than', signifier: 'les', etym: 'laisiz' },

  norm: { date: '2024-02-13', signified: 'numeral/subjective/norm', signifier: 'nor', etym: 'https://en.wiktionary.org/wiki/norma#Latin' },
  many: { date: '2024-02-13', signified: 'numeral/subjective/many, more than norm', signifier: 'mi', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mikilaz' },
  few: { date: '2024-02-13', signified: 'numeral/subjective/few, less than norm', signifier: 'fa', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fawaz' },

  // arithmetic
  // 2 + 3 - 3 = 2
  // 2 * 3 / 3 = 2
  // 2 _ (2 ^ 3) = 3 -- log 2 (2 ^ 3) = 3
  // (2 ^ 3) √ 3 = 2 -- root 3 (2 ^ 3) = 2
  Add: { date: '2024-02-13', signified: 'numeral/arithmetic/addition, $a+b$', signifier: 'pul', etym: 'https://en.wiktionary.org/wiki/plus#Latin' },
  Sub: { date: '2024-02-13', signified: 'numeral/arithmetic/opposite, $a-b$', signifier: 'min', etym: 'https://en.wiktionary.org/wiki/minor#Latin' },
  Mul: { date: '2024-02-13', signified: 'numeral/arithmetic/multiplication, $a*b$', signifier: 'mul', etym: 'https://en.wiktionary.org/wiki/multiplicare#Latin' },
  Div: { date: '2024-02-13', signified: 'numeral/arithmetic/reciprocal, $a/b$', signifier: 'div', etym: 'https://en.wiktionary.org/wiki/dividere#Latin' },
  Mod: { date: '2024-08-24', signified: 'numeral/arithmetic/modulo, $a%b$', signifier: 'mod', etym: 'https://en.wiktionary.org/wiki/modulo#Latin' },
  Exp: { date: '2024-08-24', signified: 'numeral/arithmetic/exponential, $a^b$', signifier: 'poter', etym: 'https://en.wiktionary.org/wiki/potere#Latin' },
  Log: { date: '2024-08-24', signified: 'numeral/arithmetic/logarithm', signifier: 'locar', etym: 'https://en.wiktionary.org/wiki/logarithmo#Latin' },
  //Root: { date: '2024-08-24', signified: 'numeral/arithmetic/root', signifier: 'radik', etym: 'https://en.wiktionary.org/wiki/radice#Latin' },

  Card: { date: '2024-08-02', signified: 'number-to-verb/cardinal', signifier: 'fe', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/felu' },
  Ord: { date: '2024-08-02', signified: 'number-to-verb/ordinal', signifier: 'do', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-i%C3%BE%C5%8D' },

  // pronoun
  i: { date: '2024-02-13', signified: 'v/pronoun/@{0} is me', signifier: 'ma', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mek' },
  thou: { date: '2024-02-13', signified: 'v/pronoun/@{0} is thee', signifier: 'da', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEek' },
  he: { date: '2024-02-13', signified: 'v/pronoun/@{0} is (him, it)', signifier: 'ha', etym: 'https://en.wiktionary.org/wiki/hann#Old_Norse' },
  self: { date: '2024-02-13', signified: 'v/pronoun/@{0} is oneself', signifier: 'sa', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sek' },
  who: { date: '2024-02-13', signified: 'v/pronoun/@{0} is who', signifier: 'va', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwaz' },

  // aspect
  begin: { date: '2024-02-13', signified: 'v/aspect/@{0} begins', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ginnan%C4%85') },
  end: { date: '2024-02-13', signified: 'v/aspect/@{0} ends', ...fromLat('fīnīre'), etym: 'https://en.wiktionary.org/wiki/finire#Latin' },

  // basic
  false: { date: '2024-08-30', signified: 'v/@{0} (contradicts, negates, is false assuming) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gagin'), signifier: 'cac' },
  back: { date: '2024-06-14', signified: 'v/@{0} is temporally (inverse, opposite) of @{1}', signifier: 'dis', etym: 'https://en.wiktionary.org/wiki/dis-#Latin' },
  counter: { date: '2024-06-14', signified: 'v/${0} (complements, is dual of) ${1}', signifier: 'kom', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/%E1%B8%B1%C3%B3m' },
  relate: { date: '2024-09-14', signified: 'v/${0} is (related to ${1}, ${1}-ish), ', signifier: 'isk', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-iskaz' }, // https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-l%C4%ABkaz
  exist: { date: '2024-02-13', signified: 'v/@{0} (exists, is a thing, is an object)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/beun%C4%85') },
  happen: { date: '2024-08-23', signified: 'v/@{0} (happens, occurs, realises, is actual, is an event)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hamp%C4%85') },
  let: { date: '2024-02-13', signified: 'v/@{0} (causes, lets) @{1:result, effect}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93tan%C4%85') },

  make: { date: '2024-08-02', signified: 'v/@{0} (makes, builds, creates) @{1} from @{2:material, component}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skapjan%C4%85') },
  break: { date: '2024-06-14', signified: 'v/@{0} (breaks, destructs) @{1} into @{2:pieces, components}', signifier: ['back', 'make'] },

  have: { date: '2024-08-19', signified: 'v/@{0}  (has, owns) @{1:property}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/habjan%C4%85') },
  get: { date: '2024-08-23', signified: 'v/@{0} get @{1}', signifier: ['begin', 'have'], idiom: true },
  lose: { date: '2024-08-23', signified: 'v/@{0} lose @{1}', signifier: ['end', 'have'], idiom: true },
  give: { date: '2024-02-13', signified: 'v/@{0} gives @{1} to @{2:receiver}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/geban%C4%85') },
  take: { date: '2024-08-24', signified: 'v/@{0} takes @{1} from @{2}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neman%C4%85') },
  take_: { date: '2024-08-24', signified: '=take', signifier: ['back', 'give'] },

  // abstract
  from: { date: '2024-08-26', signified: 'v/abstract/@{0} is from @{1:source, origin}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fan%C4%93') },
  to: { date: '2024-08-26', signified: 'v/abstract/@{0} is to @{1:sink, destination}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gangan%C4%85') },
  at: { date: '2024-08-26', signified: 'v/abstract/@{0} is at @{1:position, location, place}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/at') },
  in: { date: '2024-08-19', signified: 'v/abstract/@{0} is in @{1:range, area}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/in') },
  on: { date: '2024-08-26', signified: 'v/abstract/@{0} is on @{1:surface, border}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/an') },

  member: { date: '2024-08-06', signified: 'v/@{0} (belongs to, is a member of) @{1:collection, set, group, list}', ...fromGem('gadaz'), etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gad' },
  part: { date: '2024-08-06', signified: 'v/@{0} is a (part, component) of @{1:whole}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dailiz') },
  kind: { date: '2024-07-15', signified: 'v/@{0} is a (class, kind, type, subset) of @{1:whole}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kin%C3%BEiz') },
  complex: { date: '2024-08-25', signified: 'v/@{0} (is complex, consists of many parts)', signifier: ['many', 'done', 'part'] },
  simple: { date: '2024-08-25', signified: 'v/@{0} (is simple, consists of few parts)', signifier: ['few', 'done', 'part'] },
  atom: { date: '2024-08-25', signified: 'v/@{0} is an atom', signifier: ['one', 'done', 'part'] },

  move: { date: '2024-08-31', signified: 'v/@{0} (moves, is dynamic)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wegan%C4%85') },
  stop: { date: '2024-08-31', signified: 'v/@{0} (stops, halts, is static)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/stopp%C5%8Dn') },
  stop_: { date: '2024-08-31', signified: '=stop', signifier: ['zero', 'move'] },

  // physics
  world: { date: '2024-02-13', signified: 'v/@{0} is a (world, universe)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haimaz') },
  space: { date: '2024-02-13', signified: 'v/@{0} is 3-dimensional physical space', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABm%C4%85') },
  time: { date: '2024-02-13', signified: 'v/@{0} is 1-dimensional physical time', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABm%C3%B4') }, // https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABdiz
  thing: { date: '2024-02-13', signified: 'v/@{0} is a (thing, matter) located in a spacetime', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEing%C4%85') },
  mass: { date: '2024-08-31', signified: 'v/@{0} is a mass of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wihtiz') },
  energy: { date: '2024-08-31', signified: 'v/@{0} is energy of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kunnan%C4%85') },
  heat: { date: '2024-09-06', signified: 'v/@{0} is heat in @{1}', signifier: ['hot', 'energy'] },
  electricity: { date: '2024-08-31', signified: 'v/@{0} is (electricity, electric charge) in @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sparkaz') },

  wave: { date: '2024-08-19', signified: 'v/@{0} is a wave', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%93gaz') },
  light: { date: '2024-02-13', signified: 'v/wave/@{0} is (a light, an electromagnetic wave)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leuht%C4%85') },
  sound: { date: '2024-08-19', signified: 'v/wave/@{0} is a sound from @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/klingan%C4%85') },
  turn: { date: '2024-08-19', signified: 'v/@{0} (turns, rotates, spins) around @{1:pivot, center}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spinnan%C4%85') },

  // physical attribute
  big: { date: '2024-02-13', signified: 'v/@{0} is (big, great)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grautaz') },
  long: { date: '2024-02-13', signified: 'v/@{0} is (long, big in 1 dimension and small in others)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/langaz') },
  thick: { date: '2024-02-13', signified: 'v/@{0} is thick', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEekuz') },
  sharp: { date: '2024-07-28', signified: 'v/@{0:angle} is sharp', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skarpaz') },
  heavy: { date: '2024-07-14', signified: 'v/@{0} is heavy', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%93raz') },
  dense: { date: '2024-07-15', signified: 'v/@{0} is (dense, heavy per volume)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEinhtaz') },

  swift: { date: '2024-06-18', signified: 'v/@{0} is (swift, quick)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snellaz') },
  slow: { date: '2024-09-06', signified: 'v/@{0} is slow', signifier: ['few', 'swift'] },

  rough: { date: '2024-08-24', signified: 'v/@{0} is (rough, coarse)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABhaz') },

  far: { date: '2024-08-08', signified: 'v/@{0} is (far, distant, remote) from @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ferrai') },
  near: { date: '2024-08-08', signified: 'v/@{0} is (near, close to) @{1}', signifier: ['few', 'far'] },
  contact: { date: '2024-08-08', signified: 'v/@{0} (touches, is adjacent, is in contact with) @{1}', signifier: ['zero', 'far'] },

  hot: { date: '2024-08-30', signified: 'v/@{0} is (hot, warm)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/warmaz') },
  cold: { date: '2024-08-30', signified: 'v/@{0} (cold, cool)', signifier: ['few', 'hot'] },

  // local position
  below: { date: '2024-02-13', signified: 'v/position/@{0} is below @{1:above, far against gravity}', signifier: 'nid', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ni%C3%BEan%C4%93' },
  hind: { date: '2024-02-13', signified: 'v/position/local/@{0} is behind @{1:front}', signifier: 'hind', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hinder' },
  left: { date: '2024-02-13', signified: 'v/position/local/@{0} is to the left of @{1:right}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rehtaz') },

  // global position
  west: { date: '2024-08-24', signified: 'v/position/global/@{0} is to the west of @{1:to the east, far agaisnt rotation}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/westr%C4%85') }, //'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/austraz'
  north: { date: '2024-08-24', signified: 'v/position/global/@{0} is to the north of @{1:to the south}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nur%C3%BEraz') },

  // state of matters
  solid: { date: '2024-02-13', signified: 'v/state-of-matter/@{0} is solid', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%ABfaz') },
  liquid: { date: '2024-02-13', signified: 'v/state-of-matter/@{0} is liquid', ...fromLat('līquēre'), etym: 'https://en.wiktionary.org/wiki/liquere#Latin' },
  gas: { date: '2024-02-13', signified: 'v/state-of-matter/@{0} is gas', signifier: 'cas', etym: 'https://en.wiktionary.org/wiki/gas#Dutch' },
  plasm: { date: '2024-07-15', signified: 'v/state-of-matter/@{0} is plasm', signifier: 'plasm', etym: 'https://en.wiktionary.org/wiki/%CF%80%CE%BB%CE%AC%CF%83%CE%BC%CE%B1#Ancient_Greek' },

  // matter
  water: { date: '2024-02-13', signified: 'v/matter/@{0} is water', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wat%C5%8Dr') },
  salt: { date: '2024-02-13', signified: 'v/matter/@{0} is salt', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/salt%C4%85') },
  stone: { date: '2024-08-19', signified: 'v/matter/@{0} is stone', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stainaz') },

  // colour
  colour: { date: '2024-02-13', signified: 'v/colour/@{0} is the colour of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/farwaz') },
  red: { date: '2024-02-13', signified: 'v/colour/hue/@{0} is red', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reudan%C4%85') },
  orange: { date: '2024-02-13', signified: 'v/colour/hue/@{0} is orange', signifier: 'narag', etym: 'https://en.wiktionary.org/wiki/%D9%86%D8%A7%D8%B1%D9%86%DA%AF#Persian' },
  yellow: { date: '2024-02-13', signified: 'v/colour/hue/@{0} is yellow', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gelwaz') },
  green: { date: '2024-02-13', signified: 'v/colour/hue/@{0} is green', signifier: 'cron', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C5%8Dniz' },
  blue: { date: '2024-02-13', signified: 'v/colour/hue/@{0} is blue', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C4%93waz') },
  purple: { date: '2024-02-13', signified: 'v/colour/hue/@{0} is purple', signifier: 'porfur', etym: 'https://en.wiktionary.org/wiki/%CF%80%CE%BF%CF%81%CF%86%CF%8D%CF%81%CE%B1#Ancient_Greek' },
  vivid: { date: '2024-08-19', signified: 'v/colour/saturation/@{0} is vivid-coloured', ...fromGem('blīwą') },
  dull: { date: '2024-08-19', signified: 'v/colour/saturation/@{0} is dull-coloured', signifier: ['few', 'vivid'] },
  gray: { date: '2024-08-19', signified: 'v/colour/saturation/@{0} is gray', signifier: ['zero', 'vivid'] },
  white: { date: '2024-02-13', signified: 'v/colour/brightness/@{0} is white', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C4%ABtaz') },
  black: { date: '2024-04-26', signified: 'v/colour/brightness/@{0} is black', signifier: ['zero', 'white'] },

  // light
  bright: { date: '2024-08-19', signified: 'v/@{0} is bright', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/berhtaz') },
  dark: { date: '2024-08-19', signified: 'v/@{0} is dark', signifier: ['few', 'bright'] },

  // celestial
  sun: { date: '2024-02-13', signified: 'v/celestial/@{0} is sun', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD') },
  earth: { date: '2024-02-13', signified: 'v/celestial/@{0} is earth', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/er%C3%BE%C5%8D') },
  moon: { date: '2024-02-13', signified: 'v/celestial/@{0} is moon', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/m%C4%93n%C3%B4') },

  // time in planet
  year: { date: '2024-08-30', signified: 'v/celestial/@{0} is year of @{1:earth}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/j%C4%93r%C4%85') },
  season: { date: '2024-08-30', signified: 'v/celestial/@{0} is season of @{1:earth}', signifier: ['year', 'part'] },
  summer: { date: '2024-08-30', signified: 'v/celestial/season/@{0} is summer of @{1:earth}', signifier: ['hot', 'season'] }, //https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sumaraz
  winter: { date: '2024-08-30', signified: 'v/celestial/season/@{0} is winter of @{1:earth}', signifier: ['cold', 'season'] }, //https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wintruz

  day: { date: '2024-08-19', signified: 'v/celestial/@{0} is day of @{1:earth}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABnaz') },
  daytime: { date: '2024-08-19', signified: 'v/celestial/@{0} is daytime of @{1:earth}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dagaz') },
  night: { date: '2024-08-19', signified: 'v/celestial/@{0} is night of @{1:earth}', signifier: ['counter', 'daytime'] },

  // terrain
  land: { date: '2024-02-13', signified: 'v/terrain/@{0} is land', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/land%C4%85') },
  sea: { date: '2024-02-13', signified: 'v/terrain/@{0} sea', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mari') },
  mountain: { date: '2024-02-13', signified: 'v/terrain/@{0} mountain', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bergaz') },
  river: { date: '2024-02-13', signified: 'v/terrain/@{0} river', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleutan%C4%85') },
  sky: { date: '2024-08-19', signified: 'v/terrain/@{0} sky', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/himinaz') },

  // weather
  cloud: { date: '2024-08-19', signified: 'v/weather/@{0} is cloud', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulkn%C4%85') },
  fog: { date: '2024-08-19', signified: 'v/weather/@{0} is fog', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mihstaz') },
  rain: { date: '2024-08-19', signified: 'v/weather/@{0} is rain', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/regn%C4%85') },
  snow: { date: '2024-08-19', signified: 'v/weather/@{0} is snow', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snaiwaz') },
  hail: { date: '2024-08-19', signified: 'v/weather/@{0} is hail', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haglaz') },
  thunder: { date: '2024-08-19', signified: 'v/weather/@{0} is thunder', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEunraz') },

  // feel
  feel: { date: '2024-02-13', signified: 'v/@{0} feels @{1:stimulus}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spurjan%C4%85') },
  hear: { date: '2024-02-13', signified: 'v/feel/@{0} hears @{1:sound}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hauzijan%C4%85') },
  see: { date: '2024-02-13', signified: 'v/feel/@{0} sees @{1:sight}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sehwan%C4%85') },
  smell: { date: '2024-02-13', signified: 'v/feel/@{0} smells @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reukan%C4%85') },
  taste: { date: '2024-02-13', signified: 'v/feel/@{0} tastes @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smakkuz') },
  touch: { date: '2024-02-13', signified: 'v/feel/@{0} palps(touches) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tukk%C5%8Dn%C4%85') },

  differ: { date: '2024-02-13', signified: 'v/@{0} differs(varies) from @{1}', ...fromLat('vārō'), etym: 'https://en.wiktionary.org/wiki/varus#Latin' },
  similar: { date: '2024-08-27', signified: 'v/@{0} resemmbles(is similar to) @{1}', signifier: ['few', 'differ'] },
  same: { date: '2024-08-27', signified: 'v/@{0} is same(identical, equal) as @{1}', signifier: ['zero', 'differ'] },
  //simulate: { date: '2024-08-27', signified: 'v/simulate A, imitate, fake', signifier: ['non', 'similar'] },
  examine: { date: '2024-07-26', signified: 'v/@{0} checks(examines, inspects) @{1}', ...fromLat('specere'), etym: 'https://en.wiktionary.org/wiki/specio#Latin' },
  compare: { date: '2024-07-26', signified: 'v/@{0} compares @{1:individuals}', signifier: ['differ', 'examine'] },

  // modal
  may: { date: '2024-02-13', signified: 'v/modal/@{0:event} may happen', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/magan%C4%85') },
  must: { date: '2024-02-13', signified: 'v/modal/@{0:event} must happen', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85') },

  // life
  live: { date: '2024-02-13', signified: 'v/@{0} lives(is alive)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libjan%C4%85') },
  die: { date: '2024-08-24', signified: 'v/@{0} dies(is dead)', signifier: ['end', 'live'] },
  kill: { date: '2024-08-24', signified: 'v/@{0} kills @{1}', signifier: ['let', 'die'] },
  wake: { date: '2024-02-13', signified: 'v/@{0} wakes(is awake)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wakan%C4%85') },
  sleep: { date: '2024-04-26', signified: 'v/@{0} sleeps(is asleep)', signifier: ['zero', 'wake'] },

  // motion
  lie: { date: '2024-08-30', signified: 'v/behavior/@{0} (lies, horizontally stays) on @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ligjan%C4%85') },
  sit: { date: '2024-08-30', signified: 'v/behavior/@{0} sits on @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sitjan%C4%85') },
  stand: { date: '2024-08-30', signified: 'v/behavior/@{0} stands on @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%81n%C4%85') },
  walk: { date: '2024-06-18', signified: 'v/behavior/@{0} walk on @{1:ground}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/walkan%C4%85') },
  run: { date: '2024-06-18', signified: 'v/behavior/@{0} run on @{1:ground}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rinnan%C4%85') },
  leap: { date: '2024-07-28', signified: 'v/behavior/@{0} (jump, leap, skip, hop) over @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlaupan%C4%85') },
  swim: { date: '2024-08-19', signified: 'v/behavior/@{0} (swims, flies) in @{1:fluid}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swimman%C4%85') },
  //fly: { date: '2024-07-28', signified: 'v/behavior/fly in @{1:air}', signifier: ['swim', 'sky'] },

  // physiological
  eat: { date: '2024-02-13', signified: 'v/physiological/eat @{1:food}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/etan%C4%85') },
  bite: { date: '2024-08-24', signified: 'v/physiological/eat/bite @{1:food}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABtan%C4%85') },
  chew: { date: '2024-08-24', signified: 'v/physiological/eat/chew @{1:food}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kewwan%C4%85') },
  swallow: { date: '2024-08-24', signified: 'v/physiological/eat/swallow @{1:food}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swelgan%C4%85') },
  vomit: { date: '2024-06-14', signified: 'v/physiological/vomit @{1:excreta}', signifier: ['back', 'eat'] },
  shit: { date: '2024-06-14', signified: 'v/physiological/shit @{1:excreta}', signifier: ['counter', 'eat'] },
  digest: { date: '2024-02-13', signified: 'v/physiological/digest @{1:food}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meltan%C4%85') },
  fuck: { date: '2024-02-13', signified: 'v/physiological/fuck A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fukk%C5%8Dn%C4%85#Etymology_2') },
  sick: { date: '2024-02-13', signified: 'v/physiological/sick', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/seukaz') },
  healthy: { date: '2024-08-24', signified: 'v/physiological/healthy', signifier: ['zero', 'sick'] }, //https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz

  // emotion
  emotion: { date: '2024-08-02', signified: 'v/@{0} has @{1:emotion, feeling}', signifier: 'fol', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/f%C5%8Dlijan' },

  good: { date: '2024-08-02', signified: 'v/emotion/@{0} (likes, feels (good, positive) about) @{1:good}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/g%C5%8Ddaz') },
  bad: { date: '2024-08-02', signified: 'v/emotion/@{0} (dislikes, feels (bad, negative) about) @{1:bad}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wirsiz') },
  bad1: { date: '2024-08-02', signified: '=bad', signifier: ['Sub', 'good'] },

  happy: { date: '2024-08-02', signified: 'v/emotion/@{0} is (happy, glad, merry) about @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/frawaz') },
  sad: { date: '2024-09-10', signified: 'v/emotion/@{0} is (sad, depressed) about @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/surg%C5%8D') },

  care: { date: '2024-09-10', signified: 'v/emotion/@{0} (regards, cares about) @{1:important}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kar%C5%8Dn%C4%85') },
  respect: { date: '2024-09-10', signified: 'v/emotion/care/@{0} (respects, honors, positively cares about) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wer%C3%BEaz') },
  fear: { date: '2024-09-10', signified: 'v/emotion/care/@{0} (fears, is afraid of, negatively cares about) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furhtaz') },

  neglect: { date: '2024-09-10', signified: 'v/emotion/@{0} (neglects, is indifferent to, cares less about) @{1}', signifier: ['few', 'care'] },
  serene: { date: '2024-09-10', signified: 'v/emotion/neglect/@{0} is (calm about, serene about, positively neglects) @{1}', signifier: ['good', 'neglect'] }, //signifier: 'rov', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%8D%C5%8D'
  scorn: { date: '2024-09-10', signified: 'v/emotion/neglect/@{0} (scorns, disdains, disrespects, negatively neglects) @{1}', signifier: ['bad', 'neglect'] },

  hate: { date: '2024-09-10', signified: 'v/emotion/@{0} is (hates, detests) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hataz') },
  angry: { date: '2024-09-10', signified: 'v/emotion/@{0} is (angry with, mad at) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wrai%C3%BEaz') },
  envy: { date: '2024-09-12', signified: 'v/emotion/hate/@{0} envies @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/n%C4%AB%C3%BE%C4%85') },

  amaze: { date: '2024-08-02', signified: 'v/emotion/@{0} is (surprised, amazed) at @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wundr%C4%85') },
  expect: { date: '2024-09-10', signified: 'v/emotion/@{0} (expects, is not surprised at) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABdan%C4%85') },
  bore: { date: '2024-09-10', signified: 'v/emotion/@{0} (is bored with, is far from surprised with) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lai%C3%BEaz') },

  enjoy: { date: '2024-09-10', signified: 'v/emotion/@{0} enjoys @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neutan%C4%85') },

  trust: { date: '2024-08-02', signified: 'v/emotion/@{0} trusts @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tr%C5%ABw%C4%81n%C4%85') },
  doubt: { date: '2024-09-10', signified: 'v/emotion/@{0} doubts @{1}', signifier: ['few', 'trust'] }, //...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tw%C4%ABflaz')

  pride: { date: '2024-09-10', signified: 'v/emotion/@{0} is proud of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stultaz') },
  shame: { date: '2024-09-10', signified: 'v/emotion/@{0} is ashamed of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skam%C5%8D') },
  shame1: { date: '2024-09-10', signified: '=shame', signifier: ['few', 'pride'] },

  want: { date: '2024-02-13', signified: 'v/emotion/@{0} wants @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wiljan%C4%85') },
  love: { date: '2024-09-10', signified: 'v/emotion/@{0} is (loves, is romantically attracted to) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lub%C5%8D') },
  randy: { date: '2024-09-12', signified: 'v/emotion/@{0} is (randy, aroused, lustful, horny) for @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gailaz') },

  // facial
  laugh: { date: '2024-02-13', signified: 'v/facial-expression/laugh', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlahjan%C4%85') },
  smile: { date: '2024-02-13', signified: 'v/facial-expression/smile', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sm%C4%ABlijan%C4%85') },
  frown: { date: '2024-02-13', signified: 'v/facial-expression/frown', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skelhaz') },
  weep: { date: '2024-02-13', signified: 'v/facial-expression/weep @{1:tear}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C5%8Dpijan%C4%85') },
  yell: { date: '2024-06-14', signified: 'v/yell @{1:voice}, cry, shout', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stun%C5%8Dn%C4%85') },

  // mental
  know: { date: '2024-02-13', signified: 'v/mental/know A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lizan%C4%85') },
  learn: { date: '2024-08-01', signified: 'v/mental/learn A', signifier: ['begin', 'know'] },
  forget: { date: '2024-08-01', signified: 'v/mental/forget A', signifier: ['begin', 'zero', 'know'] },
  think: { date: '2024-02-13', signified: 'v/mental/think @{1:idea}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEankijan%C4%85') },

  reason: { date: '2024-08-31', signified: 'v/mental/have-reason @{1:reason}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ra%C3%BEj%C7%AD') },

  // communicate
  name: { date: '2024-07-28', signified: 'v/communicate/@{0} (means, signifies, is a name of) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4') },
  speak: { date: '2024-06-14', signified: 'v/communicate/@{0} speaks in @{1:language, protocol}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tal%C5%8Dn%C4%85') },
  language: { date: '2024-06-14', signified: 'v/communicate/@{0} language', signifier: ['done', 'speak'] },
  say: { date: '2024-06-14', signified: 'v/communicate/@{0} says @{1:idea} @{2:expression}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sagjan%C4%85') },
  understand: { date: '2024-06-14', signified: 'v/communicate/@{0} understands @{1:idea} from @{2:expression}', signifier: ['counter', 'say'] },
  write: { date: '2024-06-14', signified: 'v/communicate/@{0} writes @{1:idea} to @{2:expression}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C4%ABtan%C4%85') },
  read: { date: '2024-06-14', signified: 'v/communicate/@{0} reads @{1:idea} from @{2:expression}', signifier: ['counter', 'write'] },
  ask: { date: '2024-07-28', signified: 'v/communicate/@{0} asks @{1:question} to @{2:questionee}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fr%C4%93g%C5%8D') },
  answer: { date: '2024-07-28', signified: 'v/communicate/@{0} answers @{1:answer} to @{2:questioner}', signifier: ['counter', 'ask'] },

  // performative
  greet: { date: '2024-02-13', signified: 'v/performative/@{0} greets @{1:person}', ...fromLat('salūte'), etym: 'https://en.wiktionary.org/wiki/salute#Latin' },
  forgive: { date: '2024-02-13', signified: 'v/performative/@{0} forgives @{1:event}', ...fromLat('dōnāre'), etym: 'https://en.wiktionary.org/wiki/donare#Latin' },
  thank: { date: '2024-02-13', signified: 'v/performative/@{0} thanks @{1:event}', ...fromLat('grātō'), etym: 'https://en.wiktionary.org/wiki/grato#Latin' },
  promise: { date: '2024-08-19', signified: 'v/performative/@{0} promises @{1:event}, guarantee, vow', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitan%C4%85') },

  // culture
  sing: { date: '2024-02-13', signified: 'v/culture/sing @{1:music, song}, play', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/singwan%C4%85') },
  dance: { date: '2024-02-13', signified: 'v/culture/dance @{1:choreography}', signifier: 'dans', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEans%C5%8Dn' },

  // biochemistry
  rot: { date: '2024-02-13', signified: 'v/rot', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rut%C4%81n%C4%85') },
  fresh: { date: '2024-07-24', signified: 'v/fresh', signifier: ['zero', 'rot'] },

  // reproduction
  beget: { date: '2024-08-19', signified: 'v/bear @{1:child}, parent', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fad%C4%93r') },
  man: { date: '2024-08-19', signified: 'v/man, male', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gum%C3%B4') },
  woman: { date: '2024-08-19', signified: 'v/woman, female', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABb%C4%85') },
  //egg: { date: '2024-08-24', signified: 'v/egg', ...fromGem('') },

  // animal
  mammal: { date: '2024-02-13', signified: 'v/life/animal/mammal', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/s%C5%ABgan%C4%85') },
  human: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a human', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mann-') },
  rat: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a rat(mouse)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rattaz') },
  hare: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a hare(rabbit)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/has%C3%B4') },
  cat: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a cat', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kattuz') },
  fox: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a fox', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuhsaz') },
  dog: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a dog', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hundaz') },
  wolf: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a wolf', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulfaz') },
  bear: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a bear', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ber%C3%B4') },
  sheep: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a sheep', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%93p%C4%85') },
  goat: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a goat', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gaits') },
  deer: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a deer', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raih%C3%B4') },
  horse: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a horse', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hruss%C4%85') },
  cow: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a cow', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/k%C5%ABz') },
  pig: { date: '2024-02-13', signified: 'v/life/animal/mammal/@{0} is a pig', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%ABn%C4%85') },
  reptile: { date: '2024-02-13', signified: 'v/life/animal/@{0} is a reptile', signifier: 'reptil', etym: 'https://en.wiktionary.org/wiki/reptile#Latin' },
  snake: { date: '2024-07-15', signified: 'v/life/animal/reptile/@{0} is a snake', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/snak%C5%8D') },
  bird: { date: '2024-02-13', signified: 'v/life/animal/@{0} is a bird', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuglaz') },
  crow: { date: '2024-07-15', signified: 'v/life/animal/bird/@{0} is a crow(raven)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrabnaz') },
  fish: { date: '2024-02-13', signified: 'v/life/animal/@{0} is a fish', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fiskaz') },
  amphibia: { date: '2024-02-13', signified: 'v/life/animal/@{0} is a amphibia', etym: 'https://en.wiktionary.org/wiki/Lork#German_Low_German', signifier: 'lork', },
  frog: { date: '2024-07-15', signified: 'v/life/animal/amphibia/@{0} is a frog', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fruskaz') },

  // plant
  plant: { date: '2024-08-19', signified: 'v/life/@{0} is a plant', ...fromLat('plantā'), etym: 'https://en.wiktionary.org/wiki/planta#Latin' },
  tree: { date: '2024-08-19', signified: 'v/life/plant/@{0} is a tree', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bagmaz') },

  // body
  body: { date: '2024-02-13', signified: 'v/@{0} is a body of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrefaz') },
  bone: { date: '2024-02-13', signified: 'v/body/@{0} is a bone of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bain%C4%85') },
  flesh: { date: '2024-02-13', signified: 'v/body/@{0} is a (flesh, meat, muscle) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaiski') },
  skin: { date: '2024-02-13', signified: 'v/body/@{0} is a (skin, peel) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skin%C3%BE%C4%85') },
  head: { date: '2024-02-13', signified: 'v/body/@{0} is a head of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haubud%C4%85'), signifier: 'hobd' },
  neck: { date: '2024-02-13', signified: 'v/body/@{0} is a neck of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnakk%C3%B4') },
  shoulder: { date: '2024-02-13', signified: 'v/body/@{0} is a (shoulder, buttock) of @{1}', ...fromGem('skuldru'), etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/skuldru' },
  arm: { date: '2024-02-13', signified: 'v/body/@{0} is a (limb, leg, arm, branch) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/limuz') },
  hand: { date: '2024-02-13', signified: 'v/body/@{0} is a (hand, foot) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/handuz') },
  trunk: { date: '2024-02-13', signified: 'v/body/@{0} is a(trunk, torso, stem) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stamniz') },
  tail: { date: '2024-02-13', signified: 'v/body/@{0} is a tail of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stertaz') },
  hair: { date: '2024-02-13', signified: 'v/body/@{0} is a (hair, fur) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/h%C4%93r%C4%85') },
  horn: { date: '2024-02-13', signified: 'v/body/@{0} is a horn of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hurn%C4%85') },
  tooth: { date: '2024-02-13', signified: 'v/body/@{0} is a (tooth, fang) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tan%C3%BEs') },
  nail: { date: '2024-02-13', signified: 'v/body/@{0} is a (nail, claw) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/naglaz') },
  eye: { date: '2024-02-13', signified: 'v/body/face-part/@{0} is an eye of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aug%C3%B4') },
  ear: { date: '2024-02-13', signified: 'v/body/face-part/@{0} is an ear of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aus%C3%B4') },
  nose: { date: '2024-02-13', signified: 'v/body/face-part/@{0} is a nose of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nas%C5%8D') },
  mouth: { date: '2024-02-13', signified: 'v/body/face-part/@{0} is a mouth of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mun%C3%BEaz') },
  lip: { date: '2024-02-13', signified: 'v/body/face-part/@{0} is a lip of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lep%C3%B4') },
  tung: { date: '2024-02-13', signified: 'v/body/face-part/@{0} is a tongue of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tung%C7%AD') },

  viscera: { date: '2024-02-13', signified: 'v/body/@{0} is a viscera of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEarmaz') },
  lung: { date: '2024-09-02', signified: 'v/body/viscera/@{0} is a lung of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lung%C3%B4') },
  heart: { date: '2024-09-02', signified: 'v/body/viscera/@{0} is a heart of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hert%C3%B4') },
  maw: { date: '2024-09-02', signified: 'v/body/viscera/@{0} is a maw of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mag%C3%B4') },
  liver: { date: '2024-09-02', signified: 'v/body/viscera/@{0} is a liver of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libr%C5%8D') },

  blood: { date: '2024-07-29', signified: 'v/body/liquid/@{0} is blood of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8D%C3%BE%C4%85') },
  milk: { date: '2024-08-31', signified: 'v/body/liquid/@{0} is milk of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meluks'), signifier: 'melk' },
  //lymph: { date: '2024-08-31', signified: 'v/body/liquid/lymph', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meluks') },

  flower: { date: '2024-09-02', signified: 'v/body/plant/@{0} is a flower of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8Dan%C4%85') },
  leaf: { date: '2024-09-02', signified: 'v/body/plant/@{0} is a leaf of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/laub%C4%85') },
  root: { date: '2024-09-02', signified: 'v/body/plant/@{0} is a root of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C5%8Dts') },

  // tool
  knife: { date: '2024-07-28', signified: 'v/tool/@{0} is a (sword, knife, blade)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sahs%C4%85') },
  scissor: { date: '2024-07-28', signified: 'v/tool/@{0} is a scissors', signifier: ['two', 'knife'] },
  spear: { date: '2024-07-28', signified: 'v/tool/@{0} is a (spear, pin)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/speru') },
  rod: { date: '2024-07-28', signified: 'v/tool/@{0} is a (rod, stuff, wand, club)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stikk%C3%B4') },
  money: { date: '2024-08-25', signified: 'v/tool/@{0} is (money, coin, bill)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fehu') },

  // civilization
  person: { date: '2024-02-13', signified: 'v/civilisation/@{0} is (a person, an individual, a citizen)', ...fromLat('cīvī'), etym: 'https://en.wiktionary.org/wiki/civi#Latin' },
  country: { date: '2024-08-24', signified: 'v/civilisation/@{0} is a country', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mark%C5%8D') },
  rule: { date: '2024-07-28', signified: 'v/civilisation/@{0} (rules, orders, dictates) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stiurijan%C4%85') },

  // other
  full: { date: '2024-08-02', signified: 'v/@{0} is (perfect, complete, full of @{1})', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fullaz') },
  work: { date: '2024-02-13', signified: 'v/@{0} works @{1:operation}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werk%C4%85') },
  use: { date: '2024-06-14', signified: 'v/@{0} uses @{1:tool} for @{2:purpose}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nut%C5%8Dn%C4%85') },
  help: { date: '2024-06-18', signified: 'v/@{0} helps @{1:event}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/helpan%C4%85') },
  //lick: { date: '2024-08-08', signified: 'v/lick A', signifier: ['tongue', 'touch'] },
  harm: { date: '2024-08-19', signified: 'v/@{0} (harms, hurts, damages) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/harmaz') },
  heal: { date: '2024-08-19', signified: 'v/@{0} heals @{1} ', signifier: ['back', 'harm'] },
  wont: { date: '2024-09-01', signified: 'v/@{0} is (a custom, a habit, usual, routine, regular) to @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wun%C4%81n%C4%85') }, // https://en.wiktionary.org/wiki/suescere#Latin
  lead: { date: '2024-09-01', signified: 'v/@{0} (leads, guides) @{1:follow}', ...fromLat('https://en.wiktionary.org/wiki/ducere#Latin') },
  pick: { date: '2024-09-09', signified: 'v/@{0} (picks, hunts, gathers, collects) @{1:harvest, prey}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/jakk%C5%8Dn%C4%85') },

  // country
  japan: { date: '2024-08-25', signified: 'v/country/jp', signifier: ['country', 'Name', literal('JP').toUpperCase()], idiom: true, etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:JP' },
  taiwan: { date: '2024-08-25', signified: 'v/country/tw', signifier: ['country', 'Name', literal('TW').toUpperCase()], idiom: true, etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:TW' },
  unitedStates: { date: '2024-08-25', signified: 'v/country/us', signifier: ['country', 'Name', literal('US').toUpperCase()], idiom: true, etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:US' },
  unitedKingdom: { date: '2024-08-25', signified: 'v/country/uk', signifier: ['country', 'Name', literal('GB').toUpperCase()], idiom: true, etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:GB' },
  germany: { date: '2024-08-25', signified: 'v/country/de', signifier: ['country', 'Name', literal('DE').toUpperCase()], idiom: true, etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:DE' },
  france: { date: '2024-08-25', signified: 'v/country/fr', signifier: ['country', 'Name', literal('FR').toUpperCase()], idiom: true, etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:FR' },
  china: { date: '2024-08-25', signified: 'v/country/cn', signifier: ['country', 'Name', literal('CN').toUpperCase()], idiom: true, etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:CN' },
  russia: { date: '2024-08-25', signified: 'v/country/ru', signifier: ['country', 'Name', literal('RU').toUpperCase()], idiom: true, etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:RU' },

  // language
  english: { date: '2024-08-31', signified: 'v/language/en', signifier: ['language', 'Name', literal('EN').toUpperCase()], idiom: true, etym: 'https://iso639-3.sil.org/code/eng' },
  mandarin: { date: '2024-08-31', signified: 'v/language/cmn', signifier: ['language', 'Name', literal('CMN').toUpperCase()], idiom: true, etym: 'https://iso639-3.sil.org/code/cmn' },
  hindustani: { date: '2024-08-31', signified: 'v/language/hi, ur', signifier: ['language', 'Name', literal('HI').toUpperCase()], idiom: true, etym: 'https://iso639-3.sil.org/code/hin' },
  spanish: { date: '2024-08-31', signified: 'v/language/es', signifier: ['language', 'Name', literal('ES').toUpperCase()], idiom: true, etym: 'https://iso639-3.sil.org/code/spa' },
  arabic: { date: '2024-08-31', signified: 'v/language/ar', signifier: ['language', 'Name', literal('AR').toUpperCase()], idiom: true, etym: 'https://iso639-3.sil.org/code/ara' },
  french: { date: '2024-08-31', signified: 'v/language/fr', signifier: ['language', 'Name', literal('FR').toUpperCase()], idiom: true, etym: 'https://iso639-3.sil.org/code/fra' },
  russian: { date: '2024-08-31', signified: 'v/language/ru', signifier: ['language', 'Name', literal('RU').toUpperCase()], idiom: true, etym: 'https://iso639-3.sil.org/code/rus' },
  german: { date: '2024-08-31', signified: 'v/language/de', signifier: ['language', 'Name', literal('DE').toUpperCase()], idiom: true, etym: 'https://iso639-3.sil.org/code/deu' },
  japanese: { date: '2024-08-31', signified: 'v/language/ja', signifier: ['language', 'Name', literal('JA').toUpperCase()], idiom: true, etym: 'https://iso639-3.sil.org/code/jpn' },
}));

// generate compounds
for (let i = 0; i < 1000; i++)
  for (const [k, v] of dict)
    if (Array.isArray(v.signifier)) {
      const components = v.signifier.map(component =>
        /^[A-Z]+$/.test(component)
          ? component.toLowerCase()
          : dict.get(component)?.signifier);
      if (components.every(component => typeof component === 'string')) {
        v.compound = true;
        v.etym = v.etym || v.signifier.join('+');
        if (v.idiom)
          v.signifier = components.join(' ');
        else
          v.signifier = components.join('_')
            // V'C
            .replace(/(?<=[ieaouw])_(?![ieaouw])/g, '')
            // V'V
            .replace(/(?<=[ieaouw])_(?=[ieaouw])/g, 'z')
            // C'V
            .replace(/(?<![ieaouw])_(?=[ieaouw])/g, '')
            // C'C
            .replace(/(?<![ieaouw])_(?![ieaouw])/g, '')
        //.replace(/([^ieaouw])_([^ieaouw])/g, (m, a, b) => isInvalid(a + b) ? a + 'i' + b : a + b)
        dict.set(k, v);
      }
      else if (i === 1000 - 1)
        console.error(`generating ${k}: component missing: ${v.signifier.filter(component => !dict.has(component))}`);
    }

// phonotactics
for (const [k, v] of dict) {
  const v = dict.get(k);
  const fixed = phonotactics(v.signifier);
  if (fixed !== v.signifier) {
    console.log('phonotactic conversion:', v.signifier, fixed);
    v.signifier = fixed;
    dict.set(k, v);
  }
};

// homograph
const entries = [...dict.entries()];
for (let i = 0; i < dict.size; i++)
  for (let j = i + 1; j < dict.size; j++) {
    const [k0, v0] = entries[i];
    const [k1, v1] = entries[j];
    if (v0.signifier === v1.signifier)
      console.error('homograph', v0.signifier, [k0, k1]);
  }

export const name = dict.get('Autonym').signifier;
export default dict;