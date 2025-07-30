import dic, { acronymToWord, Formation, translate } from '../lib/words';
import { invalid, letters, toIpa } from '../lib/write';
// @ts-ignore
import { dateToObject } from 'https://sumi.space/js/date.js';

const name = dic.get('_self').token;

const Translate = (props) => (
  <span className="target">{translate(props.children)}</span>
);

const highlight = (meant: string) =>
  meant.split(/(?=@[nad])|(?<=@[nad])/g).map((it, i) =>
    /^@[nad]$/.test(it) ? (
      <span key={i} className="term">
        {it.substring(1)}
      </span>
    ) : (
      it
    )
  );

const samples = (entries: (string | [string, string])[]) => (
  <table className="samples">
    <tbody>
      {entries.map((it, i) =>
        typeof it === 'string' ? (
          <tr key={i}>
            <td>{dic.get(it).c}</td>
            <td>
              <Translate>{it}</Translate>
            </td>
            <td className="ipa">{toIpa(translate(it))}</td>
            <td>{highlight(dic.get(it)?.ja ?? dic.get(it)?.en ?? '')}</td>
          </tr>
        ) : (
          <tr key={i}>
            <td>文</td>
            <td colSpan={2}>
              <Translate>{it[0]}</Translate>
            </td>
            <td style={{ whiteSpace: 'pre-wrap' }}>{it[1]}</td>
          </tr>
        )
      )}
    </tbody>
  </table>
);

export default () => (
  <>
    <h1>{name} (草案)</h1>
    <p>本稿は文法要件よりは入門として機能する.</p>

    <section>
      <h2>概要</h2>
      <p>
        {name}は
        <a href="https://sumi.space" rel="author">
          sumi.space
        </a>
        が作成する人間言語.
        <br /> 主動客-對格言語.
        <br /> 構文にjbo語とcmn語, 表記にcat語, 形態にdeu語の影響を受けた.
      </p>
    </section>

    <section>
      <h2>字と音</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>聲門</th>
            <th>軟腭</th>
            <th>硬腭</th>
            <th>舌</th>
            <th>脣</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>鼻</th>
            <td></td>
            <td></td>
            <td></td>
            <td>n</td>
            <td>m</td>
          </tr>
          <tr>
            <th>有聲破裂</th>
            <td></td>
            <td>
              c <span className="ipa">g</span>
            </td>
            <td></td>
            <td>d</td>
            <td>b</td>
          </tr>
          <tr>
            <th>無聲破裂</th>
            <td>
              <span className="ipa">ʔ</span>
            </td>
            <td>k</td>
            <td></td>
            <td>t</td>
            <td>p</td>
          </tr>
          <tr>
            <th>無聲摩擦</th>
            <td></td>
            <td>
              h <span className="ipa">h, x</span>
            </td>
            <td>
              x <span className="ipa">ɕ, ʂ, ʃ</span>
            </td>
            <td>s</td>
            <td>f [f,φ]</td>
          </tr>
          <tr>
            <th>有聲摩擦</th>
            <td></td>
            <td></td>
            <td>
              j <span className="ipa">ʑ, ʐ, ʒ</span>
            </td>
            <td>z</td>
            <td>v [v, β]</td>
          </tr>
          <tr>
            <th>接近</th>
            <td></td>
            <td></td>
            <td>
              i <span className="ipa">j</span>
            </td>
            <td>
              r <span className="ipa">ɾ</span>
              <br />l
            </td>
            <td>
              u <span className="ipa">w</span>
            </td>
          </tr>
          <tr>
            <th>非中母</th>
            <td>a</td>
            <td></td>
            <td>i</td>
            <td></td>
            <td>u</td>
          </tr>
          <tr>
            <th>中母</th>
            <td></td>
            <td></td>
            <td>e</td>
            <td></td>
            <td>o</td>
          </tr>
        </tbody>
      </table>

      <p>
        <span className="ipa">ʔ</span>を指す字は無い.
        <br />
        母音に始まる單詞の先頭に現れる.
      </p>

      <p>
        分綴符から始まる單詞 (例へば<span className="target">-a</span>)
        を書く時に, 見映えの為に揚抑符を用ゐても良い (例へば
        <span className="target">â</span>).
      </p>
    </section>

    <section>
      <h2>字名</h2>
      <div className="letters">
        {'aäbcdeǝfghijklmnoöpqrstuvwxyz'.split('').map((l, i) => (
          <div key={i}>
            {letters.includes(l) ? <td>{l}</td> : <td>({l})</td>}
            <span className="target">{acronymToWord(l.toUpperCase())}</span>
          </div>
        ))}
      </div>
      <p>丸括弧の中の字は使はれないが互換性の為に有る.</p>
    </section>

    <section>
      <h2>二重母音</h2>
      <table>
        <tbody>
          <tr>
            <td>
              iu <span className="ipa">ju</span>
            </td>
            <td>
              io <span className="ipa">jo</span>
            </td>
            <td>
              ia <span className="ipa">ja</span>
            </td>
            <td>
              ai <span className="ipa">aj</span>
            </td>
          </tr>
          <tr>
            <td>
              ui <span className="ipa">wi</span>
            </td>
            <td>
              ue <span className="ipa">we</span>
            </td>
            <td>
              ua <span className="ipa">wa</span>
            </td>
            <td>
              au <span className="ipa">aw</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <span className="ipa">j</span>は詞頭と硬腭音に後置しない.
        <br />
        <span className="ipa">w</span>は詞頭と脣音に後置しない.
      </p>
    </section>

    <section>
      <h2>動詞と格</h2>
      <p>
        主に<dfn>動詞 (verb)</dfn> が文を構成する. 動詞は物の關係を指す.
      </p>
      <p>
        日本語文 ‹貓が星を見る› を例とすると, 主要な關係 ‹…が…を見る›
        が貓と星を結ぶ.
      </p>
      <p>
        ‹貓が星を見る› と ‹星が貓を見る› が指す物は違ふ.
        <br /> 關係は一般に交換せず, 關係の中の空欄は固有の機能を持つ.
        <br /> 空欄の, 他の空欄と區別される機能を<dfn>格 (case)</dfn> と言ふ.
      </p>

      {samples(['cat', 'see', 'give'])}
    </section>

    <section>
      <h2>最も單純な文</h2>
      <p>一個の動詞は文を構成する.</p>
      {samples([
        ['cat', '(何かが) 貓'],
        ['see', '(何かが) (何かを) 見る'],
      ])}
      <p>空欄には適當な事物 (何か) が入るとして解釋する.</p>
    </section>

    <section>
      <h2>法と時制</h2>
      <p>
        <dfn>後助動詞 (postverb)</dfn>が動詞の法と時制を指す.
        <br />
        時間に依らず成立する傾向を指す不變時制と, 時間に依る過去時制, 現在時制,
        未來時制が有る.
        <br />
        不變時制と それ以外は自然言語の名詞と動詞に それぞれ似る.
      </p>
      <p>動詞は進行時相を陰に指す.</p>
      {samples([
        'did',
        'do',
        'will',
        'if_be',
        'if_did',
        'if_do',
        'if_will',
        ['see', '見る物 (gazer) だ'],
        ['see do', '見てゐる'],
        ['see if_did', '見たなら…'],
      ])}
    </section>

    <section>
      <h2>時相</h2>
      <p>
        <dfn>前助動詞 (preverb)</dfn> が時相を指す.
      </p>
      {samples([
        'begin',
        'end',
        'live',
        ['i begin live do', '我が生き始めた\n→我が生まれた'],
        ['i end live will', '我が生き終はらう\n→我が死なう'],
      ])}
      <p>現在時制と非進行相は兩立しない.</p>
    </section>

    <section>
      <h2>同格</h2>
      <p>
        隣接する動詞は主格を共有して兩立する.
        <br />
        これを<dfn>同格 (apposition)</dfn> と言ふ.
      </p>

      <p>同格は主格 ‹何かが› を具體化する.</p>
      {samples([['cat see do', '何かが貓であり, 見てゐる\n→貓が見てゐる']])}

      <p>同格は形容する.</p>
      {samples([
        'black',
        ['cat black see do', '何かが貓であり, 黑く, 見てゐる\n→黑貓が見てゐる'],
      ])}
    </section>

    <section>
      <h2>前置詞</h2>
      <p>
        格に對應する<dfn>前置詞 (preposition)</dfn>が有る.
      </p>
      {samples(['by', 'because', 'him', 'to', 'with', 'ly'])}

      <p>
        二個の動詞の主格 同士が等しい事を同格が指す樣に,
        非主格と主格が等しい事を前置詞が指す.
        <br />
        これが非主格 ‹何かを›, ‹何かへ›, … を具體化する.
      </p>
      {samples([
        'i',
        'water',
        'give',
        ['i give do him water', '我が水を與へてゐる'],
        ['i give do him water to cat', '我が貓へ水を與へてゐる'],
      ])}

      <p>前置詞は同格を一個の動詞として扱ふ.</p>
      {samples([
        ['give did to cat', '貓へ與へてゐた'],
        ['give did to cat black', '黑い貓へ與へてゐた'],
      ])}
    </section>

    <section>
      <h2>受動態</h2>
      <p>
        前置詞で格を指定して非主格を同格の對象に指定し得る.
        <br />
        これを<dfn>受動態 (passive)</dfn> と言ふ.
      </p>
      {samples([
        'done',
        'water',
        ['i give did him water to cat', '私は水を貓へ與へてゐた'],
        ['water done (him) give did by i to cat', ' (同) '],
        ['cat done to give did by i him water', ' (同) '],
      ])}
    </section>

    <section>
      <h2>作用域</h2>
      <p>
        ここまでの文法では, 空欄を埋めた動詞で別の動詞の空欄を埋める方法が無い.
      </p>
      {samples([
        ['i see do him cat', '我が貓を見てゐる'],
        ['cat eat do him water', '貓が水を飲んでゐる'],
        ['i see do him cat eat do', '我が, 飲む貓を見てゐる'],
        ['? i see do him cat eat do him water', '? 我が, 飲む貓を水を見てゐる'],
        ['?', '我が, 水を飲む貓を見てゐる'],
      ])}
      <p>
        この例で<Translate>water</Translate>は<Translate>eat</Translate>
        の對格を埋めたいが, 文の全體が<Translate>see</Translate>の
        <dfn>作用域 (scope)</dfn> なる故に叶はない.
        <br />
        <Translate>eat</Translate>の作用域を開いてこれを回避する.
      </p>
      {samples([
        'which',
        '_close',
        [
          'i see do him cat eat do which him water (_close)',
          '我が, 水を飲む貓を見てゐる',
        ],
      ])}
    </section>

    <section>
      <h2>入れ子</h2>
      <p>
        己格の受動態を用ゐては文 ‹…である› から動詞 ‹
        {highlight('@nは…する事である')}› を作り得る.
      </p>
      {samples([
        'know',
        ['cat see do him sun', '貓が星を見てゐる'],
        ['see do by cat him sun', '(同)'],
        [
          'i know do him done ly see do which by cat him sun',
          '貓が星を見てゐる事を我は知ってゐる',
        ],
      ])}
    </section>

    <section>
      <h2>逐次的同格</h2>
      <p>
        同格は論理的連言 ‹かつ› を指すのみならず, 逐次的な ‹それから›
        をも現し得る.
        <br />
        これは華語の連動文に似る.
      </p>
      {samples([
        'then',
        'eat',
        'go',
        ['go then eat', '往ってから食ふ\n→食ひに往く'],
      ])}
    </section>

    <h2>詞彙 ({dic.size})</h2>
    <section>
      <div className="words">
        {[...dic.entries()].map(
          ([key, { token, ja, en, c: klass, o: origin, formation }]) => (
            <div key={key}>
              <span className="target">{token}</span>{' '}
              <span className="ipa">{toIpa(token)}</span> ∈
              {formation === Formation.Complex ? '複合' : ''}
              {klass}
              {formation === Formation.Idiom ? '句' : ''}
              <br />
              {highlight(ja ?? en ?? '')}
            </div>
          )
        )}
      </div>
    </section>

    <section>
      <h2>逐次的同格</h2>

      {(() => {
        const dateToKeys = {};
        for (const k of dic.keys()) {
          const { d: date } = dic.get(k);
          if (date in dateToKeys) dateToKeys[date].push(k);
          else dateToKeys[date] = [k];
        }

        let sum = 0;
        for (const date in dateToKeys) {
          dateToKeys[date] = dateToKeys[date].filter(
            (k, i, self) =>
              (!k.endsWith('*') || !self.includes(k.replace(/\*$/, ''))) &&
              (!k.endsWith('#') || !self.includes(k.replace(/\#$/, '')))
          );
          sum += dateToKeys[date].length;
        }

        const date0 = Object.keys(dateToKeys).reduce(
          (acc, current) => (current < acc ? current : acc),
          '9999-99-99'
        );

        let acc = 0;
        return (
          <table className="progress">
            <tbody>
              {Object.keys(dateToKeys)
                .sort()
                .map((date) => {
                  acc += dateToKeys[date].length;
                  const percent = (acc / sum) * 100;
                  return (
                    <tr key={date}>
                      <th style={{ textWrap: 'nowrap' }}>
                        {dateToObject(new Date(date)).string}
                      </th>
                      <td>
                        {(new Date(date).getTime() -
                          new Date(date0).getTime()) /
                          1000 /
                          60 /
                          60 /
                          24}
                      </td>
                      <td
                        style={{
                          background: `linear-gradient(to right, #0001 0%, #0001 ${percent}%, transparent ${percent}%, transparent 100%)`,
                        }}
                      >
                        {dateToKeys[date]
                          .map((key) => dic.get(key).token)
                          .join(' ')}
                      </td>
                      <td style={{ textWrap: 'nowrap' }}>
                        +{dateToKeys[date].length}
                      </td>
                      <td style={{ textWrap: 'nowrap' }}>{acc}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        );
      })()}
    </section>
  </>
);
