export const literals = `
const data = {
  bool: true,
  date: new Date(),
  undef: undefined,
  void: null,
  num: 12.34,
  text: "string",
  func: () => {},
  symbol: Symbol('value')
};

ReactDOM.render(
  <JSONTree data={data} />,
  mountNode
);
`.trim();

export const longString = `
const longString = 'Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.';

const data = {
  error: new Error(longString),
  longString
};

ReactDOM.render(
  <JSONTree data={data} />,
  mountNode
);
`.trim();

export const nested = `
const data = {
  object: {
    foo: {
      bar: 'baz',
      nested: {
        moreNested: {
          evenMoreNested: {
            veryNested: {
              insanelyNested: {
                ridiculouslyDeepValue: 'Hello'
              }
            }
          }
        }
      }
    },
    baz: undefined,
    func: function User() {}
  },
  hugeArray: Array.from({ length: 10000 }).map((_, i) => \`item #$\{i}\`)
};

ReactDOM.render(
  <JSONTree data={data} />,
  mountNode
);
`.trim();

export const iterables = `
const data = {
  map: new window.Map([
    ['key', 'value'],
    [0, 'value'],
    [{ objectKey: 'value' }, { objectKey: 'value' }]
  ]),
  set: new window.Set(['value', 0, { objectKey: 'value' }]),
  immutableMap: Immutable.Map([
    ['key', 'value'],
    [{ objectKey: 'value' }, { objectKey: 'value' }]
  ]),
  immutableSet: Immutable.Set(['value', 0, { objectKey: 'value' }]),
  weakMap: new window.WeakMap([
    [{ objectKey: 'value' }, { objectKey: 'value' }]
  ]),
  weakSet: new window.WeakSet([
    { objectKey: 'value1' },
    { objectKey: 'value2' }
  ])
};

ReactDOM.render(
  <JSONTree data={data} />,
  mountNode
);
`.trim();
