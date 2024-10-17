import Main from "@/components/main";
import translate from "../konvert/translate";

export default function Usage() {
  return <Main title='用例'>
    <table>
      <tbody>
        <tr>
          <td>そっと耳を澄まして</td>
          <td>{translate('thou were care hear')}</td>
        </tr>
        <tr>
          <td>遠い遠い音樂</td>
          <td>{translate('done sing Acc far Acc far Acc')}</td>
        </tr>
        <tr>
          <td>君の乾いた胸に届くはず</td>
          <td>{translate('expect caseThat Acc he shall end to at who Acc breast thou Acc dry')}</td>
        </tr>
      </tbody>
    </table>
  </Main>
};