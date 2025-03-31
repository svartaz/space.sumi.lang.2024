import { CSSProperties } from 'react';
import dic, { Formation, name, translate } from '../lib/lexicology';
import { invalid, toIpa } from '../lib/phonology';
import { replaceEach } from '../lib/common';
import { orthography } from '../lib/orthography';
import { Letter } from '../lib/letter';
import { toDayString } from '../lib/date';

const Target = ({ children }: { children: string }) =>
  true ? (
    <span className="target" title={children}>
      {orthography(children)}
    </span>
  ) : (
    <TargetLetter>{children}</TargetLetter>
  );

const TargetLetter = (props: {
  children: string;
  title?: string;
  style?: CSSProperties;
}) => (
  <Letter title={props.children} className="target" {...props}>
    {replaceEach(props.children.toLowerCase(), [
      [/[ktcdgnlriueoa]/g, (it) => it.toLowerCase()],
      [/h/g, 'x'],
      [/x/g, 'S'],
      [/j/g, 'Z'],
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
    <h1 style={{ textAlign: 'center' }}>
      <Target>{name}</Target>
    </h1>

    <div
      style={{
        inlineSize: 'fit-content',
        marginInline: 'auto',
      }}
    >
      <Target>{translate('language done make der called sumi')}</Target>
    </div>

    <section>
      <h2>phonology</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>velar</th>
            <th>palatal</th>
            <th>dental</th>
            <th>labial</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>nasal</th>
            <td>
              <span className="target">g</span>
              <> </>
              <span className="ipa">{toIpa('g').substring(0, 1)}</span>
            </td>
            <td></td>
            <td>
              <span className="target">n</span>
            </td>
            <td>
              <span className="target">m</span>
            </td>
          </tr>
          <tr>
            <th>plosive voiced</th>
            <td>
              <span className="target">c</span>
              <> </>
              <span className="ipa">{toIpa('c').substring(0, 1)}</span>
            </td>
            <td></td>
            <td>
              <span className="target">d</span>
            </td>
            <td>
              <span className="target">b</span>
            </td>
          </tr>
          <tr>
            <th>plosive unvoiced</th>
            <td>
              <span className="target">k</span>
            </td>
            <td></td>
            <td>
              <span className="target">t</span>
            </td>
            <td>
              <span className="target">p</span>
            </td>
          </tr>
          <tr>
            <th>fricative unvoiced</th>
            <td></td>
            <td>
              <span className="target">x</span>
              <> </>
              <span className="ipa">{toIpa('x').substring(0, 1)}</span>
            </td>
            <td>
              <span className="target">s</span>
            </td>
            <td>
              <span className="target">f</span>
            </td>
          </tr>
          <tr>
            <th>fricative voiced</th>
            <td></td>
            <td>
              <span className="target">j</span>
              <> </>
              <span className="ipa">{toIpa('j').substring(0, 1)}</span>
            </td>
            <td>
              <span className="target">z</span>
            </td>
            <td>
              <span className="target">v</span>
            </td>
          </tr>
          <tr>
            <th>approcsimant</th>
            <td></td>
            <td></td>
            <td>
              <span className="target">r</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <th>vowel non-mid</th>
            <td>
              <span className="target">a</span>
            </td>
            <td>
              <span className="target">i</span>
            </td>
            <td></td>
            <td>
              <span className="target">u</span>
            </td>
          </tr>
          <tr>
            <th>vowel mid</th>
            <td></td>
            <td>
              <span className="target">e</span>
            </td>
            <td></td>
            <td>
              <span className="target">o</span>
            </td>
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
            ['(someone) giveth (something) (to someone)', 'give'],
            ['(someone) giveth water (to someone)', 'give den water'],
            ['(someone) giveth water to a cat', 'give den water to cat'],
            ['a person giveth water to a cat', 'person give den water to cat'],
            [
              'a tall person giveth fresh water to a black cat',
              'person long give den water fresh to cat black',
            ],
            [
              'a person giving fresh water to a black cat is tall',
              'person give den water fresh to cat black then long',
            ],
            ['water given is fresh', 'water done give fresh'],
            [
              'water given by a person is fresh',
              'water done give der person then fresh',
            ],
            [
              '? water is given by a fresh person',
              'water done give der person fresh',
            ],
            [
              'water given to a cat by a person is fresh',
              'water done give der person to cat then fresh',
            ],
            [
              'a cat given water is black',
              'cat done to give den water then black',
            ],
            [
              'a cat given water by a person is black',
              'cat done to give der person den water then fresh',
            ],

            ['i am a cat', 'i cat'],
            ['i am not a cat', 'i not cat'],

            [
              'no person is loved by every person',
              'zero person done love der each person',
            ],
            [
              'for no person 𝑜, for any person 𝑠, 𝑠 loves 𝑜',
              'zero person _0 each person _1 , _1 love der _0',
            ],
          ].map(([en, code]) => (
            <table className="sample">
              <tbody>
                <tr>
                  <td>
                    {code.split(/(?<=\s+)|(?=\s+)/g).map((chunk, i, self) =>
                      dic.has(chunk) ? (
                        <ruby>
                          <ruby>
                            <span className="target">
                              {orthography(dic.get(chunk)?.token)}
                            </span>
                            <rt className="ipa">
                              {i === 0 ? '[' : ''}
                              {toIpa(dic.get(chunk)?.token)}
                              {i === self.length - 1 ? ']' : ''}
                            </rt>
                          </ruby>
                          <rt className="code">{chunk}</rt>
                        </ruby>
                      ) : (
                        chunk
                      )
                    )}
                  </td>
                  <td>{en}</td>
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
                    <tr>
                      <th style={{ textWrap: 'nowrap' }}>
                        {toDayString(new Date(date))}
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
                        className="code"
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
            </tbody>
          </table>
        );
      })()}

      <table className="dictionary">
        <thead className="h">
          <tr>
            <th></th>
            <th>token</th>
            <th>sound</th>
            <th>class</th>
            <th>tokened</th>
            <th>origin</th>
          </tr>
        </thead>
        <tbody>
          {[...dic.entries()].map(
            ([
              key,
              { token: token, tokened, c: klass, o: origin, formation },
            ]) => (
              <tr id={'entry-' + key}>
                <td className="code">{key}</td>
                <td>
                  <Target>{token}</Target>
                </td>
                <td>
                  <Ipa>{token}</Ipa>
                </td>
                <td>{klass}</td>
                {tokened.startsWith('=') ? (
                  <td>
                    =
                    <a href={'#entry-' + key.substring(1)}>
                      <Target>{translate(tokened.substring(1))}</Target>
                    </a>
                  </td>
                ) : (
                  <td>
                    {tokened
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
                <td style={{ fontSize: 'xx-small', color: 'red' }}>
                  {invalid(token)}
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
