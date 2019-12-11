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

  const getCitiesWithDescriptions = async isoCode => {
    // Fetch most polluted cities and return
    const fetchedCities = await getMostPollutedCites(
      isoCode,
      (err, data) => {
        if (err) setError(err);

        if (data) {
          return data.results.map(({ name }) => name);
        }

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
            return data.query.pages.map(({ title, extract }) => ({
              city: title,
              description: extract,
            }));
          }

          return null;
        },
      );
      return citiesWithDescriptions;
    }

    return false;
  };

  const handleSearch = async item => {
    const { isoCode } = item;

    const data = await getCitiesWithDescriptions(isoCode);

    if (data) {
      setCities(data);
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
