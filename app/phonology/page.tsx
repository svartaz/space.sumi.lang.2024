import Main from "@/components/main";
import Font from "../../components/font";
import FontCustom from "../font-custom";
import { ipa } from "@/lib/sundry";
import { Faint } from "@/components/faint";


export default function Phonology() {
  const triple = (a: string, unused?: boolean) =>
    <>{a} {a === ipa(a) ? '' : <> <Faint>[{ipa(a)}]</Faint></>} <br /><FontCustom>{a}</FontCustom></>

  return <Main title='音素と字素'>
    <ul>
      <li>音素と字素は一致する (eqPhGr)</li>
      <li>字素を下の表に示す</li>
      <li>字素に一致する國際音聲記號を省略する</li>
    </ul>

    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th>軟口蓋</th>
          <th>硬口蓋</th>
          <th colSpan={2} style={{ textAlign: 'end' }}>齒</th>
          <th>脣</th>
        </tr>
      </thead>
      <tbody className='c'>
        <tr>
          <th rowSpan={6}>子</th>
          <th rowSpan={2}>有聲</th>
          <th>鼻</th>
          <td>{triple('g')}</td>
          <td style={{ opacity: .2 }}><br /><Font>N</Font></td>
          <td colSpan={2}>{triple('n')}</td>
          <td>{triple('m')}</td>
        </tr>
        <tr>
          <th rowSpan={2}>破裂</th>
          <td>{triple('c')}</td>
          <td style={{ opacity: .2 }}><br /><Font>D</Font></td>
          <td colSpan={2}>{triple('d')}</td>
          <td>{triple('b')}</td>
        </tr>
        <tr>
          <th rowSpan={2}>無聲</th>
          <td>{triple('q')}</td>
          <td>{triple('k')}</td>
          <td colSpan={2}>{triple('t')}</td>
          <td>{triple('p')}</td>
        </tr>
        <tr>
          <th rowSpan={2}>摩擦</th>
          <td>{triple('h')}</td>
          <td>{triple('x')}</td>
          <td colSpan={2}>{triple('s')}</td>
          <td>{triple('f')}</td>
        </tr>
        <tr>
          <th rowSpan={4}>有聲</th>
          <td style={{ opacity: .2 }}><br /><Font>h</Font></td>
          <td>{triple('j')}</td>
          <td colSpan={2}>{triple('z')}</td>
          <td>{triple('v')}</td>
        </tr>
        <tr>
          <th>接近</th>
          <td style={{ opacity: .2 }}><br /><FontCustom>◌</FontCustom></td>
          <td style={{ opacity: .2 }}><br /><Font>j</Font></td>
          <td>{triple('r')}</td>
          <td>{triple('l')}</td>
          <td style={{ opacity: .2 }}><br /><FontCustom>w</FontCustom></td>
        </tr>
        <tr>
          <th rowSpan={2}>母</th>
          <th>開閉</th>
          <td>{triple('a')}</td>
          <td>{triple('i')}</td>
          <td style={{ opacity: .2 }} colSpan={2}><br /><Font>y</Font></td>
          <td>{triple('u')}</td>
        </tr>
        <tr>
          <th>中</th>
          <td style={{ opacity: .2 }}><br /><Font>E</Font></td>
          <td>{triple('e')}</td>
          <td style={{ opacity: .2 }} colSpan={2}><br /><Font>O</Font></td>
          <td>{triple('o')}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr style={{ textAlign: 'start' }}>
          <th></th>
          <th></th>
          <th></th>
          <th>央</th>
          <th>前</th>
          <th colSpan={2}></th>
          <th>後</th>
        </tr>
      </tfoot>
    </table>
  </Main>
};