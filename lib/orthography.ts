/*
g   n m
c   d b
q   t p
x k s f
h j z v
    l
a i y u
w e œ o
*/

import { replaceAll } from "./utility";

const zip = <A, B>(as: A[], bs: B[]): [A, B][] =>
  as.map((a, i) =>
    [a, bs[i]]
  );

const alphabets = {
  latn: 'l r g n m c d b q t p x k s f h j z v a i y u w e œ o'.split(' '),
  grek: 'λ ρ ϙ ν μ γ δ β κ τ π χ ϲ ξ φ η ϸ ζ ϝ α ι ! υ ᾰ ε ! ο'.split(' '),
};

export const { latn } = alphabets;

export const orthography = (s: string): string =>
  zip(alphabets.latn, alphabets.grek)
    .reduce((acc, [latn, it]) =>
      acc.replace(new RegExp(latn, 'g'), it), s
    );

export const ipa = (s: string) => replaceAll(s.toUpperCase(), [
  ['G(?=I)', 'ɲ'],
  ['C(?=I)', 'ɟ'],
  ['Q(?=I)', 'c'],
  ['X(?=I)', 'ç'],
  ['H(?=I)', 'ʝ'],

  ['(?<=[KJ])I', 'ɨ'],
  //['(?<=[KJ])A', 'æ'],
  //['(?<=[KJ])O', 'œ'],
  ['(?<=[KJ])U', 'ʏ'],
  ['(?<=[LNDTSZ])I', 'ɨ'],

  ['(?<=[IEAOU])C(?=[IEAOU])', 'ɣ'],

  ['G', 'ŋ'],
  ['C', 'g'],
  ['Q', 'k'],
  ['K', 'ɕ'],
  ['H', 'ɣ'],
  ['J', 'ʑ'],
  ['F', 'ɸ'],
  ['W', 'ə'],

  ['.+', (it: string) => it.toLowerCase()],

  ['(?<=^[^ieaouɨæœ]*[ieaouɨæœ][^ieaouɨæœ]*)(?=[^ieaouɨæœ][ieaouɨæœ])', 'ˈ'],
]);

export const compare = (a: string, b: string): number =>
  a == ''
    ? b == ''
      ? 0
      : -1
    : b == ''
      ? 1
      : a[0] == b[0]
        ? compare(a.slice(1), b.slice(1))
        : latn.indexOf(a[0]) - latn.indexOf(b[0]);