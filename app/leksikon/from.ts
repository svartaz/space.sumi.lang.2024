import { replaceAll } from "@/lib/sundry";
import { Formation } from "./common";

const from = (replacements) => (etym: string) => ({
  signifier: replaceAll(decodeURIComponent(etym), [
    // extract from URL
    [/^.+\//, ''],
    [/#.+$/, ''],

    [/^-|-$/, ''],

    ...replacements,

    [/(?<!^)z/g, 's'],
    [/(?<=[ieaou].*)[ieaou]$/g, ''],
  ]),
  formation: Formation.Root,
  etym,
});

export const fromGem = from([
  // remove suffix
  [/(?<=[ieaouīēāōūîêâôû].*)(ōr$|[aiu]z$|i?janą$|[ōaā]ną$|j?ą$|(ō|ô|ǭ)|ā)$|(?<![ieaouīēāōūîêâôû])s$|ai$/, ''],

  // simplify vowel
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
  [/berht/g, 'breht'],
  [/vintr/g, 'vintur'],
  [/nurdr/g, 'nurd'],
  [/vulkn/g, 'vulkan'],
  [/meluk/g, 'melk'],

  [/^sv(?=[ieaou])/g, 'sf'],
  [/(?<=[ieaou][hg])v$/g, ''],
  [/(?<=[ieaou][hg])v$/g, ''],
  [/nr$/g, 'n'],
]);

export const fromLat = from([
  // remove suffix
  [/((ā|ē|e|ī)re|ā|i?ō|e|ū|iē)$/, ''],

  // simplify vowel
  [/ī/g, 'i'],
  [/ē/g, 'e'],
  [/ā/g, 'a'],
  [/ō/g, 'o'],
  [/ū/g, 'u'],
  [/y/g, 'i'],

  // greek
  [/kh/g, 'k'],
  [/th/g, 't'],
  [/ph/g, 'p'],

  // simple substitution
  [/c|q/g, 'k'],
  [/g/g, 'c'],

  //palatalise
  [/k(?=[ie])/g, 'x'],
  [/c(?=[ie])/g, 'j'],
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
