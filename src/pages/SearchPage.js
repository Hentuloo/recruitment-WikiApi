import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import MainTemplate from 'templates/MainTemplate';
import Input from 'components/Input';
import Spiner from 'components/Spiner';
import * as Acordion from 'components/Accordion/';

import Countries from 'config/Countries';
import {
  getMostPollutedCites,
  getWikiDescriptionsByTitles,
} from 'config/Utils';

const Wrapper = styled.div`
  position: relative;
  width: 94%;
  max-width: 800px;
  min-height: 100vh;
  padding: 80px 0px 0px;
  margin: 0px auto;
  ${({ afterSearch }) =>
    afterSearch &&
    css`
      padding: 15px 0px 0px;
    `}
`;
const StyledSpiner = styled(Spiner)`
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.6;
`;
const AcordionWrapper = styled.div`
  margin: 20px 0px 60px;
`;

const SearchPage = () => {
  const [cities, setCities] = useState([
    // {
    // city: string,
    // description:string
    // }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCitiesWithDescriptions = async isoCode => {
    // Fetch most polluted cities and return
    setLoading(true);
    const fetchedCities = await getMostPollutedCites(
      isoCode,
      (err, data) => {
        if (err) setError(err);

        if (data) {
          return data.results.map(({ name }) => name);
        }

        setLoading(false);
        return null;
      },
    );

    // If there is data => fetch Wiki descriptions and return
    if (fetchedCities) {
      const citiesWithDescriptions = await getWikiDescriptionsByTitles(
        fetchedCities,
        (err, data) => {
          if (err) setError(err);

          if (data) {
            setLoading(false);
            return data.query.pages.map(({ title, extract }) => ({
              city: title,
              description: extract,
            }));
          }
          setLoading(false);
          return null;
        },
      );
      return citiesWithDescriptions;
    }

    setLoading(false);
    return false;
  };

  const handleSearch = async item => {
    if (!loading) {
      const { isoCode } = item;

      const data = await getCitiesWithDescriptions(isoCode);

      if (data) {
        setCities(data);
      }
    }
  };

  return (
    <MainTemplate>
      <Wrapper afterSearch={cities.length}>
        <Input
          items={Countries}
          placeholder="Szukaj miast w..."
          onSelect={handleSearch}
        />
        {loading && <StyledSpiner />}
        <AcordionWrapper>
          {cities.length > 0 && (
            <Acordion.Wrapper>
              {cities.map(({ city, description }) => (
                <Acordion.Section key={city} uniqueLabel={city}>
                  <Acordion.Title>{city}</Acordion.Title>
                  <Acordion.Content>{description}</Acordion.Content>
                </Acordion.Section>
              ))}
            </Acordion.Wrapper>
          )}

          {error && <span>{error}</span>}
        </AcordionWrapper>
      </Wrapper>
    </MainTemplate>
  );
};

export default SearchPage;
