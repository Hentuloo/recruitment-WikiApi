import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Downshift from 'downshift';

const Wrapper = styled.div`
  position: relative;
`;
const InputField = styled.input`
  width: 100%;
  padding: 15px 55px 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fs.s};
  background-color: ${({ theme }) => theme.color.white};
`;

const ListWrapper = styled.ul`
  width: 100%;
  max-height: 170px;
  border-radius: 0px 0px 5px 5px;
  list-style: none;
  font-size: ${({ theme }) => theme.fs.s};
  background-color: ${({ theme }) => theme.color.white};
  overflow-y: auto;
  ${({ theme }) => theme.mediaQuery.sm} {
    max-height: 250px;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    max-height: 400px;
  }
`;

const ListElement = styled.li`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.primary[0]};
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.color.primary[0]};
    `}
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px ${({ theme }) => theme.color.gray[0]} solid;
  overflow: hidden;
  margin: 0px 20px;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ItemName = styled.span`
  text-transform: uppercase;
`;
const Icon = styled.span`
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: ${({ theme }) => theme.fs.m};
  cursor: pointer;
`;

const Input = ({
  items,
  placeholder,
  onSelect,
  withStorage,
  storageId,
}) => {
  const inputRef = useRef(null);
  const [inputState, changeInputState] = useState('');

  const handleChange = value => {
    const regex = /^[a-zA-Z\s]*$/;
    if (value === '' || (value && value.match(regex)))
      changeInputState(value);
  };

  useEffect(() => {
    const saveInputValue = () => {
      const { value } = inputRef.current;
      localStorage.setItem(storageId, value);
    };

    if (withStorage) {
      // Update input value
      changeInputState(
        localStorage.getItem(storageId)
          ? localStorage.getItem(storageId)
          : '',
      );
      // on refresh update localStorage
      window.addEventListener('beforeunload', saveInputValue);
    }

    return () => {
      if (withStorage) {
        window.removeEventListener('beforeunload', saveInputValue);
      }
    };
  }, []);

  return (
    <Downshift
      inputValue={inputState}
      onStateChange={({ inputValue: nextInputValue, type }) => {
        if (
          type === '__autocomplete_change_input__' ||
          type === '__autocomplete_click_item__' ||
          type === '__autocomplete_keydown_enter__' ||
          type === 11 ||
          type === 9 ||
          type === 6
        ) {
          handleChange(nextInputValue);
        }
        if (type === 5) {
          handleChange('');
        }
      }}
      itemToString={item => (item ? item.name : '')}
      onSelect={onSelect}
      defaultHighlightedIndex={0}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        openMenu,
        selectHighlightedItem,
      }) => (
        <div>
          <Wrapper>
            <InputField
              {...getInputProps({
                onFocus: openMenu,
                onKeyDown: e => {
                  e.persist();
                  if (e.key === 'Enter') selectHighlightedItem();
                },
              })}
              type="text"
              placeholder={placeholder}
              ref={inputRef}
            />
            {inputValue ? (
              <Icon
                className="fa fa-times"
                aria-hidden="true"
                onClick={() => changeInputState('')}
              />
            ) : (
              <Icon
                className="fa fa-search"
                aria-hidden="true"
                onClick={openMenu}
              />
            )}

            <ListWrapper {...getMenuProps()}>
              {isOpen
                ? items
                    .filter(
                      item =>
                        !inputValue ||
                        item.name
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()),
                    )
                    .splice(0, 4)
                    .map((item, index) => {
                      const { name, image } = item;
                      return (
                        <ListElement
                          active={index === 0 && inputValue !== ''}
                          key={name}
                          {...getItemProps({
                            key: name,
                            index,
                            item,
                          })}
                        >
                          {image && (
                            <ImageWrapper>
                              <img src={image} alt={name} />
                            </ImageWrapper>
                          )}

                          <ItemName>{name}</ItemName>
                        </ListElement>
                      );
                    })
                : null}
            </ListWrapper>
          </Wrapper>
        </div>
      )}
    </Downshift>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  withStorage: PropTypes.bool,
  storageId: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  ).isRequired,
};

Input.defaultProps = {
  placeholder: null,
  withStorage: false,
  storageId: '',
};

export default Input;
