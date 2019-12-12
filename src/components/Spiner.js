import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const jump = keyframes` 
to{
    transform: translateY(-20px)
  }
`;

const Circle = styled.div`
  position: absolute;
  width: 40px;
  min-height: 40px;
  background-color: black;
  border-radius: 50%;
  animation: ${jump} 0.6s ease-in-out infinite alternate both;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 150px;
  min-height: 40px;

  ${Circle}:nth-of-type(1) {
    left: 0px;
    animation-delay: 0s;
  }
  ${Circle}:nth-of-type(2) {
    left: calc(50% - 20px);
    animation-delay: 0.2s;
  }
  ${Circle}:nth-of-type(3) {
    right: 0px;
    animation-delay: 0.4s;
  }
`;

const Spiner = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Circle />
      <Circle />
      <Circle />
    </Wrapper>
  );
};

Spiner.propTypes = {
  className: PropTypes.string,
};
Spiner.defaultProps = {
  className: '',
};

export default Spiner;
