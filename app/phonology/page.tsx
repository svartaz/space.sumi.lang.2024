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
    // geminate
    [/(.)\1+/g, it => it.slice(-1)],

    // adjacent nasal
    [/[gnm]{2,}(?=[ieaou])/g, it => it.slice(-1)],
    [/[gnm]{2,}/g, it => it.slice(0, 1)],

    // Nr
    [/gr/g, 'cr'],
    [/nr/g, 'dr'],
    [/mr/g, 'br'],

    // unmatched nasal
    [/[nm](?=[ck])/g, 'g'],
    [/[gm](?=[xdtl])/g, 'n'],
    [/[gn](?=[bp])/g, 'm'],

    // plosive + matched nasal
    [/[ck]g/g, 'h'],
    [/[dt]n/g, 's'],
    [/[bp]m/g, 'f'],

    // nasal + fricative
    [/[gnm](?=[hxsfjzv])/g, 'n'],

    // adjacent sibilants
    [/[xsjz]{2,}/g, it => it.slice(-1)],

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

    // sibilant + R
    [/sr/g, 'x'],
    [/zr/g, 'j'],

    // {c}{v}
    [/gi/g, 'ni'],

    // LD
    [/(?<=[ieaou])ld/g, 'd'],

    // vowels
    [/^i(?=[eaou])/, 'j'],
    [/^u(?=[ieao])/, 'v'],
    [/(?<=[eaou])i$/, 'j'],
    [/(?<=[ieao])u$/, 'v'],

    //[/(?<![ieaou])ia(?![ieaou])/, 'ja'],
    //[/(?<![ieaou])ie(?![ieaou])/, 'je'],
    //[/(?<![ieaou])io(?![ieaou])/, 'jo'],
    //[/(?<![ieaou])iu(?![ieaou])/, 'ju'],

    [/(?<![ieaou])ei(?![ieaou])/, 'i'],
    [/(?<![ieaou])ea(?![ieaou])/, 'ia'],
    [/(?<![ieaou])eo(?![ieaou])/, 'io'],
    [/(?<![ieaou])eu(?![ieaou])/, 'iu'],

    [/(?<![ieaou])ai(?![ieaou])/, 'e'],
    [/(?<![ieaou])ae(?![ieaou])/, 'e'],
    [/(?<![ieaou])ao(?![ieaou])/, 'o'],
    [/(?<![ieaou])au(?![ieaou])/, 'o'],

    [/(?<![ieaou])oi(?![ieaou])/, 'ui'],
    [/(?<![ieaou])oe(?![ieaou])/, 'ue'],
    [/(?<![ieaou])oa(?![ieaou])/, 'ua'],
    [/(?<![ieaou])ou(?![ieaou])/, 'u'],

    //[/(?<![ieaou])ui(?![ieaou])/, 'vi'],
    //[/(?<![ieaou])ue(?![ieaou])/, 've'],
    //[/(?<![ieaou])ua(?![ieaou])/, 'va'],
    //[/(?<![ieaou])uo(?![ieaou])/, 'o'],

    //VGV
    [/(?<=[^ieaou][eaou])i(?=[eaou][^ieaou])/, 'j'],
    [/(?<=[^ieaou][ieao])u(?=[ieao][^ieaou])/, 'v'],

    // glide
    [/(?<=[xj])i(?=[eaou])/g, ''],
    [/(?<=[mbpfv])u(?=[ieao])/g, ''],

    // CCC
    [/undr$/g, 'udr'],
    [/intr$/g, 'itr'],
    [/inht$/g, 'iht'],
    [/ihst$/g, 'ist'],
    [/estr$/g, 'est'],
    [/urdr$/g, 'urd'],
    [/urht$/g, 'urh'],

    // initial
    [/^(?=[ie])/, 'j'],
    [/^(?=a)/, 'h'],
    [/^(?=[ou])/, 'v'],

    // final
    //[/(?<![ieaou])h$/, ''],
    //[/(?<![ieaoi])j$/, ''],
    //[/(?<![ieaou])v$/, ''],
  ]);

  return w === fixed
    ? fixed
    : phonotactics(fixed);
};

export const getIpa = (w: string): string => replaceAll(w.toUpperCase(), [
  [/[^A-Z- ]/g, ''],

  [/(?<=[IEAOU])-(?=[IEAOU])/g, 'z'],
  [/-/g, ''],

  [/(?<=[IEAOU])N(?=[HXSFJZV])/g, '\u0303'],
  [/.+/, it => it.normalize('NFKC')],

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

  [/(?<![IEAOU])I(?=[EAOU])/g, 'j'],
  [/(?<![IEAOU])U(?=[IEAO])/g, 'w'],

  [/(.)\1/g, '$1ː'],

  [/.+/, (it: string) => it.toLowerCase()],
]);

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

    [/h/g, 'η'],
    [/x/g, 'χ'],
    [/s/g, 'ϲ'],
    [/f/g, 'φ'],

    [/j/g, ''],
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
][0] as [RegExp, string][]);

export default function Phonology() {
  const triple = function (a: string, ipa: string | null = null) {
    ipa = ipa || getIpa(a);
    return <>{a} {a === ipa ? '' : <> <span style={{ opacity: 1 / 3 }}>[{ipa}]</span></>} <br /><FontCustom>{a}</FontCustom></>
  }

  return <Main title='字素'>
    <Section title='字素'>
      <ul>
        <li>計劃言語なれば, 一般的な意味にての音素 (最小對に表れる) は存在しない</li>
        <li>字素を下の表に示す</li>
        <ul>
          <li>字素に一致する國際音聲記號を省略する</li>
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
            <th colSpan={2} style={{ textAlign: 'end' }}>齒</th>
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
            <td colSpan={2}>{triple('n')}</td>
            <td>{triple('m')}</td>
          </tr>
          <tr>
            <th rowSpan={2}>破裂</th>
            <td>{triple('c')}</td>
            <td style={{ opacity: .2 }}><br /><Font>D</Font></td>
            <td colSpan={2}>{triple('d')}</td>
            <td>{triple('b')}</td>
          </tr>
          <tr>
            <th rowSpan={2}>無聲</th>
            <td>{triple('k')}</td>
            <td></td>
            <td colSpan={2}>{triple('t')}</td>
            <td>{triple('p')}</td>
          </tr>
          <tr>
            <th rowSpan={2}>摩擦</th>
            <td>{triple('h', 'h - x')}</td>
            <td>{triple('x', 'ɕ - ʂ - ʃ')}</td>
            <td colSpan={2}>{triple('s')}</td>
            <td>{triple('f')}</td>
          </tr>
          <tr>
            <th rowSpan={4}>有聲</th>
            <td></td>
            <td>{triple('j', 'ʑ')}</td>
            <td colSpan={2}>{triple('z')}</td>
            <td>{triple('v')}</td>
          </tr>
          <tr>
            <th>接近</th>
            <td style={{ opacity: .2 }}><br /><FontCustom>◌</FontCustom></td>
            <td></td>
            <td>{triple('r', 'ɾ - r')}</td>
            <td>{triple('l')}</td>
          </tr>
          <tr>
            <th rowSpan={2}>母</th>
            <th>開閉</th>
            <td>{triple('a')}</td>
            <td>{triple('i')}</td>
            <td style={{ opacity: .2 }} colSpan={2}><br /><Font>y</Font></td>
            <td>{triple('u')}</td>
          </tr>
          <tr>
            <th>中</th>
            <td style={{ opacity: .2 }}><br /><Font>E</Font></td>
            <td>{triple('e')}</td>
            <td style={{ opacity: .2 }} colSpan={2}><br /><Font>O</Font></td>
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
            <th colSpan={2}></th>
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