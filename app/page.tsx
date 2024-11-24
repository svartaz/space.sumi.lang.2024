import { CSSProperties } from "react";
import dic, { name, translate } from "../lib/lexicology";
import { toIpa } from "../lib/phonology";
import { replaceEach } from "../lib/common";

const code = {
  style: { fontFamily: 'monospace' } as CSSProperties,
};

const target = {
  style: { fontStyle: 'italic' } as CSSProperties,
};

const term = {
  style: {
    paddingInline: '.5rex',
    backgroundColor: '#0002',
    borderRadius: '.5rex',
  } as CSSProperties,
};

export default () => <>
  <h1>{name}</h1>

  <section>
    <h2>phonology</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>velar</th>
          <th>palatal</th>
          <th>dental</th>
          <th>labial</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>unvoiced</th>
          <th rowSpan={2}>plosive</th>
          <td {...target}>k</td>
          <td></td>
          <td {...target}>t</td>
          <td {...target}>p</td>
        </tr>
        <tr>
          <th>voiced</th>
          <td {...target}>c</td>
          <td></td>
          <td {...target}>d</td>
          <td {...target}>b</td>
        </tr>
        <tr>
          <th>unvoiced</th>
          <th rowSpan={2}>fricative</th>
          <td {...target}>h</td>
          <td {...target}>x</td>
          <td {...target}>s</td>
          <td {...target}>f</td>
        </tr>
        <tr>
          <th>voiced</th>
          <td></td>
          <td {...target}>j</td>
          <td {...target}>z</td>
          <td {...target}>v</td>
        </tr>
        <tr>
          <th></th>
          <th>nasal</th>
          <td {...target}>g</td>
          <td></td>
          <td {...target}>n</td>
          <td {...target}>m</td>
        </tr>
        <tr>
          <th></th>
          <th>lateral</th>
          <td></td>
          <td></td>
          <td {...target}>l</td>
          <td></td>
        </tr>
        <tr>
          <th></th>
          <th>approximant</th>
          <td></td>
          <td></td>
          <td {...target}>r</td>
          <td></td>
        </tr>
        <tr>
          <th>high</th>
          <th rowSpan={3}>vowel</th>
          <td></td>
          <td {...target}>i</td>
          <td {...target}>y</td>
          <td {...target}>u</td>
        </tr>
        <tr>
          <th>mid</th>
          <td></td>
          <td {...target}>e</td>
          <td></td>
          <td {...target}>o</td>
        </tr>
        <tr>
          <th>low</th>
          <td {...target}>a</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>inflection</h2>
    <table style={{ margin: 'auto', borderSpacing: '2rex 0' }}>
      <thead>
        <tr>
          <th>root</th>
          <th></th>
          <th>aspect</th>
          <th>tense</th>
          <th>mood</th>
          <th></th>
          <th>case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>…</td>
          <td>(')</td>
          <td>
            <table>
              <tbody>
                <tr><td {...target}>{translate('begin')}</td><td>inchoative</td></tr>
                <tr><td>-∅-</td><td>progressive</td></tr>
                <tr><td {...target}>{translate('end')}</td><td>completive</td></tr>
              </tbody>
            </table>
          </td>
          <td>
            <table>
              <tbody>
                <tr><td>-∅-</td><td>unspecified</td></tr>
                <tr><td {...target}>{translate('did')}</td><td>past</td></tr>
                <tr><td {...target}>{translate('do')}</td><td>present</td></tr>
                <tr><td {...target}>{translate('shall')}</td><td>future</td></tr>
              </tbody>
            </table>
          </td>
          <td>
            <table>
              <tbody>
                <tr><td>-∅-</td><td>realis</td></tr>
                <tr><td {...target}>{translate('would')}</td><td>irrealis</td></tr>
              </tbody>
            </table>
          </td>
          <td>(')</td>
          <td>
            <table>
              <tbody>
                <tr><td>-∅</td><td>nominative</td></tr>
                <tr><td {...target}>{translate('_acc')}</td><td>accusative</td></tr>
                <tr><td {...target}>{translate('_dat')}</td><td>dative</td></tr>
                <tr><td {...target}>{translate('_adv')}</td><td>adverbial</td></tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>words</h2>
    <table style={{ margin: 'auto' }}>
      <thead>
        <tr>
          <th>key</th>
          <th>betokener</th>
          <th>sound</th>
          <th>class</th>
          <th>betokened</th>
          <th>origin</th>
        </tr>
      </thead>
      <tbody>
        {
          [...dic.entries()].map(([key, { betokener, betokened, klass, origin }]) => <tr style={betokener ? {} : { backgroundColor: '#F002' }}>
            <td {...code}>{key}</td>
            <td {...target}>{betokener}</td>
            <td>[{toIpa(betokener)}]</td>
            <td>{klass}</td>
            <td>
              {
                betokened
                  .split(/(?<=@\d+|@\{.+?\})|(?=@\d+|@\{.+?\})/g)
                  .map((s: string) =>
                    /@\d+|@\{.+?\}/.test(s)
                      ? <span {...term}>{replaceEach(s, [[/^@\{?/, ''], [/\}$/, '']])}</span>
                      : s
                  )
              }
            </td>
            <td>{
              /^https?:\/\//.test(origin)
                ? <a href={origin}>{decodeURI(origin).replace(/^https?:\/\//, '')}</a>
                : origin
            }</td>
          </tr>)
        }
      </tbody>
    </table>
  </section>

  <section>
    <h2>sentences</h2>
    <table>
      <tbody>
        <tr>
          <td>i have-a-name <i>sumi</i></td>
          <td>{translate('i called sumi')}</td>
        </tr>
        <tr>
          <td>i like a cat</td>
          <td>{translate('i like cat _acc')}</td>
        </tr>
        <tr>
          <td>may thou be proud</td>
          <td>{translate('thou pride would')}</td>
        </tr>
        <tr>
          <td>i wish that thou would have come to love a cat</td>
          <td>{translate('i want that _acc thou like begin did would cat _acc')}</td>
        </tr>
      </tbody>
    </table>
  </section>
</>

