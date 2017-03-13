// @flow
import React from 'react';
import JSONTree from '../../src';
import { Map } from 'immutable';
import { invertTheme } from 'react-base16-styling';
import solarized from '../../src/themes/solarized';

const getLabelStyle = ({ style }, nodeType, expanded) => ({
  style: {
    ...style,
    textTransform: expanded ? 'uppercase' : style.textTransform
  }
});

const getBoolStyle = ({ style }, nodeType) => ({
  style: {
    ...style,
    border: nodeType === 'Boolean' ? '1px solid #DD3333' : style.border,
    borderRadius: nodeType === 'Boolean' ? 3 : style.borderRadius
  }
});

const renderItemPreview = type => <span> // {type}</span>;

const getValueLabelStyle = ({ style }, nodeType, keyPath) => ({
  style: {
    ...style,
    color: !isNaN(keyPath[0]) && !(parseInt(keyPath, 10) % 2)
      ? '#33F'
      : style.color
  }
});

// eslint-disable-next-line max-len
const longString = 'Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.';

const data = {
  array: [1, 2, 3],
  emptyArray: [],
  bool: true,
  date: new Date(),
  error: new Error(longString),
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
  emptyObject: {},
  symbol: Symbol('value'),
  // eslint-disable-next-line new-cap
  immutable: Map([
    ['key', 'value'],
    [{ objectKey: 'value' }, { objectKey: 'value' }]
  ]),
  map: new window.Map([
    ['key', 'value'],
    [0, 'value'],
    [{ objectKey: 'value' }, { objectKey: 'value' }]
  ]),
  weakMap: new window.WeakMap([
    [{ objectKey: 'value' }, { objectKey: 'value' }]
  ]),
  set: new window.Set(['value', 0, { objectKey: 'value' }]),
  weakSet: new window.WeakSet([
    { objectKey: 'value1' },
    { objectKey: 'value2' }
  ]),
  hugeArray: Array.from({ length: 10000 }).map((_, i) => `item #${i}`),
  longString
};

const App = () => (
  <div>
    <JSONTree data={data} />
    <br />
    <h3>Dark Theme</h3>
    <JSONTree data={data} theme={invertTheme(solarized)} />
    <br />
    <h3>Hidden Root</h3>
    <JSONTree data={data} hideRoot />
    <br />
    <h3>Base16 Greenscreen Theme</h3>
    <JSONTree data={data} theme="greenscreen" />
    <h4>Inverted Theme</h4>
    <JSONTree data={data} theme="greenscreen" />
    <br />
    <h3>Style Customization</h3>
    <ul>
      <li>
        Label changes between uppercase/lowercase based on the expanded state.
      </li>
      <li>Array keys are styled based on their parity.</li>
      <li>
        The labels of objects, arrays, and iterables are customized as "// type".
      </li>
      <li>See code for details.</li>
    </ul>
    <div>
      <JSONTree
        data={data}
        theme={{
          extend: solarized,
          nestedNodeLabel: getLabelStyle,
          value: getBoolStyle,
          valueLabel: getValueLabelStyle
        }}
      >
        {{ renderItemPreview }}
      </JSONTree>
    </div>
    <h3>More Fine Grained Rendering</h3>
    <p>Pass <code>renderLabel</code> or <code>renderValue</code>.</p>
    <div>
      <JSONTree data={data}>
        {{
          renderLabel([raw]) {
            return <span>(({raw})):</span>;
          },
          renderValue(raw) {
            return <em>😐 {raw} 😐</em>;
          }
        }}
      </JSONTree>
    </div>
    <p>Sort object keys with <code>sortObjectKeys</code> prop.</p>
    <div>
      <JSONTree data={data} sortObjectKeys />
    </div>
    <p>Collapsed root node</p>
    <div>
      <JSONTree data={data} shouldExpandNode={() => false} />
    </div>
  </div>
);

export default App;
