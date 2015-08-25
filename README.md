# react-json-tree

React JSON Viewer Component, Extracted from [redux-devtools](https://github.com/gaearon/redux-devtools)

![](https://img.shields.io/npm/v/react-json-tree.svg)

### Usage

```js
import JSONTree from 'react-json-tree'

// Inside a React component:
const json = {
  array: [1, 2, 3],
  bool: true,
  object: {
    foo: 'bar'
  }  
}

<JSONTree data={ json } />
```

Result:

![](http://cl.ly/image/0P2j2n0n3Y24/screenshot%202015-08-24%20at%207.37.18%20PM.png)

### Credits

- All credits to [Dave Vedder](http://www.eskimospy.com/) ([veddermatic@gmail.com](mailto:veddermatic@gmail.com)), who wrote the original code as [JSONViewer](https://bitbucket.org/davevedder/react-json-viewer/).
- Extracted from [redux-devtools](https://github.com/gaearon/redux-devtools), which contained ES6 + inline style port of [JSONViewer](https://bitbucket.org/davevedder/react-json-viewer/) by [Daniele Zannotti](http://www.github.com/dzannotti) ([dzannotti@me.com](mailto:dzannotti@me.com))
- npm package created by [Shu Uesugi](http://github.com/chibicode) ([shu@chibicode.com](mailto:shu@chibicode.com)) per [this issue](https://github.com/gaearon/redux-devtools/issues/85).

### License

MIT
