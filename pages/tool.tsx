import Layout from '@/components/layout';
import { dictionary, search } from '@/lib/dictionary';

export default () => <Layout>
  制作者のための情報を纏めた頁りて, 學習者には無用.

  <h3>單開音節詞</h3>
  <table>
    <tbody>{
      'l r g n m c d b q t p x k s f j z v'.split(' ').map(c =>
        <tr>{
          'i e a o u'.split(' ').map(v => {
            const kv = search(c + v);
            const k = kv?.k
            return <td style={k ? {
              backgroundColor:
                'zero one two three four five six seven eight nine ten eleven'.split(' ').includes(k || '')
                  ? '#F008'
                  : 'i thou who an the'.split(' ').includes(k || '')
                    ? '#0F08'
                    : 'must may _begin _while _end'.split(' ').includes(k || '')
                      ? '#00F8'
                      : 'what that _ask'.split(' ').includes(k || '')
                        ? '#FF08'
                        : 'not and or iff regardless'.split(' ').includes(k || '')
                          ? '#F0F8'
                          : 'set0 set1 set2 _set'.split(' ').includes(k || '')
                            ? '#0FF8'
                            : 'swap0 swap1 swap2 _swap'.split(' ').includes(k || '')
                              ? '#8228'
                              : '_open _close _quote'.split(' ').includes(k || '')
                                ? '#2828'
                                : '#0001'
            } : {}}>
              <span className='language'>{c + v}</span> <span className='code'>{k}</span>
            </td>
          })
        }</tr>
      )
    }</tbody>
  </table>

  <h3>詞數</h3>
  <table>
    <tbody>
      <tr>
        <th>全</th>
        <td>{dictionary.size}</td>
      </tr>
      <tr>
        <th>Verb</th>
        <td>{Array.from(dictionary.values()).filter(it => /^Verb[012]?$/.test(it.klass)).length}</td>
      </tr>
      <tr>
        <th>Verb0</th>
        <td>{Array.from(dictionary.values()).filter(it => it.klass == 'Verb0').length}</td>
      </tr>
      <tr>
        <th>Verb1</th>
        <td>{Array.from(dictionary.values()).filter(it => it.klass == 'Verb1').length}</td>
      </tr>
      <tr>
        <th>Verb2</th>
        <td>{Array.from(dictionary.values()).filter(it => it.klass == 'Verb8').length}</td>
      </tr>
    </tbody>
  </table>
</Layout >;
