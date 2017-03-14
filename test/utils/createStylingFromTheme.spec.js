// @flow
import test from 'ava';

import createStylingFromTheme from '../../src/utils/createStylingFromTheme';

test('should create default styling', t => {
  const defaultStyling = createStylingFromTheme(undefined);
  t.deepEqual(defaultStyling('label'), { style: { display: 'inline-block' } });
});

test('should create custom styling', t => {
  const customStyling = createStylingFromTheme({
    labelColor: { color: 'red' }
  });
  t.deepEqual(customStyling('labelColor'), { style: { color: 'red' } });
});
