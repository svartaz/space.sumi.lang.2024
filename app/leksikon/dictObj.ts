import { fromGem, fromLat } from "./from";
import { Formation, literal } from "./common";

const componentsSelf: string[] =
  ((new Date('2023-12-17').getTime() - new Date('1995-07-25').getTime()) / 1000 / 60 / 60 / 24 / 365.25)
    .toFixed(0)
    .toString()
    .split('')
    .map(it => ({
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
      '.': 'Decimal',
    })[it] || '');

const toCompound = (components: string[]) => ({
  signifier: components,
  etym: components.join('+'),
  formation: Formation.Compound,
});

const toIdiom = (components: string[]) => ({
  signifier: components,
  etym: components.join(' '),
  formation: Formation.Idiom,
});

const dual = (k: string, date: string, klass: string[], signified: string, entryRoot, entryCompound) => ({
  [k]: { date, signified, klass, ...entryRoot },
  [k + '*']: { date, signified, klass, ...entryCompound },
});

/* eslint key-spacing: "error" */
export default {
  Self: { date: '2024-02-17', klass: ['v'], signified: '@{0} is the language', signifier: componentsSelf },

  not: { date: '2024-02-13', klass: ['connective', 'logic'], signified: 'not, negation', signifier: 'ne', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne' },
  and: { date: '2024-02-13', klass: ['connective', 'logic'], signified: 'and, both, conjunction', signifier: 'ge', etym: 'https://en.wiktionary.org/wiki/et#Latin' },
  or: { date: '2024-02-13', klass: ['connective', 'logic'], signified: 'or, either, disjunction', signifier: 'go', etym: 'https://en.wiktionary.org/wiki/aut#Latin' },
  iff: { date: '2024-02-13', klass: ['connective', 'logic'], signified: 'if and only iff, biimplication', signifier: 'ga' },

  with: { date: '2024-09-17', klass: ['connective'], signified: 'and, together with, union', signifier: 'mid', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/midi' },

  Nom: { date: '2024-02-13', klass: ['case'], signified: 'nominative', signifier: '-e' },
  Acc: { date: '2024-02-13', klass: ['case'], signified: 'accusative', signifier: '-a' },
  Dat: { date: '2024-02-13', klass: ['case'], signified: 'dative', signifier: '-o' },
  Adv: { date: '2024-02-13', klass: ['case'], signified: 'adverb', signifier: '-u' },

  did: { date: '2024-02-13', klass: ['preverb', 'tense'], signified: 'did, in the past', signifier: 'fu', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai' },
  shall: { date: '2024-02-13', klass: ['preverb', 'tense'], signified: 'shall, in the future', signifier: 'xu', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85' },

  were: { date: '2024-02-13', klass: ['preverb', 'mood'], signified: 'were, may (irrealis, subjunctive)', signifier: 'bi', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Slavic/by' },
  so: { date: '2024-02-13', klass: ['preverb', 'restrictiveness'], signified: 'which is, so (non-restrictive)', signifier: 'du', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEus' },

  begin: { date: '2024-02-13', klass: ['preverb', 'aspect'], signified: 'begin', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ginnan%C4%85'), signifier: 'ci' },
  end: { date: '2024-02-13', klass: ['preverb', 'aspect'], signified: 'end', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/firi-'), signifier: 'fi' },

  may: { date: '2024-02-13', klass: ['preverb', 'mood'], signified: 'may, possibly', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/magan%C4%85'), signifier: 'ku' },
  must: { date: '2024-02-13', klass: ['preverb', 'mood'], signified: 'must, necessarily', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85'), signifier: 'mu' },

  done: { date: '2024-02-13', klass: ['preverb', 'voice'], signified: 'accusative, is done by', signifier: 'ce', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-' },
  doneTo: { date: '2024-02-13', klass: ['preverb', 'voice'], signified: 'dative, is done to by', signifier: 'co', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-' },

  essentially: { date: '2024-10-20', klass: ['preverb', 'essentiality'], signified: 'essentially', etym: 'https://en.wiktionary.org/wiki/esse#Latin', signifier: 'se' },
  accidentally: { date: '2024-10-19', klass: ['preverb', 'essentiality'], signified: 'accidentally', etym: 'https://en.wiktionary.org/wiki/stare#Latin', signifier: 'ta' },

  // clause
  what: { date: '2024-02-13', klass: ['clause'], signified: '@{0} is that which @{sentence}', signifier: 've', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwat' },
  caseThat: { date: '2024-02-13', klass: ['clause'], signified: '@{0} is the (event, statement) that @{sentence}', signifier: 'de', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEat' },
  whether: { date: '2024-07-28', klass: ['clause'], signified: '@{0} is whether @{sentence}', signifier: 'je', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ja' },

  Period: { date: '2024-02-13', klass: ['other'], signified: 'end of clause', signifier: 'lo', etym: 'https://en.wiktionary.org/wiki/%E5%9B%89#Etymology_2' },
  isCalled: { date: '2024-02-13', klass: ['name-to-verb'], signified: '@{0} is called @{name}', signifier: 'na', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4' },

  // base numeral
  zero: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '0', signifier: 'zi', etym: 'https://en.wiktionary.org/wiki/%D8%B5%D9%81%D8%B1#Arabic' },
  one: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '1', signifier: 'ka', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/H%C3%A1ykas' },
  two: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '2', signifier: 'tav', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twai' },
  three: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '3', signifier: 'dir', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%ABz' },
  four: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '4', signifier: 'fed', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fedw%C5%8Dr' },
  five: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '5', signifier: 'pan', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/p%C3%A1n%C4%8Da' },
  six: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '6', signifier: 'xax', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/%C5%A1w%C3%A1%C4%87%C5%A1' },
  seven: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '7', signifier: 'seb', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sebun' },
  eight: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '8', signifier: 'vot', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aht%C5%8Du' },
  nine: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '9', signifier: 'nin', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/newun' },
  //ten: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '10', signifier: 'rek', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/d%C3%A9%E1%B8%B1m%CC%A5' },
  //eleven: { date: '2024-02-13', klass: ['numeral', 'digit'], signified: '11', signifier: 'lif', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ainalif' },

  kilo: { date: '2024-02-13', klass: ['numeral', 'separator'], signified: '1000', signifier: 'dus', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BE%C5%ABsund%C4%AB' },
  Decimal: { date: '2024-02-13', klass: ['numeral', 'separator'], signified: 'decimal separator, $.$', signifier: 'pu', etym: 'https://en.wiktionary.org/wiki/pungo#Latin' },

  infinite: { date: '2024-09-06', klass: ['numeral'], signified: 'infinite', ...fromLat('aevō'), etym: 'https://en.wiktionary.org/wiki/aevum#Latin' },

  howMany: { date: '2024-02-13', klass: ['numeral'], signified: 'how many', signifier: 'vo', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C5%8D' },

  each: { date: '2024-02-13', klass: ['numeral'], signified: 'each, every, all', etym: 'https://en.wiktionary.org/wiki/%CF%80%E1%BE%B6%CF%82#Ancient_Greek', signifier: 'pa' },

  atLeast: { date: '2024-02-13', klass: ['numeral', 'comparative'], signified: 'at least', signifier: 'mes', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/maiz%C3%B4' },
  atMost: { date: '2024-09-17', klass: ['numeral', 'comparative'], signified: 'at most', ...toIdiom(['done', 'atLeast']) },
  lessThan: { date: '2024-08-31', klass: ['numeral', 'comparative'], signified: 'less than', signifier: 'les', etym: 'laisiz' },
  moreThan: { date: '2024-09-17', klass: ['numeral', 'comparative'], signified: 'more than', ...toIdiom(['done', 'lessThan']) },

  plural: { date: '2024-09-17', klass: ['numeral'], signified: 'plural, more than one', signifier: 'mag', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/managaz' },

  // arithmetic
  Add: { date: '2024-02-13', klass: ['numeral', 'arithmetic'], signified: 'addition, $+$', signifier: 'pul', etym: 'https://en.wiktionary.org/wiki/plus#Latin' },
  Sub: { date: '2024-02-13', klass: ['numeral', 'arithmetic'], signified: 'subtraction, $-$', signifier: 'min', etym: 'https://en.wiktionary.org/wiki/minor#Latin' },
  Mul: { date: '2024-02-13', klass: ['numeral', 'arithmetic'], signified: 'multiplication, $*$', signifier: 'mul', etym: 'https://en.wiktionary.org/wiki/multiplicare#Latin' },
  Div: { date: '2024-02-13', klass: ['numeral', 'arithmetic'], signified: 'reciprocal, $/$', signifier: 'div', etym: 'https://en.wiktionary.org/wiki/dividere#Latin' },
  Mod: { date: '2024-08-24', klass: ['numeral', 'arithmetic'], signified: 'modulo, $%$', signifier: 'mod', etym: 'https://en.wiktionary.org/wiki/modulo#Latin' },
  Exp: { date: '2024-08-24', klass: ['numeral', 'arithmetic'], signified: 'exponential, $^$', signifier: 'poter', etym: 'https://en.wiktionary.org/wiki/potere#Latin' },
  Log: { date: '2024-08-24', klass: ['numeral', 'arithmetic'], signified: 'logarithm', signifier: 'locar', etym: 'https://en.wiktionary.org/wiki/logarithmo#Latin' },
  Root: { date: '2024-08-24', klass: ['numeral', 'arithmetic'], signified: 'root', signifier: 'radik', etym: 'https://en.wiktionary.org/wiki/radice#Latin' },

  //ofSize: { date: '2024-08-02', klass: ['number-to-verb'], signified: '@{0} contains @{number} elements', signifier: 'fe', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/felu' },
  th: { date: '2024-08-02', klass: ['number-to-verb'], signified: '@{0} is @{number}-th', signifier: 'do', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-i%C3%BE%C5%8D' },

  first: { date: '2024-09-14', klass: ['number-to-verb'], signified: '@{0} is (0th, first, primary)', ...toIdiom(['th', 'zero']) },
  second: { date: '2024-09-14', klass: ['number-to-verb'], signified: '@{0} is (1st, second, other)', ...toIdiom(['th', 'one']) },
  last: { date: '2024-09-14', klass: ['number-to-verb'], signified: '@{0} is (last, final)', ...toIdiom(['th', 'each']) },

  // pronoun
  who: { date: '2024-02-13', klass: ['v', 'interogative'], signified: '@{0} is who', signifier: 'va', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwaz' },
  self: { date: '2024-02-13', klass: ['v', 'definite'], signified: '@{0} is oneself', signifier: 'sa', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sek' },

  i: { date: '2024-02-13', klass: ['v', 'definite'], signified: '@{0} is me', signifier: 'ma', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mek' },
  thou: { date: '2024-02-13', klass: ['v', 'definite'], signified: '@{0} is thee', signifier: 'da', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEek' },
  he: { date: '2024-02-13', klass: ['v', 'definite'], signified: '@{0} is (him, it, the definite entity)', signifier: 'ha', etym: 'https://en.wiktionary.org/wiki/hann#Old_Norse' },

  we: { date: '2024-09-17', klass: ['v', 'definite'], signified: '@{0} are us', ...toIdiom(['plural', 'i']) },
  ye: { date: '2024-09-17', klass: ['v', 'definite'], signified: '@{0} are you', ...toIdiom(['plural', 'thou']) },
  they: { date: '2024-09-17', klass: ['v', 'definite'], signified: '@{0} are them', ...toIdiom(['plural', 'he']) },

  this: { date: '2024-09-16', klass: ['v', 'definite'], signified: '@{0} is this', ...toIdiom(['he', 'near']) },
  that: { date: '2024-09-16', klass: ['v', 'definite'], signified: '@{0} is that', ...toIdiom(['he', 'far']) },

  now: { date: '2024-02-13', klass: ['v', 'definite'], signified: '@{0} is (now, the present point in time)', signifier: 'nu', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nu' },

  // extent
  normal: { date: '2024-09-29', klass: ['v', 'extent', 'subjective'], signified: '@{0} is of (normal, default, usual, ordinary) extent, at subjective norm', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wanjan%C4%85') },
  high: { date: '2024-09-29', klass: ['v', 'extent', 'subjective'], signified: '@{0} is of (high, great) extent, above sunjective norm', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hauhaz'), signifier: 'hoh' },
  low: { date: '2024-09-29', klass: ['v', 'extent', 'subjective'], signified: '@{0} is of (low, small extent), below subjective norm', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93gaz') },
  positive: { date: '2024-09-29', klass: ['v', 'extent', 'polarity'], signified: '@{0} is (positive, above objective norm)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wela') },
  negative: { date: '2024-09-29', klass: ['v', 'extent', 'polarity'], signified: '@{0} is (negative, below objective norm)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/missa-') },
  up: { date: '2024-09-29', klass: ['v', 'extent', 'dynamic'], signified: '@{0} is (rises, goes up, ascends) along with @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABsan%C4%85') },
  down: { date: '2024-09-29', klass: ['v', 'extent', 'dynamic'], signified: '@{0} is (falls, goes down, descends) along with @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fallan%C4%85') },
  max: { date: '2024-02-13', klass: ['v', 'extent', 'extremum'], signified: '@{0} is (maximal, possibly highest)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fullaz') },
  min: { date: '2024-02-13', klass: ['v', 'extent', 'extremum'], signified: '@{0} is (minimal, possibly lowest)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C5%8Dmaz') },

  // basic
  deny: { date: '2024-08-30', klass: ['v'], signified: '@{0} (contradicts, negates, denies) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gagin'), signifier: 'cac' },
  back: { date: '2024-06-14', klass: ['v'], signified: '@{0} is temporally (inverse, opposite) of @{1}', signifier: 'dis', etym: 'https://en.wiktionary.org/wiki/dis-#Latin' },
  counter: { date: '2024-06-14', klass: ['v'], signified: '@{0} (complements, is dual of) @{1}', signifier: 'kom', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/%E1%B8%B1%C3%B3m' },

  relate: { date: '2024-09-14', klass: ['v'], signified: '@{0} is (related to @{1}, @{1}-ish), ', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-iskaz') }, // https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-l%C4%ABkaz
  exist: { date: '2024-02-13', klass: ['v'], signified: '@{0} (exists, is a thing, is an object)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wesan%C4%85') },
  happen: { date: '2024-08-23', klass: ['v'], signified: '@{0} (happens, occurs, realises, is actual, is an event)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hamp%C4%85') },
  let: { date: '2024-02-13', klass: ['v'], signified: '@{0} (causes, lets) @{1:result, effect}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93tan%C4%85') },

  make: { date: '2024-08-02', klass: ['v'], signified: '@{0} (makes, builds, creates) @{1} from @{2:material, component}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skapjan%C4%85') },
  ...dual('break', '2024-06-14', ['v'], '@{0} (breaks, destructs) @{1} into @{2:pieces, components}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brekan%C4%85'), toCompound(['back', 'make'])),

  have: { date: '2024-08-19', klass: ['v'], signified: '@{0}  (has, owns) @{1:property}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/habjan%C4%85') },
  get: { date: '2024-08-23', klass: ['v'], signified: '@{0} get @{1}', signifier: ['begin', 'have'] },
  lose: { date: '2024-08-23', klass: ['v'], signified: '@{0} lose @{1}', signifier: ['end', 'have'] },
  give: { date: '2024-02-13', klass: ['v'], signified: '@{0} gives @{1} to @{2:receiver}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/geban%C4%85') },
  ...dual('take', '2024-08-24', ['v'], '@{0} takes @{1} from @{2}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neman%C4%85'), toCompound(['back', 'give'])),

  // abstract
  from: { date: '2024-08-26', klass: ['v'], signified: '@{0} is from @{1:source, origin}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fan%C4%93') },
  to: { date: '2024-08-26', klass: ['v'], signified: '@{0} is to @{1:sink, destination}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gangan%C4%85') },
  at: { date: '2024-08-26', klass: ['v'], signified: '@{0} is at @{1:position, location, place}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wi%C3%BEr%C4%85') },
  in: { date: '2024-08-19', klass: ['v'], signified: '@{0} is in @{1:range, area}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/felhan%C4%85') },
  on: { date: '2024-08-26', klass: ['v'], signified: '@{0} is on @{1:surface, border}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABdan%C4%85') },

  member: { date: '2024-08-06', klass: ['v'], signified: '@{0} (belongs to, is a member of) @{1:collection, set, group, list}', ...fromGem('gadaz'), etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gad' },
  part: { date: '2024-08-06', klass: ['v'], signified: '@{0} is a (part, component) of @{1:whole}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dailiz') },
  kind: { date: '2024-07-15', klass: ['v'], signified: '@{0} is a (class, kind, type, subset) of @{1:whole}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kin%C3%BEiz') },
  complex: { date: '2024-08-25', klass: ['v'], signified: '@{0} (is complex, consists of many parts)', ...toCompound(['high', 'done', 'part']) },
  simple: { date: '2024-08-25', klass: ['v'], signified: '@{0} (is simple, consists of few parts)', ...toCompound(['low', 'done', 'part']) },
  atom: { date: '2024-08-25', klass: ['v'], signified: '@{0} is an atom', ...toCompound(['one', 'done', 'part']) },

  contain: { date: '2024-08-02', klass: ['v'], signified: '@{0} is contains @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haldan%C4%85') },
  //...dual('full', '2024-08-02', ['v'], '@{0} is (perfect, complete, full of @{1})', fromGem(''), toCompound(['max', 'contain'])),
  //...dual('empty', '2024-09-26', ['v'], '@{0} is (empty, blank) of @{1} ', fromGem(''), toCompound(['min', 'contain'])),

  move: { date: '2024-08-31', klass: ['v'], signified: '@{0} (moves, is dynamic)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wegan%C4%85') },
  ...dual('stop', '2024-08-31', ['v'], '@{0} (stops, halts, is static)', { signifier: 'stop', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/stopp%C5%8Dn' }, toCompound(['min', 'move'])),

  point: { date: '2024-10-01', klass: ['v'], signified: '@{0} is a (point, position, dot)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stallaz') },
  interval: { date: '2024-10-01', klass: ['v'], signified: '@{0} is (an interval, an area, a volume, a domain)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twiskaz') },

  // physics
  world: { date: '2024-02-13', klass: ['v'], signified: '@{0} is a (world, universe)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haimaz') },
  space: { date: '2024-02-13', klass: ['v'], signified: '@{0} is the 3-dimensional physical spacial continuum', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABm%C4%85') },
  time: { date: '2024-02-13', klass: ['v'], signified: '@{0} is the 1-dimensional physical temporal continuum', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABm%C3%B4') }, // https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABdiz
  thing: { date: '2024-02-13', klass: ['v'], signified: '@{0} is a (thing, matter) located in a spacetime', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEing%C4%85') },
  mass: { date: '2024-08-31', klass: ['v'], signified: '@{0} is a mass of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wihtiz') },

  energy: { date: '2024-08-31', klass: ['v'], signified: '@{0} is energy of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kunnan%C4%85') },
  heat: { date: '2024-09-06', klass: ['v'], signified: '@{0} is heat in @{1}', ...toCompound(['hot', 'energy']) },
  electric: { date: '2024-08-31', klass: ['v'], signified: '@{0} is (electricity, electric charge) in @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sparkaz') },
  force: { date: '2024-10-01', klass: ['v'], signified: '@{0} is force', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wald%C4%85') },
  timeLength: { date: '2024-10-01', klass: ['v'], signified: '@{0} is a time length', ...toCompound(['time', 'interval']) },

  wave: { date: '2024-08-19', klass: ['v'], signified: '@{0} is a wave of @{1:medium}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrazn%C5%8D') },
  light: { date: '2024-02-13', klass: ['v', 'wave'], signified: '@{0} is (a light, an electromagnetic wave)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leuht%C4%85') },
  sound: { date: '2024-08-19', klass: ['v', 'wave'], signified: '@{0} is a sound from @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/klingan%C4%85') },
  turn: { date: '2024-08-19', klass: ['v'], signified: '@{0} (turns, rotates, spins) around @{1:pivot, center}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spinnan%C4%85') },

  // physical attribute
  big: { date: '2024-02-13', klass: ['v'], signified: '@{0} is (big, great)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grautaz') },
  ...dual('small', '2024-09-26', ['v'], '@{0} is small', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smalaz'), toCompound(['low', 'big'])),
  long: { date: '2024-02-13', klass: ['v'], signified: '@{0} is (long, big in 1 dimension and small in others)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/langaz') },
  ...dual('short', '2024-09-26', ['v'], '@{0} is (short, small in 1 dimension and small in others)', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skurtaz'), toCompound(['low', 'long'])),

  thick: { date: '2024-02-13', klass: ['v'], signified: '@{0} is thick', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEekuz') },
  sharp: { date: '2024-07-28', klass: ['v'], signified: '@{0:angle} is sharp', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skarpaz') },
  heavy: { date: '2024-07-14', klass: ['v'], signified: '@{0} is heavy', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%93raz') },
  dense: { date: '2024-07-15', klass: ['v'], signified: '@{0} is (dense, heavy per volume)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEinhtaz') },

  swift: { date: '2024-06-18', klass: ['v'], signified: '@{0} is (swift, quick)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snellaz') },
  ...dual('slow', '2024-09-06', ['v'], '@{0} is slow', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slaiwaz'), toCompound(['low', 'swift'])),
  rough: { date: '2024-08-24', klass: ['v'], signified: '@{0} (is rough, is coarse, has friction) against @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABhaz') },
  ...dual('smooth', '2024-09-26', ['v'], '@{0} (is smooth, is sleek, has low friction)', fromGem('slīkaz'), toCompound(['low', 'rough'])),
  soft: { date: '2024-09-26', klass: ['v'], signified: '@{0} is soft against @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABkwan%C4%85') },
  ...dual('hard', '2024-09-26', ['v'], '@{0} is (hard, firm) against @{1}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dr%C5%ABgiz'), toCompound(['low', 'soft'])),
  hot: { date: '2024-08-30', klass: ['v'], signified: '@{0} is (hot, warm)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/warmaz') },
  ...dual('cold', '2024-08-30', ['v'], '@{0} (cold, cool)', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kalan%C4%85'), toCompound(['low', 'hot'])),
  far: { date: '2024-08-08', klass: ['v'], signified: '@{0} is (far, distant, remote) from @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ferrai') },
  ...dual('near', '2024-08-08', ['v'], '@{0} is (near, close to) @{1}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/n%C4%93hwaz'), toCompound(['low', 'far'])),
  contact: { date: '2024-08-08', klass: ['v'], signified: '@{0} (touches, is adjacent, is in contact with) @{1}', ...toCompound(['min', 'far']) },

  // local position
  below: { date: '2024-02-13', klass: ['v', 'position'], signified: '@{0} is below @{1:above, far against gravity}', signifier: 'nid', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ni%C3%BEan%C4%93' },
  hind: { date: '2024-02-13', klass: ['v', 'position', 'local'], signified: '@{0} is behind @{1:front}', signifier: 'hind', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hinder' },
  left: { date: '2024-02-13', klass: ['v', 'position', 'local'], signified: '@{0} is to the left of @{1:right}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rehtaz') },

  // global position
  before: { date: '2024-02-13', klass: ['v', 'position', 'global'], signified: '@{0} is before @{1:after}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai') },
  west: { date: '2024-08-24', klass: ['v', 'position', 'global'], signified: '@{0} is to the west of @{1:to the east, far agaisnt rotation}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/westr%C4%85') }, //'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/austraz'
  north: { date: '2024-08-24', klass: ['v', 'position', 'global'], signified: '@{0} is to the north of @{1:to the south}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nur%C3%BEraz') },

  // state of matters
  solid: { date: '2024-02-13', klass: ['v', 'state-of-matter'], signified: '@{0} is solid', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%ABfaz') },
  liquid: { date: '2024-02-13', klass: ['v', 'state-of-matter'], signified: '@{0} is liquid', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleutan%C4%85') },
  gas: { date: '2024-02-13', klass: ['v', 'state-of-matter'], signified: '@{0} is gas', signifier: 'cas', etym: 'https://en.wiktionary.org/wiki/gas#Dutch' },
  plasm: { date: '2024-07-15', klass: ['v', 'state-of-matter'], signified: '@{0} is plasm', signifier: 'plasm', etym: 'https://en.wiktionary.org/wiki/%CF%80%CE%BB%CE%AC%CF%83%CE%BC%CE%B1#Ancient_Greek' },

  // matter
  water: { date: '2024-02-13', klass: ['v', 'matter'], signified: '@{0} is water', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wat%C5%8Dr') },
  salt: { date: '2024-02-13', klass: ['v', 'matter'], signified: '@{0} is salt', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/salt%C4%85') },
  stone: { date: '2024-08-19', klass: ['v', 'matter'], signified: '@{0} is stone', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stainaz') },
  smoke: { date: '2024-09-16', klass: ['v', 'matter'], signified: '@{0} is smoke', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raukiz') },
  ash: { date: '2024-09-16', klass: ['v', 'matter'], signified: '@{0} is ash', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ask%C7%AD') },

  ...dual('wet', '2024-09-16', ['v',], '@{0} is (wet, moist)', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nataz'), toCompound(['contain', 'water'])),
  ...dual('dry', '2024-09-16', ['v'], '@{0} is dry', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/druknaz'), toCompound(['low', 'contain', 'water'])),

  // colour
  colour: { date: '2024-02-13', klass: ['v', 'colour'], signified: '@{0} is the colour of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/farwaz') },
  red: { date: '2024-02-13', klass: ['v', 'colour', 'hue'], signified: '@{0} is red', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reudan%C4%85') },
  orange: { date: '2024-02-13', klass: ['v', 'colour', 'hue'], signified: '@{0} is orange', signifier: 'nar', etym: 'https://en.wiktionary.org/wiki/%D9%86%D8%A7%D8%B1%D9%86%DA%AF#Persian' },
  yellow: { date: '2024-02-13', klass: ['v', 'colour', 'hue'], signified: '@{0} is yellow', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gulaz') },
  green: { date: '2024-02-13', klass: ['v', 'colour', 'hue'], signified: '@{0} is green', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C5%8Dniz') },
  blue: { date: '2024-02-13', klass: ['v', 'colour', 'hue'], signified: '@{0} is blue', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C4%93waz') },
  purple: { date: '2024-02-13', klass: ['v', 'colour', 'hue'], signified: '@{0} is purple', signifier: 'por', etym: 'https://en.wiktionary.org/wiki/%CF%80%CE%BF%CF%81%CF%86%CF%8D%CF%81%CE%B1#Ancient_Greek' },
  vivid: { date: '2024-08-19', klass: ['v', 'colour', 'saturation'], signified: '@{0} is vivid-coloured', ...fromGem('blīwą') },
  dull: { date: '2024-08-19', klass: ['v', 'colour', 'saturation'], signified: '@{0} is dull-coloured', ...toCompound(['low', 'vivid']) },
  ...dual('gray', '2024-08-19', ['v', 'colour', 'saturation'], '@{0} is gray', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C4%93waz'), toCompound(['min', 'vivid'])),
  white: { date: '2024-02-13', klass: ['v', 'colour', 'brightness'], signified: '@{0} is white', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C4%ABtaz') },
  ...dual('black', '2024-04-26', ['v', 'colour', 'brightness'], '@{0} is black', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swartaz'), toCompound(['min', 'white'])),

  // light
  bright: { date: '2024-08-19', klass: ['v'], signified: '@{0} is bright', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/berhtaz') },
  ...dual('dark', '2024-08-19', ['v'], '@{0} is dark', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dimmaz'), toCompound(['low', 'bright'])),

  // celestial
  sun: { date: '2024-02-13', klass: ['v', 'celestial'], signified: '@{0} is sun', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD') },
  earth: { date: '2024-02-13', klass: ['v', 'celestial'], signified: '@{0} is earth', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/er%C3%BE%C5%8D') },
  moon: { date: '2024-02-13', klass: ['v', 'celestial'], signified: '@{0} is moon', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/m%C4%93n%C3%B4') },

  // time in planet
  year: { date: '2024-08-30', klass: ['v', 'celestial'], signified: '@{0} is year of @{1:earth}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/j%C4%93r%C4%85') },
  season: { date: '2024-08-30', klass: ['v', 'celestial'], signified: '@{0} is season of @{1:earth}', ...toCompound(['year', 'part']) },
  ...dual('summer', '2024-08-30', ['v', 'celestial', 'season'], '@{0} is (summer, hottest interval) of @{1:earth}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sumaraz'), toCompound(['hot', 'season'])),
  ...dual('winter', '2024-08-30', ['v', 'celestial', 'season'], '@{0} is winter of @{1:earth}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wintruz'), toCompound(['cold', 'season'])),


  day: { date: '2024-08-19', klass: ['v', 'celestial'], signified: '@{0} is day of @{1:earth}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABnaz') },
  daytime: { date: '2024-08-19', klass: ['v', 'celestial'], signified: '@{0} is daytime of @{1:earth}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dagaz') },
  ...dual('night', '2024-08-19', ['v', 'celestial'], '@{0} is night of @{1:earth}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nahts'), toCompound(['counter', 'daytime'])),

  // terrain
  land: { date: '2024-02-13', klass: ['v', 'terrain'], signified: '@{0} is land', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/land%C4%85') },
  sea: { date: '2024-02-13', klass: ['v', 'terrain'], signified: '@{0} sea', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mari') },
  mountain: { date: '2024-02-13', klass: ['v', 'terrain'], signified: '@{0} mountain', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bergaz') },
  river: { date: '2024-02-13', klass: ['v', 'terrain'], signified: '@{0} river', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaumaz') },
  sky: { date: '2024-08-19', klass: ['v', 'terrain'], signified: '@{0} sky', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/himinaz', true) },

  // weather
  cloud: { date: '2024-08-19', klass: ['v', 'weather'], signified: '@{0} is cloud', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulkn%C4%85') },
  fog: { date: '2024-08-19', klass: ['v', 'weather'], signified: '@{0} is fog', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mihstaz') },
  rain: { date: '2024-08-19', klass: ['v', 'weather'], signified: '@{0} is rain', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/regn%C4%85') },
  snow: { date: '2024-08-19', klass: ['v', 'weather'], signified: '@{0} is snow', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snaiwaz') },
  hail: { date: '2024-08-19', klass: ['v', 'weather'], signified: '@{0} is hail', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haglaz') },
  thunder: { date: '2024-08-19', klass: ['v', 'weather'], signified: '@{0} is thunder', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEunraz') },

  // feel
  feel: { date: '2024-02-13', klass: ['v'], signified: '@{0} feels @{1:stimulus}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spurjan%C4%85') },
  hear: { date: '2024-02-13', klass: ['v', 'feel'], signified: '@{0} hears @{1:sound}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hauzijan%C4%85') },
  see: { date: '2024-02-13', klass: ['v', 'feel'], signified: '@{0} sees @{1:sight}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sehwan%C4%85') },
  smell: { date: '2024-02-13', klass: ['v', 'feel'], signified: '@{0} smells @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reukan%C4%85') },
  taste: { date: '2024-02-13', klass: ['v', 'feel'], signified: '@{0} tastes @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smakkuz') },
  touch: { date: '2024-02-13', klass: ['v', 'feel'], signified: '@{0} (palps, touches) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tukk%C5%8Dn%C4%85') },

  differ: { date: '2024-02-13', klass: ['v'], signified: '@{0} (differs, varies) from @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiljan%C4%85') },
  ...dual('similar', '2024-08-27', ['v'], '@{0} (resemmbles, is similar to) @{1}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%ABk%C4%81n%C4%85'), toCompound(['low', 'differ'])),
  ...dual('same', '2024-08-27', ['v'], '@{0} is (the same as, identical to, equal to) @{1}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/samaz'), toCompound(['min', 'differ'])),

  become: { date: '2024-09-28', klass: ['v'], signified: '@{0} (becomes something else, transforms, changes)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wer%C3%BEan%C4%85') },

  //simulate: { date: '2024-08-27', klass: ['v'], signified: 'simulate A, imitate, fake', ...toCompound(['non', 'similar']) },
  test: { date: '2024-07-26', klass: ['v'], signified: '@{0} (checks, examines, inspects) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/keusan%C4%85') },
  compare: { date: '2024-07-26', klass: ['v'], signified: '@{0} compares @{1:individuals}', ...toCompound(['differ', 'test']) },

  // life
  live: { date: '2024-02-13', klass: ['v'], signified: '@{0} (lives, is alive)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libjan%C4%85') },
  die: { date: '2024-08-24', klass: ['v'], signified: '@{0} (dies, is dead)', ...toCompound(['end', 'live']) },
  kill: { date: '2024-08-24', klass: ['v'], signified: '@{0} kills @{1}', ...toCompound(['let', 'die']) },
  wake: { date: '2024-02-13', klass: ['v'], signified: '@{0} (wakes, is awake)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wakan%C4%85') },
  ...dual('sleep', '2024-04-26', ['v'], '@{0} (sleeps, is asleep)', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sl%C4%93pan%C4%85'), toCompound(['min', 'wake'])),

  // motion
  lie: { date: '2024-08-30', klass: ['v', 'behavior'], signified: '@{0} (lies, horizontally stays) on @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ligjan%C4%85') },
  sit: { date: '2024-08-30', klass: ['v', 'behavior'], signified: '@{0} sits on @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sitjan%C4%85') },
  stand: { date: '2024-08-30', klass: ['v', 'behavior'], signified: '@{0} stands on @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%81n%C4%85') },
  walk: { date: '2024-06-18', klass: ['v', 'behavior'], signified: '@{0} walk on @{1:ground}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/walkan%C4%85') },
  run: { date: '2024-06-18', klass: ['v', 'behavior'], signified: '@{0} run on @{1:ground}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rinnan%C4%85') },
  leap: { date: '2024-07-28', klass: ['v', 'behavior'], signified: '@{0} (jump, leap, skip, hop) over @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlaupan%C4%85') },
  swim: { date: '2024-08-19', klass: ['v', 'behavior'], signified: '@{0} (swims, flies) in @{1:fluid}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swimman%C4%85') },
  fly: { date: '2024-07-28', klass: ['v', 'behavior'], signified: '@{0} flies in @{1:air}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleugan%C4%85') },
  dream: { date: '2024-10-16`', klass: ['v', 'behavior'], signified: '@{0} dreams @{1:dream}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/draumaz') },

  // physiological
  eat: { date: '2024-02-13', klass: ['v', 'physiological'], signified: '@{0} eats @{1:food}', ...fromLat('https://en.wiktionary.org/wiki/mandere#Latin') }, //https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/etan%C4%85
  bite: { date: '2024-08-24', klass: ['v', 'physiological', 'eat'], signified: '@{0} bites @{1:food}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABtan%C4%85') },
  chew: { date: '2024-08-24', klass: ['v', 'physiological', 'eat'], signified: '@{0} chews @{1:food}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kewwan%C4%85') },
  swallow: { date: '2024-08-24', klass: ['v', 'physiological', 'eat'], signified: '@{0} swallows @{1:food}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swelgan%C4%85') },
  ...dual('vomit', '2024-06-14', ['v', 'physiological'], '@{0} vomits @{1:excreta}', fromGem('pukaną'), toCompound(['back', 'eat'])),
  ...dual('shit', '2024-06-14', ['v', 'physiological'], '@{0} shits @{1:excreta}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skitiz'), toCompound(['counter', 'eat'])),

  digest: { date: '2024-02-13', klass: ['v', 'physiological'], signified: '@{0} digests @{1:food}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meltan%C4%85') },
  fuck: { date: '2024-02-13', klass: ['v', 'physiological'], signified: '@{0} fucks A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fukk%C5%8Dn%C4%85#Etymology_2') },
  sick: { date: '2024-02-13', klass: ['v', 'physiological'], signified: '@{0} is sick', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/seukaz') },
  ...dual('healthy', '2024-08-24', ['v', 'physiological'], '@{0} is healthy', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz'), toCompound(['low', 'sick'])),

  // emotion
  emotion: { date: '2024-08-02', klass: ['v'], signified: '@{0} is (emotion, feeling) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hugiz') },

  like: { date: '2024-08-02', klass: ['v', 'emotion'], signified: '@{0} (likes, feels (good, positive) about) @{1:good}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lub%C5%8D') },
  ...dual('dislike', '2024-08-02', ['v', 'emotion'], '@{0} (dislikes, feels (bad, negative) about) @{1:bad}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lai%C3%BEaz'), toCompound(['low', 'like'])),

  happy: { date: '2024-08-02', klass: ['v', 'emotion'], signified: '@{0} is (happy, glad, merry) about @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/frawaz') },
  ...dual('sad', '2024-09-10', ['v', 'emotion'], '@{0} is (sad, depressed) about @{1}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/surg%C5%8D'), toCompound(['low', 'happy'])),

  care: { date: '2024-09-10', klass: ['v', 'emotion'], signified: '@{0} (regards, cares about) @{1:important}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kar%C5%8Dn%C4%85') },
  respect: { date: '2024-09-10', klass: ['v', 'emotion'], signified: 'care/@{0} (respects, honors, positively cares about) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wir%C3%BEijan%C4%85') },
  fear: { date: '2024-09-10', klass: ['v', 'emotion'], signified: 'care/@{0} (fears, is afraid of, negatively cares about) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furhtaz') },

  neglect: { date: '2024-09-10', klass: ['v', 'emotion'], signified: '@{0} (neglects, is indifferent to, cares less about) @{1}', ...toCompound(['low', 'care']) },
  serene: { date: '2024-09-10', klass: ['v', 'emotion', 'neglect'], signified: '@{0} is (calm about, serene about, positively neglects) @{1}', ...toCompound(['like', 'neglect']) }, //signifier: 'rov', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%8D%C5%8D'
  scorn: { date: '2024-09-10', klass: ['v', 'emotion', 'neglect'], signified: '@{0} (scorns, disdains, disrespects, negatively neglects) @{1}', ...toCompound(['dislike', 'neglect']) },

  hate: { date: '2024-09-10', klass: ['v', 'emotion'], signified: '@{0} is (hates, detests) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hataz') },
  angry: { date: '2024-09-10', klass: ['v', 'emotion'], signified: '@{0} is (angry with, mad at) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wrai%C3%BEaz') },

  amaze: { date: '2024-08-02', klass: ['v', 'emotion'], signified: '@{0} is (surprised, amazed) at @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wundr%C4%85') },
  expect: { date: '2024-09-10', klass: ['v', 'emotion'], signified: '@{0} (expects, is not surprised at) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABdan%C4%85') },
  bore: { date: '2024-09-10', klass: ['v', 'emotion'], signified: '@{0} (is bored with, is far from surprised with) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bur%C5%8Dn%C4%85') },

  enjoy: { date: '2024-09-10', klass: ['v', 'emotion'], signified: '@{0} enjoys @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neutan%C4%85') },

  trust: { date: '2024-08-02', klass: ['v', 'emotion'], signified: '@{0} trusts @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tr%C5%ABw%C4%81n%C4%85') },
  doubt: { date: '2024-09-10', klass: ['v', 'emotion'], signified: '@{0} doubts @{1}', ...toCompound(['low', 'trust']) }, //...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tw%C4%ABflaz')

  pride: { date: '2024-09-10', klass: ['v', 'emotion'], signified: '@{0} is proud of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stultaz') },
  ...dual('shame', '2024-09-10', ['v', 'emotion'], '@{0} is ashamed of @{1}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skam%C5%8D'), toCompound(['low', 'pride'])),

  shun: { date: '2024-09-27', klass: ['v', 'emotion'], signified: '@{0} is (shuns, avoids) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skeuhaz') },
  ...dual('want', '2024-02-13', ['v', 'emotion'], '@{0} wants @{1}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wiljan%C4%85'), toCompound(['low', 'shun'])),

  love: { date: '2024-09-10', klass: ['v', 'emotion'], signified: '@{0} (loves, is romantically attracted to) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gernaz') },
  randy: { date: '2024-09-12', klass: ['v', 'emotion'], signified: '@{0} is (randy, aroused, lustful, horny, sexual) for @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gailaz') },

  envy: { date: '2024-09-12', klass: ['v', 'emotion', 'hate'], signified: '@{0} envies @{1}', ...fromLat('https://en.wiktionary.org/wiki/zelo#Latin') },
  pity: { date: '2024-09-10', klass: ['v', 'emotion'], signified: '@{0} (pities, feel sympathy) @{1}', ...fromLat('https://en.wiktionary.org/wiki/misero#Latin') },

  // facial
  laugh: { date: '2024-02-13', klass: ['v', 'facial-expression'], signified: 'laugh', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlahjan%C4%85') },
  smile: { date: '2024-02-13', klass: ['v', 'facial-expression'], signified: 'smile', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sm%C4%ABlijan%C4%85') },
  frown: { date: '2024-02-13', klass: ['v', 'facial-expression'], signified: 'frown', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skelhaz') },
  weep: { date: '2024-02-13', klass: ['v', 'facial-expression'], signified: 'weep @{1:tear}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C5%8Dpijan%C4%85') },
  yell: { date: '2024-06-14', klass: ['v'], signified: 'yell @{1:voice}, cry, shout', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stun%C5%8Dn%C4%85') },

  // mental
  know: { date: '2024-02-13', klass: ['v', 'mental'], signified: 'know A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/witan%C4%85') },

  learn: { date: '2024-08-01', klass: ['v', 'mental'], signified: '@{0} learns @{1:idea}', ...toIdiom(['begin', 'know']) },
  forget: { date: '2024-08-01', klass: ['v', 'mental'], signified: '@{0} forgets @{1:idea}', ...toIdiom(['end', 'know']) },
  //...dual('learn', '2024-08-01', ['v', 'mental'], '@{0} learns @{1:idea}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lizan%C4%85'), toCompound(['begin', 'know'])),
  //...dual('forget', '2024-08-01', ['v', 'mental'], '@{0} forgets @{1:idea}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/marzijan%C4%85'), toCompound(['end', 'know'])),
  think: { date: '2024-02-13', klass: ['v', 'mental'], signified: 'think @{1:idea}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEankijan%C4%85') },

  reason: { date: '2024-08-31', klass: ['v', 'mental'], signified: 'have-reason @{1:reason}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ra%C3%BEj%C7%AD') },

  // communicate
  name: { date: '2024-07-28', klass: ['v', 'communicate'], signified: '@{0} (means, signifies, is a name of) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4') },
  speak: { date: '2024-06-14', klass: ['v', 'communicate'], signified: '@{0} speaks in @{1:language, protocol}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tal%C5%8Dn%C4%85') },
  language: { date: '2024-06-14', klass: ['v', 'communicate'], signified: '@{0} language', ...toCompound(['done', 'speak']) },
  say: { date: '2024-06-14', klass: ['v', 'communicate'], signified: '@{0} says @{1:idea} @{2:expression}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sagjan%C4%85') },
  ...dual('understand', '2024-06-14', ['v', 'communicate'], '@{0} understands @{1:idea} from @{2:expression}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlustiz'), toCompound(['counter', 'say'])),
  write: { date: '2024-06-14', klass: ['v', 'communicate'], signified: '@{0} writes @{1:idea} to @{2:expression}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C4%ABtan%C4%85') },
  ...dual('read', '2024-06-14', ['v', 'communicate'], '@{0} reads @{1:idea} from @{2:expression}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%93dan%C4%85'), toCompound(['counter', 'write'])),
  ask: { date: '2024-07-28', klass: ['v', 'communicate'], signified: '@{0} asks @{1:question} to @{2:questionee}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fr%C4%93g%C5%8D') },
  ...dual('answer', '2024-07-28', ['v', 'communicate'], '@{0} answers @{1:answer} to @{2:questioner}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swar%C5%8Dn%C4%85'), toCompound(['counter', 'ask'])),

  // performative
  greet: { date: '2024-02-13', klass: ['v', 'performative'], signified: '@{0} greets @{1:person}', ...fromLat('salūte'), etym: 'https://en.wiktionary.org/wiki/salute#Latin' },
  forgive: { date: '2024-02-13', klass: ['v', 'performative'], signified: '@{0} forgives @{1:event}', ...fromLat('dōnāre'), etym: 'https://en.wiktionary.org/wiki/donare#Latin' },
  thank: { date: '2024-02-13', klass: ['v', 'performative'], signified: '@{0} thanks @{1:event}', ...fromLat('grātō'), etym: 'https://en.wiktionary.org/wiki/grato#Latin' },
  promise: { date: '2024-08-19', klass: ['v', 'performative'], signified: '@{0} (promises, guarantee, vow) @{1:event}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitan%C4%85') },
  command: { date: '2024-09-29', klass: ['v'], signified: '@{0} (command, request, recommend) @{1:must}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stiurijan%C4%85') },

  // culture
  sing: { date: '2024-02-13', klass: ['v', 'culture'], signified: 'sing @{1:music, song}, play', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/singwan%C4%85') },
  dance: { date: '2024-02-13', klass: ['v', 'culture'], signified: 'dance @{1:choreography}', signifier: 'dans', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEans%C5%8Dn' },

  // biochemistry
  rot: { date: '2024-02-13', klass: ['v'], signified: '@{0} is rotten', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rut%C4%81n%C4%85') },
  ...dual('fresh', '2024-07-24', ['v'], '@{0} is fresh', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/friskaz'), toCompound(['low', 'rot'])),

  // reproduction
  beget: { date: '2024-08-19', klass: ['v'], signified: '@{0} (bears, reproducts) @{1:child}, parent', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fad%C4%93r') },
  man: { date: '2024-08-19', klass: ['v'], signified: '@{0} is (a man, male)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gum%C3%B4') },
  woman: { date: '2024-08-19', klass: ['v'], signified: '@{0} is (a woman, female)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABb%C4%85') },

  // animal
  mammal: { date: '2024-02-13', klass: ['v', 'life', 'animal'], signified: '@{0} is a mammal', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/s%C5%ABgan%C4%85') },
  human: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a human', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mann-') },
  rat: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a rat(mouse)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rattaz') },
  hare: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a hare(rabbit)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/has%C3%B4') },
  cat: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a cat', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kattuz') },
  fox: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a fox', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuhsaz') },
  dog: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a dog', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hundaz') },
  wolf: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a wolf', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulfaz') },
  bear: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a bear', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ber%C3%B4') },
  sheep: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a sheep', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%93p%C4%85') },
  goat: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a goat', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gaits') },
  deer: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a deer', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raih%C3%B4') },
  horse: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a horse', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hruss%C4%85') },
  cow: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a cow', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/k%C5%ABz') },
  pig: { date: '2024-02-13', klass: ['v', 'life', 'animal', 'mammal'], signified: '@{0} is a pig', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%ABn%C4%85') },

  reptile: { date: '2024-02-13', klass: ['v', 'life', 'animal'], signified: '@{0} is a reptile', ...fromLat('https://en.wiktionary.org/wiki/repere#Latin') },
  snake: { date: '2024-07-15', klass: ['v', 'life', 'animal', 'reptile'], signified: '@{0} is a snake', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/snak%C5%8D') },

  bird: { date: '2024-02-13', klass: ['v', 'life', 'animal'], signified: '@{0} is a bird', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuglaz') },
  crow: { date: '2024-07-15', klass: ['v', 'life', 'animal', 'bird'], signified: '@{0} is a (crow, raven)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrabnaz') },

  fish: { date: '2024-02-13', klass: ['v', 'life', 'animal'], signified: '@{0} is a fish', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fiskaz') },

  amphibia: { date: '2024-02-13', klass: ['v', 'life', 'animal'], signified: '@{0} is a amphibia', etym: 'https://en.wiktionary.org/wiki/Lork#German_Low_German', signifier: 'lork', },
  frog: { date: '2024-07-15', klass: ['v', 'life', 'animal', 'amphibia'], signified: '@{0} is a frog', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fruskaz') },

  // plant
  plant: { date: '2024-08-19', klass: ['v', 'life'], signified: '@{0} is a plant', ...fromLat('plantā'), etym: 'https://en.wiktionary.org/wiki/planta#Latin' },
  tree: { date: '2024-08-19', klass: ['v', 'life', 'plant'], signified: '@{0} is a tree', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bagmaz') },

  // body
  body: { date: '2024-02-13', klass: ['v'], signified: '@{0} is a body of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrefaz') },
  bone: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a bone of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bain%C4%85') },
  flesh: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a (flesh, meat, muscle) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaiski') },
  fat: { date: '2024-09-16', klass: ['v', 'body'], signified: '@{0} is a fat of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/faitaz') },
  skin: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a (skin, peel) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skin%C3%BE%C4%85') },
  head: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a head of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haubud%C4%85'), },
  neck: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a neck of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnakk%C3%B4') },
  shoulder: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a (shoulder, buttock) of @{1}', ...fromGem('skuldru'), etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/skuldru' },
  arm: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a (limb, leg, arm, branch) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/limuz') },
  hand: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a (hand, foot) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/handuz') },
  trunk: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a (trunk, torso, stem) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stamniz') },
  breast: { date: '2024-09-22', klass: ['v', 'body'], signified: '@{0} is a (chest, breast) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brusts') },
  belly: { date: '2024-09-22', klass: ['v', 'body'], signified: '@{0} is a (chest, breast) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kwe%C3%BEuz') },
  tail: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a tail of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stertaz') },
  hair: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a (hair, fur) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/h%C4%93r%C4%85') },
  horn: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a horn of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hurn%C4%85') },
  tooth: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a (tooth, fang) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tan%C3%BEs') },
  nail: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a (nail, claw) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/naglaz') },
  eye: { date: '2024-02-13', klass: ['v', 'body', 'face-part'], signified: '@{0} is an eye of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aug%C3%B4') },
  ear: { date: '2024-02-13', klass: ['v', 'body', 'face-part'], signified: '@{0} is an ear of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aus%C3%B4') },
  nose: { date: '2024-02-13', klass: ['v', 'body', 'face-part'], signified: '@{0} is a nose of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nas%C5%8D') },
  mouth: { date: '2024-02-13', klass: ['v', 'body', 'face-part'], signified: '@{0} is a mouth of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mun%C3%BEaz') },
  lip: { date: '2024-02-13', klass: ['v', 'body', 'face-part'], signified: '@{0} is a lip of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lep%C3%B4') },
  tung: { date: '2024-02-13', klass: ['v', 'body', 'face-part'], signified: '@{0} is a tongue of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tung%C7%AD') },

  viscera: { date: '2024-02-13', klass: ['v', 'body'], signified: '@{0} is a (viscera, inner organ) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEarmaz') },
  lung: { date: '2024-09-02', klass: ['v', 'body', 'viscera'], signified: '@{0} is a lung of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lung%C3%B4') },
  heart: { date: '2024-09-02', klass: ['v', 'body', 'viscera'], signified: '@{0} is a heart of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hert%C3%B4') },
  maw: { date: '2024-09-02', klass: ['v', 'body', 'viscera'], signified: '@{0} is a (maw, stomach) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mag%C3%B4') },
  liver: { date: '2024-09-02', klass: ['v', 'body', 'viscera'], signified: '@{0} is a liver of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libr%C5%8D') },

  womb: { date: '2024-09-22', klass: ['v', 'body', 'genitalia'], signified: '@{0} is a (prostate, womb) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wamb%C5%8D') },
  vagina: { date: '2024-09-22', klass: ['v', 'body', 'genitalia'], signified: '@{0} is a vagina of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fu%C3%BEiz') },
  penis: { date: '2024-09-22', klass: ['v', 'body', 'genitalia'], signified: '@{0} is a (penis, clitoris) of @{1}', signifier: 'pint', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/pinti' },

  egg: { date: '2024-09-16', klass: ['v', 'body', 'egg'], signified: '@{0} is an egg of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ajj%C4%85') },

  blood: { date: '2024-07-29', klass: ['v', 'body', 'liquid'], signified: '@{0} is blood of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8D%C3%BE%C4%85') },
  milk: { date: '2024-08-31', klass: ['v', 'body', 'liquid'], signified: '@{0} is milk of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meluks') },
  lymph: { date: '2024-08-31', klass: ['v', 'body', 'liquid'], signified: 'lymph', ...fromLat('lymphā'), etym: 'https://en.wiktionary.org/wiki/lympha#Latin' },

  flower: { date: '2024-09-02', klass: ['v', 'body', 'plant'], signified: '@{0} is a (flower, bloom, blossom) of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8Dm%C3%B4') },
  leaf: { date: '2024-09-02', klass: ['v', 'body', 'plant'], signified: '@{0} is a leaf of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/laub%C4%85') },
  root: { date: '2024-09-02', klass: ['v', 'body', 'plant'], signified: '@{0} is a root of @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C5%8Dts') },

  // civilization
  person: { date: '2024-02-13', klass: ['v', 'civilisation'], signified: '@{0} is (a person, an individual, a citizen)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/liudiz') },
  country: { date: '2024-08-24', klass: ['v', 'civilisation'], signified: '@{0} is a country', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mark%C5%8D') },
  rule: { date: '2024-07-28', klass: ['v', 'civilisation'], signified: '@{0} (rules, orders, dictates) @{1}', ...fromLat('https://en.wiktionary.org/wiki/regere#Latin') },

  noble: { date: '2024-10-01', klass: ['v'], signified: '@{0} is noble', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABkijaz') },
  ...dual('humble', '2024-10-01', ['v'], '@{0} is humble', fromGem('meukaz'), toCompound(['low', 'noble'])),

  work: { date: '2024-02-13', klass: ['v'], signified: '@{0} works @{1:operation}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werk%C4%85') },
  use: { date: '2024-06-14', klass: ['v'], signified: '@{0} uses @{1:tool} for @{2:purpose}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nut%C5%8Dn%C4%85') },
  help: { date: '2024-06-18', klass: ['v'], signified: '@{0} helps @{1:event}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/helpan%C4%85') },
  //lick: { date: '2024-08-08', klass: ['v'], signified: 'lick A', signifier: ['tongue', 'touch'] },
  harm: { date: '2024-08-19', klass: ['v'], signified: '@{0} (harms, hurts, damages) @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/harmaz') },
  ...dual('heal', '2024-08-19', ['v'], '@{0} heals @{1}', fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hailijan%C4%85'), toCompound(['back', 'harm'])),

  wont: { date: '2024-09-01', klass: ['v'], signified: '@{0} is (a custom, a habit, usual, routine, regular) to @{1}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wun%C4%81n%C4%85') }, // https://en.wiktionary.org/wiki/suescere#Latin
  lead: { date: '2024-09-01', klass: ['v'], signified: '@{0} (leads, guides) @{1:follower}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dragan%C4%85') },
  pick: { date: '2024-09-09', klass: ['v'], signified: '@{0} (picks, hunts, gathers, collects) @{1:harvest, prey}', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/jakk%C5%8Dn%C4%85') },

  // artifact
  knife: { date: '2024-07-28', klass: ['v', 'artifact'], signified: '@{0} is a (sword, knife, blade)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sahs%C4%85') },
  scissor: { date: '2024-07-28', klass: ['v', 'artifact'], signified: '@{0} is a pair of scissors', ...toCompound(['two', 'knife']) },
  spear: { date: '2024-07-28', klass: ['v', 'artifact'], signified: '@{0} is a (spear, pin)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/speru') },
  rod: { date: '2024-07-28', klass: ['v', 'artifact'], signified: '@{0} is a (rod, stuff, wand, club)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stikk%C3%B4') },
  money: { date: '2024-08-25', klass: ['v', 'artifact'], signified: '@{0} is (money, coin, bill)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fehu') },
  ship: { date: '2024-10-05', klass: ['v', 'artifact'], signified: '@{0} is a (ship, boat)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/baitaz') },

  // grammar
  sentence: { date: '2024-10-05', klass: ['v', 'grammar'], signified: '@{0} is a sentence', signifier: 'fras', etym: 'https://en.wiktionary.org/wiki/%CF%86%CF%81%CE%AC%CF%83%CE%B9%CF%82#Ancient_Greek' },
  clause: { date: '2024-10-05', klass: ['v', 'grammar'], signified: '@{0} is a clause', ...fromLat('https://en.wiktionary.org/wiki/clauso#Latin') },
  word: { date: '2024-10-05', klass: ['v', 'grammar'], signified: '@{0} is a word', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wurd%C4%85') },
  verb: { date: '2024-10-05', klass: ['v', 'grammar'], signified: '@{0} is a verb', ...fromLat('https://en.wiktionary.org/wiki/verbo#Latin') },
  subject: { date: '2024-10-05', klass: ['v', 'grammar'], signified: '@{0} is a subject of @{1}', ...fromLat('https://en.wiktionary.org/wiki/subiecto#Latin') },
  object: { date: '2024-10-05', klass: ['v', 'grammar'], signified: '@{0} is an object of @{1}', ...fromLat('https://en.wiktionary.org/wiki/obiecto#Latin') },
  case: { date: '2024-10-05', klass: ['v', 'grammar'], signified: '@{0} is an case of @{1}', ...fromLat('https://en.wiktionary.org/wiki/casu#Latin') },

  // country
  japan: { date: '2024-08-25', klass: ['v', 'country'], signified: '@{0} is japan (JP)', ...toIdiom(['country', 'isCalled', '$' + literal('JP')]), etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:JP' },
  taiwan: { date: '2024-08-25', klass: ['v', 'country'], signified: '@{0} is taiwan (TW)', ...toIdiom(['country', 'isCalled', '$' + literal('TW')]), etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:TW' },
  unitedStates: { date: '2024-08-25', klass: ['v', 'country'], signified: '@{0} is the united states (US)', ...toIdiom(['country', 'isCalled', '$' + literal('US')]), etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:US' },
  unitedKingdom: { date: '2024-08-25', klass: ['v', 'country'], signified: '@{0} is the united kingdom (UK)', ...toIdiom(['country', 'isCalled', '$' + literal('GB')]), etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:GB' },
  germany: { date: '2024-08-25', klass: ['v', 'country'], signified: '@{0} is germany (DE)', ...toIdiom(['country', 'isCalled', '$' + literal('DE')]), etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:DE' },
  france: { date: '2024-08-25', klass: ['v', 'country'], signified: '@{0} is france (FR)', ...toIdiom(['country', 'isCalled', '$' + literal('FR')]), etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:FR' },
  china: { date: '2024-08-25', klass: ['v', 'country'], signified: '@{0} is china (CN)', ...toIdiom(['country', 'isCalled', '$' + literal('CN')]), etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:CN' },
  russia: { date: '2024-08-25', klass: ['v', 'country'], signified: '@{0} is russia (RU)', ...toIdiom(['country', 'isCalled', '$' + literal('RU')]), etym: 'https://en.wikipedia.org/wiki/ISO_3166-2:RU' },

  // language
  english: { date: '2024-08-31', klass: ['v', 'language'], signified: '@{0} is the english language', ...toIdiom(['language', 'isCalled', '$' + literal('EN')]), etym: 'https://iso639-3.sil.org/code/eng' },
  mandarin: { date: '2024-08-31', klass: ['v', 'language'], signified: '@{0} is the mandarin language', ...toIdiom(['language', 'isCalled', '$' + literal('CMN')]), etym: 'https://iso639-3.sil.org/code/cmn' },
  hindustani: { date: '2024-08-31', klass: ['v', 'language'], signified: '@{0} is the hindustani language', ...toIdiom(['language', 'isCalled', '$' + literal('HI')]), etym: 'https://iso639-3.sil.org/code/hin' },
  spanish: { date: '2024-08-31', klass: ['v', 'language'], signified: '@{0} is the spanish language', ...toIdiom(['language', 'isCalled', '$' + literal('ES')]), etym: 'https://iso639-3.sil.org/code/spa' },
  arabic: { date: '2024-08-31', klass: ['v', 'language'], signified: '@{0} is the arabic language', ...toIdiom(['language', 'isCalled', '$' + literal('AR')]), etym: 'https://iso639-3.sil.org/code/ara' },
  french: { date: '2024-08-31', klass: ['v', 'language'], signified: '@{0} is the french language', ...toIdiom(['language', 'isCalled', '$' + literal('FR')]), etym: 'https://iso639-3.sil.org/code/fra' },
  russian: { date: '2024-08-31', klass: ['v', 'language'], signified: '@{0} is the russian language', ...toIdiom(['language', 'isCalled', '$' + literal('RU')]), etym: 'https://iso639-3.sil.org/code/rus' },
  german: { date: '2024-08-31', klass: ['v', 'language'], signified: '@{0} is the german language', ...toIdiom(['language', 'isCalled', '$' + literal('DE')]), etym: 'https://iso639-3.sil.org/code/deu' },
  japanese: { date: '2024-08-31', klass: ['v', 'language'], signified: '@{0} is the japanese language', ...toIdiom(['language', 'isCalled', '$' + literal('JA')]), etym: 'https://iso639-3.sil.org/code/jpn' },
}