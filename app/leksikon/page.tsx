'use client';

import Day from "@/components/day";
import Main from "@/components/main";
import { fromDate } from "@/lib/time";
import dict from "../dict";
import FontCustom from "../font-custom";
import { ipa } from "@/lib/sundry";
import { Faint } from "@/components/faint";

export default function Leksikon() {
  return <Main title='詞彙'>
    {(() => {
      const dates: number[] = [...dict.values()]
        .map(v => new Date(v.date).getTime())
        .sort();

      const acc = {};
      for (const date of dates)
        if (!(date in acc))
          acc[date] = dates.filter(d => d <= date).length

      const today = new Date().getTime();
      acc[today] = dates.length;

      const start = dates[0];
      const interval = today - start;

      const n = dates.length;

      return <svg xmlns='http://www.w3.org/2000/svg' viewBox='-.75 -.25 3.5 1.5' style={{ marginInline: 'auto', inlineSize: 360, flexShrink: '0' }}>
        <path
          fill='currentColor'
          transform='scale(2,1)'
          d={
            (Object.entries(acc) as [string, number][]).map(([d, current], i, self) =>
              `${i === 0 ? 'M' : 'L'} ${current / n} ${(parseInt(d) - start) / interval}`
              + (i < self.length - 1 ? `L${current / n} ${(parseInt(self[i + 1][0]) - start) / interval}` : '')
            ).join('') + 'L0 1L0 0Z'
          } />

        <rect
          fill='currentColor'
          x='0' y='0' width='2' height='1' opacity={1 / 8} />

        <g fontSize='.125' fill='currentColor'>
          <text textAnchor='end' alignmentBaseline='hanging' x={-1 / 64} y='0'>{fromDate(new Date(start)).text}</text>
          <text textAnchor='end' x={-1 / 64} y='1'>{fromDate(new Date(today)).text}</text>

          <text textAnchor='end' alignmentBaseline='baseline' x={acc[start] / n * 2} y={-1 / 64}>{acc[start]}</text>
          <text textAnchor='end' alignmentBaseline='hanging' x='2' y={1 + 1 / 64}>{n}</text>
        </g>
      </svg>
    })()}

    <table>
      <thead className='h'>
        <tr>
          <th></th>
          <th>signifier</th>
          <th>signified</th>
          <th>etymology</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {
          Array.from(dict.entries()).map(([k, { signifier, signified, etym, date }], i) => {
            const path = signified.split('/');
            const category = path.slice(0, -1).join('/');
            signified = path.slice(-1)[0];
            return <tr key={i}>
              <th><FontCustom>{signifier}</FontCustom></th>
              <td>{signifier}{signifier === ipa(signifier) ? '' : <> <Faint>[{ipa(signifier)}]</Faint></>}</td>
              <td><Faint>{category}/</Faint>{signified}</td>
              <td>{
                /^https?:\/\//.test(etym)
                  ? <a href={etym} style={{ whiteSpace: 'pre' }}>{decodeURIComponent(etym).replace(/^.+\/(.+)/, '$1').replace(/#.+$/, '')}</a>
                  : etym
              }</td>
              <td style={{ fontSize: 'smaller' }}><Day style={{ whiteSpace: 'pre' }}>{date}</Day></td>
            </tr>
          })
        }
      </tbody>
    </table>
  </Main >
};