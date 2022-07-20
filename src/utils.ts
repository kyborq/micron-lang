export const spaces = (count: number) => {
  return " ".repeat(count);
};

export const error = (pos: number, text: string) => {
  console.error(`${spaces(pos)}^ ${text}`);
};
