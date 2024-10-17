import Main from "@/components/main";
import Font from "../../components/font";
import FontCustom from "../font-custom";
import { replaceAll } from "@/lib/sundry";
import Section from "@/components/section";
import style from './style.module.sass';
import React from "react";

export const consonants = 'gnmcdbktphxsfjzvrl';
export const vowels = 'ieaou';
export const phonemes = consonants + vowels;

export const phonotactics = (w: string) => {
  const fixed = replaceAll(w, [
    // preprocess
    [/(?<=[^ieaou])j(?=[ieaou])/g, 'y'],
    [/(?<=[^ieaou])v(?=[ieaou])/g, 'w'],
    [/(?<=[ieaou])j(?=[^ieaou])/g, 'y'],
    [/(?<=[ieaou])v(?=[^ieaou])/g, 'w'],

    // geminate
    [/(.)\1+/g, it => it.slice(-1)],

    // adjacent nasal
    [/[gnm]{2,}(?=[ieaou])/g, it => it.slice(-1)],
    [/[gnm]{2,}/g, it => it.slice(0, 1)],

    // nasal + r
    [/gr/g, 'cr'],
    [/nr/g, 'dr'],
    [/mr/g, 'br'],

    // nasal + unmatched consonant
    [/[nm](?=[ck])/g, 'g'],
    [/[gm](?=[xdtl])/g, 'n'],
    [/[gn](?=[bp])/g, 'm'],

    // plosive + matched nasal
    [/[ck](?=g)/g, 'h'],
    [/[dt](?=n)/g, 's'],
    [/[bp](?=m)/g, 'f'],

    // nasal + fricative
    [/[gm](?=[hxsfjzv])/g, 'n'],

    // sibilant*
    [/[xsjz]{2,}/g, it => it.slice(-1)],

    // sibilant + r
    [/[xs]r/g, 'x'],
    [/[jz]r/g, 'j'],

    // specific
    [/gi/g, 'ni'],
    [/bv/g, 'v'],

    // l + d
    [/(?<=[ieaou])ld/g, 'd'],

    // vowels
    [/^i(?=[eaou])/, 'j'],
    [/^u(?=[ieao])/, 'v'],
    [/(?<=[eaou])i$/, 'j'],
    [/(?<=[ieao])u$/, 'v'],

    [/(?<=[^ieaou])i(?=[eaou])/, 'y'],
    [/(?<=[^ieaou])u(?=[ieao])/, 'w'],

    [/(?<![ieaou])ei(?![ieaou])/, 'ay'],
    [/(?<![ieaou])ea(?![ieaou])/, 'ya'],
    [/(?<![ieaou])eo(?![ieaou])/, 'yo'],
    [/(?<![ieaou])eu(?![ieaou])/, 'yu'],

    [/(?<![ieaou])ai(?![ieaou])/, 'ay'],
    [/(?<![ieaou])ae(?![ieaou])/, 'e'],
    [/(?<![ieaou])ao(?![ieaou])/, 'o'],
    [/(?<![ieaou])au(?![ieaou])/, 'aw'],

    [/(?<![ieaou])oi(?![ieaou])/, 'wi'],
    [/(?<![ieaou])oe(?![ieaou])/, 'we'],
    [/(?<![ieaou])oa(?![ieaou])/, 'wa'],
    [/(?<![ieaou])ou(?![ieaou])/, 'aw'],

    [/ye/, 'e'],
    [/wo/, 'o'],

    // vowel + high + vowel
    [/(?<=[^ieaou][eaou])i(?=[eaou][^ieaou])/, 'j'],
    [/(?<=[^ieaou][ieao])u(?=[ieao][^ieaou])/, 'v'],

    // matched high
    [/(?<=[xj])i(?=[eaou])/g, ''],
    [/(?<=[mbpfv])u(?=[ieao])/g, ''],

    // unvoiced + voiced
    [/[cdbktphxsfjzv]{2,}/g, it => /[cdbjzv]$/.test(it)
      ? replaceAll(it, [
        [/k/g, 'c'],
        [/t/g, 'd'],
        [/p/g, 'b'],
        [/h/g, 'c'],
        [/x/g, 'j'],
        [/s/g, 'z'],
        [/f/g, 'v'],
      ])
      : replaceAll(it, [
        [/c/g, 'k'],
        [/d/g, 't'],
        [/b/g, 'p'],
        [/j/g, 'x'],
        [/z/g, 's'],
        [/v/g, 'f'],
      ])
    ],

    // CCC
    [/undr$/g, 'und'],
    [/intr$/g, 'itr'],
    [/inht$/g, 'iht'],
    [/ihst$/g, 'ist'],
    [/estr$/g, 'est'],
    [/urdr$/g, 'urd'],
    [/urht$/g, 'urh'],

    // postprocess
    [/y/g, 'j'],
    [/w/g, 'v'],
  ]);

  return w === fixed
    ? fixed
    : phonotactics(fixed);
};

export const getIpa = (w: string): string =>
  w.split(/\s+/g)
    .map(w =>
      replaceAll(w.toUpperCase(), [
        [/[^A-Z- ]/g, ''],

        [/(?<=[IEAOU])-(?=[IEAOU])/g, 'z'],
        [/-/g, ''],

        [/(?<=[IEAOU])N(?=[HXSFJZV])/g, '\u0303'],
        [/.+/, it => it.normalize('NFKC')],

        [/(?<=[^IEAOU])J(?=[EAOU])/g, 'j'],
        [/(?<=[^IEAOU])V(?=[IEAO])/g, 'w'],
        [/(?<=[EAOU])J(?=[^IEAOU])/g, 'j'],
        [/(?<=[IEAO])V(?=[^IEAOU])/g, 'w'],

        [/(?<=[IEAOU])C(?=[IEAOU])/g, 'ɣ'],

        [/(?<=[IEAOU])K$/g, 'kʰ'],
        [/(?<=[IEAOU])T$/g, 'tʰ'],
        [/(?<=[IEAOU])P$/g, 'pʰ'],

        [/G/g, 'ŋ'],
        [/C/g, 'g'],
        [/H/g, 'x'],
        [/X/g, 'ɕ'],
        [/J/g, 'ʑ'],
        [/R/g, 'ɾ'],

        [/(?<=[ɕʑ])O/g, 'ø'],
        [/(?<=[ɕʑ])U/g, 'y'],

        [/IO/g, 'øː'],
        [/IU/g, 'yː'],

        [/(.)\1/g, '$1ː'],

        [/.+/, (it: string) => it.toLowerCase()],
      ])
    ).join(' ');

export const getOrth = (s: string): string => replaceAll(s, [
  [],

  // runic
  [
    [/g/g, 'ᛜ'],
    [/n/g, 'ᚾ'],
    [/m/g, 'ᛗ'],

    [/c/g, 'ᚷ'],
    [/d/g, 'ᛞ'],
    [/b/g, 'ᛒ'],

    [/k/g, 'ᚲ'],
    [/t/g, 'ᛏ'],
    [/p/g, 'ᛈ'],

    [/h/g, 'ᚺ'],
    [/x/g, 'ᛊ'],
    [/s/g, 'ᚦ'],
    [/f/g, 'ᚠ'],

    [/j/g, 'ᛃ'],
    [/z/g, 'ᛉ'],
    [/v/g, 'ᚹ'],

    [/r/g, 'ᚱ'],
    [/l/g, 'ᛚ'],

    [/a/g, 'ᚨ'],
    [/i/g, 'ᛁ'],
    [/u/g, 'ᚢ'],
    [/e/g, 'ᛖ'],
    [/o/g, 'ᛟ'],
  ],

  // greek
  [
    [/g/g, 'ϙ'],
    [/n/g, 'ν'],
    [/m/g, 'μ'],

    [/c/g, 'γ'],
    [/d/g, 'δ'],
    [/b/g, 'β'],

    [/k/g, 'κ'],
    [/t/g, 'τ'],
    [/p/g, 'π'],

    [/h/g, 'χ'],
    [/x/g, 'ϲ'],
    [/s/g, 'ξ'],
    [/f/g, 'φ'],

    [/j/g, 'η'],
    [/z/g, 'ζ'],
    [/v/g, 'ϝ'],

    [/r/g, 'ρ'],
    [/l/g, 'λ'],

    [/a/g, 'α'],
    [/i/g, 'ι'],
    [/u/g, 'υ'],
    [/e/g, 'ε'],
    [/o/g, 'ο'],
  ],

  // cyrillic
  [
    [/g/g, 'ӈ'],
    [/n/g, 'н'],
    [/m/g, 'м'],

    [/c/g, 'г'],
    [/d/g, 'д'],
    [/b/g, 'б'],

    [/k/g, 'к'],
    [/t/g, 'т'],
    [/p/g, 'п'],

    [/h/g, 'х'],
    [/x/g, 'ш'],
    [/s/g, 'с'],
    [/f/g, 'ф'],

    [/j/g, 'ж'],
    [/z/g, 'з'],
    [/v/g, 'в'],

    [/r/g, 'р'],
    [/l/g, 'л'],

    [/a/g, 'а'],
    [/i/g, 'і'],
    [/u/g, 'у'],
    [/e/g, 'є'],
    [/o/g, 'о'],
  ],
][0] as [RegExp, string][]);

export default function Phonology() {
  const triple = function (a: string, ipa: string | null = null) {
    ipa ||= getIpa(a);
    return <>{a} {a === ipa ? '' : <> <span style={{ opacity: 1 / 3, whiteSpace: 'pre' }}>[{ipa}]</span></>} <br /><FontCustom>{a}</FontCustom></>
  }

  return <Main title='字素'>
    <Section title='字素'>
      <ul>
        <li>字素とそれの指示する音を示す</li>
        <ul>
          <li>字素に等しい國際音聲記號を省略する</li>
        </ul>
      </ul>

      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>軟口蓋</th>
            <th>硬口蓋</th>
            <th style={{ textAlign: 'end' }}>齒</th>
            <th>脣</th>
          </tr>
        </thead>
        <tbody className='c'>
          <tr>
            <th rowSpan={6}>子</th>
            <th rowSpan={2}>有聲</th>
            <th>鼻</th>
            <td>{triple('g')}</td>
            <td style={{ opacity: .2 }}><br /><Font>N</Font></td>
            <td>{triple('n')}</td>
            <td>{triple('m')}</td>
          </tr>
          <tr>
            <th rowSpan={2}>破裂</th>
            <td>{triple('c')}</td>
            <td style={{ opacity: .2 }}><br /><Font>D</Font></td>
            <td>{triple('d')}</td>
            <td>{triple('b')}</td>
          </tr>
          <tr>
            <th rowSpan={2}>無聲</th>
            <td>{triple('k')}</td>
            <td></td>
            <td>{triple('t')}</td>
            <td>{triple('p')}</td>
          </tr>
          <tr>
            <th rowSpan={2}>摩擦</th>
            <td>{triple('h', 'h - x')}</td>
            <td>{triple('x', 'ɕ - ʂ - ʃ')}</td>
            <td>{triple('s')}</td>
            <td>{triple('f')}</td>
          </tr>
          <tr>
            <th rowSpan={4}>有聲</th>
            <td></td>
            <td>{triple('j', 'ʑ - ʐ - ʒ')}</td>
            <td>{triple('z')}</td>
            <td>{triple('v')}</td>
          </tr>
          <tr>
            <th rowSpan={2}>接近</th>
            <td style={{ opacity: .2 }}><br /><FontCustom>◌</FontCustom></td>
            <td>{triple('j', 'j')}</td>
            <td>{triple('r', 'ɾ - r')}</td>
            <td>{triple('v', 'w')}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>{triple('l')}</td>
            <td></td>
          </tr>
          <tr>
            <th rowSpan={2}>母</th>
            <th>開閉</th>
            <td>{triple('a')}</td>
            <td>{triple('i')}</td>
            <td style={{ opacity: .2 }}><br /><Font>y</Font></td>
            <td>{triple('u')}</td>
          </tr>
          <tr>
            <th>中</th>
            <td></td>
            <td style={{ opacity: .2 }}><br /><Font>E</Font></td>
            <td>{triple('e')}</td>
            <td style={{ opacity: .2 }}><br /><Font>O</Font></td>
            <td>{triple('o')}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr style={{ textAlign: 'start' }}>
            <th></th>
            <th></th>
            <th></th>
            <th>央</th>
            <th>前</th>
            <th></th>
            <th>後</th>
          </tr>
        </tfoot>
      </table>
    </Section>

    <Section title='連聲'>
      <ul>
        <li>合成詞中の詞素尾と詞素頭は次の表に從って變形する.</li>
      </ul>

      <table className={style.phonemes}>
        <thead className='h'>
          <tr>
            <th></th>
            <th>#</th>
            {phonemes.split('').map(p => <th>{p}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>#</th>
            <td></td>
            {
              phonemes.split('').map(p => {
                const s = phonotactics(p + '-').replace(/-/g, '');
                return <td style={{ opacity: p === s ? 1 / 8 : 1 }}>{s}</td>
              })
            }
          </tr>
          {phonemes.split('').map(p => <tr>
            <th>{p}</th>
            {(() => {
              const s = phonotactics('-' + p).replace(/-/g, '');
              return <td style={{ opacity: p === s ? 1 / 8 : 1 }}>{s}</td>
            })()}
            {
              phonemes.split('').map(p1 => {
                const s = phonotactics('-' + p + p1 + '-').replace(/-/g, '');
                return <td style={{ opacity: p + p1 === s ? 1 / 8 : 1 }}>{s}</td>
              })
            }
          </tr>)}
        </tbody>
      </table>
    </Section>
  </Main>
};