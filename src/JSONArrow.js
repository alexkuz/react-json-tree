import React, { PropTypes } from 'react';

const JSONArrow = ({
  styling,
  arrowStyle,
  expanded,
  nodeType,
  onClick
}) => (
  <div
    {...styling('arrowContainer', arrowStyle)}
    onClick={onClick}
  >
    <div {...styling(['arrow', 'arrowSign'], nodeType, expanded)}>
      {arrowStyle === 'double' &&
        <div {...styling(['arrowSign', 'arrowSignInner'])} />
      }
    </div>
  </div>
);

JSONArrow.propTypes = {
  styling: PropTypes.func.isRequired,
  arrowStyle: PropTypes.oneOf(['single', 'double']),
  expanded: PropTypes.bool.isRequired,
  nodeType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

JSONArrow.defaultProps = {
  arrowStyle: 'single'
};

export default JSONArrow;
