import Layout from '@/components/layout';
import { language } from '@/lib/dictionary'
import { orthography } from '@/lib/orthography';
import style from '@/styles/index.module.sass'
import { ReactNode } from 'react';

const Rb = (props: { children: ReactNode, rt: string }) =>
  <ruby>
    {props.children}
    <rt>{props.rt}</rt>
  </ruby>

export default () => {
  return <Layout>
    <h3>字と音</h3>
    そもそもこの言語は大人數が音聲上に使用するを想定せざるから嚴密に音韻を定める動機を持たず.
    また音素の概念が有意義かをも知らず.
    これを前提して曖昧に表記と音韻を紹介する.

    <h3>傳統的分類</h3>
    <table className={style.phonemes}>
      <thead>
        <tr>
          <th></th>
          <th>喉</th>
          <th>舌</th>
          <th>齒</th>
          <th>脣</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>流</th>
          <td></td>
          <td></td>
          <td>r {orthography('r')}</td>
          <td></td>
        </tr>
        <tr>
          <th>鼻</th>
          <td>g {orthography('g')}</td>
          <td></td>
          <td>n {orthography('n')}</td>
          <td>m {orthography('m')}</td>
        </tr>
        <tr>
          <th>弱破</th>
          <td>c {orthography('c')}</td>
          <td></td>
          <td>d {orthography('d')}</td>
          <td>b {orthography('b')}</td>
        </tr>
        <tr>
          <th>強破</th>
          <td>q {orthography('q')}</td>
          <td></td>
          <td>t {orthography('t')}</td>
          <td>p {orthography('p')}</td>
        </tr>
        <tr>
          <th>強擦</th>
          <td>x {orthography('x')}</td>
          <td>k {orthography('k')}</td>
          <td>s {orthography('s')}</td>
          <td>f {orthography('f')}</td>
        </tr>
        <tr>
          <th>弱擦</th>
          <td className='faint'>h {orthography('h')}</td>
          <td>j {orthography('j')}</td>
          <td>z {orthography('z')}</td>
          <td>v {orthography('v')}</td>
        </tr>
        <tr>
          <th>強母</th>
          <td>a {orthography('a')}</td>
          <td>i {orthography('i')}</td>
          <td style={{ visibility: 'hidden' }}>y {orthography('y')}</td>
          <td>u {orthography('u')}</td>
        </tr>
        <tr>
          <th>弱母</th>
          <td className='faint'>w {orthography('w')}</td>
          <td>e {orthography('e')}</td>
          <td style={{ visibility: 'hidden' }}>œ {orthography('œ')}</td>
          <td>o {orthography('o')}</td>
        </tr>
      </tbody>
    </table>

    <p>
      いづれの字母を使ふも良いがここにはLatnとGrekを示しぬ.
      {' '}<span style={{ color: 'lightgray' }}>薄き字</span>は現在は存在せず.
    </p>
    <p>
      この表は科學的ならず, 文化的慣習なる.
      即ち{language}話者は{language}の字と音 (これらの區別は曖昧) にこの如き認識を持つ (例へば ‹k› と ‹i› が同じ列に有ると).
    </p>

    <div className='faint' style={{ fontSize: 'small' }}>
      San (śikṣā) の影響この表を作りける.
    </div>

    <h3>異音</h3>
    n, d, t, s, z, m, b, p, a, e, oは國際音聲記號と等しい.
    <table>
      <tbody>
        <tr>
          <td>g</td>
          <td>[ŋ], [ɲ]i</td>
        </tr>
        <tr>
          <td>c</td>
          <td>[g], [ɟ]i, V[ɣ]V</td>
        </tr>
        <tr>
          <td>q</td>
          <td>[k], [c]i</td>
        </tr>
        <tr>
          <td>x</td>
          <td>[x, h], [ç]i</td>
        </tr>
        <tr>
          <td>r</td>
          <td>[ɾ, r, l]</td>
        </tr>
        <tr>
          <td>k</td>
          <td>[ʃ, ʂ, ɕ]</td>
        </tr>
        <tr>
          <td>j</td>
          <td>[ʒ, ʐ, ʑ, ʝ, j]</td>
        </tr>
        <tr>
          <td>f</td>
          <td>[ɸ, f]</td>
        </tr>
        <tr>
          <td>v</td>
          <td>[β, v, ʋ, w]</td>
        </tr>

        <tr>
          <td>i</td>
          <td>[i], (k, j, l, n, s, z)[ɪ, ɨ]</td>
        </tr>
        <tr>
          <td>u</td>
          <td>[u], (k, j)[ʏ]</td>
        </tr>
      </tbody>
    </table>

    <h3>韻律</h3>
    詞は最初の音節が低く殘りは高い. Jpnの平板型に似る.
    音節は等時性を持つ.

    <h3>字の由來</h3>
    幾つかの字が標準的にあらざる音に對應する理由を述べる.
    <table className={style.table}>
      <tbody>
        <tr>
          <th>Latn c</th>
          <td>Grek ‹<Rb rt='[g]'>Γ</Rb>›, Phnx ‹<Rb rt='[g]'>𐤂</Rb>› に由來するから.</td>
        </tr>
        <tr>
          <th>Latn g</th>
          <td>餘るから鼻音に轉用する.</td>
        </tr>
        <tr>
          <th>Latn q</th>
          <td>Lat ‹<Rb rt='[kʷattuor]'>quattuor</Rb>› {'>'} Fra ‹<Rb rt='[katʁ]'>quatre</Rb>› と比較せよ.</td>
        </tr>
        <tr>
          <th>Latn k</th>
          <td>Lat ‹<Rb rt='[kantaːre]'>cantāre</Rb>›  {'>'} Fra ‹<Rb rt='[ʃɑ̃te]'>chanter</Rb>›, また Nor ‹<Rb rt='[çæːr]'>kjær</Rb>› と比較せよ.</td>
        </tr>
        <tr>
          <th>Grek ϲ</th>
          <td>Phnx ‹<Rb rt='[ʃ]'>𐤔</Rb>› に由來するから. ‹σ› にせざりけるは ‹ς› との區別を嫌ふから.</td>
        </tr>
        <tr>
          <th>Grek ξ</th>
          <td>Phnx ‹<Rb rt='[s]'>𐡎</Rb>› に由來するから.</td>
        </tr>
        <tr>
          <th>Grek ϸ</th>
          <td>有聲音に轉用する.</td>
        </tr>
        <tr>
          <th>Grek ϙ</th>
          <td>鼻音に轉用する.</td>
        </tr>
      </tbody>
    </table>
  </Layout>;
};
