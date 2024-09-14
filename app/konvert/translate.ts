import dict, { literal } from "../leksikon/dict";

export default (s: string): string =>
  [...dict.keys()]
    .sort((k, k1) => k.length - k1.length)
    .reduce((acc, k) => acc.replace(new RegExp('(?<![A-Za-z])' + k + '(?![A-Za-z])', 'g'), dict.get(k)!.signifier), s)
    .replace(/ -/g, `-`)
    .replace(/\*[A-Z]+/g, literal);