import Layout from '@/components/layout';
import { dictionary, search } from '@/lib/dictionary';

export default () => <Layout>
  制作者のための情報を纏めた頁なりて, 學習者には無用.

  <h3>單開音節詞</h3>
  <table>
    <tbody>{
      'g n m c d b q t p x k s f h j z v'.split(' ').map(c =>
        <tr>{
          'i e a o u'.split(' ').map(v => {
            const k = search(c + v)?.k
            return <td style={k ? { backgroundColor: '#0002' } : {}}>
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
        <td>{Array.from(dictionary.values()).filter(it => it.klass == 'Verb2').length}</td>
      </tr>
    </tbody>
  </table>
</Layout>;
