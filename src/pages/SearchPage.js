import React, { useEffect } from 'react';
import styled from 'styled-components';

import MainTemplate from 'templates/MainTemplate';
import Input from 'components/Input';

import Countries from 'config/Countries';
import { getMostPollutedCites } from 'config/Utils';

const Wrapper = styled.div`
  width: 94%;
  max-width: 800px;
  margin: 80px auto 0px;
`;

const SearchPage = () => {
  const handleSearch = ({ name }) => {
    console.log(name);
  };

  useEffect(() => {
    getMostPollutedCites('pl', (err, data) => {
      console.log(err);
      console.log(data);
    });
  });
  return (
    <MainTemplate>
      <Wrapper>
        <Input
          items={Countries}
          placeholder="Szukaj miast w..."
          onSelect={handleSearch}
        />
      </Wrapper>
    </MainTemplate>
  );
};

export default SearchPage;
