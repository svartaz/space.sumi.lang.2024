import { compare, invalid, toIpa } from './write';
// @ts-ignore
import { replaceEach } from 'https://sumi.space/js/string.js';

export const acronymToWord = (acronym: string) =>
  replaceEach(acronym.toUpperCase(), [
    [/[AIUEO]/g, (it) => 'h' + it.toLowerCase()],
    [/[NMCDBKTPXSFZRL]/g, (it) => it.toLowerCase() + 'a'],
    [/J/g, 'je'],
    [/V/g, 'vo'],
    [/G/g, 'nu'],
    [/H/g, 'xu'],
    [/Q/g, 'ku'],
    [/W/g, 'vi'],

    [/Ä|Æ/g, 'ja'],
    [/Ǝ/g, 've'],
    [/Ö|Œ|Ø/g, 'jo'],
    [/Y|Ü/g, 'ju'],
  ]);

enum Klass {
  Preposition = '前置詞',
  Preverb = '助動詞',
  Verb = '動詞',
  Numeral = '數詞',
  Joiner = '接續詞',
  Other = '助詞',
}

export enum Formation {
  Simplex,
  Complex,
  Idiom,
}

interface ValuePre {
  date: string;
  klass: Klass;
  en: string;
  ja?: string;
  formation: Formation;
  origin: string;
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
nominative - accusative
animate - inanimate
single - multiple
static - dynamic
*/

const dicPre = new Map<string, ValuePre>(
  Object.entries({
    _comma: {
      date: '2025-07-30',
      klass: Klass.Other,
      en: 'a sentence endeth and another beginneth',
      ja: '文が終はり別の文が始まる',
      origin: 'https://en.wiktionary.org/wiki/%E9%82%A3',
      token: 'na',
    },
    _period: {
      date: '2025-07-30',
      klass: Klass.Other,
      en: 'a sentence endeth and so doth an utterance',
      ja: '文が終はり發話が終はる',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Slavic/da',
      token: 'du',
    },

    by: {
      date: '2024-02-13',
      klass: Klass.Preposition,
      en: 'nominative',
      ja: '主格. …が',
      origin: 'https://en.wiktionary.org/wiki/bi#Old_English',
      token: 'be',
    },
    because: {
      date: '2025-07-15',
      klass: Klass.Preposition,
      en: 'causative',
      ja: '因格. …に因って',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fram',
      token: 'fe',
    },
    him: {
      date: '2024-02-13',
      klass: Klass.Preposition,
      en: 'accusative',
      ja: '對格. …を',
      origin: 'https://en.wiktionary.org/wiki/den#German',
      token: 're',
    },
    to: {
      date: '2024-02-13',
      klass: Klass.Preposition,
      en: 'dative',
      ja: '與格. …へ',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tō',
      token: 'te',
    },
    with: {
      date: '2024-12-24',
      klass: Klass.Preposition,
      en: 'comitative',
      ja: '共格. …が關はって',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/midi',
      token: 'me',
    },
    ly: {
      date: '2024-02-13',
      klass: Klass.Preposition,
      en: 'recursive',
      ja: '己格. この文自身が指す事象を…として',
      origin: 'a priori',
      token: 'ze',
    },

    done: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      en: 'passive. foregoeth a preposition and a verb and make an apposition',
      ja: '受動態. 前置詞と動詞に前置し, 動詞の同格を前置詞に對應する格に作用させる. 對格前置詞は省略し得る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-',
      token: 'ca',
    },
    so: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      en: 'which is, so, of course (non-restrictive)',
      ja: '非制限修飾. 當然に…である',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/þus',
      token: 'dus',
    },

    did: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      en: 'realis past',
      ja: '叙實 過去',
      etymology:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/d%C5%8Dn%C4%85',
      token: 'ho',
    },
    do: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      en: 'realis present',
      ja: '叙實 現在',
      etymology: 'https://en.wiktionary.org/wiki/facio#Latin',
      token: 'fo',
    },
    will: {
      date: '2024-02-13',
      klass: Klass.Preverb,
      en: 'realis future',
      ja: '叙實 未來',
      etymology:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85',
      token: 'xo',
    },
    if_be: {
      date: '2025-07-19',
      klass: Klass.Preverb,
      en: 'realis nominal',
      ja: '叙想 不變',
      etymology:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/beun%C4%85',
      token: 'ba',
    },
    if_did: {
      date: '2025-05-27',
      klass: Klass.Preverb,
      en: 'irrealis past',
      ja: '叙想 過去',
      token: 'ha',
    },
    if_do: {
      date: '2025-05-27',
      klass: Klass.Preverb,
      en: 'irrealis present',
      ja: '叙想 現在',
      token: 'fa',
    },
    if_will: {
      date: '2025-05-27',
      klass: Klass.Preverb,
      en: 'irrealis future',
      ja: '叙想 未來',
      token: 'xa',
    },

    begin: {
      date: '2024-05-26',
      klass: Klass.Preverb,
      en: 'inchoative aspect. begin to …',
      ja: '起動相. …し始める',
      etymology:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ginnaną',
      token: 'ci',
    },
    cease: {
      date: '2024-05-26',
      klass: Klass.Preverb,
      en: 'cessative aspect. cease doing …',
      ja: '中斷相. …し已む',
      etymology: 'https://en.wiktionary.org/wiki/stop#English',
      token: 'ti',
    },
    end: {
      date: '2024-05-26',
      klass: Klass.Preverb,
      en: 'perfective. aspect. end doing …',
      ja: '終了相. …し終へる',
      etymology: 'https://en.wiktionary.org/wiki/finis#Latin',
      token: 'fi',
    },

    which: {
      date: '2024-02-13',
      klass: Klass.Other,
      en: 'followeth a verb and opens a local scope',
      ja: '動詞に後置して作用域を開く',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwī',
      token: 'vi',
    },
    whether: {
      date: '2024-07-28',
      klass: Klass.Other,
      en: 'truthfulness clause. @n is whether ...',
      ja: '文に先立って程度に變換する. @nは…かどうかである',
      origin: 'https://en.wiktionary.org/wiki/si#Latin',
      token: 'si',
    },
    _close: {
      date: '2024-02-13',
      klass: Klass.Other,
      en: 'closeth clause',
      ja: '構造を閉ぢる. 非曖昧な時に省略する',
      origin: 'https://en.wiktionary.org/wiki/啦#Chinese',
      token: 'ru',
    },

    then: {
      date: '2025-06-11',
      klass: Klass.Preverb,
      en: 'time consecution. and then. after that',
      ja: '時點前後. 以降. それから. さうして',
      token: 'ku',
    },
    sync: {
      date: '2025-08-04',
      klass: Klass.Preverb,
      en: 'time synchronisation. at the same time',
      ja: '時點同期. 同時に',
      token: 'ta',
    },

    and: {
      date: '2024-02-13',
      klass: Klass.Joiner,
      en: 'and, all, conjunction',
      ja: '連言. かつ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bai',
      token: 'pse',
    },
    or: {
      date: '2024-02-13',
      klass: Klass.Joiner,
      en: 'or, at least one, disjunction',
      ja: '選言. または',
      token: 'pso',
    },
    iff: {
      date: '2024-02-13',
      klass: Klass.Joiner,
      en: 'if and only iff, equivalence',
      ja: '同値. 即ち',
      token: 'psa',
    },
    xor: {
      date: '2025-01-02',
      klass: Klass.Joiner,
      en: 'either',
      ja: '排他的選言. いづれか',
      idiom: ['zero', 'iff'],
    },

    _loan: {
      date: '2024-02-13',
      klass: Klass.Other,
      en: '@n is expression ...',
      ja: '言語外の表現に前置して動詞化する. @nは表現…であり@aを指す',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/namô',
      token: 'ne',
    },

    _var: {
      date: '2025-02-27',
      klass: Klass.Other,
      en: 'bound variable',
      ja: '變項選言と本文を區切る',
      token: 'ke',
    },

    zero: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: '0',
      ja: '0',
      origin: 'https://en.wiktionary.org/wiki/%D8%B5%D9%81%D8%B1#Arabic',
      token: 'zi',
    },
    one: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: '1',
      ja: '1',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/Háykas',
      token: 'ka',
    },
    two: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: '2',
      ja: '2',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twai',
      token: 'tu',
    },
    three: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: '3',
      ja: '3',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þrīz',
      token: 'di',
    },
    four: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: '4',
      ja: '4',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fedwōr',
      token: 'fir',
    },
    five: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: '5',
      ja: '5',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/p%C3%A1n%C4%8Da',
      token: 'pan',
    },
    six: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: '6',
      ja: '6',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/%C5%A1w%C3%A1%C4%87%C5%A1',
      token: 'xek',
    },
    seven: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: '7',
      ja: '7',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sebun',
      token: 'sep',
    },
    eight: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: '8',
      ja: '8',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ahtōu',
      token: 'vak',
    },
    nine: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: '9',
      ja: '9',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/newun',
      token: 'nin',
    },

    decimal: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: 'decimal separator',
      ja: '小數點',
      origin: 'https://en.wiktionary.org/wiki/pungo#Latin',
      token: 'pu',
    },
    kilo: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: '1000. 3-digit separator',
      ja: '1000. 3桁ごとの區切り',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þūsundī',
      token: 'ki',
    },

    infinite: {
      date: '2024-09-06',
      klass: Klass.Numeral,
      en: '(countable or uncountable) infinite',
      ja: '(加算または非可算の) 無限',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sin-',
      token: 'sin',
    },

    how_many: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: 'how many?',
      ja: '數量疑問. 幾つ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwō',
      token: 'vo',
    },

    each: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: 'each. every. all',
      ja: '各. 全',
      origin:
        'https://en.wiktionary.org/wiki/%CF%80%E1%BE%B6%CF%82#Ancient_Greek',
      token: 'pa',
    },

    at_most: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: 'at most. ≤',
      ja: '最大…. ≤',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lītilaz',
      token: 'li',
    },
    less_than: {
      date: '2024-08-31',
      klass: Klass.Numeral,
      en: 'less than. <',
      ja: '…未滿. <',
      origin: 'https://en.wiktionary.org/wiki/læs#Etymology_2_2',
      token: 'ra',
    },

    plural: {
      date: '2024-09-17',
      klass: Klass.Numeral,
      en: 'plural, at least two',
      ja: '複數. 2以上',
      idiom: ['two', 'at_most'],
    },

    _add: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: 'addition. +',
      ja: '加算. +',
      origin: 'https://en.wiktionary.org/wiki/%D8%AC%D9%85%D8%B9',
      token: 'jam',
    },
    _sub: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: 'subtraction. -',
      ja: '減算. -',
      origin: 'https://en.wiktionary.org/wiki/%D8%B7%D8%B1%D8%AD',
      token: 'tar',
    },
    _mul: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: 'multiplication. ×',
      ja: '乘算, ×',
      origin: 'https://en.wiktionary.org/wiki/%D8%B6%D8%B1%D8%A8',
      token: 'drab',
    },
    _div: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: 'division. /',
      ja: '除算. /',
      origin: 'https://en.wiktionary.org/wiki/%D9%82%D8%B3%D9%85#Arabic',
      token: 'ksam',
    },
    _mod: {
      date: '2024-08-24',
      klass: Klass.Numeral,
      en: 'modulo',
      ja: '剩餘',
      origin: 'https://en.wiktionary.org/wiki/modulus#Latin',
      token: 'mod',
    },
    _exp: {
      date: '2024-08-24',
      klass: Klass.Numeral,
      en: 'exponentiation',
      ja: '冪乘',
      origin: 'https://en.wiktionary.org/wiki/potere#Latin',
      token: 'pot',
    },
    _log: {
      date: '2024-08-24',
      klass: Klass.Numeral,
      en: 'logarithm',
      ja: '對數',
      origin: 'https://en.wiktionary.org/wiki/logarithmo#Latin',
      token: 'loc',
    },

    th: {
      date: '2024-08-02',
      klass: Klass.Other,
      en: '@n is …-th',
      ja: '數に後置し序數を指す. @nは第…',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-iþō',
      token: 'zo',
    },
    of: {
      date: '2024-08-02',
      klass: Klass.Other,
      en: '@n are … individuals',
      ja: '數に後置し基數を指す. @nは…個',
      origin: 'https://en.wiktionary.org/wiki/%E5%80%8B',
      token: 'co',
    },

    first: {
      date: '2024-09-14',
      klass: Klass.Verb,
      en: '@n is 0th(, first, primary)',
      ja: '@nは最初, 第0',
      idiom: ['th', 'zero'],
    },
    second: {
      date: '2024-09-14',
      klass: Klass.Verb,
      en: '@n is 1st(, second, other)',
      ja: '@nは第1',
      idiom: ['th', 'one'],
    },
    last: {
      date: '2024-09-14',
      klass: Klass.Verb,
      en: '@n is last(, final)',
      ja: '@nは最終',
      idiom: ['th', 'each'],
    },

    i: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is me',
      ja: '@nは我',
      origin: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ek',
      token: 'je',
    },
    thou: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is thee',
      ja: '@nは汝',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þek',
      token: 'de',
    },
    he: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is (him, it, this, that, the definite entity)',
      ja: '@nは彼, あれ, それ, これ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiz',
      token: 'xe',
    },
    self: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is oneself',
      ja: '@nは己',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sek',
      token: 'se',
    },
    who: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is who',
      ja: '@nは誰, 何',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwaz',
      token: 've',
    },

    this: {
      date: '2024-09-16',
      klass: Klass.Verb,
      en: '@n is this',
      ja: '@nは これ',
      idiom: ['he', 'near'],
    },
    yon: {
      date: '2024-09-16',
      klass: Klass.Verb,
      en: '@n is that',
      ja: '@nは あれ',
      idiom: ['he', 'far'],
    },

    level: {
      date: '2024-09-29',
      klass: Klass.Numeral,
      en: 'normal. moderate. default. usual. ordinary',
      ja: '普通. 標準',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gamet',
      token: 'mu',
    },
    least: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: 'least. smallest. lowest',
      ja: '最少量',
      token: 'lja',
    },
    little: {
      date: '2024-09-29',
      klass: Klass.Numeral,
      en: 'little. small. low',
      ja: '少量',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lēgaz',
      token: 'lo',
    },
    much: {
      date: '2024-09-29',
      klass: Klass.Numeral,
      en: 'much. great. high',
      ja: '多量',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hauhaz',
      token: 'ko',
    },
    most: {
      date: '2024-02-13',
      klass: Klass.Numeral,
      en: 'most. greatest. highest',
      ja: '最多量',
      token: 'kja',
    },
    down: {
      date: '2024-09-29',
      klass: Klass.Numeral,
      en: 'down. decreasing',
      ja: '減少量',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fallaną',
      token: 'fu',
    },
    up: {
      date: '2024-09-29',
      klass: Klass.Numeral,
      en: 'up. increasing',
      ja: '增加量',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rīsaną',
      token: 'ri',
    },

    _self: {
      date: '2024-02-17',
      klass: Klass.Verb,
      en: '@n is the language',
      ja: '@nは この言語',
      token: 'xlos',
    },

    // content words

    deny: {
      date: '2024-08-30',
      klass: Klass.Verb,
      en: '@n contradicteth (negateth, denieth) @a',
      ja: '@nは@aを否定 (に矛盾) する',
      origin: 'https://en.wiktionary.org/wiki/neque#Latin',
      token: 'nek',
    },
    back: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n is temporally inverse (opposite, reversed) of @a',
      ja: '@nは@aの逆行',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/baką',
      token: 'bak',
    },
    counter: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n complementeth (is dual of) @a',
      ja: '@nは@aを補完する (の雙對)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/anþeraz',
      token: 'an',
    },
    relate: {
      date: '2024-09-14',
      klass: Klass.Verb,
      en: '@n is related to @a (@a-ish)',
      ja: '@nは@aに關はる (@a的)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kinþiz',
      token: 'kinz',
    },
    happen: {
      date: '2024-08-23',
      klass: Klass.Verb,
      en: '@n existeth (happeneth, occureth, realiseth, is actual)',
      ja: '@nは存在する (起こる, 實現する, 實際である)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skehaną',
      token: 'xeh',
    },
    make: {
      date: '2024-08-02',
      klass: Klass.Verb,
      en: '@n maketh (buildeth, createth) @a from @g (material, component)',
      ja: '@nは@a (材料, 部品) から@d (完成品) を作る (構成する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/makōn',
      token: 'mak',
    },
    break: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n breaketh (destructeth) @a into @d (pieces, components)',
      ja: '@nは@aを@d (部品) へ壞す (分解する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brekaną',
      token: 'brek',
      complex: ['back', 'make'],
    },

    have: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n hath (owneth) @a (property)',
      ja: '@nは@aを有する (保持する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/habjaną',
      token: 'hab',
    },
    give: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n giveth @a to @d',
      ja: '@nは@aを@dへ與ふ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gebaną',
      token: 'ceb',
    },
    take: {
      date: '2024-08-24',
      klass: Klass.Verb,
      en: '@n taketh (receiveth) @a from @g',
      ja: '@nは@aを@gから受く (得る)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nemaną',
      token: 'nem',
      complex: ['back', 'give'],
    },

    come: {
      date: '2024-08-26',
      klass: Klass.Verb,
      en: '@n is (cometh) from (since) @a (source, origin, start)',
      ja: '@nは@a (始點, 起源, 由來) から來る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kwemaną',
      token: 'kvim',
    },
    go: {
      date: '2024-08-26',
      klass: Klass.Verb,
      en: '@n is (goeth) to (until) @a (sink, destination, goal)',
      ja: '@nは@a (終點, 到達點) へ往く',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gāną',
      token: 'can',
    },
    pass: {
      date: '2024-08-26',
      klass: Klass.Verb,
      en: '@n is (passeth) through (via) @a (process, route, medium)',
      ja: '@nは@a (通過點, 途中, 媒體) を通る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þurhw',
      token: 'zur',
    },
    stay: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is (stayeth) at @a (position, location, place)',
      ja: '@nは@a (地點, 時點) に有る (存在する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lībaną',
      token: 'lib',
    },

    element: {
      date: '2024-08-06',
      klass: Klass.Verb,
      en: '@n is in @{a:collection, set, group, list}',
      ja: '@nは@a (群, 集合, 列擧) に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gad',
      token: 'cad',
    },
    part: {
      date: '2024-08-06',
      klass: Klass.Verb,
      en: '@n is (part, component) of @{a:whole}',
      ja: '@nは@a (全體) の部分',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dailiz',
      token: 'del',
    },
    complex: {
      date: '2024-08-25',
      klass: Klass.Verb,
      en: '@n is complex (consisteth of many parts)',
      ja: '@nは複雜 (部分が多い)',
      complex: ['done', 'part', 'much'],
    },
    simple: {
      date: '2024-08-25',
      klass: Klass.Verb,
      en: '@n (is simple, consisteth of few parts)',
      ja: '@nは單純 (部分が少ない)',
      complex: ['done', 'part', 'little'],
    },
    atom: {
      date: '2024-08-25',
      klass: Klass.Verb,
      en: '@n is an atom',
      ja: '@nは原子 (單位)',
      complex: ['done', 'part', 'least'],
    },

    contain: {
      date: '2024-08-02',
      klass: Klass.Verb,
      en: '@n is containeth @{1:within}',
      ja: '@nは@aを內側に持つ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/lūkan',
      token: 'luk',
    },
    full: {
      date: '2024-08-02',
      klass: Klass.Verb,
      en: '@n is full of @a',
      ja: '@nは@aに滿ちる',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fullaz',
      idiom: ['most', 'contain'],
      token: 'fol',
    },
    empty: {
      date: '2024-08-02',
      klass: Klass.Verb,
      en: '@n is empty of @a',
      ja: '@nは@aを缺く (空)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tōmaz',
      idiom: ['least', 'contain'],
      token: 'tom',
    },

    move: {
      date: '2024-08-31',
      klass: Klass.Verb,
      en: '@n moveth (is dynamic)',
      ja: '@nは動く (變動する, 動的)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/weganą',
      token: 'vej',
    },
    stop: {
      date: '2024-08-31',
      klass: Klass.Verb,
      en: '@n (stopeth, halteth, is static)',
      ja: '@nは止まる (停止する, 靜的)',
      idiom: ['least', 'move'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/stoppōn',
      token: 'stop',
    },

    point: {
      date: '2024-10-01',
      klass: Klass.Verb,
      en: '@n is a (point, position, dot)',
      ja: '@nは點 (位置)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bruzdaz',
      token: 'brud',
    },
    interval: {
      date: '2024-10-01',
      klass: Klass.Verb,
      en: '@n is (an interval, an area, a volume, a domain)',
      ja: '@nは區間 (容積, 領域)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/braidaz',
      token: 'bred',
    },

    world: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a (world, universe)',
      ja: '@nは世界 (宇宙, 時空間)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haimaz',
      token: 'xem',
    },
    space: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is the 3-dimensional physical spacial continuum',
      ja: '@nは3次元物理的空間',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rūmą',
      token: 'rum',
    },
    time: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is the 1-dimensional physical temporal continuum',
      ja: '@nは1次元物理的時間',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tīmô',
      token: 'tim',
    },
    thing: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a (thing, matter) located in a spacetime',
      ja: '@nは物理的存在物 (物體)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þingą',
      token: 'zinc',
    },
    mass: {
      date: '2024-08-31',
      klass: Klass.Verb,
      en: '@n is mass of @a',
      ja: '@nの質量は@a',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/balkô',
      token: 'balx',
    },

    energy: {
      date: '2024-08-31',
      klass: Klass.Verb,
      en: '@n is energy of @a',
      ja: '@nの能源は@a',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/gnāwos',
      token: 'nav',
    },
    heat: {
      date: '2024-09-06',
      klass: Klass.Verb,
      en: '@n is heat in @a',
      ja: '@nの熱量は@a',
      complex: ['hot', 'energy'],
    },
    electric: {
      date: '2024-08-31',
      klass: Klass.Verb,
      en: '@n hath electric charge in @a',
      ja: '@nの電荷は@a',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sparkaz',
      token: 'spak',
    },
    force: {
      date: '2024-10-01',
      klass: Klass.Verb,
      en: '@n is force',
      ja: '@nは力',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/waldą',
      token: 'vald',
    },

    wave: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n (medium) waveth @a (form)',
      ja: '@n (媒體) の波は@a (形狀) を成す',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bulgijō',
      token: 'buj',
    },
    light: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is (a light, an electromagnetic wave)',
      ja: '@nは光 (電磁波)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leuhtą',
      token: 'ljut',
    },
    sound: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is a sound',
      ja: '@nは音',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/klinganą',
      token: 'klinc',
    },
    turn: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n (turneth, rotateth, spineth) around @a (pivot, center)',
      ja: '@nは@a (中心, 軸) を回る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þrēaną',
      token: 'zren',
    },

    burn: {
      date: '2024-12-08',
      klass: Klass.Verb,
      en: '@n (fuel) burneth with @a (oxidant)',
      ja: '@n (燃料) は@a (酸化劑) で燃焼する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brandaz',
      token: 'brand',
    },

    big: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is big (great)',
      ja: '@nは大きい',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grautaz',
      token: 'crot',
    },
    small: {
      date: '2024-09-26',
      klass: Klass.Verb,
      en: '@n is small',
      ja: '@nは小さい',
      idiom: ['little', 'big'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smalaz',
      token: 'smal',
    },
    long: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is long',
      ja: '@nは長い (一次元方向に大きく他次元方向に小さい)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/langaz',
      token: 'lanc',
    },
    short: {
      date: '2024-09-26',
      klass: Klass.Verb,
      en: '@n is short',
      ja: '@nは短い',
      idiom: ['little', 'long'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skurtaz',
      token: 'xurt',
    },
    thick: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is thick',
      ja: '@nは厚い',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þekuz',
      token: 'zek',
    },
    thin: {
      date: '2025-07-17',
      klass: Klass.Verb,
      en: '@n is thin',
      ja: '@nは薄い',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þunnuz',
      idiom: ['little', 'thick'],
      token: 'zun',
    },
    sharp: {
      date: '2024-07-28',
      klass: Klass.Verb,
      en: '@n is sharp',
      ja: '@nは鋭い',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skarpaz',
      token: 'xarp',
    },
    heavy: {
      date: '2024-07-14',
      klass: Klass.Verb,
      en: '@n is heavy',
      ja: '@nは重い',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swēraz',
      token: 'svar',
    },
    dense: {
      date: '2024-07-15',
      klass: Klass.Verb,
      ja: '@n is dense',
      en: '@nは濃い (密集する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þinhtaz',
      token: 'zint',
    },
    swift: {
      date: '2024-06-18',
      klass: Klass.Verb,
      en: '@n is (swift, quick)',
      ja: '@nは速い',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snellaz',
      token: 'snel',
    },
    slow: {
      date: '2024-09-06',
      klass: Klass.Verb,
      en: '@n is slow',
      ja: '@nは遲い',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slaiwaz',
      token: 'slev',
      idiom: ['little', 'swift'],
    },
    rough: {
      date: '2024-08-24',
      klass: Klass.Verb,
      en: '@n (is rough, is coarse, hath much friction) against @a',
      ja: '@nは@aに對して粗い',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rūhaz',
      token: 'ruh',
    },
    smooth: {
      date: '2024-09-26',
      klass: Klass.Verb,
      en: '@n (is smooth, is sleek, hath little friction) against @a',
      ja: '@nは@aに對して滑らか',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slīkaną',
      token: 'slik',
      idiom: ['little', 'rough'],
    },
    soft: {
      date: '2024-09-26',
      klass: Klass.Verb,
      en: '@n is soft against @a',
      ja: '@nは@aに對して軟らかい',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wīkwaną',
      token: 'vik',
    },
    hard: {
      date: '2024-09-26',
      klass: Klass.Verb,
      en: '@n is hard (firm) against @a',
      ja: '@nは@aに對して軟らかい',
      idiom: ['little', 'soft'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fastuz',
      token: 'fast',
    },
    hot: {
      date: '2024-08-30',
      klass: Klass.Verb,
      en: '@n is hot (warm)',
      ja: '@nは熱い (暑い, 温かい)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/warmaz',
      token: 'varm',
    },
    cold: {
      date: '2024-08-30',
      klass: Klass.Verb,
      en: '@n cold (cool)',
      ja: '@nは冷たい (寒い, 涼しい)',
      idiom: ['little', 'hot'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kalaną',
      token: 'kal',
    },
    far: {
      date: '2024-08-08',
      klass: Klass.Verb,
      en: '@n is far (distant, remote) from @a',
      ja: '@nは@aから遠い',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ferrai',
      token: 'fer',
    },
    near: {
      date: '2024-08-08',
      klass: Klass.Verb,
      en: '@n is near (close to) @a',
      ja: '@nは@aへ近い',
      idiom: ['little', 'far'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nēhwaz',
      token: 'nex',
    },
    contact: {
      date: '2024-08-08',
      klass: Klass.Verb,
      en: '@n toucheth (is adjacent, is in contact with) @a',
      ja: '@nは@aに接する',
      idiom: ['least', 'far'],
    },

    before: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is before @a in time',
      ja: '@nは@aの過去に有る (時間方向で小さい)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai',
      token: 'for',
    },
    below: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is below @a (closer to center of gravity)',
      ja: '@nは@aより下に有る (重心へ近い)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/niþanē',
      token: 'niz',
    },
    hind: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is behind @a',
      ja: '@nは@aの後 (進行方向の逆) に有る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hinder',
      token: 'xin',
    },
    front: {
      date: '2025-02-07',
      klass: Klass.Verb,
      en: '@n is in front of @a',
      ja: '@nは@aの前 (進行方向) に有る',
      idiom: ['done', 'hind'],
    },
    left: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is to the left of @a',
      ja: '@nは@aの左に有る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Old_High_German/link',
      token: 'link',
    },
    right: {
      date: '2025-02-07',
      klass: Klass.Verb,
      en: '@n is to the right of @a',
      ja: '@nは@aの右に有る',
      idiom: ['done', 'left'],
    },
    west: {
      date: '2024-08-24',
      klass: Klass.Verb,
      en: '@n is to the west of @a',
      ja: '@nは@aの西 (自轉方向の逆) に有る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/westraz',
      token: 'vest',
    },
    east: {
      date: '2025-03-01',
      klass: Klass.Verb,
      en: '@n is to the east of @a',
      ja: '@nは@aの東 (自轉方向) に有る',
      idiom: ['done', 'west'],
    },
    north: {
      date: '2024-08-24',
      klass: Klass.Verb,
      en: '@n is to the north of @a',
      ja: '@nは@aより北 (反時計回りする極點) へ近い',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nurþraz',
      token: 'nurz',
    },
    south: {
      date: '2025-03-01',
      klass: Klass.Verb,
      en: '@n is to the south of @a',
      ja: '@nは@aよりの南 (時計回りする極點) へ近い',
      idiom: ['done', 'north'],
    },

    solid: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is solid',
      ja: '@nは個體',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stīfaz',
      token: 'stif',
    },
    liquid: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is liquid',
      ja: '@nは液體',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flutą',
      token: 'flut',
    },
    gas: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is gas',
      ja: '@nは氣體',
      origin: 'https://en.wiktionary.org/wiki/gas#Dutch',
      token: 'cas',
    },
    plasm: {
      date: '2024-07-15',
      klass: Klass.Verb,
      en: '@n is plasm',
      ja: '@nは電漿',
      origin: 'https://en.wiktionary.org/wiki/flamma#Latin',
      token: 'flam',
    },

    water: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is water (H₂O)',
      ja: '@nは水 (H₂O)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/watōr',
      token: 'vat',
    },
    salt: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is salt (NaCl)',
      ja: '@nは鹽 (NaCl)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/saltą',
      token: 'salt',
    },
    stone: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is stone (rock, mineral)',
      ja: '@nは石 (巖, 鑛物)',
      origin:
        'https://en.wiktionary.org/wiki/%CE%BC%CE%AD%CF%84%CE%B1%CE%BB%CE%BB%CE%BF%CE%BD#Ancient_Greek',
      token: 'sten',
    },
    metal: {
      date: '2025-07-17',
      klass: Klass.Verb,
      en: '@n is metal',
      ja: '@nは金屬',
      origin:
        'https://en.wiktionary.org/wiki/%CE%BC%CE%AD%CF%84%CE%B1%CE%BB%CE%BB%CE%BF%CE%BD#Ancient_Greek',
      token: 'met',
    },
    smoke: {
      date: '2024-09-16',
      klass: Klass.Verb,
      en: '@n is smoke (solid or liquid particles in gas)',
      ja: '@nは煙 (氣體中の固體または液體の粒子)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dwemrą',
      token: 'dvim',
    },
    ash: {
      date: '2024-09-16',
      klass: Klass.Verb,
      en: '@n is ash',
      ja: '@nは灰',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/askǭ',
      token: 'ask',
    },

    wet: {
      date: '2024-09-16',
      klass: Klass.Verb,
      en: '@n is wet (moist)',
      ja: '@nは濕る (潤う)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wētaz',
      complex: ['contain', 'water'],
    },
    dry: {
      date: '2024-09-16',
      klass: Klass.Verb,
      en: '@n is dry',
      ja: '@nは乾く',
      idiom: ['little', 'wet'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/druknaz',
      token: 'drux',
    },

    colour: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n emiteth @a (colour)',
      ja: '@nは@a (色) を發する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/farwaz',
      token: 'farv',
    },
    hue: {
      date: '2024-11-20',
      klass: Klass.Verb,
      en: '@n emiteth (hue, frequency of light) @a',
      ja: '@nは@a (色相) を發する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiwją',
      token: 'xiv',
    },
    red: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is red',
      ja: '@nは赤い',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raudaz',
      token: 'rod',
    },
    orange: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is orange',
      ja: '@nは橙色を呈する',
      origin:
        'https://en.wiktionary.org/wiki/%D9%86%D8%A7%D8%B1%D9%86%DA%AF#Persian',
      token: 'nar',
    },
    yellow: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is yellow',
      ja: '@nは黃色を呈する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gulaz',
      token: 'cul',
    },
    green: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is green',
      ja: '@nは綠色を呈する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grōniz',
      token: 'cron',
    },
    blue: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is blue',
      ja: '@nは青い',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/blēwaz',
      token: 'blev',
    },
    purple: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is purple',
      ja: '@nは紫色を呈する',
      origin:
        'https://en.wiktionary.org/wiki/%E1%BC%B4%CE%BF%CE%BD#Ancient_Greek',
      token: 'vjun',
    },
    vivid: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is vivid (saturation=high)',
      ja: '@nは鮮やか (彩度=高)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skīmô',
      token: 'skim',
    },
    dull: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is dull (saturation=low)',
      ja: '@nは鈍い (低彩度を呈する)',
      idiom: ['little', 'vivid'],
    },
    gray: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is gray (saturation=lowest)',
      ja: '@nは無彩色を呈する (彩度=最低)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grēwaz',
      token: 'crev',
      idiom: ['least', 'vivid'],
    },
    bright: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is bright (brightness=high)',
      ja: '@nは明るい (明度=高)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/berhtaz',
      token: 'bert',
    },
    dark: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is dark (brightness=low)',
      ja: '@nは暗い (明度=低)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dimmaz',
      idiom: ['little', 'bright'],
      token: 'dim',
    },
    white: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is white (brightness=highest)',
      ja: '@nは白い (明度=最高)',
      idiom: ['most', 'bright'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwītaz',
      token: 'xvit',
    },
    black: {
      date: '2024-04-26',
      klass: Klass.Verb,
      en: '@n is black (brightness=lowest)',
      ja: '@nは黑い (明度=最低)',
      idiom: ['least', 'white'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swartaz',
      token: 'svat',
    },

    // celestial
    sun: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is fixed sun (star)',
      ja: '@nは恆星 (太陽)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunnǭ',
      token: 'sun',
    },
    earth: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is planet (earth)',
      ja: '@nは惑星 (地球)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/erþō',
      token: 'erz',
    },
    moon: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is satellite (moon)',
      ja: '@nは衞星 (月)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mēnô',
      token: 'men',
    },

    year: {
      date: '2024-08-30',
      klass: Klass.Verb,
      en: '@n is year of @a (earth)',
      ja: '@nは@a (惑星) の年 (公轉周期)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/jērą',
      token: 'jer',
    },
    season: {
      date: '2024-08-30',
      klass: Klass.Verb,
      en: '@n is season of @a (earth)',
      ja: '@nは@a (惑星) の季節',
      complex: ['part', 'year'],
    },
    winter: {
      date: '2024-08-30',
      klass: Klass.Verb,
      en: '@n is winter (coldest interval) of @a (earth)',
      ja: '@nは@a (惑星) の冬 (最も寒い季節)',
      complex: ['season', 'little'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wintruz',
      token: 'vint',
    },
    spring: {
      date: '2024-11-21',
      klass: Klass.Verb,
      en: '@n is spring (warming interval) of @a (earth)',
      ja: '@nは@a (惑星) の春 (暖まる季節)',
      complex: ['season', 'up'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wazrą',
      token: 'vazar',
    },
    summer: {
      date: '2024-08-30',
      klass: Klass.Verb,
      en: '@n is summer (hottest interval) of @a (earth)',
      ja: '@nは@a (惑星) の夏 (最も暑い季節)',
      complex: ['season', 'much'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sumaraz',
      token: 'sumar',
    },
    autumn: {
      date: '2024-11-21',
      klass: Klass.Verb,
      en: '@n is autumn (cooling interval) of @a (earth)',
      ja: '@nは@a (惑星) の秋 (冷える季節)',
      complex: ['season', 'down'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/harbistaz',
      token: 'harbis',
    },

    day: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is day of @a (earth)',
      ja: '@nは@a (惑星) の日 (自轉周期)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tīnaz',
      token: 'tin',
    },
    morning: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is morning (daytime) of @a (earth)',
      ja: '@nは@a (惑星) の晝',
      complex: ['part', 'day', 'bright'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/murginaz',
      token: 'murc',
    },
    night: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is night (evening) of @a (earth)',
      ja: '@nは@a (惑星) の夜',
      complex: ['part', 'day', 'dark'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nahts',
      token: 'nat',
    },

    land: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is land (island)',
      ja: '@nは陸地 (島)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/landą',
      token: 'land',
    },
    sea: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a sea (lake)',
      ja: '@nは海 (湖)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mari',
      token: 'mar',
    },
    hill: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a mountain (hill)',
      ja: '@nは山 (丘)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bergaz',
      token: 'berj',
    },
    river: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is river',
      ja: '@nは河川',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/straumaz',
      token: 'stom',
    },
    sky: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is sky (atmosphere)',
      ja: '@nは空 (大氣)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiwją',
      token: 'skiv',
    },

    cloud: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is cloud',
      ja: '@nは雲',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulkną',
      token: 'vulk',
    },
    fog: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is fog (mist)',
      ja: '@nは霧',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mihstaz',
      token: 'mist',
    },
    rain: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is rain',
      ja: '@nは雨',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/regną',
      token: 'ren',
    },
    snow: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is snow',
      ja: '@nは雪',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snīwaną',
      token: 'snev',
    },
    hail: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is hail',
      ja: '@nは雹',
      origin: 'https://en.wiktionary.org/wiki/hægl#Old_English',
      token: 'hel',
    },
    thunder: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is thunder',
      ja: '@nは雷',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þunraz',
      token: 'zurd',
    },

    feel: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n feeleth (senseth) @a (stimulus)',
      ja: '@nは@a (刺戟) を感ずる',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/sent-',
      token: 'sent',
    },
    hear: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n heareth @a (sound)',
      ja: '@nは@a (音) を聞く',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hleumô',
      token: 'xlev',
    },
    see: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n seeth @a (light)',
      ja: '@nは@a (光) を見る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wlītaną',
      token: 'vlit',
    },
    smell: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n smelleth @a (chemical substance)',
      ja: '@nは@a (化學物質) を嗅ぐ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reukaną',
      token: 'rjuk',
    },
    taste: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n taste @a (chemical substance)',
      ja: '@nは@a (化學物質) を味はふ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/smakēn',
      token: 'smak',
    },
    touch: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n palpeth @a (pressure)',
      ja: '@nは@a (力) を觸覺する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tēkaną',
      token: 'tek',
    },
    hurt: {
      date: '2025-03-01',
      klass: Klass.Verb,
      en: '@n hurteth (feeleth pain) from @a',
      ja: '@nは@a (力) に痛む',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sairaz',
      token: 'ser',
    },

    differ: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n differeth (varieth) from @a',
      ja: '@nは@aと異なる',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiljaną',
      token: 'skil',
    },
    same: {
      date: '2024-08-27',
      klass: Klass.Verb,
      en: '@n is (the same as, identical to, equal to) @a',
      ja: '@nは@aに等しい',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/samaz',
      idiom: ['least', 'differ'],
      token: 'sam',
    },
    simulate: {
      date: '2024-08-27',
      klass: Klass.Verb,
      en: '@n simulateth (mimiceth, imitateth, mocketh, faketh) @a',
      ja: '@nは@aを模倣する (擬裝する) ｓ',
      origin: 'https://en.wiktionary.org/wiki/mock#English',
      token: 'mok',
    },
    test: {
      date: '2024-07-26',
      klass: Klass.Verb,
      en: '@n checketh (examineth, inspecteth) @a',
      ja: '@nは@aを確認する (檢查する, 精查する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/keusaną',
      token: 'xus',
    },
    compare: {
      date: '2024-07-26',
      klass: Klass.Verb,
      en: '@n compares @a',
      complex: ['differ', 'test'],
    },

    live: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n liveth (is alive)',
      ja: '@nは生く',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libjaną',
      token: 'liv',
    },
    die: {
      date: '2024-08-24',
      klass: Klass.Verb,
      en: '@n (dieth, is dead)',
      ja: '@nは死ぬ',
      idiom: ['down', 'live'],
    },
    kill: {
      date: '2024-08-24',
      klass: Klass.Verb,
      en: '@n kills @a',
      ja: '@nは殺す',
      idiom: ['done', 'because', 'die'],
    },
    wake: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n waketh (is awake)',
      ja: '@nは起きる (覺める)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wakaną',
      token: 'vax',
    },
    sleep: {
      date: '2024-04-26',
      klass: Klass.Verb,
      en: '@n sleepeth (is asleep)',
      ja: '@nは眠る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swefaną',
      idiom: ['least', 'wake'],
      token: 'svif',
    },

    lie: {
      date: '2024-08-30',
      klass: Klass.Verb,
      en: '@n lieth (horizontally stays) on @a',
      ja: '@nは@aに寢る (臥す)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ligjaną',
      token: 'lic',
    },
    sit: {
      date: '2024-08-30',
      klass: Klass.Verb,
      en: '@n siteth on @a',
      ja: '@nは@aに座る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sitjaną',
      token: 'sit',
    },
    stand: {
      date: '2024-08-30',
      klass: Klass.Verb,
      en: '@n standeth on @a',
      ja: '@nは@aに立つ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stāną',
      token: 'stan',
    },
    walk: {
      date: '2024-06-18',
      klass: Klass.Verb,
      en: '@n walketh on @a (ground)',
      ja: '@nは@aを步く',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/walkaną',
      token: 'valk',
    },
    run: {
      date: '2024-06-18',
      klass: Klass.Verb,
      en: '@n runeth on @a (ground)',
      ja: '@nは@aを走る (驅ける)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rinnaną',
      token: 'rin',
    },
    leap: {
      date: '2024-07-28',
      klass: Klass.Verb,
      en: '@n jumpeth (leapeth, skipeth, hopeth) over @a',
      ja: '@nは@aを跳躍する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gumbōną',
      token: 'cum',
    },
    swim: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n (swimeth, flieth) in @a (fluid)',
      ja: '@nは@a (流體) を飛翔する (泳ぐ)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swimmaną',
      token: 'svim',
    },
    fly: {
      date: '2024-07-28',
      klass: Klass.Verb,
      en: '@n flieth in @a',
      ja: '@nは@aを飛翔する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleuganą',
      token: 'fluc',
      complex: ['swim', 'gas'],
    },

    eat: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n eateth @a (food)',
      ja: '@nは@a (食料) を食ふ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/etan',
      token: 'et',
    },
    bite: {
      date: '2024-08-24',
      klass: Klass.Verb,
      en: '@n biteth @a',
      ja: '@nは@aを嚙む',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bītaną',
      token: 'bit',
    },
    chew: {
      date: '2024-08-24',
      klass: Klass.Verb,
      en: '@n cheweth @a',
      ja: '@nは@aを咀嚼する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kewwaną',
      token: 'xev',
    },
    swallow: {
      date: '2024-08-24',
      klass: Klass.Verb,
      en: '@n swalloweth @a',
      ja: '@nは@aを嚥下する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swelganą',
      token: 'svil',
    },
    digest: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n digesteth @a',
      ja: '@nは@aを消化する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meltaną',
      token: 'melt',
    },
    vomit: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n vomiteth @a',
      ja: '@nは@aを嘔吐する',
      origin: 'https://en.wiktionary.org/wiki/puke',
      complex: ['back', 'eat'],
      token: 'puk',
    },
    shit: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n shiteth (urinateth) @a',
      ja: '@nは@a (糞尿) を排泄する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dritą',
      complex: ['counter', 'eat'],
      token: 'drit',
    },

    fuck: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n fucketh @a',
      ja: '@nは@aと性交する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fukkōną',
      token: 'fuk',
    },
    sick: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is sick (malfunctioneth)',
      ja: '@nは病む (故障する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/seukaz',
      token: 'suk',
    },
    healthy: {
      date: '2024-08-24',
      klass: Klass.Verb,
      en: '@n is healthy',
      ja: '@nは健康',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz',
      idiom: ['little', 'sick'],
      token: 'sund',
    },
    recover: {
      date: '2024-12-24',
      klass: Klass.Verb,
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz',
      en: '@n recovers',
      ja: '@nは恢復する',
      idiom: ['down', 'sick'],
    },

    emotion: {
      date: '2024-08-02',
      klass: Klass.Verb,
      en: '@n feeleth @a (emotion)',
      ja: '@nは@a (感情) を持つ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hugiz',
      token: 'huc',
    },
    bad: {
      date: '2024-08-02',
      klass: Klass.Verb,
      en: '@n disliketh (feeleth bad about) @a',
      ja: '@nは@aを厭ふ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ubilaz',
      token: 'ub',
    },
    good: {
      date: '2024-08-02',
      klass: Klass.Verb,
      en: '@n liketh (feeleth good about) @a',
      ja: '@nは@aを好む',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gōdaz',
      idiom: ['little', 'bad'],
      token: 'cod',
    },
    sad: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n is (sad, depressed) about @a',
      ja: '@nは@aを悲しむ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/surgō',
      token: 'surc',
    },
    glad: {
      date: '2024-08-02',
      klass: Klass.Verb,
      en: '@n is (happy, glad, merry) about @a',
      ja: '@nは@aを喜ぶ',
      idiom: ['little', 'sad'],
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/frawaz',
      token: 'frav',
    },
    care: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n regardeth (careth about) @n',
      ja: '@nは@aを氣に掛ける',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/karō',
      token: 'kar',
    },
    fear: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n worries (feareth, is afraid of) @a',
      ja: '@nは@aを恐れる',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furhtaz',
      complex: ['care', 'bad'],
      token: 'fort',
    },
    respect: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n respecteth (honoureth) @a',
      ja: '@nは@aを敬ふ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werþaz',
      complex: ['care', 'good'],
      token: 'verz',
    },
    neglect: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n neglecteth (is indifferent to) @a',
      ja: '@nは@aを無視する (に無關心)',
      idiom: ['little', 'care'],
    },
    serene: {
      date: '2024-09-10',
      klass: Klass.Verb,
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rōō',
      en: '@n is calm (serene) about @a',
      ja: '@nは@aに平穩 (冷靜)',
      complex: ['neglect', 'good'],
      token: 'rov',
    },
    scorn: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n scorneth (disdaineth, disrespecteth) @a',
      ja: '@nは@aを侮る (軽蔑する, 見くびる)',
      complex: ['neglect', 'bad'],
    },
    hate: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n is hateth (detesteth) @a',
      ja: '@nは@aを憎惡する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hataz',
      token: 'xat',
    },
    angry: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n is angry with (mad at) @a',
      ja: '@nは@aに怒る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wraiþaz',
      token: 'vrez',
    },
    expect: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n expecteth (used to) @a',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/wānijan',
      token: 'van',
    },
    amaze: {
      date: '2024-08-02',
      klass: Klass.Verb,
      en: '@n is surprised (amazed) at @a',
      ja: '@nは@aに驚く',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wundrą',
      token: 'von',
      idiom: ['little', 'expect'],
    },
    bore: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n is bored with @a',
      ja: '@nは@aに飽きる',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/burōną',
      token: 'bur',
      idiom: ['most', 'expect'],
    },
    enjoy: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n enjoyeth @a',
      ja: '@nは@aを樂しむ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neutaną',
      token: 'njut',
    },
    trust: {
      date: '2024-08-02',
      klass: Klass.Verb,
      en: '@n trusteth @a',
      ja: '@nは@aを信ずる',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/trūwāną',
      token: 'trov',
    },
    doubt: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n doubteth @a',
      ja: '@nは@aを疑ふ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twīflaz',
      idiom: ['little', 'trust'],
    },
    pride: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n is proud of @a',
      ja: '@nは@aを誇る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stultaz',
      token: 'stult',
    },
    shame: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@nは@aを恥づ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skamō',
      idiom: ['little', 'pride'],
      token: 'skam',
    },
    shun: {
      date: '2024-09-27',
      klass: Klass.Verb,
      en: '@n is shuneth (avoideth) @a',
      ja: '@nは@aを避く',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skeuhaz',
      token: 'skuh',
    },
    want: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n wanteth @a',
      ja: '@nは@aを求む',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wiljaną',
      idiom: ['little', 'shun'],
      token: 'vil',
    },
    love: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n loveth (is romantically attracted to) @a',
      ja: '@nは@aを愛する (を戀ふ)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gernaz',
      token: 'jern',
    },
    randy: {
      date: '2024-09-12',
      klass: Klass.Verb,
      en: '@n is randy (aroused, lustful, horny, sexual) for @a',
      ja: '@nは@aに欲情する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gailaz',
      token: 'cel',
    },
    envy: {
      date: '2024-09-12',
      klass: Klass.Verb,
      en: '@n envieth @a',
      ja: '@nは@aを羨む (妬む)',
      origin: 'https://en.wiktionary.org/wiki/zelo#Latin',
      token: 'zel',
    },
    pity: {
      date: '2024-09-10',
      klass: Klass.Verb,
      en: '@n (pitieth, feel sympathy) @a',
      ja: '@nは@aを憐れむ (に同情する)',
      origin: 'https://en.wiktionary.org/wiki/natha#Old_Dutch',
      token: 'net',
    },

    laugh: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n laugheth',
      ja: '@nは笑ふ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlahjaną',
      token: 'hlah',
    },
    smile: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n smileth',
      ja: '@nは笑む',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smīlijaną',
      token: 'smil',
    },
    frown: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n frowneth',
      ja: '@nは顰む',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skelhaz',
      token: 'skel',
    },
    weep: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n weepeth @a (tear)',
      ja: '@nは@a (淚) を泣く',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wōpijaną',
      token: 'vop',
    },
    yell: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n yelleth (crieth, shouteth) @a (voice)',
      ja: '@nは@a (聲) を叫ぶ (鳴く)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stunōną',
      token: 'stun',
    },

    know: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n knoweth @a (fact, existence)',
      ja: '@nは@a (事象, 存在) を知る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/witaną',
      token: 'vit',
    },
    learn: {
      date: '2024-08-01',
      klass: Klass.Verb,
      en: '@n learneth @a',
      ja: '@nは@aを學ぶ',
      idiom: ['up', 'know'],
    },
    forget: {
      date: '2024-08-01',
      klass: Klass.Verb,
      en: '@n forgeteth @a',
      ja: '@nは@aを忘る',
      idiom: ['down', 'know'],
    },
    think: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n thinketh @a',
      ja: '@nは@aを考ふ (思ふ)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þankijaną',
      token: 'zank',
    },
    imagine: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n imagineth @a',
      ja: '@nは@aを想像する (夢想する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/biliþōn',
      token: 'bilz',
    },
    reason: {
      date: '2024-08-31',
      klass: Klass.Verb,
      en: '@n reasoneth @a',
      ja: '@nは@aを判ずる (推論する, 理性に照らす)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raþjǭ',
      token: 'raz',
    },
    dream: {
      date: '2024-10-16',
      klass: Klass.Verb,
      en: '@n dreameth @a',
      ja: '@nは@aを夢見る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/draumaz',
      token: 'drom',
    },

    name: {
      date: '2024-07-28',
      klass: Klass.Verb,
      en: '@n meaneth (signifieth, is a name of) @a',
      ja: '@nは@aを意味する (の名である)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/namô',
      token: 'nam',
    },
    speak: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n speaketh in @a (language, protocol)',
      ja: '@nは@a (言語, 規約) で話す (交信する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/talō',
      token: 'tal',
    },
    say: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n sayeth (encodeth) @a (expression)',
      ja: '@nはを@a (表現) を言ふ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sagjaną',
      token: 'sac',
    },
    understand: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n understandeth (decodeth) @a (expression)',
      ja: '@nはを@a (表現) を理解する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlustiz',
      complex: ['counter', 'say'],
      token: 'xlus',
    },
    write: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n writeth @a (expression)',
      ja: '@nはを@a (表現) を書く',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wrītaną',
      token: 'vrit',
    },
    read: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n readeth @a (expression)',
      ja: '@nはを@a (表現) を讀む',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rēdaną',
      complex: ['counter', 'write'],
      token: 'red',
    },
    ask: {
      date: '2024-07-28',
      klass: Klass.Verb,
      en: '@n asketh @a (question) to @d',
      ja: '@nはを@a (質問) を@dへ問ふ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/frēgō',
      token: 'frej',
    },
    answer: {
      date: '2024-07-28',
      klass: Klass.Verb,
      en: '@n answereth @a to @d',
      ja: '@nはを@aを@dへ答ふ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swarōną',
      complex: ['counter', 'ask'],
      token: 'svir',
    },

    greet: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n greeteth to @a',
      ja: '@nは@aへ挨拶する',
      origin: 'https://en.wiktionary.org/wiki/salus#Latin',
      token: 'sal',
    },
    forgive: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n forgiveth @a',
      ja: '@nは@aを許す',
      origin: 'https://en.wiktionary.org/wiki/donare#Latin',
      token: 'don',
    },
    thank: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n thanketh @a',
      ja: '@nは@aに感謝する',
      origin: 'https://en.wiktionary.org/wiki/gratus#Latin',
      token: 'crat',
    },
    promise: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n promiseth (guaranteeth, voweth) @a',
      ja: '@nは@aを約束する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitaną',
      token: 'het',
    },
    command: {
      date: '2024-09-29',
      klass: Klass.Verb,
      en: '@n commandeth (requesteth, recommendeth) @a',
      ja: '@nは@aを命令する (要求する, 推奬する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stiurijaną',
      token: 'stur',
    },

    sing: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n singeth (playeth) @a (music, song)',
      ja: '@nは@a (歌, 曲) を歌ふ (演奏する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/singwaną',
      token: 'sinc',
    },
    dance: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n danceth @a (choreography)',
      ja: '@nは@a (振り付け) を踊る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/þansōn',
      token: 'zans',
    },

    rot: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n roteth',
      ja: '@nは腐敗する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rutāną',
      token: 'rut',
    },
    fresh: {
      date: '2024-07-24',
      klass: Klass.Verb,
      en: '@n is fresh',
      ja: '@nは新鮮',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/friskaz',
      idiom: ['little', 'rot'],
      token: 'frix',
    },

    beget: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n beareth (begeteth, reproducteth, is a parent of) @a (child)',
      ja: '@nは生殖する (@aを生む, @aの親である)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/burdiz',
      token: 'burd',
    },
    man: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is male (produceth sperms)',
      ja: '@nは@a (精巢, 雄蕊) を持つ (男)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gumô',
      token: 'jum',
    },
    woman: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is female (produceth ova)',
      ja: '@nは@a (卵巢, 雌蕊) を持つ (女)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wībą',
      token: 'vib',
    },

    sibling: {
      date: '2025-02-08',
      klass: Klass.Verb,
      en: '@n is a sibiling of (shareth a parent with) @a',
      ja: '@nは@aの同胞 (と親を共有する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sibjaz',
      complex: ['done', 'beget', 'same'],
      token: 'sib',
    },
    family: {
      date: '2025-02-08',
      klass: Klass.Verb,
      en: '@n is in blood relation with @a',
      ja: '@nは@aの血族',
      etymology:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kunją',
      token: 'xun',
    },

    mammal: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a mammal',
      ja: '@nは哺乳綱に屬する',
      origin: 'https://en.wiktionary.org/wiki/mammalis',
      token: 'mamal',
    },
    human: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a human (homo)',
      ja: '@nは人',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mann-',
      token: 'man',
    },
    rat: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a rodent (rat, mouse)',
      ja: '@nは齧歯目に屬する (鼠)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mūs',
      token: 'mus',
    },
    hare: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a lagomorph (hare, rabbit)',
      ja: '@nは兔形目に屬する (兔)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hasô',
      token: 'xas',
    },
    cat: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a felid (cat)',
      ja: '@nは猫屬に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kattuz',
      token: 'kat',
    },
    fox: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a fox',
      ja: '@nは狐',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuhsaz',
      token: 'fus',
    },
    dog: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a canid (dog)',
      ja: '@nは犬屬に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hundaz',
      token: 'hund',
    },
    wolf: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a canis lupus (wolf)',
      ja: '@nは狼',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulfaz',
      token: 'volf',
    },
    bear: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a ursid (bear)',
      ja: '@nは熊科に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/berô',
      token: 'ber',
    },
    sheep: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is an ovis (sheep)',
      ja: '@nは羊屬に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skēpą',
      token: 'skep',
    },
    goat: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a capra (goat)',
      ja: '@nは山羊屬に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gaits',
      token: 'cet',
    },
    deer: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a deer',
      ja: '@nは鹿科に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raihô',
      token: 'reh',
    },
    horse: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a equus (horse)',
      ja: '@nは馬屬に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrussą',
      token: 'hrus',
    },
    cow: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a bovin (cow)',
      ja: '@nは牛族に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kūz',
      token: 'kov',
    },
    pig: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a sus (pig, hog)',
      ja: '@nは猪屬に屬する (豚)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swīną',
      token: 'svin',
    },

    reptile: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a reptile',
      ja: '@nは爬虫類に屬する',
      origin: 'https://en.wiktionary.org/wiki/reptilis#Latin',
      token: 'reptil',
    },
    snake: {
      date: '2024-07-15',
      klass: Klass.Verb,
      en: '@n is a serpent (snake)',
      ja: '@nは蛇亞目に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sneganą',
      token: 'snec',
    },

    bird: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is an avis (bird)',
      ja: '@nは鳥類に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuglaz',
      token: 'fuc',
    },
    crow: {
      date: '2024-07-15',
      klass: Klass.Verb,
      en: '@n is a crow (raven)',
      ja: '@nは烏科に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrabnaz',
      token: 'hrab',
    },

    fish: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a fish',
      ja: '@nは魚類に屬する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fiskaz',
      token: 'fisk',
    },

    amphibia: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a amphibia',
      ja: '@nは兩棲類に屬する',
      origin: 'https://en.wiktionary.org/wiki/amphibius#Latin',
      token: 'anfib',
    },
    frog: {
      date: '2024-07-15',
      klass: Klass.Verb,
      en: '@n is an anura (frog)',
      ja: '@nは無尾目に屬する (蛙)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fruskaz',
      token: 'frusk',
    },

    plant: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is a plant',
      ja: '@nは植物',
      origin: 'https://en.wiktionary.org/wiki/planta#Latin',
      token: 'plant',
    },
    tree: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n is a tree',
      ja: '@nは木本植物',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bagmaz',
      token: 'bam',
    },

    body: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a body',
      ja: '@nは肉體',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrefaz',
      token: 'href',
    },
    bone: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a bone',
      ja: '@nは骨',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bainą',
      token: 'ben',
    },
    spine: {
      date: '2025-02-06',
      klass: Klass.Verb,
      en: '@n is a spine',
      ja: '@nは脊椎',
      origin: 'https://en.wiktionary.org/wiki/spina#Latin',
      token: 'spin',
    },
    flesh: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is flesh (meat, muscle)',
      ja: '@nは筋肉',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaiski',
      token: 'flesk',
    },
    fat: {
      date: '2024-09-16',
      klass: Klass.Verb,
      en: '@n is body fat',
      ja: '@nは體脂肪',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/faitaz',
      token: 'fet',
    },
    skin: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a skin (peel)',
      ja: '@nは皮膚 (皮革)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skinþą',
      token: 'skin',
    },
    head: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a head',
      ja: '@nは頭',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haubudą',
      token: 'hod',
    },
    neck: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a neck',
      ja: '@nは首',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnakkô',
      token: 'hnak',
    },
    shoulder: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a shoulder (buttock)',
      ja: '@nは肩 (尻)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/skuldru',
      token: 'xuld',
    },
    limb: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a limb (leg, arm, branch)',
      ja: '@nは肢 (腕, 脚, 枝)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/limuz',
      token: 'lim',
    },
    arm: {
      date: '2024-11-24',
      klass: Klass.Verb,
      en: '@n is an arm',
      ja: '@nは腕',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/armaz',
      token: 'arm',
    },
    leg: {
      date: '2024-11-24',
      klass: Klass.Verb,
      en: '@n is a leg',
      ja: '@nは肢 (腕, 脚)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lagjaz',
      token: 'lac',
    },
    //extremity: { date:'2024-02-13', klass: Klass.Verb, token: 'hand', origin: 'https://en.wiktionary.org/wiki/reconstruction:proto-germanic/handuz', en: '@0 is a (extremity, hand, foot) of @1' },
    foot: {
      date: '2024-11-24',
      klass: Klass.Verb,
      en: '@n is a foot',
      ja: '@nは足',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fōts',
      token: 'fod',
    },
    hand: {
      date: '2024-11-24',
      klass: Klass.Verb,
      en: '@n is a hand',
      ja: '@nは手',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mundō',
      token: 'mund',
    },
    trunk: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a trunk (torso, stem)',
      ja: '@nは胴 (幹, 莖)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stamniz',
      token: 'stam',
    },
    breast: {
      date: '2024-09-22',
      klass: Klass.Verb,
      en: '@n is a chest (breast)',
      ja: '@nは胸',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brusts',
      token: 'brust',
    },
    belly: {
      date: '2024-09-22',
      klass: Klass.Verb,
      en: '@n is a belly',
      ja: '@nは腹',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kweþuz',
      token: 'kviz',
    },
    tail: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a tail',
      ja: '@nは尾',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stertaz',
      token: 'stet',
    },
    hair: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a hair (fur)',
      ja: '@nは毛',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hazdaz',
      token: 'had',
    },
    horn: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a horn',
      ja: '@nは角',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hurną',
      token: 'hurn',
    },
    tooth: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a tooth (fang)',
      ja: '@nは齒牙',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tanþs',
      token: 'tan',
    },
    nail: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a nail (claw)',
      ja: '@nは爪',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/naglaz',
      token: 'nel',
    },
    eye: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is an eye',
      ja: '@nは目',
      origin: 'https://en.wiktionary.org/wiki/%DA%86%D8%B4%D9%85#Persian',
      token: 'xam',
    },
    ear: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is an ear',
      ja: '@nは耳',
      origin: 'https://en.wiktionary.org/wiki/%DA%AF%D9%88%D8%B4#Persian',
      token: 'cox',
    },
    nose: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a nose',
      ja: '@nは鼻',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nasō',
      token: 'nas',
    },
    mouth: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a mouth',
      ja: '@nは口',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/munþaz',
      token: 'mun',
    },
    lip: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a lip',
      ja: '@nは脣',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lepô',
      token: 'lep',
    },
    tongue: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a tongue',
      ja: '@nは舌',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tungǭ',
      token: 'tunc',
    },

    viscera: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a viscera (inner organ)',
      ja: '@nは內臟',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þarmaz',
      token: 'zarm',
    },
    lung: {
      date: '2024-09-02',
      klass: Klass.Verb,
      en: '@n is a lung',
      ja: '@nは肺',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lungô',
      token: 'lunc',
    },
    heart: {
      date: '2024-09-02',
      klass: Klass.Verb,
      en: '@n is a heart',
      ja: '@nは心臟',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hertô',
      token: 'xert',
    },
    maw: {
      date: '2024-09-02',
      klass: Klass.Verb,
      en: '@n is a maw (stomach)',
      ja: '@nは胃',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/magô',
      token: 'mav',
    },
    liver: {
      date: '2024-09-02',
      klass: Klass.Verb,
      en: '@n is a liver',
      ja: '@nは肝臟',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/librō',
      token: 'ljur',
    },
    womb: {
      date: '2024-09-22',
      klass: Klass.Verb,
      en: '@n is a prostate (womb)',
      ja: '@nは前立腺 (子宮)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wambō',
      token: 'vam',
    },
    vagina: {
      date: '2024-09-22',
      klass: Klass.Verb,
      en: '@n is a vagina',
      ja: '@nは膣',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuþiz',
      token: 'fuz',
    },
    penis: {
      date: '2024-09-22',
      klass: Klass.Verb,
      en: '@n is a penis (clitoris)',
      ja: '@nは陰莖 (陰核)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/pinti',
      token: 'pint',
    },

    egg: {
      date: '2024-09-16',
      klass: Klass.Verb,
      en: '@n is an egg (ovum)',
      ja: '@nは卵 (卵子)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ajją',
      token: 'aj',
    },

    blood: {
      date: '2024-07-29',
      klass: Klass.Verb,
      en: '@n is blood',
      ja: '@nは血',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/blōþą',
      token: 'bloz',
    },
    milk: {
      date: '2024-08-31',
      klass: Klass.Verb,
      en: '@n is milk',
      ja: '@nは乳',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meluks',
      token: 'melk',
    },
    lymph: {
      date: '2024-08-31',
      klass: Klass.Verb,
      en: '@n is lymph',
      ja: '@nは りんぱ',
      origin:
        'https://en.wiktionary.org/wiki/%CE%BD%CF%8D%CE%BC%CF%86%CE%B7#Ancient_Greek',
      token: 'ninf',
    },

    flower: {
      date: '2024-09-02',
      klass: Klass.Verb,
      en: '@n is a flower (bloom, blossom)',
      ja: '@nは花',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/blōaną',
      token: 'bloh',
    },
    leaf: {
      date: '2024-09-02',
      klass: Klass.Verb,
      en: '@n is a leaf',
      ja: '@nは葉',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/laubą',
      token: 'lob',
    },
    root: {
      date: '2024-09-02',
      klass: Klass.Verb,
      en: '@n is a root',
      ja: '@nは根',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wrōts',
      token: 'vrot',
    },

    person: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n is a person (an individual, a citizen)',
      ja: '@nは人間 (個人, 市民, )',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/liudiz',
      token: 'ljud',
    },
    nation: {
      date: '2024-08-24',
      klass: Klass.Verb,
      en: '@n is a country (nation)',
      ja: '@nは國家',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/markō',
      token: 'mark',
    },
    rule: {
      date: '2024-07-28',
      klass: Klass.Verb,
      en: '@n ruleth (ordereth, dictateth) @a',
      ja: '@nは@aを統治する (支配する)',
      origin: 'https://en.wiktionary.org/wiki/rego#Latin',
      token: 'rej',
    },

    noble: {
      date: '2024-10-01',
      klass: Klass.Verb,
      en: '@n is privileged',
      ja: '@nは特權を持つ (貴族)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rīkijaz',
      token: 'rik',
    },

    work: {
      date: '2024-02-13',
      klass: Klass.Verb,
      en: '@n worketh (laboureth)',
      ja: '@nは勞働する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werką',
      token: 'verk',
    },
    dwell: {
      date: '2024-12-20',
      klass: Klass.Verb,
      en: '@n dwelleth in @a (house)',
      ja: '@nは@a (家) に居住する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bōþō',
      token: 'boz',
    },
    use: {
      date: '2024-06-14',
      klass: Klass.Verb,
      en: '@n useth @a (tool, instrument)',
      ja: '@nは@a (道具) を使ふ',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nutō',
      token: 'nut',
    },
    help: {
      date: '2024-06-18',
      klass: Klass.Verb,
      en: '@n helpeth (assisteth) @a',
      ja: '@nは@aを助ける (支援する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/helpaną',
      token: 'help',
    },
    harm: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n harmeth (hurteth, damageth) @a',
      ja: '@nは@aを害する (傷附ける)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skaþô',
      token: 'skaz',
    },

    wont: {
      date: '2024-09-01',
      klass: Klass.Verb,
      en: '@n is used to @a (custom, habit, routine)',
      ja: '@nは@a (習慣) に慣れる',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wunāną',
      token: 'vont',
    },
    lead: {
      date: '2024-09-01',
      klass: Klass.Verb,
      en: '@n leadeth @a',
      ja: '@nは@aを導く',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/draganą',
      token: 'drac',
    },

    stab: {
      date: '2024-11-24',
      klass: Klass.Verb,
      en: '@n stabeth @a',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stubbaz',
      token: 'stub',
    },
    cut: {
      date: '2024-11-21',
      klass: Klass.Verb,
      en: '@n cuteth @a',
      ja: '@nは@aを切る (斷つ)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snīþaną',
      token: 'sniz',
    },
    pick: {
      date: '2024-09-09',
      klass: Klass.Verb,
      en: '@n picketh (hunteth, gathereth, collects) @a (harvest, prey)',
      ja: '@nは@aを拾ふ (狩る, 収穫する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/jakkōną',
      token: 'jak',
    },
    lick: {
      date: '2024-08-19',
      klass: Klass.Verb,
      en: '@n licketh @a',
      ja: '@nは@aを舐める',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/likkōną',
      complex: ['tongue', 'touch'],
      token: 'lix',
    },
    kiss: {
      date: '2024-11-23',
      klass: Klass.Verb,
      en: '@nは@aに接吻する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kussaz',
      complex: ['lip', 'touch'],
      token: 'kus',
    },
    caress: {
      date: '2024-11-23',
      klass: Klass.Verb,
      en: '@n carreseth @a',
      ja: '@nは@aを撫でる (愛撫する)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/streukaną',
      token: 'tjuk',
    },
    hug: {
      date: '2024-11-23',
      klass: Klass.Verb,
      en: '@n hugeth @a',
      ja: '@nは@aを抱擁する',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/faþmaz',
      token: 'fam',
    },
    hit: {
      date: '2024-11-23',
      klass: Klass.Verb,
      en: '@n hiteth (kicketh, puncheth) @a',
      ja: '@nは@aを打つ (毆る, 蹴る)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hittijaną',
      token: 'hit',
    },
    kick: {
      date: '2024-11-23',
      klass: Klass.Verb,
      en: '@n kicketh @a',
      ja: '@nは@aを蹴る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spurnaną',
      complex: ['foot', 'hit'],
      token: 'spun',
    },
    punch: {
      date: '2024-11-23',
      klass: Klass.Verb,
      en: '@n puncheth @a',
      ja: '@nは@aを毆る',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slahaną',
      complex: ['hand', 'hit'],
      token: 'slah',
    },

    rope: {
      date: '2025-02-08',
      klass: Klass.Verb,
      en: '@n is a rope {cord, string}',
      ja: '@nは紐 (繩, 糸)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/taugō',
      token: 'toc',
    },
    knife: {
      date: '2024-07-28',
      klass: Klass.Verb,
      en: '@nは刃 (劍, 刀)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sahsą',
      complex: ['cut', 'done', 'use'],
      token: 'saks',
    },
    scissor: {
      date: '2024-07-28',
      klass: Klass.Verb,
      en: '@n is a pair of scissors',
      ja: '@nは鋏',
      complex: ['two', 'knife'],
    },
    spear: {
      date: '2024-07-28',
      klass: Klass.Verb,
      en: '@n is a spear (pin, skewer)',
      ja: '@nは槍 (鋲, 串)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/speru',
      token: 'sper',
    },
    rod: {
      date: '2024-07-28',
      klass: Klass.Verb,
      en: '@n is a rod (stuff, wand, club)',
      ja: '@nは棒 (杖, 棍)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stikkô',
      token: 'stik',
    },
    dish: {
      date: '2024-12-23',
      klass: Klass.Verb,
      en: '@n is a dish (bowl, cup, container)',
      ja: '@nは器 (皿, 碗, 盆, 杯, 壺, 瓶, 罐)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnappaz',
      token: 'hnap',
    },
    fork: {
      date: '2024-12-23',
      klass: Klass.Verb,
      en: '@n is a fork',
      ja: '@nは叉',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Celtic/gablā',
      token: 'cab',
    },
    spoon: {
      date: '2024-12-23',
      klass: Klass.Verb,
      en: '@n is a spoon (scoop)',
      ja: '@nは匙',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spēnuz',
      token: 'spen',
    },
    tong: {
      date: '2024-12-23',
      klass: Klass.Verb,
      en: '@n is a tong (plier, chopstick)',
      ja: '@nは箸 (鉗子)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tangō',
      token: 'tanc',
    },
    money: {
      date: '2024-08-25',
      klass: Klass.Verb,
      en: '@n is (money, coin, bill)',
      ja: '@nは金 (貨幣, 紙幣, 硬貨)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fehu',
      token: 'fex',
    },
    ship: {
      date: '2024-10-05',
      klass: Klass.Verb,
      en: '@n is a ship (boat)',
      ja: '@nは舟',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/baitaz',
      token: 'bet',
    },
    bridge: {
      date: '2025-02-08',
      klass: Klass.Verb,
      en: '@n is a bridge',
      ja: '@nは橋梁',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brugjǭ',
      token: 'bruc',
    },
    knot: {
      date: '2024-12-23',
      klass: Klass.Verb,
      en: '@n is a knot (tangle, tie, bond)',
      ja: '@nは結び目 (絡まり)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/knuttô',
      token: 'knut',
    },
    book: {
      date: '2025-07-19',
      klass: Klass.Verb,
      en: '@n is a book (volume, tome)',
      ja: '@nは本 (卷, 册)',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bōks',
      token: 'bok',
    },

    age: {
      date: '2024-12-07',
      klass: Klass.Verb,
      en: '@n is at age of @a',
      ja: '@nは@a歲',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/alaną',
      token: 'al',
    },

    sentence: {
      date: '2024-10-05',
      klass: Klass.Verb,
      en: '@n is a sentence',
      ja: '@nは文 (命題)',
      origin:
        'https://en.wiktionary.org/wiki/%CF%86%CF%81%CE%AC%CF%83%CE%B9%CF%82#Ancient_Greek',
      token: 'fras',
    },
    clause: {
      date: '2024-10-05',
      klass: Klass.Verb,
      en: '@n is a clause',
      ja: '@nは節',
      origin: 'https://en.wiktionary.org/wiki/clauso#Latin',
      token: 'klos',
    },
    word: {
      date: '2024-10-05',
      klass: Klass.Verb,
      en: '@n is a word',
      ja: '@n is a 單詞',
      origin:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wurdą',
      token: 'vord',
    },

    verb: {
      date: '2024-10-05',
      klass: Klass.Verb,
      en: '@n is a verb',
      ja: '@nは動詞',
      origin: 'https://en.wiktionary.org/wiki/verbo#Latin',
      token: 'verb',
    },
    case: {
      date: '2024-10-05',
      klass: Klass.Verb,
      en: '@n is a case',
      ja: '@nは格',
      origin: 'https://en.wiktionary.org/wiki/casu#Latin',
      token: 'kas',
    },
    nominative: {
      date: '2024-12-23',
      klass: Klass.Verb,
      en: '@n is nominative',
      ja: '@nは主格',
      complex: ['verb', 'head'],
    },
    oblique: {
      date: '2024-12-23',
      klass: Klass.Verb,
      en: '@n is oblique',
      ja: '@nは非主格',
      complex: ['verb', 'arm'],
    },
    accusative: {
      date: '2024-12-23',
      klass: Klass.Verb,
      en: '@n is accusative',
      ja: '@nは對格',
      complex: ['verb', 'zero', 'th', 'arm'],
    },
    dative: {
      date: '2024-12-23',
      klass: Klass.Verb,
      en: '@n is dative',
      ja: '@nは與格',
      complex: ['verb', 'one', 'th', 'arm'],
    },

    ...Object.fromEntries(
      [
        ['eu', '2025-02-28', 'よおろっぱ', 'europe'],
        ['as', '2025-02-28', 'あじあ', 'asia'],
        ['af', '2025-02-28', 'あふりか', 'africa'],
        ['an', '2025-07-31', '南極', 'antartica'],
        ['na', '2025-02-28', '北あめりか', 'north america'],
        ['sa', '2025-02-28', '南あめりか', 'south america'],
        ['oc', '2025-02-28', 'おせあにあ', 'oceania'],
      ].map(([iso, date, ja, en]) => [
        `nation_${iso.toLowerCase()}`,
        {
          date,
          klass: Klass.Verb,
          ja: `@nは${
            /^\p{scx=Hiragana}/u.test(ja) ? ' ' : ''
          }${ja}大陸 (${iso})`,
          en: `@n is the continent ${en} (${iso})`,
          origin: 'continent code',
          complex: ['land', '$' + acronymToWord(iso)],
        },
      ])
    ),

    ...Object.fromEntries(
      [
        ['us', '2024-08-25', 'あめりか合衆國', 'the united states'],
        ['cn', '2024-08-25', '中華人民共和國', 'china'],
        ['de', '2024-08-25', 'どいつ連邦', 'germany'],
        ['jp', '2024-08-25', '日本', 'japan'],
        ['in', '2024-11-22', 'いんど共和國', 'india'],
        [
          'gb',
          '2024-08-25',
          '大ぶりてん及び北あいるらんど聯合王國',
          'the united kingdom',
        ],
        ['fr', '2024-08-25', 'ふらんす共和國', 'france'],
        ['it', '2024-11-22', 'いたりあ共和國', 'italy'],
        ['ca', '2024-11-22', 'かなだ', 'canada'],
        ['br', '2024-11-22', 'ぶらじる連邦共和國', 'brazil'],
        ['ru', '2025-02-08', 'ろしや連邦', 'russia'],
        ['tw', '2025-02-28', '臺灣', 'taiwan'],
      ].map(([iso, date, ja, en]) => [
        `nation_${iso.toLowerCase()}`,
        {
          date,
          klass: Klass.Verb,
          ja: `@nは${/^\p{scx=Hiragana}/u.test(ja) ? ' ' : ''}${ja} (${iso})`,
          en: `@n is ${en} (${iso})`,
          origin: 'ISO 3166-1 alpha-2',
          complex: ['nation', '$' + acronymToWord(iso)],
        },
      ])
    ),

    ...Object.fromEntries(
      [
        ['eng', '2024-08-31', '英', 'english'],
        ['cmn', '2024-08-31', '華', 'mandarin'],
        ['hin', '2024-08-31', 'ひんづすたに', 'hindustani'],
        ['spa', '2024-08-31', 'すぺいん', 'spanish'],
        ['ara', '2024-08-31', 'あらびや', 'arabic'],
        ['fra', '2024-08-31', 'ふらんす', 'french'],
        ['rus', '2024-08-31', 'ろしや', 'russian'],
        ['deu', '2024-08-31', 'どいつ', 'german'],
        ['jpn', '2024-08-31', '日本', 'japanese'],
      ].map(([iso, date, ja, en]) => [
        `language_${iso}`,
        {
          date,
          klass: Klass.Verb,
          complex: ['done', 'speak', '$' + acronymToWord(iso)],
          en: `@n is ${en} language (${iso})`,
          ja: `@nは${/^\p{scx=Hiragana}/u.test(ja) ? ' ' : ''}${ja}語 (${iso})`,
        },
      ])
    ),
  }).flatMap(([k, v]) => {
    const r = [];

    const { token, complex, idiom, ...vRest } = v;

    r.push([k, { ...vRest, formation: Formation.Simplex, token }]);
    if (complex)
      r.push([
        k + '*',
        {
          ...vRest,
          ...(token ? { en: `=${token}` } : {}),
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
          ...(token ? { en: `=${token}` } : {}),
          formation: Formation.Idiom,
          origin: idiom.join('␣'),
          idiom,
        },
      ]);

    return r;
  })
);

const toTokens = (ks: string[]) =>
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
      if (v.complex.some((it) => !dicPre.has(it))) dicPre.delete(k);

      const tokens = toTokens(v.complex);

      if (tokens.every((it) => typeof it === 'string')) {
        delete v.complex;
        dicPre.set(k, {
          ...v,
          token: tokens.reduce((acc, it) =>
            /[^aiueo]$/.test(acc) && /^[^aiueo]/.test(it)
              ? acc + 'o' + it
              : /[aiueo]$/.test(acc) && /^[aiueo]/.test(it)
              ? acc + 'h' + it
              : acc + it
          ),
        });
      }
    } else if ('idiom' in v) {
      if (v.idiom.some((it) => !dicPre.has(k))) dicPre.delete(k);

      const tokens = toTokens(v.idiom);

      if (tokens.every((it) => typeof it === 'string')) {
        delete v.idiom;
        dicPre.set(k, {
          ...v,
          token: tokens.join(' '),
        });
      }
    }

interface Value {
  date: string;
  klass: string;
  en: string;
  ja?: string;
  formation: Formation;
  origin: string;
  token: string;
  ipa: string;
}

const dic = dicPre as Map<string, Value>;

// delete failed
for (const [k, v] of dic.entries())
  if (v.token) dic.set(k, { ...v, ipa: toIpa(v.token) });
  else {
    dic.delete(k);
    console.warn(`deleted .${k}`);
  }

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

export default new Map(
  [...dic.entries()].sort(([, a], [, b]) => compare(a.token, b.token))
);

export const translate = (code: string) =>
  code
    .replace(
      /[a-z_]+/g,
      (k) =>
        dic.get(k)?.token ??
        dic.get(k + '*')?.token ??
        dic.get(k + '#')?.token ??
        k
    )
    .replace(/ -/g, '-');
