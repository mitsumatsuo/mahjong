export const pad = (value: number): string => {
  return value < 10 ? "0" + value : String(value);
};

export const getToday = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};