import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import AccordionContext from './Context';

const ContentW = styled.p`
  display: block;
  height: 0px;
  border-radius: 0px 0px 10px 10px;
  font-size: ${({ theme }) => theme.fs.xxs};
  color: ${({ theme }) => theme.color.gray[1]};
  background-color: white;
  overflow: hidden;

  ${({ isOpen }) =>
    isOpen &&
    css`
      height: auto;
      min-height: 200px;
      max-height: 300px;
      padding: 10px;
      overflow-y: auto;
      ${({ theme }) => theme.mediaQuery.md} {
        max-height: 70vh;
      }
    `}
`;

const Content = ({ children, uniqueLabel }) => {
  const { activeSection } = useContext(AccordionContext);

  return (
    // <ContentW isOpen={uniqueLabel === activeSection}>
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
