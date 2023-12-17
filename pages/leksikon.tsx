import Layout from '@/components/layout';
import { dictionary, ipa, orthography } from '@/lib/dictionary'
import style from '@/styles/leksikon.module.sass'
import { useState } from 'react';

const Replace = ({ children, pattern, replacer }: { children: string, pattern: string | RegExp, replacer: Function }) =>
  children
    .replace(pattern, (it: string) => `\<\<\<REPLACE:${it}>>>`)
    .split(new RegExp(`(?=<<<REPLACE:.*?>>>)|(?<=<<<REPLACE:.*?>>>)`))
    .map((chunk: string) =>
      /^<<<REPLACE:.*?>>>$/.test(chunk)
        ? replacer(chunk.replace(/^<<<REPLACE:(.*?)>>>$/, '$1'))
        : chunk
    );

export const Signified = ({ datum }: { datum: string }) => <Replace
  pattern={/\$[012]( \(.+?\))?/g}
  replacer={(it: string) =>
    <span className={style.variable}>{it.replace(/^\$/, '')}</span>}
>
  {datum}
</Replace>;

export const Entry = ({ k }: { k: string }) => {
  const v = dictionary.get(k);
  if (v !== undefined) {
    const { signifier, signified, klass, etymology } = v;
    return <div className={style.entry}>
      <div>
        <span className='language' style={{ fontWeight: 'bold' }}>{orthography(signifier)}</span>
        {' '}[{ipa(signifier)}]
        {' '}<span style={{ opacity: .25 }} className='code'>{k}:{klass}</span>
      </div>
      <div style={{ marginLeft: '1em' }}>
        <Signified datum={signified} />
        {etymology && <div>{
          /^https?:/.test(etymology)
            ? <a href={etymology}>{etymology.replace(/^https?:\/\/.+\/([^#]+).*/, (_m, it: string) => decodeURIComponent(it))}</a>
            : etymology
        } より</div>}
      </div>
    </div>;
  } else
    return <>error</>
};

export default () => {
  const [query, setQuery] = useState('');

  return <Layout>
    <input style={{ width: '100%', outline: 'none' }} onChange={event => setQuery(event.target.value)} />

    <div className={style.list}>{
      Array.from(dictionary.entries()).map(([k, { signifier, klass, etymology, signified }]) =>
        [k, signifier, signified, etymology, klass].some(it => it && it.includes(query)) && <Entry k={k} />
      )
    }</div>
  </Layout >
};
