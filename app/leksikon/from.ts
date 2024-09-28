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
  ]),
  formation: Formation.Root,
  etym,
});

export const fromGem = from([
  // remove suffix
  [/(?<=[ieaouīēāōūîêâôû][^ieaouīēāōūîêâôû]+)(ijaną|janą|ōną|āną|aną|[aiu]z|[ēō]r|ai|ą|ô|ǭ|ō|i|u|s)$/, ''],

  // simplify vowel
  [/ī|î/g, 'i'],
  [/ē|ê/g, 'e'],
  [/ā|â/g, 'a'],
  [/ō|ô/g, 'o'],
  [/ū|û/g, 'u'],

  [/(?<![ieaou])[jw]$/g, ''],

  // simple substitution
  [/w/g, 'v'],
  [/þ/g, 'd'],
  [/g/g, 'c'],
  [/nc/g, 'g'],

  // sound change
  [/^h(?=[gnmrl])/g, ''],
  [/ts$/g, 't'],

  // specific
  [/berht/g, 'breht'],
  [/vintr/g, 'vintur'],
  [/nurdr/g, 'nurd'],
  [/vulkn/g, 'vulkan'],
  [/meluk/g, 'melk'],
  [/vundr/g, 'vond'],
]);

export const fromLat = from([
  // remove suffix
  [/((ā|ē|e|ī)re|ā|i?ō|e|ū|iē)$/, ''],

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
