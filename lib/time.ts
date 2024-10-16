const gcd = (a, b) =>
  a < b ? gcd(a, b - a)
    : b < a ? gcd(a - b, b)
      : a;

export const getIsLeap = (year: number) =>
  (0 === year % 4) && (0 !== year % 100) || (0 === year % 400);

export const getDaysPerYear = (year: number) =>
  getIsLeap(year) ? 366 : 365;

export const getIsDst = (d: Date): boolean => {
  const mon0 = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
  const mon6 = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
  return Math.max(mon0, mon6) !== d.getTimezoneOffset();
};

export const dateSumi = (d: Date) => {
  const d0 = new Date('1970-01-01T00:00:00');
  const getIsLeap = year => (year % 4 == 0) && (year % 128 != 0)

  let year = d0.getFullYear();
  let sec = (d.getTime() - d0.getTime()) / 1000;
  for (; year++;) {
    const secPerYear = getDaysPerYear(year) * 24 * 60 * 60;

    if (secPerYear <= sec) {
      sec -= secPerYear;
      continue;
    }
    else
      break;
  }

  return {
    year,
    day: sec / 60 / 60 / 24,
    isLeap: getIsLeap(year)
  };
}

export const fromDate = (d: Date | null) => {
  d = d || new Date();
  const isDst = getIsDst(d);
  const year = d.getFullYear();
  const isLeap = getIsLeap(year);
  const zone = d.getTimezoneOffset() + (isDst ? 60 : 0);
  const day = (d.getTime() - new Date(year, 0, 1).getTime()) / 1000 / 60 / 60 / 24;

  const commonFactor = gcd(Math.abs(zone), 24 * 60);

  return {
    isLeap,
    daysPerYear: getDaysPerYear(year),
    zoneOver: zone / commonFactor,
    zoneUnder: 24 * 60 / commonFactor,
    zoneOver96: zone * 96 / 1440,
    isDst,
    year,
    day,
    unix: (d.getTime() - new Date('1970-01-01T00:00Z').getTime()) / (24 * 60 * 60 * 1000),
    text: `${year}D${Math.floor(day)}`
  };
};

export const toDate = (year, day) =>
  new Date(year, 0, 1, 0, 0, 0, day * 24 * 60 * 60 * 1000)
