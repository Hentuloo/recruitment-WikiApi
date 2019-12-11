import React, { useReducer, useState } from 'react';
import styled from 'styled-components';

import MainTemplate from 'templates/MainTemplate';
import Input from 'components/Input';

import Countries from 'config/Countries';
import {
  getMostPollutedCites,
  getWikiDescriptionsByTitles,
} from 'config/Utils';

const Wrapper = styled.div`
  width: 94%;
  max-width: 800px;
  margin: 80px auto 0px;
`;

const SearchPage = () => {
  const [cities, setCities] = useReducer(
    (state, newState) => [...state, ...newState],
    [
      // {
      // city: string,
      // description:string
      // }
    ],
  );
  const [error, setError] = useState(null);

  const getCities = isoCode =>
    getMostPollutedCites(isoCode, (err, data) => {
      if (err) {
        setError(err);
        return false;
      }
      if (data) {
        return data.results.map(({ name }) => name);
      }
      return false;
    });

  const getCitiesDescriptions = citiesNames =>
    getWikiDescriptionsByTitles(citiesNames, (err, data) => {
      if (err) {
        setError(err);
        return false;
      }
      if (data) {
        const {
          query: { pages },
        } = data;

        return pages.map(({ title, extract }) => ({
          city: title,
          description: extract,
        }));
      }
      return false;
    });

  const handleSearch = async item => {
    const { isoCode } = item;
    const fetchedCities = await getCities(isoCode);
    if (fetchedCities) {
      const citiesWithDescriptions = await getCitiesDescriptions(
        fetchedCities,
      );
      if (citiesWithDescriptions) {
        setCities(citiesWithDescriptions);
      }
    }
  };

  return (
    <MainTemplate>
      <Wrapper>
        <Input
          items={Countries}
          placeholder="Szukaj miast w..."
          onSelect={handleSearch}
        />
        {cities.length > 0 && (
          <main>
            {cities.map(({ city, description }) => (
              <section key={city}>
                <h3>{city}</h3>
                <p>{description}</p>
              </section>
            ))}
          </main>
        )}
        {error && <span>{error}</span>}
      </Wrapper>
    </MainTemplate>
  );
};

export default SearchPage;
