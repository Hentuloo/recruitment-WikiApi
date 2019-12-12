import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

const Section = ({ children, uniqueLabel }) => {
  const childrenWithLabel = children.map((child, index) =>
    cloneElement(child, { uniqueLabel, key: index }),
  );

  return <section>{childrenWithLabel}</section>;
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  uniqueLabel: PropTypes.string.isRequired,
};

export default Section;
