export const invertedTheme = `
const data = {
  bool: true,
  date: new Date(),
  undef: undefined,
  array: [1, 2, 3]
};

ReactDOM.render(
  <JSONTree data={data} theme="jsontree:inverted" />,
  mountNode
);
`.trim();
