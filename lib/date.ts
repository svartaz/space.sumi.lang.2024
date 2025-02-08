export const toDay = (date: Date | null) => {
  date = date ?? new Date();

  const year = date.getFullYear();
  const day =
    (date.getTime() - new Date(`${year}-01-01`).getTime()) /
    1000 /
    60 /
    60 /
    24;

  return { year, day };
};

export const toDayString = (date: Date | null) => {
  const { year, day } = toDay(date);
  return `${year}/${day.toString().padStart(3, '0')}`;
};
