import Layout from '@/components/layout';
import { ipa, language, orthography } from '@/lib/dictionary'
import style from '@/styles/index.module.sass'
import { ReactNode } from 'react';

const Rb = (props: { children: ReactNode, rt: string }) =>
  <ruby>
    {props.children}
    <rt>{props.rt}</rt>
  </ruby>

export default () => {
  return <Layout>
    <h3>音と字</h3>
    基本的に音素と字素は一對一對應す.

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
          <td>r</td>
          <td>l</td>
          <td></td>
        </tr>
        <tr>
          <th>鼻</th>
          <td>g</td>
          <td></td>
          <td>n</td>
          <td>m</td>
        </tr>
        <tr>
          <th>弱破</th>
          <td>c</td>
          <td></td>
          <td>d</td>
          <td>b</td>
        </tr>
        <tr>
          <th>強破</th>
          <td>q</td>
          <td></td>
          <td>t</td>
          <td>p</td>
        </tr>
        <tr>
          <th>強擦</th>
          <td>x</td>
          <td>k</td>
          <td>s</td>
          <td>f</td>
        </tr>
        <tr>
          <th>弱擦</th>
          <td style={{ color: 'lightgray' }}>h</td>
          <td>j</td>
          <td>z</td>
          <td>v</td>
        </tr>
        <tr>
          <th>強母</th>
          <td>a</td>
          <td>i</td>
          <td style={{ visibility: 'hidden' }}>y</td>
          <td>u</td>
        </tr>
        <tr>
          <th>弱母</th>
          <td style={{ color: 'lightgray' }}>w</td>
          <td>e</td>
          <td style={{ visibility: 'hidden' }}>ø</td>
          <td>o</td>
        </tr>
      </tbody>
    </table>

    <p>
      この表は音聲學的ならず, 文化的なり.
      即ち{language}人は{language}語の字と音 (これらを區別せず) にこの樣な認識を持つ (例へば ‹k› と ‹i› が同じ列に有ると).
      <br /><span style={{ color: 'lightgray' }}>薄き字</span>は緩衝音として發生すれば明に表記せず.
      <br />śikṣāの影響この表を作りける.
    </p>

    <h3>異音</h3>
    l, n, d, t, s, z, m, b, pは國際音聲記號と等し.
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
          <td>[ɾ, r]</td>
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
          <td>l, n, d, t, s, z</td>
          <td>特記事項 無し</td>
        </tr>
        <tr>
          <td>m, b, p</td>
          <td>特記事項 無し</td>
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
          <td>a</td>
          <td>[a], (k, j)[æ]</td>
        </tr>
        <tr>
          <td>i</td>
          <td>[i], (l, n, s, z)[ɪ, ɨ]</td>
        </tr>
        <tr>
          <td>e</td>
          <td>[e]</td>
        </tr>
        <tr>
          <td>o</td>
          <td>[o], (k, j)[œ]</td>
        </tr>
        <tr>
          <td>u</td>
          <td>[u], (k, j)[ʏ]</td>
        </tr>
      </tbody>
    </table>

    <h3>韻律</h3>
    詞は最初の音節が低く殘りは高し. Jpnの平板型に似る.
    音節は等時性を持つ.

    <h3>字の由來</h3>
    幾つかの字 標準的なにあらざる音に對應する理由を述べる.

    <table className={style.table}>
      <tbody>
        <tr>
          <th>c [g]</th>
          <td>‹C› は Grek ‹Γ› と同樣に Phnx ‹𐤂› に由來し, その元來の音は [g].</td>
        </tr>
        <tr>
          <th>g [ŋ]</th>
          <td>‹C› が [g] を指せば ‹G› は餘る. 近き音の [ŋ] に與へる.</td>
        </tr>
        <tr>
          <th>q [k]</th>
          <td>Lat ‹<Rb rt='[kʷattuor]'>quattuor</Rb>› {'>'} Fra ‹<Rb rt='[katʁ]'>quatre</Rb>› と比較せよ.</td>
        </tr>
        <tr>
          <th>k [ɕ]</th>
          <td>Lat ‹<Rb rt='[kantaːre]'>cantāre</Rb>›  {'>'} Fra ‹<Rb rt='[ʃɑ̃te]'>chanter</Rb>›, また Nor ‹<Rb rt='[çæːr]'>kjær</Rb>› と比較せよ.</td>
        </tr>
      </tbody>
    </table>
  </Layout>;
};
