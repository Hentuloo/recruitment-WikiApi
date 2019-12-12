import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import AccordionContext from './Context';

const ContentW = styled.p`
  display: block;
  background-color: white;
  height: 0px;
  overflow: hidden;
  ${({ isOpen }) =>
    isOpen &&
    css`
      height: auto;
      max-height: 300px;
      overflow-y: auto;
    `}
`;

const Content = ({ children, uniqueLabel }) => {
  const { activeSection } = useContext(AccordionContext);

  return (
    <ContentW isOpen={uniqueLabel === activeSection}>
      {children}
    </ContentW>
  );
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
  uniqueLabel: PropTypes.string,
};

Content.defaultProps = {
  uniqueLabel: null,
};

export default Content;
