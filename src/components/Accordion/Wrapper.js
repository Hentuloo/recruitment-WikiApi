import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AccordionContext from './Context';

const WrapperW = styled.div``;

const Wrapper = ({ children }) => {
  const [activeSection, setActiveSection] = useState(null);

  const onChangeSection = uniqueLabel => {
    if (activeSection === uniqueLabel) {
      setActiveSection(null);
      return null;
    }
    setActiveSection(uniqueLabel);
    return null;
  };

  const contextValue = {
    activeSection,
    onChangeSection,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <WrapperW>{children}</WrapperW>
    </AccordionContext.Provider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
