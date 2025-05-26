// @ts-ignore
import { replaceEach } from 'https://sumi.space/js/string.js';

export const orthography = (s: string) =>
  replaceEach(
    s,
    {
      none: [],
      grek: [
        [/k/gi, 'κ'],
        [/t/gi, 'τ'],
        [/p/gi, 'π'],

        [/c/gi, 'γ'],
        [/d/gi, 'δ'],
        [/b/gi, 'β'],

        [/h/gi, 'η'],
        [/x/gi, 'ϲ'],
        [/s/gi, 'ξ'],
        [/f/gi, 'φ'],

        [/j/gi, 'ῐ'],
        [/z/gi, 'ζ'],
        [/v/gi, 'ϝ'],

        [/g/gi, 'ϙ'],
        [/n/gi, 'ν'],
        [/m/gi, 'μ'],

        [/l/gi, 'λ'],
        [/r/gi, 'ρ'],

        [/i/gi, 'ι'],
        [/u/gi, 'υ'],
        [/e/gi, 'ε'],
        [/o/gi, 'ο'],
        [/a/gi, 'α'],
      ],
      cyrl: [
        [/k/gi, 'к'],
        [/t/gi, 'т'],
        [/p/gi, 'п'],

        [/c/gi, 'г'],
        [/d/gi, 'д'],
        [/b/gi, 'б'],

        [/h/gi, 'х'],
        [/x/gi, 'ш'],
        [/s/gi, 'с'],
        [/f/gi, 'ф'],

        [/j/gi, 'ж'],
        [/z/gi, 'з'],
        [/v/gi, 'в'],

        [/g/gi, 'ӊ'],
        [/n/gi, 'н'],
        [/m/gi, 'м'],

        [/l/gi, 'л'],
        [/r/gi, 'р'],

        [/i/gi, 'і'],
        [/w/gi, 'ъ'],
        [/u/gi, 'у'],
        [/e/gi, 'є'],
        [/o/gi, 'о'],
        [/a/gi, 'а'],
      ],
      goth: [
        [/k/gi, '𐌺'],
        [/t/gi, '𐍄'],
        [/p/gi, '𐍀'],

        [/c/gi, '𐌲'],
        [/d/gi, '𐌳'],
        [/b/gi, '𐌱'],

        [/h/gi, '𐍇'],
        [/x/gi, '𐍃'],
        [/s/gi, '𐌸'],
        [/f/gi, '𐍆'],

        [/j/gi, '𐌾'],
        [/z/gi, '𐌶'],
        [/v/gi, '𐍅'],

        [/g/gi, '𐍁'],
        [/n/gi, '𐌽'],
        [/m/gi, '𐌼'],

        [/l/gi, '𐌻'],
        [/r/gi, '𐍂'],

        [/i/gi, '𐌹'],
        [/u/gi, '𐌿'],
        [/e/gi, '𐌴'],
        [/o/gi, '𐍉'],
        [/a/gi, '𐌰'],
      ],
      ogam: [
        [/k/gi, 'ᚊ'],
        [/t/gi, 'ᚈ'],
        [/p/gi, '𐍀'],

        [/c/gi, 'ᚌ'],
        [/d/gi, 'ᚇ'],
        [/b/gi, 'ᚁ'],

        [/h/gi, 'ᚆ'],
        [/x/gi, 'ᚉ'],
        [/s/gi, 'ᚄ'],
        [/f/gi, 'ᚃ'],

        [/j/gi, 'ᚔ'],
        [/z/gi, 'ᚎ'],
        [/v/gi, 'ᚒ'],

        [/g/gi, 'ᚍ'],
        [/n/gi, 'ᚅ'],
        [/m/gi, 'ᚋ'],

        [/l/gi, 'ᚂ'],
        [/r/gi, 'ᚏ'],

        [/i/gi, 'ᚔ'],
        [/u/gi, 'ᚒ'],
        [/e/gi, 'ᚓ'],
        [/o/gi, 'ᚑ'],
        [/a/gi, 'ᚐ'],
      ],
    }.none as any
  );
