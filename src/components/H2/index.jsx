import React from 'react';
import PropTypes from 'prop-types';

import './H2.scss';

const H2 = props => (
  <h2 className={props.className}>
    {props.children}
  </h2>
);

H2.defaultProps = {
  className: null,
};

H2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default H2;
