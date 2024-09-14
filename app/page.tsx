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
        <th>識別子</th>
        <td>space.sumi.6004</td>
      </tr>
      <tr>
        <th>作者</th>
        <td><a href='sumi.space'>sumi.space</a></td>
      </tr>
      <tr>
        <th>作成時</th>
        <td><Day>2023-12-17</Day></td>
      </tr>
      <tr>
        <th>分類</th>
        <td>計劃言語</td>
      </tr>
      <tr>
        <th>語族</th>
        <td><a href='https://iso639-3.sil.org/code/gem'>Gem</a></td>
      </tr>
      <tr>
        <th>參考言語</th>
        <td>
          <ul>
            <li>Jbo (述語論理的な統語)</li>
            <li>La (押韻的な曲用)</li>
            <li><a href='https://en.wikipedia.org/wiki/Proto-Germanic_language'>Gem</a>, De, En, Is (詞彙)</li>
            <li>Zh (動詞の前置詞化)</li>
            <li>Ru, Ja (音韻)</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</Main>;