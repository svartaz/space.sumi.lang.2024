import Layout from '@/components/layout';
import { language, translate } from '@/lib/dictionary';

export default () => <Layout>
  <table>
    <thead>
      <tr>
        <th>Jpn</th>
        <th>{language}</th>
      </tr>
    </thead>
    <tbody>{
      [
        ['すべての人間は, 生れながらにして自由であり, かつ, 尊嚴と權利とについて平等である. 人間は, 理性と良心とを授けられてをり, 互ひに同胞の精神をもって行動しなければならない.',
          'FREE EACH MAN'],
      ].map(([jpn, code]) => <tr>
        <td>{jpn}</td>
        <td className='language'>{translate(code)}</td>
      </tr>)
    }</tbody>
  </table>
</Layout >;
