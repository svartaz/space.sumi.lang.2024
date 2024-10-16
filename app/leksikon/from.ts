import { replaceAll } from "@/lib/sundry";
import { Formation } from "./common";

const from = (replacements) => (etym: string, mono = false) => ({
  signifier: replaceAll(decodeURIComponent(etym), [
    // extract from URL
    [/^.+\//, ''],
    [/#.+$/, ''],

    [/^-|-$/, ''],
    [/(.)\1+/g, it => it.slice(-1)],

    ...replacements,

    [/(?<!^)z/g, 's'],
    [/(?<=[ieaou][^ieaou]+)[ieaou].+$/, mono ? '' : it => it],
  ]),
  formation: Formation.Root,
  etym,
});

export const fromGem = from([
  // remove suffix
  [/(?<=[ieaouīēāōūîêâôû][^ieaouīēāōūîêâôû]+)(i?janą|i?jaz|j?an|[aāō]ną|[aiu]z|[ēō]r|ai|s|[ieaouąīēāōūǭîêâôû])$/, ''],

  // diphthong
  //[/ai/g, 'e'],
  //[/au/g, 'o'],
  //[/eu/g, 'o'],
  //[/iu/g, 'ju'],
  //[/ōi/g, 'e'],
  //[/ōu/g, 'u'],
  //[/ēi/g, 'i'],
  //[/ēu/g, 'ju'],

  // simplify vowel
  [/ī|î/g, 'i'],
  [/ē|ê/g, 'e'],
  [/ā|â/g, 'a'],
  [/ō|ô/g, 'o'],
  [/ū|û/g, 'u'],


  // simple substitution
  [/þ/g, 'd'],
  [/g/g, 'c'],
  [/nc/g, 'g'],

  // W
  [/(?<=[^ieaou])w$/g, ''],
  [/w/g, 'v'],

  // sound change
  //[/^h(?=[gnmrl])/g, ''],
  [/ts$/g, 't'],
  [/z$/g, 'r'],

  // specific
  [/berht/g, 'breht'],
  [/vulkn/g, 'vlukn'],
  [/meluk/g, 'melk'],
  [/sumar/g, 'smar'],
  [/strom/g, 'srom'],
  [/haubud/g, 'houd'],
]);

export const fromLat = from([
  // remove suffix
  [/((ā|ē|e|ī)re|ā|i?ō|e|ū|iē)$/, ''],

  // diphthong
  [/ei/g, 'i'],
  [/eu/g, 'o'],
  [/ae/g, 'e'],
  [/au/g, 'o'],
  [/oe/g, 'e'],
  [/ui/g, 'i'],

  // simplify vowel
  [/ī|y/g, 'i'],
  [/ē/g, 'e'],
  [/ā/g, 'a'],
  [/ō/g, 'o'],
  [/ū/g, 'u'],

  [/(?<=[ieaou][^ieaou]+)[ieaou]+$/, ''],

  // greek
  [/kh/g, 'k'],
  [/th/g, 't'],
  [/ph/g, 'p'],

  // simple substitution
  [/c|q/g, 'k'],
  [/g/g, 'c'],
]);

export const fromSla = from([
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
