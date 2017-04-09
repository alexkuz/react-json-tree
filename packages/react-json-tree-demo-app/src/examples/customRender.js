export const hiddenRoot = `
const data = {
  bool: true,
  date: new Date(),
  undef: undefined,
  array: [1, 2, 3]
};

ReactDOM.render(
  <JSONTree data={data} hideRoot />,
  mountNode
);
`.trim();

export const customRenderers = `
const data = {
  bool: true,
  date: new Date(),
  undef: undefined,
  array: [1, 2, 3]
};

const renderers = {
  renderLabel: keyPath => <span>(({keyPath[0]})):</span>,
  renderValue: (raw, value) => (
    <span>
      {raw}
      <span
        onClick={() => alert('Value: ' + JSON.stringify(value))}
        style={{ marginLeft: 15, cursor: 'pointer' }}
      >
        📢
      </span>
    </span>
  ),
  renderItemPreview: type => <span> // {type}</span>
};

ReactDOM.render(
  <JSONTree data={data}>
    {renderers}
  </JSONTree>,
  mountNode
);
`.trim();
