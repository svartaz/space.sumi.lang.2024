import Main from "@/components/main";
import Font from "../../components/font";
import FontCustom from "../font-custom";
import { replaceAll } from "@/lib/sundry";
import Section from "@/components/section";
import style from './style.module.sass';

export const consonants = 'gnmcdbktphxsfjzvrl';
export const vowels = 'ieaou';
export const phonemes = consonants + vowels;

export const phonotactics = (w: string) => {
  const fixed = replaceAll(w, [
    // geminate consonant
    [/(.)\1+/g, it => it.slice(-1)],

    // adjacent sibilants
    [/[xsjz]{2,}/g, it => it.slice(-1)],

    // adjacent nasal
    [/[gnm]{2,}/g, it => it.slice(-1)],

    // diphthong
    [/ea/g, 'ia'],
    [/eo/g, 'io'],
    [/ae/g, 'e'],
    [/ao/g, 'o'],
    [/oe/g, 'ue'],
    [/oa/g, 'ua'],

    // final voiced
    /*[/[cjdzbv]$/g, it => replaceAll(it, [
      [/c/g, 'k'],
      [/j/g, 'x'],
      [/d/g, 't'],
      [/z/g, 's'],
      [/b/g, 'p'],
      [/v/g, 'f'],
    ])],*/

    // unmatched nasal
    [/gr/g, 'gcr'],
    [/nr/g, 'ndr'],
    [/mr/g, 'mbr'],
    [/[nm](?=[ck])/g, 'g'],
    [/[gm](?=[xjdtl])/g, 'n'],
    [/[gn](?=[bp])/g, 'm'],

    // nasal + fricative
    [/[gnm](?=[hxjszfv])/g, 'n'],

    // L
    [/ld/g, 'd'],
    [/lr/g, 'r'],
    [/tl/g, 't'],
    [/dl/g, 'd'],
    [/l(?=[xjdtsz])/g, ''],

    // unvoiced + voiced
    [/[ckhxjdtszbpfv]{2,}/g, it => /[cjdzbv]$/.test(it)
      ? replaceAll(it, [
        [/k/g, 'c'],
        [/h/g, 'c'],
        [/x/g, 'j'],
        [/t/g, 'd'],
        [/s/g, 'z'],
        [/p/g, 'b'],
        [/f/g, 'v'],
      ])
      : replaceAll(it, [
        [/c/g, 'k'],
        [/j/g, 'x'],
        [/d/g, 't'],
        [/z/g, 's'],
        [/b/g, 'p'],
        [/v/g, 'f'],
      ])
    ],

    // plosive + matched nasal
    [/[ck]g/g, 'g'],
    [/[dt]n/g, 'n'],
    [/[bp]m/g, 'm'],

    // similar voiced
    [/[bv]+/g, it => it.slice(-1)],

    // sibilant + R
    [/(?<=[xjsz])r/g, ''],

    // final H
    [/(?<=[rl])h$/g, ''],

    // CV
    [/gi/g, 'ni'],
    [/fu/g, 'fo'],
    [/vu/g, 'vo'],

    // initial vowel
    [/^(?=[ie])/g, 'j'],
    [/^(?=[ieaou])/g, 'h'],
  ]);

  return w === fixed
    ? fixed
    : phonotactics(fixed);
};


export const getIpa = (w: string): string => replaceAll(w.toUpperCase(), [
  [/[^A-Z- ]/g, ''],
  [/(?<=[IEAOU])-(?=[IEAOU])/g, 'z'],
  [/-/g, ''],

  [/(?<=[IEAOU])[GNM](?=[HXJSZFV])/g, '\u0303'],
  [/.+/, it => it.normalize('NFKC')],

  [/(?<=[IEAOU])C(?=I)/g, 'ʝ'],
  [/(?<=[IEAOU])C(?=[EAOU])/g, 'ɣ'],

  [/(?<!^)C(?![A-Z])/g, 'k'],
  [/(?<!^)D(?![A-Z])/g, 't'],
  [/(?<!^)B(?![A-Z])/g, 'p'],
  [/(?<!^)K(?![A-Z])/g, 'kʰ'],
  [/(?<!^)T(?![A-Z])/g, 'tʰ'],
  [/(?<!^)P(?![A-Z])/g, 'pʰ'],

  [/H(?=I)/g, 'ç'],
  [/(?<=[IE])H(?![IEAOU])/g, 'ç'],
  [/(?<=[IEAOU])H(?=[IEAOU])/g, 'h'],
  [/H/g, 'x'],

  [/G(?=I)/g, 'ɲ'],
  [/G/g, 'ŋ'],
  [/C(?=I)/g, 'ɟ'],
  [/C/g, 'g'],
  [/K(?=I)/g, 'c'],
  [/K/g, 'k'],
  [/X/g, 'ɕ'],
  [/J/g, 'ʑ'],
  [/R/g, 'ɾ'],

  [/(?<=[ɕʑ])U/g, 'y'],
  [/(?<=[ɕʑ])O/g, 'ø'],

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
            <td style={{ opacity: .2 }}><br /><Font>h</Font></td>
            <td>{triple('j', 'ʑ - ʐ - ʒ')}</td>
            <td colSpan={2}>{triple('z')}</td>
            <td>{triple('v')}</td>
          </tr>
          <tr>
            <th>接近</th>
            <td style={{ opacity: .2 }}><br /><FontCustom>◌</FontCustom></td>
            <td style={{ opacity: .2 }}><br /><Font>j</Font></td>
            <td>{triple('r', 'ɾ - r')}</td>
            <td>{triple('l')}</td>
            <td style={{ opacity: .2 }}><br /><FontCustom>w</FontCustom></td>
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