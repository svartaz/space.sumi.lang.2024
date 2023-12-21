import Layout from '@/components/layout';

export default () => <Layout>
  <h3>履歴</h3>
  <table>
    <thead>
      <tr>
        <th>日時</th>
        <th>更新</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td>制作中</td>
      </tr>
    </tbody>
  </table>

  <h3>注意</h3>
  <ul>
    <li>字母を<a href='https://unicode.org/iso15924/iso15924-codes.html'>ISO 15924</a>, 言語を<a href='https://en.wikipedia.org/wiki/List_of_ISO_639-3_codes'>ISO 639-3</a>にて指す.</li>
    <li>大小の別を持つ字母にて文頭を大文字にせず. 省略せられぬる詞の頭を大文字とする.</li>
    <li>對象言語を書くに斜體を用ゐる.</li>
    <li>Jpnは文語を基本とするが, 口語の要素をも含み非標準的に使ふ.</li>
    <ul>
      <li>‹が› を主格に使ふ.</li>
      <li>{'{k, sik}'}活用をi活用に統合する.</li>
      <li>{'{n, r}'}變格活用を子音幹活用に統合する.</li>
      <li>終止形を連體形に統合する.</li>
      <li>存續を ‹たる›, 完了を ‹ぬる›, 過去を ‹ける› が示す.</li>
    </ul>
  </ul>
</Layout>;
