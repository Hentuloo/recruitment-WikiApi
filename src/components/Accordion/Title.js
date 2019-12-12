import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AccordionContext from './Context';

const Title = ({ children, uniqueLabel }) => {
  const { onChangeSection } = useContext(AccordionContext);

  return (
    <button
      type="button"
      onClick={() => onChangeSection(uniqueLabel)}
    >
      {children}
    </button>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  uniqueLabel: PropTypes.string,
};

Title.defaultProps = {
  uniqueLabel: null,
};

export default Title;
