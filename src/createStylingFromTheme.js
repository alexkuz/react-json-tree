import solarized from './themes/solarized';
import { createStyling } from 'react-base16-styling';

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
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 2,
      marginRight: 0,
      fontSize: '0.90em',
      listStyle: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      backgroundColor: colors.BACKGROUND_COLOR
    },

    value: {
      paddingTop: 3,
      paddingBottom: 3,
      paddingRight: 0,
      marginLeft: 14,
      WebkitUserSelect: 'text',
      MozUserSelect: 'text',
      wordWrap: 'break-word',
      textIndent: -16,
      paddingLeft: 20,
      wordBreak: 'break-all'
    },

    label: {
      display: 'inline-block',
      color: colors.LABEL_COLOR
    },

    valueLabel: {
      marginRight: 5
    },

    valueText: ({ style }, nodeType) => ({
      style: {
        ...style,
        color: valueColorMap(colors)[nodeType]
      }
    }),

    itemRange: {
      marginBottom: 8,
      cursor: 'pointer',
      color: colors.LABEL_COLOR
    },

    arrow: ({ style }, nodeType, expanded) => ({
      style: {
        ...style,
        display: 'inline-block',
        marginLeft: 0,
        marginTop: 8,
        float: 'left',
        transition: '150ms',
        WebkitTransition: '150ms',
        MozTransition: '150ms',
        WebkitTransform: expanded ? 'rotateZ(0deg)' : 'rotateZ(-90deg)',
        MozTransform: expanded ? 'rotateZ(0deg)' : 'rotateZ(-90deg)',
        transform: expanded ? 'rotateZ(0deg)' : 'rotateZ(-90deg)',
        position: 'relative'
      }
    }),

    arrowContainer: ({ style }, arrowStyle) => ({
      style: {
        ...style,
        display: 'inline-block',
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: arrowStyle === 'double' ? 12 : 5,
        paddingLeft: arrowStyle === 'double' ? 12 : 5,
        cursor: 'pointer'
      }
    }),

    arrowSign: {
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTopWidth: 5,
      borderTopStyle: 'solid',
      borderTopColor: colors.ARROW_COLOR
    },

    arrowSignInner: {
      position: 'absolute',
      top: 0,
      left: -5
    },

    nestedNode: {
      position: 'relative',
      paddingTop: 3,
      paddingBottom: 3,
      marginLeft: 14
    },

    rootNode: {
      padding: 0,
      margin: 0
    },

    nestedNodeLabel: {
      margin: 0,
      padding: 0,
      cursor: 'pointer'
    },

    nestedNodeItemString: ({ style }, nodeType, expanded) => ({
      style: {
        ...style,
        cursor: 'default',
        color: expanded ? colors.ITEM_STRING_EXPANDED_COLOR : colors.ITEM_STRING_COLOR
      }
    }),

    nestedNodeItemType: {
      marginLeft: 5,
      marginRight: 5
    },

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

export default createStyling({
  getStylingFromBase16: getDefaultThemeStyling,
  defaultBase16: solarized
});
