import Layout from '@/components/layout';
import { dictionary, language, orthography } from '@/lib/dictionary'
import { Entry, Signified } from './leksikon';

const Translate = (props: { children: string }) => <span>{
  props.children.split(/(?<![A-Z0-9_]+)(?=[A-Z0-9_]+)|(?<=[A-Z0-9_]+)(?![A-Z0-9_]+)/g).map((k: string) =>
    /^[A-Z0-9_]+$/.test(k) && dictionary.has(k.toLowerCase())
      ? <ruby>
        <span className='language'>{orthography(dictionary?.get(k.toLowerCase())?.signifier || '')}</span>
        <rt style={{ fontFamily: 'monospace', opacity: .25 }}>{k.toLowerCase()}</rt>
      </ruby>
      : k
  )
}</span>

const Sentences = ({ data }: { data: [string, string][] }) => <div>{
  data.map(([jpn, code]) => <div>
    <div style={{ fontSize: 'small' }}>{jpn}</div>
    <div style={{ paddingLeft: '1em' }}>
      <Translate>{code}</Translate>
    </div>
  </div>)
}</div>

const Entries = ({ keys }: { keys: string[] }) =>
  <div style={{ display: 'flex', gap: '1em', flexDirection: 'column', margin: 'auto' }}>{
    keys.map(k => <Entry k={k} />)
  }</div>

export default () => <Layout>
  <h3>注意</h3>
  <ul>
    <li>字母を<a href='https://unicode.org/iso15924/iso15924-codes.html'>ISO 15924</a>, 言語を<a href='https://en.wikipedia.org/wiki/List_of_ISO_639-3_codes'>ISO 639-3</a>にて指す.</li>
    <li>大小を持つ字母にて文頭を大文字にせず. 省略辭頭を大文字とす.</li>
    <li>對象言語を書くに斜體を用ゐる.</li>
  </ul>

  <h3>動句</h3>
  動句の意味は空欄を持つ文なり.
  1個の詞なる動句を動詞と呼ぶ.
  <div className='sample'>
    <Entries keys={['i', 'love']} />
  </div>

  動句は0以上3未滿個の空欄を持つ.

  <h3>平叙文</h3>
  文は1個以上の動句を持つ. 文の最初の動句を述部, 此に連なる動句を項部と呼ぶ.

  <div className='sample'>
    文 ≔ 述部 項部 項部 …
  </div>

  文が
  <div className='sample'>
    (<Signified datum='$0は$1をv0する' />) (<Signified datum='$0は$1をv1する' />) (<Signified datum='$0は$1をv2する' />)
  </div>
  の如く構成さるとき, その意味は
  <div className='sample'>
    (v1するもの) (v2するもの)を (v2する)
  </div>
  なり.
  即ち, i番の項部の空欄を滿たす對象 述部のi番の空欄を滿たして文意を爲す.

  <div className='sample'>
    <Sentences data={[
      ['(何かは 何かを) 好む.',
        'LOVE'],
      ['(何かは) 我なり.',
        'I'],
      ['(何かは) 汝なり.',
        'THOU'],
      ['我 好む.',
        'LOVE I'],
      ['我 汝を 好む.',
        'LOVE I THOU'],
    ]} />
  </div>

  <h3>否定文</h3>
  <div className='sample'>
    <Entries keys={['not']} />
  </div>

  <div className='sample'>
    <Sentences data={[
      ['我 汝を 好む', 'LOVEI I THOU'],
      ['我 汝を 好まず', 'NOT LOVE I THOU'],
    ]} />
  </div>

  <h3>空欄の交換</h3>

  特定の單詞は動句の空欄の順序を交換す.
  <div className='sample'>
    <Entries keys={['swap1', 'swap2']} />
  </div>

  <div className='sample'>
    <Sentences data={[
      ['好むもの 我なり', 'I LOVE'],
      ['好まるもの 我なり', 'I SWAP1 LOVE'],
    ]} />
  </div>

  <h3>副文</h3>
  特定の單詞が文を動句にす.
  <div className='sample'>
    <Entries keys={['that']} />
  </div>
  <div className='sample'>
    <Sentences data={[
      ['話す.',
        'SPEAK'],
      [`${language}.`,
        '_AUTONYM'],
      [`汝 ${language}を 話す.`,
        'SPEAK THOU _AUTONYM'],
      [`汝の ${language}を 話すこと.`,
        'THAT SPEAK THOU _AUTONYM'],
      [`汝 ${language}を 話すを 我 好む.`,
        'LOVE I THAT SPEAK THOU _AUTONYM'],
    ]} />
  </div>

  <h3>決定疑問文</h3>
  <div className='sample'>
    <Entries keys={['_ask']} />
  </div>
  <div className='sample'>
    <Sentences data={[
      [`汝 ${language}を 好むか?`,
        '_ASK LOVE THOU _AUTONYM'],
    ]} />
  </div>

  <h3>非決定疑問文</h3>
  空欄を表す動詞を文に含ます. この文を文脈と呼ぶ.
  <div className='sample'>
    <Entries keys={['who']} />
  </div>
  <div className='sample'>
    <Sentences data={[
      [`汝 何を好む?`,
        'LOVE THOU WHO'],
    ]} />
  </div>

  <h3>間接疑問</h3>
  疑問文を副文にすると間接疑問を得る.
  <div className='sample'>
    <Entries keys={['know']} />
  </div>
  <div className='sample'>
    <Sentences data={[
      [`我 知らず`,
        'NOT KNOW I'],
      [`汝の ${language}を 好むかを 我 知らず`,
        'NOT KNOW I THAT _ASK LOVE THOU _AUTONYM'],
      [`汝の 何を 好むかを 我 知らず`,
        'NOT KNOW I THAT LOVE THOU WHO'],
    ]} />
  </div>

  <h3>關係動詞句</h3>
  文脈の空欄を滿たす動句を取り出す.
  <div className='sample'>
    <Entries keys={['what']} />
  </div>
  <div className='sample'>
    <Sentences data={[
      [`SEE I`,
        '我 見る'],
      [`汝の 好むものを 我 見る`,
        'SEE I WHAT LOVE THOU WHO'],
    ]} />
  </div>
</Layout >;
