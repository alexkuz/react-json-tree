export default function objType(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  if (type === 'Object') {
    try {
      if (typeof obj.forEach === 'function') return 'Iterable';
    } catch (e) { /* Don't throw */ }
  }

  return type;
}
