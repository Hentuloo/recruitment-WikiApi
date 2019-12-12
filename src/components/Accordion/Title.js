import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import AccordionContext from './Context';

const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 3px 0px;
  padding: 10px 15px;
  background-color: white;
  border: none;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fs.m};
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      margin: 3px 0px 0px;
      border-radius: 10px 10px 0px 0px;
    `}
`;
const Icon = styled.span`
  transform: rotate(-90deg);
  transition: transform 0.3s ease-out;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(0deg);
    `}
`;

const Title = ({ children, uniqueLabel }) => {
  const { onChangeSection, activeSection } = useContext(
    AccordionContext,
  );

  return (
    <Button
      type="button"
      isOpen={activeSection === uniqueLabel}
      onClick={() => onChangeSection(uniqueLabel)}
    >
      {children}
      <Icon
        isOpen={activeSection === uniqueLabel}
        className="fa fa-chevron-down"
        aria-hidden="true"
      />
    </Button>
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
