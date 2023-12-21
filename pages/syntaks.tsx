import Layout from '@/components/layout';
import { dictionary, language } from '@/lib/dictionary'
import { Entry, Replace, Signified } from './leksikon';
import style from '@/styles/syntaks.module.sass'
import { variable } from '@/styles/leksikon.module.sass'
import { orthography } from '@/lib/orthography';

const Translate = (props: { children: string }) => <span>{
  props.children.split(/(?<![A-Z0-9_]+)(?=[A-Z0-9_]+)|(?<=[A-Z0-9_]+)(?![A-Z0-9_]+)/g).map((k: string) =>
    /^[A-Z0-9_]+$/.test(k) && dictionary.has(k.toLowerCase())
      ? <ruby>
        <span className='language'>{orthography(dictionary?.get(k.toLowerCase())?.signifier || '')}</span>
        <rt className='faint' style={{ fontFamily: 'monospace' }}>{k.toLowerCase()}</rt>
      </ruby>
      : k
  )
}</span>

const Sentences = ({ data }: { data: [string, string, string, string[]][] }) => <div>{
  data.map(([jpn, code, meaning, faints]) => <div>
    <div style={{ fontSize: 'small' }}>{jpn}</div>
    <div style={{ paddingLeft: '1em' }}>
      <Translate>{code}</Translate>
      {meaning && faints && <div><small><Replace replaced={new RegExp(`(?<![a-z])${faints.join('|')}(?![a-z])`, 'g')}
        replacer={(it: string) => <span className='faint'>{it}</span>}>
        {meaning}
      </Replace></small></div>}
    </div>
  </div>)
}</div >

const Entries = ({ keys }: { keys: string[] }) =>
  <div style={{ display: 'flex', gap: '1em', flexDirection: 'column', margin: 'auto' }}>{
    keys.map(k => <Entry k={k} />)
  }</div>

export default () => <Layout>
  <h3>關係</h3>
  <p><dfn>關係 (relation)</dfn> は1以上4未滿個の空欄を持つ文 (sentence) を意味する.</p>
  <div className={style.sample}>
    <Entries keys={['i', 'love']} />
  </div>

  <small className='faint'>
    この概念を ‹關係› と呼ぶは標準的ならず.
    ‹動詞 (verb)› は詞 (word) の種類を指し ‹動詞句 (verb phrase)› と對立するが, 詞と句を區別するを我は求めず.
    ‹述語 (predicate)› が指すは語 (language) ならざり一貫性を缺く.
    これから ‹關係› とする.
  </small>

  <h3>平叙文</h3>
  <p>
    文は1以上個の關係を持つ.
    文の最初の關係は<dfn>根 (root)</dfn>, 殘るは<dfn>葉 (leaf)</dfn> なる.
    文は根のi番の空欄とi番の葉の0番の空欄を滿たすが等しいと述べる.</p>

  <div className={style.sample} style={{ display: 'flex', flexDirection: 'column', gap: '1em', alignItems: 'center' }}>
    <table className={style.sentence}>
      <tbody>
        <tr>
          <td>
            <Signified datum='$0は$1を$2へrする' /></td>
          <td>
            <Signified datum='$0は…l0する' /></td>
          <td>
            <Signified datum='$0は…l1する' /></td>
          <td>
            <Signified datum='$0は…l2する' /></td>
          <td>…</td>
        </tr>
        <tr>
          <td>關係</td>
          <td>關係</td>
          <td>關係</td>
          <td>關係</td>
          <td>…</td>
        </tr>
        <tr>
          <td>根</td>
          <td>葉</td>
          <td>葉</td>
          <td>葉</td>
          <td>…</td>
        </tr>
        <tr>
          <td colSpan={5}>文</td>
        </tr>
        <tr>
          <td colSpan={5}>
            <div style={{ width: 'fit-content', display: 'flex', justifyContent: 'top' }}>
              <span style={{ writingMode: 'vertical-lr' }}><span className={variable} style={{ writingMode: 'horizontal-tb' }}>r.0=l0.0</span>は⋯l0する</span>
              は
              <span style={{ writingMode: 'vertical-lr' }}><span className={variable} style={{ writingMode: 'horizontal-tb' }}>r.1=l1.0</span>は⋯l1する</span>
              を
              <span style={{ writingMode: 'vertical-lr' }}><span className={variable} style={{ writingMode: 'horizontal-tb' }}>r.2=l2.0</span>は⋯l2する</span>
              へvする
            </div>
            <br /><small className='indent'>
              {'⋁'}(a <span className='faint'>a<sub>0</sub> … a<sub>n<sub>a</sub></sub></span>
              b <span className='faint'>b<sub>0</sub> … b<sub>n<sub>a</sub></sub></span>
              c <span className='faint'>c<sub>0</sub> … c<sub>n<sub>a</sub></sub></span>:E)
              (l0 a <span className='faint'>a<sub>0</sub> … a<sub>n<sub>a</sub></sub></span>)∧
              (l1 b <span className='faint'>b<sub>0</sub> … b<sub>n<sub>b</sub></sub></span>)∧
              (l1 c <span className='faint'>c<sub>0</sub> … c<sub>n<sub>c</sub></sub></span>)∧
              (r a b c)
            </small>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>
    <dfn>格 (case)</dfn> は葉が根の何番の空欄に對應するかなる.
    基本格 格0, 格1, 格2と應用格が有る.</p>

  <div className={style.sample}>
    <Sentences data={[
      ['(何かは 何かを) 好む.',
        'LOVE',
        '⋁(a b c) ‹a loves b›', ['a', 'b']],
      ['(何かは) 我なる.',
        'I',
        '⋁a ‹a is me›', ['a']],
      ['(何かは) 汝なる.',
        'THOU',
        '⋁a ‹a is thee›', ['a']],
      ['我は好む.',
        'LOVE I',
        '⋁(a b) ‹a is me›∧‹a loves me›', ['b']],
      ['我は 汝を 好む.',
        'LOVE I THOU',
        '⋁(a b) ‹a is me›∧‹b is thee›∧‹a loves b›', []],
    ]} />
  </div>

  <h3>格標</h3>
  <p><dfn>格標 (case marker)</dfn> は葉に前置して格を示し異なる順列を許す.</p>
  <div className={style.sample}>
    <Entries keys={['set1', 'set2']} />
  </div>
  文が格標を持つとき, 格標を持たざる項部は現れなざる最小番の格を持つ.

  < div className={style.sample} >
    <Sentences data={[
      ['汝を 好む',
        'LOVE SET1 THOU',
        '⋁(a b) ‹b is thee›∧‹a loves thee›', ['a']],
      ['汝を 我は 好む',
        'LOVE SET1 THOU I',
        '⋁(a b) ‹b is thee›∧‹a is me›∧‹a loves b›', []],
    ]} />
  </div >

  <h3>否定文</h3>
  <div className={style.sample}>
    <Entries keys={['not']} />
  </div>

  <div className={style.sample}>
    <Sentences data={[
      [
        '我は 汝を 好む',
        'LOVE I THOU', '', []],
      ['我ならざるは 汝を 好む',
        'LOVE NOT I THOU',
        '⋁(a b) ¬‹a is me›∧‹b is thee›∧‹a loves b›', []],
      ['我は 汝を 好まず',
        'NOT LOVE I THOU',
        '⋁(a b) ‹a is me›∧‹b is thee›∧¬‹a loves b›', []],
      ['我は 汝を 好まず',
        'NOT _BEGIN LOVE I THOU',
        '¬⋁(a b) ‹a is me›∧‹b is thee›∧‹a loves b›', []],
    ]} />
  </div>

  <h3>空欄の交換</h3>
  關係の空欄の順序を交換する.
  < div className={style.sample} >
    <Entries keys={['swap1', 'swap2']} />
  </div >

  <div className={style.sample}>
    <Sentences data={[
      ['我は 好む', 'LOVE I'],
      ['我は 好まる', 'SWAP1 LOVE I'],
      ['笑む', 'SMILE'],
      ['愛する人は笑む', 'SMILE LOVE'],
      ['愛せらる人は笑む', 'SMILE SWAP1 LOVE'],
    ]} />
  </div>

  <h3>節</h3>
  文を關係に變へる.
  < div className={style.sample} >
    <Entries keys={['that']} />
  </div >
  <div className={style.sample}>
    <Sentences data={[
      ['話す.',
        'SPEAK'],
      [`${language}.`,
        '_AUTONYM'],
      [`汝は ${language}を 話す.`,
        'SPEAK THOU _AUTONYM'],
      [`汝が ${language}を 話すこと.`,
        'THAT SPEAK THOU _AUTONYM',
      `⋁(a b) ‹a is thee›∧‹b is ${language}›∧‹a speaks b›`, []],
      [`汝が ${language}を 話すを 我は 好む.`,
        'LOVE I THAT SPEAK THOU _AUTONYM'],
    ]} />
  </div>

  <h3>疑問文</h3>
  <p>空欄を表す動詞を文に含ます. この文を<dfn>文脈 (context)</dfn> と呼ぶ.</p>
  <div className={style.sample}>
    <Entries keys={['who']} />
  </div>
  <div className={style.sample}>
    <Sentences data={[
      [`汝 何を好む?`,
        'LOVE THOU WHO'],
    ]} />
  </div>

  <h3>決定疑問文</h3>
  <div className={style.sample}>
    <Entries keys={['_ask']} />
  </div>
  <div className={style.sample}>
    <Sentences data={[
      [`汝は ${language}を 好む.`,
        'LOVE THOU _AUTONYM'],
      [`汝が ${language}を 好むか (の眞理値).`,
        '_ASK LOVE THOU _AUTONYM'],
      [`汝は ${language}を 好む? (汝が ${language}を 好むか (の眞理値) は 何?)`,
        'WHO _ASK LOVE THOU _AUTONYM'],
      [`1 (肯定).`,
        'ONE'],
      [`0 (否定).`,
        'ZERO'],
    ]} />
  </div>

  <h3>間接疑問</h3>
  疑問文を節にして間接疑問を得る.
  < div className={style.sample} >
    <Entries keys={['know']} />
  </div >
  <div className={style.sample}>
    <Sentences data={[
      [`我 知らず`,
        'NOT KNOW I'],
      [`汝が 何を 好むかを 我は 知らず`,
        'NOT KNOW I THAT LOVE THOU WHO'],
      [`汝が ${language}を 好むかを 我は 知らず`,
        'NOT KNOW I THAT WHO _ASK LOVE THOU _AUTONYM'],
    ]} />
  </div>

  <h3>關係節</h3>
  文脈の空欄を滿たす對象を示す關係を取り出す.
  < div className={style.sample} >
    <Entries keys={['what']} />
  </div >
  <div className={style.sample}>
    <Sentences data={[
      [`我 知る`,
        'KNOW I'],
      [`汝が 好むものを 我は 見る`,
        'KNOW I WHAT LOVE THOU WHO'],
    ]} />
  </div>

  <h3>量</h3>
  <p><dfn>量 (quantity)</dfn> は述部の回數と項部の個數を示す.</p>
  <div className={style.sample}>
    <Sentences data={[
      [`0`,
        'ZERO'],
      [`10`,
        'ONE ZERO'],
      [`210`,
        'TWO ONE ZERO'],
      [`猫`,
        'CAT'],
      [`10個の猫は 往く`,
        'GO ONE ZERO CAT'],
      [`猫は 海へ 2回 往く`,
        'TWO GO CAT SEA'],
    ]} />
  </div>

  <h3>序數</h3>

  <h3>修飾</h3>

  <h3>極性</h3>
  <p><dfn>極性 (polarity)</dfn></p>

  <h3>應用格</h3>

</Layout >;
