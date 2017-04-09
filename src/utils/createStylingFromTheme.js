// @flow
import { createStyling } from 'react-base16-styling';
import jsontree from '../themes/jsontree';

const colorMap = theme => ({
  BACKGROUND_COLOR: theme.base00,
  TEXT_COLOR: theme.base07,
  STRING_COLOR: theme.base0B,
  DATE_COLOR: theme.base0B,
  NUMBER_COLOR: theme.base09,
  BOOLEAN_COLOR: theme.base09,
  NULL_COLOR: theme.base08,
  UNDEFINED_COLOR: theme.base08,
  FUNCTION_COLOR: theme.base08,
  SYMBOL_COLOR: theme.base08,
  LABEL_COLOR: theme.base0D,
  ARROW_COLOR: theme.base0D,
  ITEM_STRING_COLOR: theme.base0B,
  ITEM_STRING_EXPANDED_COLOR: theme.base03
});

const valueColorMap = colors => ({
  String: colors.STRING_COLOR,
  Date: colors.DATE_COLOR,
  Number: colors.NUMBER_COLOR,
  Boolean: colors.BOOLEAN_COLOR,
  Null: colors.NULL_COLOR,
  Undefined: colors.UNDEFINED_COLOR,
  Function: colors.FUNCTION_COLOR,
  Symbol: colors.SYMBOL_COLOR
});

const getDefaultThemeStyling = theme => {
  const colors = colorMap(theme);

  return {
    tree: {
      border: 0,
      padding: 0,
      margin: 0,
      listStyle: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      fontFamily: 'inconsolata, monospace'
    },

    treeColor: {
      backgroundColor: colors.BACKGROUND_COLOR
    },

    value: ({ style }, nodeType, keyPath) => ({
      style: {
        ...style,
        paddingTop: '0.25em',
        paddingLeft: keyPath.length > 1 ? '2.125em' : '1.25em',
        paddingRight: 0,
        marginLeft: '0.875em',
        WebkitUserSelect: 'text',
        MozUserSelect: 'text',
        wordWrap: 'break-word',
        textIndent: '-0.5em',
        wordBreak: 'break-all',
        whiteSpace: 'pre-wrap'
      }
    }),

    label: {
      display: 'inline-block'
    },

    labelColor: {
      color: colors.LABEL_COLOR
    },

    valueLabel: {
      margin: '0 0.5em 0 0'
    },

    valueTextColor: ({ style }, nodeType) => ({
      style: {
        ...style,
        color: valueColorMap(colors)[nodeType]
      }
    }),

    itemRange: ({ style }, expanded) => ({
      style: {
        ...style,
        paddingTop: expanded ? 0 : '0.25em',
        cursor: 'pointer'
      }
    }),

    itemRangeColor: {
      color: colors.LABEL_COLOR
    },

    arrow: ({ style }, nodeType, expanded) => ({
      style: {
        ...style,
        marginLeft: 0,
        transition: '150ms',
        WebkitTransition: '150ms',
        MozTransition: '150ms',
        WebkitTransform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
        MozTransform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
        transform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
        transformOrigin: '45% 50%',
        WebkitTransformOrigin: '45% 50%',
        MozTransformOrigin: '45% 50%',
        position: 'relative',
        lineHeight: '1.1em',
        fontSize: '0.75em'
      }
    }),

    arrowInner: {
      position: 'absolute',
      top: 0,
      left: '-0.4em'
    },

    arrowContainer: ({ style }, arrowStyle) => ({
      style: {
        ...style,
        display: 'inline-block',
        paddingRight: '0.5em',
        paddingLeft: arrowStyle === 'double' ? '1em' : 0,
        cursor: 'pointer'
      }
    }),

    arrowSignColor: {
      color: colors.ARROW_COLOR
    },

    nestedNode: ({ style }, keyPath, nodeType, expanded, expandable) => ({
      style: {
        ...style,
        position: 'relative',
        paddingTop: keyPath.length > 1 ? '0.25em' : 0,
        marginLeft: keyPath.length > 1 ? '0.875em' : 0,
        paddingLeft: !expandable ? '1.125em' : 0
      }
    }),

    rootNode: {
      padding: 0,
      margin: 0
    },

    nestedNodeLabel: ({ style }, keyPath, nodeType, expanded, expandable) => ({
      style: {
        ...style,
        margin: 0,
        padding: 0,
        WebkitUserSelect: expandable ? 'inherit' : 'text',
        MozUserSelect: expandable ? 'inherit' : 'text',
        cursor: expandable ? 'pointer' : 'default'
      }
    }),

    nestedNodeItemPreview: {
      paddingLeft: '0.5em',
      cursor: 'default'
    },

    nestedNodeItemPreviewColor: ({ style }, keyPath, nodeType, expanded) => ({
      style: {
        ...style,
        color: expanded
          ? colors.ITEM_STRING_EXPANDED_COLOR
          : colors.ITEM_STRING_COLOR
      }
    }),

    nestedNodeChildren: ({ style }, nodeType, expanded) => ({
      style: {
        ...style,
        padding: 0,
        margin: 0,
        listStyle: 'none',
        display: expanded ? 'block' : 'none'
      }
    }),

    rootNodeChildren: {
      padding: 0,
      margin: 0,
      listStyle: 'none'
    }
  };
};

export default createStyling(getDefaultThemeStyling, {
  defaultBase16: jsontree,
  base16Themes: { jsontree }
});
