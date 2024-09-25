'use client';

import { useEffect, useState } from 'react';
import { fromDate } from '@/lib/time';

export default () => {
  const [time, setTime] = useState(fromDate(null));
  useEffect(() => {
    const id = setInterval(() => setTime(fromDate(null)), 24 * 60 * 60 / 1_000);
    return () => clearInterval(id);
  });

  const day = ('000' + time.day.toString() + '000000').replace(/^.*(.{3}\..{6}).*$/, '$1');
  const zone = (0 <= time.zoneOver ? '+' : '') + time.zoneOver.toString() + '/' + time.zoneUnder.toString();

  return <div className='clock-text' style={{ inlineSize: 'fit-content', blockSize: 'fit-content', marginInlineEnd: 'auto', fontSize: 'smaller', whiteSpace: 'pre-wrap' }}>
    {`${time.year}D${day}${zone}`.replace('D', '\nD')}
  </div>;
}