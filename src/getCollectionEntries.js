function getLength(type, collection) {
  if (type === 'Object') {
    return Object.keys(collection).length;
  } else if (type === 'Array') {
    return collection.length;
  }

  return Infinity;
}

function isIterableMap(collection) {
  return typeof collection.set === 'function';
}

function getEntries(type, collection, from=0, to=Infinity) {
  let res;

  if (type === 'Object') {
    const keys = Object.keys(collection).slice(from, to + 1);

    res = {
      entries: keys.map(key => ({ key, value: collection[key] }))
    };
  } else if (type === 'Array') {
    res = {
      entries: collection.slice(from, to + 1).map((val, idx) => ({ key: idx + from, value: val }))
    };
  } else {
    let idx = 0;
    let entries = [];
    let done = true;

    let isMap = isIterableMap(collection);

    for (let item of collection) {
      if (idx > to) {
        done = false;
        break;
      } if (from <= idx) {
        if (isMap && Array.isArray(item)) {
          entries.push({ key: item[0], value: item[1] });
        } else {
          entries.push({ key: idx, value: item });
        }
      }
      idx++;
    }

    res = {
      hasMore: !done,
      entries
    };
  }

  return res;
}

function getRanges(from, to, limit) {
  const ranges = [];
  while (to - from > limit * limit) {
    limit = limit * limit;
  }
  for (let i = from; i <= to; i += limit) {
    ranges.push({ from: i, to: Math.min(to, i + limit - 1) });
  }

  return ranges;
}

export default function getCollectionEntries(type, collection, limit, from=0, to=Infinity) {
  if (!limit) {
    return getEntries(type, collection).entries;
  }
  const isSubset = to < Infinity;
  const length = Math.min(to - from, getLength(type, collection));

  if (type !== 'Iterable') {
    if (length <= limit || limit < 7) {
      return getEntries(type, collection, from, to).entries;
    }
  } else {
    if (length <= limit && !isSubset) {
      return getEntries(type, collection, from, to).entries;
    }
  }

  let limitedEntries;
  if (type === 'Iterable') {
    const { hasMore, entries } = getEntries(type, collection, from, from + limit - 1);

    limitedEntries = hasMore ? [
      ...entries,
      ...getRanges(from + limit, from + 2 * limit - 1, limit)
    ] : entries;
  } else {
    limitedEntries = isSubset ?
      getRanges(from, to, limit) :
      [
        ...getEntries(type, collection, 0, limit - 5).entries,
        ...getRanges(limit - 4, length - 5, limit),
        ...getEntries(type, collection, length - 4, length - 1).entries
      ];
  }

  return limitedEntries;
}
