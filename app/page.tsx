import { CSSProperties } from 'react';
import dic, { Formation, name, translate } from '../lib/lexicology';
import { phoneticise, toIpa } from '../lib/phonology';
import { replaceEach } from '../lib/common';
import { orthography } from '../lib/orthography';
import { Letter } from '../lib/letter';

const Target = ({ children }: { children: string }) => (
  <span className="target" title={children}>
    {orthography(children)}
  </span>
);

const TargetLetter = (props: {
  children: string;
  title?: string;
  style?: CSSProperties;
}) => (
  <Letter title={props.children} className="target" {...props}>
    {replaceEach(phoneticise(props.children).toLowerCase(), [
      [/x/g, 'S'],
      [/h/g, 'x'],
      [/j/g, 'Z'],
      [/y/g, 'j'],
    ])}
  </Letter>
);

const Ipa = ({ children }: { children: string }) => (
  <span className="ipa">{toIpa(children)}</span>
);

const term = {
  style: {
    paddingInline: '.5rex',
    backgroundColor: '#0002',
    borderRadius: '.5rex',
  } as CSSProperties,
};

export default () => (
  <>
    <h1 style={{ textAlign: 'center' }}>{name}</h1>

    <div
      style={{
        inlineSize: 'fit-content',
        marginInline: 'auto',
      }}
    >
      <TargetLetter>
        {translate('KXIM LANGUAGE__ DONE END MAKE [ CALLED SUMI ]')}
      </TargetLetter>
    </div>

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
            <th rowSpan={2}>plosive</th>
            <th>unvoiced</th>
            <td>
              <Target>k</Target>
            </td>
            <td></td>
            <td>
              <Target>t</Target>
            </td>
            <td>
              <Target>p</Target>
            </td>
          </tr>
          <tr>
            <th>voiced</th>
            <td>
              <Target>C</Target> <Ipa>C</Ipa>
            </td>
            <td></td>
            <td>
              <Target>d</Target>
            </td>
            <td>
              <Target>b</Target>
            </td>
          </tr>
          <tr>
            <th rowSpan={2}>fricative</th>
            <th>unvoiced</th>
            <td>
              <Target>h</Target>
            </td>
            <td>
              <Target>x</Target> <Ipa>X</Ipa>
            </td>
            <td>
              <Target>s</Target>
            </td>
            <td>
              <Target>f</Target>
            </td>
          </tr>
          <tr>
            <th>voiced</th>
            <td></td>
            <td>
              <Target>j</Target> <Ipa>J</Ipa>
            </td>
            <td>
              <Target>z</Target>
            </td>
            <td>
              <Target>v</Target>
            </td>
          </tr>
          <tr>
            <th>nasal</th>
            <td></td>
            <td>
              <Target>g</Target> <Ipa>G</Ipa>
            </td>
            <td></td>
            <td>
              <Target>n</Target>
            </td>
            <td>
              <Target>m</Target>
            </td>
          </tr>
          <tr>
            <th>lateral</th>
            <th></th>
            <td></td>
            <td></td>
            <td>
              <Target>l</Target>
            </td>
            <td></td>
          </tr>
          <tr>
            <th>approximant</th>
            <th></th>
            <td></td>
            <td>
              <Target>j</Target>
            </td>
            <td>
              <Target>r</Target>
            </td>
            <td>
              <Target>v</Target> <Ipa>W</Ipa>
            </td>
          </tr>
          <tr>
            <th rowSpan={3}>vowel</th>
            <th>high</th>
            <td></td>
            <td>
              <Target>i</Target>
            </td>
            <td></td>
            <td>
              <Target>u</Target>
            </td>
          </tr>
          <tr>
            <th>mid</th>
            <td></td>
            <td>
              <Target>e</Target>
            </td>
            <td></td>
            <td>
              <Target>o</Target>
            </td>
          </tr>
          <tr>
            <th>low</th>
            <td>
              <Target>a</Target>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>sentences</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {[
          [
            ['(someone) gives (something) (to someone)', 'GIVE'],
            ['(someone) gives water (to someone)', 'GIVE [ WATER'],
            ['(someone) gives water to a cat', 'GIVE [ WATER DEM CAT'],
            ['a person gives water to a cat', 'PERSON GIVE [ WATER DEM CAT'],
            [
              'a healthy person gives fresh water to a black cat',
              'PERSON HEALTHY GIVE [ WATER FRESH DEM CAT BLACK',
            ],
            [
              'a person giving fresh water to a black cat is healthy',
              'PERSON GIVE [ WATER FRESH DEM CAT BLACK ] HEALTHY',
            ],
            ['water given is fresh', 'WATER DONE GIVE FRESH'],
            [
              'water given by a person is fresh',
              'WATER DONE GIVE [ PERSON ] FRESH',
            ],
            [
              'water given to a cat by a person is fresh',
              'WATER DONE GIVE [ PERSON DEM CAT ] FRESH',
            ],
            [
              'a cat given water is black',
              'CAT DONE DEM GIVE [ DEN WATER ] FRESH',
            ],
            [
              'a cat given water by a person is black',
              'CAT DONE DEM GIVE [ PERSON DEN WATER ] FRESH',
            ],
          ].map(([en, code]) => (
            <table className="sample">
              <colgroup>
                <col
                  style={{ borderInlineEnd: '1px solid', inlineSize: '1em' }}
                />
              </colgroup>
              <tbody>
                <tr>
                  <th>💭</th>
                  <td>{en}</td>
                </tr>
                <tr>
                  <th>🏷️</th>
                  {/*🧩*/}
                  <td className="code">{code}</td>
                </tr>
                <tr>
                  <th>🖊</th>
                  <td>
                    <Target>{translate(code)}</Target>
                  </td>
                </tr>
                <tr>
                  <th>💬</th>
                  <td className="ipa">
                    <Ipa>{translate(code)}</Ipa>
                  </td>
                </tr>
              </tbody>
            </table>
          )),
        ]}
      </div>
    </section>

    <section>
      <h2>words</h2>

      {(() => {
        const dateToKeys = {};
        for (const k of dic.keys()) {
          const { date } = dic.get(k);
          if (date in dateToKeys) dateToKeys[date].push(k);
          else dateToKeys[date] = [k];
        }

        let sum = 0;
        for (const date in dateToKeys) {
          dateToKeys[date] = dateToKeys[date].filter(
            (k, i, self) =>
              !k.endsWith('_') || !self.includes(k.replace(/_$/, ''))
          );
          sum += dateToKeys[date].length;
        }

        let acc = 0;
        return (
          <table className="progress">
            {Object.keys(dateToKeys)
              .sort()
              .map((date) => {
                acc += dateToKeys[date].length;
                const percent = (acc / sum) * 100;
                return (
                  <tr>
                    <th style={{ textWrap: 'nowrap' }}>{date}</th>
                    <td
                      style={{
                        background: `linear-gradient(to right, #0001 0%, #0001 ${percent}%, transparent ${percent}%, transparent 100%)`,
                      }}
                    >
                      {dateToKeys[date].join(' ')}
                    </td>
                    <td style={{ textWrap: 'nowrap' }}>
                      +{dateToKeys[date].length}
                    </td>
                    <td style={{ textWrap: 'nowrap' }}>{acc}</td>
                  </tr>
                );
              })}
          </table>
        );
      })()}

      <table className="dictionary" style={{ margin: 'auto' }}>
        <thead className="h">
          <tr>
            <th>key</th>
            <th colSpan={2}>betokener</th>
            <th>sound</th>
            <th>class</th>
            <th>betokened</th>
            <th>origin</th>
          </tr>
        </thead>
        <tbody>
          {[...dic.entries()].map(
            ([key, { betokener, betokened, klass, origin, formation }]) => (
              <tr style={betokener ? {} : { backgroundColor: '#F002' }}>
                <td className="code">{key}</td>
                <td>
                  <Target>{betokener}</Target>
                </td>
                <td>
                  <TargetLetter>{betokener}</TargetLetter>
                </td>
                <td>
                  <Ipa>{betokener}</Ipa>
                </td>
                <td>{klass}</td>
                {betokened.startsWith('=') ? (
                  <td>
                    =<Target>{betokened.substring(1)}</Target>
                  </td>
                ) : (
                  <td>
                    {betokened
                      .split(/(?<=@\d+|@\{.+?\})|(?=@\d+|@\{.+?\})/g)
                      .map((s: string) =>
                        /@\d+|@\{.+?\}/.test(s) ? (
                          <span {...term}>
                            {replaceEach(s, [
                              [/^@\{?/, ''],
                              [/\}$/, ''],
                            ])}
                          </span>
                        ) : (
                          s
                        )
                      )}{' '}
                  </td>
                )}
                <td className={formation !== Formation.Simplex ? 'code' : ''}>
                  {/^https?:\/\//.test(origin) ? (
                    <a href={origin}>
                      {decodeURI(origin).replace(/^https?:\/\//, '')}
                    </a>
                  ) : (
                    origin
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </section>

    <section>
      <h2>letter</h2>

      <div
        style={{
          inlineSize: 'fit-content',
          marginInline: 'auto',
        }}
      >
        <Letter>
          {[
            'K k T t P p',
            'C c D d B b',
            'X x S s F f',
            'H h Z z V v',
            'G g N n M m',
            '      j r    w',
            '      i I u U',
            '      e E o O',
            'A a',
          ].join('\n')}
        </Letter>
      </div>
    </section>
  </>
);
