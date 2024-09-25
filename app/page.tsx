import Main from "@/components/main";
import { name } from "./leksikon/dict";
import Day from "@/components/day";
import { getIpa } from "./phonology/page";

export default () => <Main title={name}>
  <table>
    <tbody>
      <tr>
        <th>名稱</th>
        <td>{name} [{getIpa(name)}]</td>
      </tr>
      <tr>
        <th>ISO 639-3互換</th>
        <td>tvg</td>
      </tr>
      <tr>
        <th>作成者</th>
        <td><a href='https://2.sumi.space'>sumi.space</a></td>
      </tr>
      <tr>
        <th>作成開始時</th>
        <td><Day>2023-12-17</Day></td>
      </tr>
      <tr>
        <th>分類</th>
        <td>計劃言語, 後驗的詞彙, SVO, NA</td>
      </tr>
      <tr>
        <th>參考言語</th>
        <td style={{ padding: '1ex' }}>
          <table style={{ margin: 0, inlineSize: '100%' }}>
            <tbody>
              <tr>
                <th>Jbo</th>
                <td>述語論理的な句法</td>
              </tr>
              <tr>
                <th>Lat</th>
                <td>格の一致が押韻を形成する</td>
              </tr>
              <tr>
                <th><a href='https://en.wikipedia.org/wiki/Proto-Germanic_language'>Gem</a> (Deu, Eng, Icl)</th>
                <td>詞彙</td>
              </tr>
              <tr>
                <th>Zho</th>
                <td>動詞の前置詞化</td>
              </tr>
              <tr>
                <th>Fra, Rus</th>
                <td>音韻</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</Main>;