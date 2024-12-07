import { replaceEach } from "./common";

export const orthography = (s: string) => replaceEach(s, true ? [] : [
  [/k/g, 'κ'],
  [/t/g, 'τ'],
  [/p/g, 'π'],

  [/c/g, 'γ'],
  [/d/g, 'δ'],
  [/b/g, 'β'],

  [/h/g, 'χ'],
  [/x/g, 'σ'],
  [/s/g, 'ξ'],
  [/f/g, 'φ'],

  [/j/g, 'ι'],
  [/z/g, 'ζ'],
  [/v/g, 'ϝ'],

  [/g/g, ''],
  [/n/g, 'ν'],
  [/m/g, 'μ'],

  [/l/g, 'λ'],
  [/r/g, 'ρ'],

  [/i/g, 'η'],
  [/u/g, 'υ'],
  [/e/g, 'ε'],
  [/o/g, 'ο'],
  [/a/g, 'α'],
]);