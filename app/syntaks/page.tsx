import { ReactNode } from "react";
import Section from "@/components/section";
import Main from "@/components/main";
import dict from "../leksikon/dict";
import { getIpa, getOrth } from "../phonology/page";
import { literal } from "../leksikon/common";

export const Term = (props: { children: ReactNode }) =>
  <span style={{
    opacity: .5,
    border: '1px solid',
    borderRadius: `${1 / 2}ex`,
    marginInline: `${1 / 8}ex`,
    paddingInline: `${1 / 8}ex`,
  }}>{props.children}</span>

const translate = (s: string): string =>
  [...dict.keys()]
    .sort((k, k1) => k.length - k1.length)
    .reduce((acc, k) => acc.replace(new RegExp('(?<![A-Za-z])' + k + '(?![A-Za-z])', 'g'), dict.get(k)!.signifier), s)
    .replace(/ '/g, `'`)
    .replace(/ -/g, `-`)
    .replace(/\*[A-Z]+/g, literal)
  ;

const Translate = (props: { children: string }) => <span style={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre' }}>{
  props.children
    .split(/(?<=[A-Za-z]+)(?=[^A-Za-z]+)|(?<=[^A-Za-z]+)(?=[A-Za-z]+)/g)
    .filter((it, i, self) => !(/^\s+$/.test(it) && i + 1 < self.length && ['Acc', 'Dat'].includes(self[i + 1])))
    .map((code: string, i: number) =>
      dict.has(code)
        ? <span key={i} style={{ lineHeight: .8 }}>
          {getOrth(dict.get(code)?.signifier || '')}
          <br /><span style={{ fontFamily: '"Noto Sans Mono", "Noto Mono", monospaced', fontSize: '20%', opacity: .8, paddingInlineEnd: '.5ex' }}>{code}</span>
        </span>
        : <span key={i} style={{ lineHeight: .8, opacity: /^[⟨⟩[\]() ]+$/.test(code) ? .25 : 1 }}>{code}</span>
    )
}</span>

const Examples = (props: { data: [ReactNode, string][] }) => <>
  {props.data.map(([eng, code], i: number) => {
    const t = translate(code);
    return <table key={i} style={{ blockSize: '100%', marginInlineStart: '4ex' }}>
      <tbody>
        <tr><td>{eng}</td></tr>
        <tr><td><Translate>{code}</Translate></td></tr>
        <tr><td style={{ opacity: .5, }}>[{getIpa(t)}]</td></tr>
        {/*<tr><td><FontCustom>{t}</FontCustom></td></tr>*/}
      </tbody>
    </table>
  })}
</>;

export default function Tung() {
  return <Main title='句法'>
    <Section title='動詞'>
      <ul>
        <li><em>動詞 verb</em>は詞彙の大半を占め, <a href='https://ja.wikipedia.org/wiki/%E9%96%8B%E3%81%84%E3%81%9F%E3%82%AF%E3%83%A9%E3%82%B9'>開いた類</a>な.</li>
        <li>動詞は ‹<Term>0</Term>が<Term>1</Term>を<Term>2</Term>へ…する› の如き, 穴<Term>𝑘</Term>を持つ文を意味する.</li>
        <ul>
          <li>動詞により空欄の數nは決まり, {'1 ≤ 𝑛 < 4'}</li>
          <li>{'0 ≤ 𝑘 < 𝑛'}</li>
        </ul>
        <li>動詞の穴を滿たして眞の文をなす存在を<em>項 term</em>と呼ぶ.</li>
        <li>穴の種類𝑘を<em>格 case</em>と呼ぶ.</li>
      </ul>

      <Examples data={[
        [<span><Term>0</Term>が貓</span>, 'cat'],
        [<span><Term>0</Term>が<Term>1</Term>を好む</span>, 'like'],
        [<span><Term>0</Term>が<Term>1</Term>を<Term>2</Term>へ與ふ</span>, 'give'],
      ]} />
    </Section>

    <Section title='補充'>
      <ul>
        <li>動詞𝑉₀の<Term>𝑘≠0</Term>と動詞𝑉₁の<Term>0</Term>を同じい項が滿たすことを {'𝑉₀ 𝑉₁-格詞(𝑘)'} が表す. これを<em>補充 complementation</em>と呼ぶ.</li>
        <li>𝑉₀, 𝑉₁をそれぞれ<em>述部 predicate</em>, <em>補部 complement</em>と呼ぶ.</li>
        <li>述部と補部は<em>動句 verb phrase</em>を為し, 1個の動詞の如く働く.</li>
        <ul>
          <li>例中の動句を {'⟨ ⟩'} が示す (實用上は現れない)</li>
        </ul>
        <li>母音の後の ‹-› を [z] と讀む.</li>
      </ul>

      <Examples data={[
        ['(格詞1)', 'Acc'],
        ['(格詞2)', 'Dat'],
        [<><Term>0</Term>が<Term>1</Term>を好む, <Term>1</Term>が貓<br />→<Term>0</Term>が貓を好む</>, '⟨like cat Acc⟩'],
        [<><Term>0</Term>が<Term>1</Term>を<Term>2</Term>へ與ふ, <Term>1</Term>が水, <Term>2</Term>が貓<br />→<Term>0</Term>が水を貓へ與ふ</>, '⟨give water Acc cat Dat⟩'],
      ]} />
    </Section>

    <Section title='同格'>
      <ul>
        <li>動句らが<Term>0</Term>を共有することを, 等しい格詞 (空を含む) を付けて竝べる<em>同格 apposition</em>が表す.</li>
        <ul>
          <li>例中の同格を {'[ ]'} が示す (實用上は現れない)</li>
        </ul>
      </ul>

      <Examples data={[
        [<><Term>0</Term>が我</>, 'i'],
        [<><Term>0</Term>が我, <Term>0</Term>が貓を好む<br />→我が貓を好む</>, '[i ⟨like cat Acc⟩]'],
        [<><Term>0</Term>が黑い</>, 'black'],
        [<><Term>0</Term>が貓, <Term>0</Term>が黑い<br />→<Term>0</Term>が黑貓</>, '[cat black]'],
        [<><Term>0</Term>が黑貓を好む</>, '⟨like [cat Acc black Acc]⟩'],
      ]} />
    </Section>

    <Section title='複補充'>
      <ul>
        <li>動句の補部が別の動句なれる. これを<em>複補充 complex complementation</em>と呼ぶ.</li>
      </ul>
      <Examples data={[
        [<><Term>0</Term>が<Term>1</Term>を見る</>, 'see'],
        [<><Term>0</Term>が犬</>, 'dog'],
        [<><Term>0</Term>が犬を見る</>, '⟨see dog Acc⟩'],
        [<>犬が貓を好む</>, '[dog ⟨like cat Acc⟩]'],
        [<>貓を好む犬を見る</>, '⟨see [dog Acc ⟨like Acc cat Acc Acc⟩]⟩'],
        [<>貓を好む犬へ與ふ</>, '⟨give [dog Dat ⟨like Dat cat Acc Dat⟩]⟩'],
      ]} />

      <ul>
        <li>補充や同格の規則は分配則に似る.</li>
      </ul>
      {translate('⟨give [dog Dat ⟨like Dat cat Acc Dat⟩]⟩')}<br />
      {translate('⟨give [dog Dat ⟨like cat Acc⟩Dat]⟩')}<br />
      {translate('⟨give [dog ⟨like cat Acc⟩]Dat⟩')}<br />
    </Section>

    <Section title='關係節'>
      <ul>
        <li><em>關係節 relative clause</em>はその前の動詞が示す項が滿たす文を表す.</li>
        <li>項が滿たす格を代動詞が示す.</li>
        <li>その格が主格のとき, 代動詞を省略せらる.</li>
      </ul>
      <Examples data={[
        [<><Term>0</Term>が貓を好むものへ與ふ</>, '⟨give what Dat [(who) ⟨like cat Acc⟩] (Period)⟩'],
        [<><Term>0</Term>が貓を好む犬へ與ふ</>, '⟨give [dog Dat what Dat [(who) ⟨like cat Acc⟩] (Period)]⟩'],
        [<><Term>0</Term>が犬を見る</>, '⟨see dog Acc⟩'],
        [<>貓が犬を好む</>, '[dog ⟨like cat Acc⟩]'],
        [<>貓が好む犬を見る</>, '⟨see [dog Acc what [cat ⟨like who Acc⟩] (Period)]⟩'],
      ]} />

      {translate('⟨give [dog Dat what [(who) ⟨like cat Acc⟩] (Period)]⟩')} =<br />
      {translate('⟨give [dog Dat ⟨like Dat cat Acc Dat⟩]⟩')} =<br />
    </Section>

    <Section title='制と相と法'>
      <ul>
        <li>動詞の付加情報は接尾する</li>
        <li>動詞-態-相-制-法</li>
      </ul>

      <Examples data={[
        [`學ぶ`, 'learn'],
        [`學びける (起動相-過去制)`, 'did learn'],
        [`學ばれける (受動態-起動相-過去制)`, 'did done learn'],
        [`學ばれけらむ (受動態-起動相-過去制-叙想法)`, 'were did done learn'],
        [`學ばれけらむものを (受動態-起動相-過去制-叙想法-對格)`, 'were did done learn Acc'],
      ]} />
    </Section>

    <Section title='量化'>
      <ul>
        <li>數句を動句に前置して項の量を示す. これを<em>量化 quantification</em>と呼ぶ.</li>
      </ul>

      <Examples data={[
        [`我は2個の貓を好む`, 'i like two cat Acc'],
        [`我は各貓を好む`, 'i like max cat Acc'],
        [`各貓を好む人が存在する`, 'atLeast one person like max cat Acc'],
        [`人らが各貓を好む`, 'atLeast two person like max cat Acc'],
      ]} />
    </Section>

    <Section title='歸格'>
      <ul>
        <li>文の意味する事象を<Term>0</Term>として文の中から制限する格を<em>己格 recursive case</em>と呼ぶ.</li>
      </ul>
      <Examples data={[
        [<>我は貓, そのことは驚かす<br />→驚くことに我は貓</>, 'i cat done amaze Adv'],
      ]} />
    </Section>

    <Section title='固有詞'>
      {false && <ul>
        <li>‹Nは...と呼ばれる› を意味する動詞を作らる.</li>
      </ul>}

      <Examples data={[
        [<>我がsumiな.</>, 'i isCalled sumi'],
        [<>汝がsumiを見る.</>, 'thou see isCalled Acc sumi'],
      ]} />
    </Section>

    <Section title='疑問'>
      <Examples data={[
        ['我は何か', 'i who'],
        ['汝がいづこに有る', 'thou at who Acc'],
      ]} />
    </Section>
  </Main >
};