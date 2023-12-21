import Layout from '@/components/layout';
import { dictionary } from '@/lib/dictionary'
import { compare, ipa, orthography } from '@/lib/orthography';
import style from '@/styles/leksikon.module.sass'
import { useState } from 'react';

export const Replace = ({ children, replaced, replacer }: { children: string, replaced: string | RegExp, replacer: Function }) =>
  children
    .replace(replaced, (it: string) => `\<\<\<REPLACE:${it}>>>`)
    .split(new RegExp(`(?=<<<REPLACE:.*?>>>)|(?<=<<<REPLACE:.*?>>>)`))
    .map((chunk: string) =>
      /^<<<REPLACE:.*?>>>$/.test(chunk)
        ? replacer(chunk.replace(/^<<<REPLACE:(.*?)>>>$/, '$1'))
        : chunk
    );

export const Signified = ({ datum }: { datum: string }) => <Replace
  replaced={/\$[012]( \(.+?\))?/g}
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
        <span className='language' style={{ fontWeight: 'bolder' }}>{orthography(signifier)}</span>
        {' '}[{ipa(signifier)}]
        {' '}<span className='faint code' style={{ fontSize: 'small' }} >{k}:{klass}</span>
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
      Array.from(dictionary.entries())
        .sort(([_k1, v0], [_k0, v1]) => compare(v0.signifier, v1.signifier))
        .map(([k, { signifier, klass, etymology, signified }]) =>
          [k, signifier, signified, etymology, klass].some(it => it && it.includes(query)) && <Entry k={k} />
        )
    }</div>
  </Layout >
};
