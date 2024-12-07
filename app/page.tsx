import { CSSProperties } from "react";
import dic, { name, translate } from "../lib/lexicology";
import { toIpa } from "../lib/phonology";
import { replaceEach } from "../lib/common";
import { orthography } from "../lib/orthography";

const code = {
  style: { fontFamily: 'monospace' } as CSSProperties,
};

const Target = ({ children }: { children: string }) =>
  <span style={{ fontStyle: 'italic' }}>{orthography(children)}</span >

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
          <th>glottal</th>
          <th>velar</th>
          <th>palatal</th>
          <th>dental</th>
          <th>labial</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th rowSpan={2}>plosive</th>
          <th>unvoiced</th>
          <td>∅</td>
          <td><Target>k</Target></td>
          <td></td>
          <td><Target>t</Target></td>
          <td><Target>p</Target></td>
        </tr>
        <tr>
          <th>voiced</th>
          <td></td>
          <td><Target>c</Target></td>
          <td></td>
          <td><Target>d</Target></td>
          <td><Target>b</Target></td>
        </tr>
        <tr>
          <th rowSpan={2}>fricative</th>
          <th>unvoiced</th>
          <td></td>
          <td><Target>h</Target></td>
          <td><Target>x</Target></td>
          <td><Target>s</Target></td>
          <td><Target>f</Target></td>
        </tr>
        <tr>
          <th>voiced</th>
          <td></td>
          <td></td>
          <td><Target>j</Target></td>
          <td><Target>z</Target></td>
          <td><Target>v</Target></td>
        </tr>
        <tr>
          <th>nasal</th>
          <th></th>
          <td></td>
          <td><Target>g</Target></td>
          <td></td>
          <td><Target>n</Target></td>
          <td><Target>m</Target></td>
        </tr>
        <tr>
          <th>lateral</th>
          <th></th>
          <td></td>
          <td></td>
          <td></td>
          <td><Target>l</Target></td>
          <td></td>
        </tr>
        <tr>
          <th>approximant</th>
          <th></th>
          <td></td>
          <td></td>
          <td><Target>j</Target></td>
          <td><Target>r</Target></td>
          <td><Target>v</Target></td>
        </tr>
        <tr>
          <th rowSpan={3}>vowel</th>
          <th>high</th>
          <td></td>
          <td></td>
          <td><Target>i</Target></td>
          <td></td>
          <td><Target>u</Target></td>
        </tr>
        <tr>
          <th>mid</th>
          <td></td>
          <td></td>
          <td><Target>e</Target></td>
          <td></td>
          <td><Target>o</Target></td>
        </tr>
        <tr>
          <th>low</th>
          <td></td>
          <td><Target>a</Target></td>
          <td></td>
          <td></td>
          <td></td>
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
            <td><Target>{betokener}</Target></td>
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
            <td style={{ fontSize: 'smaller' }}>{
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
          <td>i am (my name is) suzuri</td>
          <td>{translate('i name suzuri _period')}</td>
        </tr>
        <tr>
          <td>i am 21 years old</td>
          <td>{translate('i age two one year _abl _period')}</td>
        </tr>
        <tr>
          <td>i live in japan</td>
          <td>{translate('i in nitpon _acc _period')}</td>
        </tr>
      </tbody>
    </table>
  </section>
</>
