import React, { useReducer } from 'react';
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
  // https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&redirects=1&exintro=1&explaintext=1&titles=Krak%C3%B3w%7CWroc%C5%82aw
  const getCities = isoCode =>
    getMostPollutedCites(isoCode, (err, data) => {
      if (err) {
        return console.log(err);
      }
      return data.results.map(({ name }) => name);
    });

  const getCitiesDescriptions = citiesNames =>
    getWikiDescriptionsByTitles(citiesNames, (err, data) => {
      if (err) {
        return console.log(err);
      }
      const {
        query: { pages },
      } = data;

      return pages.map(({ title, extract }) => ({
        city: title,
        description: extract,
      }));
    });

  const handleSearch = async item => {
    const { isoCode } = item;
    const fetchedCities = await getCities(isoCode);
    const citiesWithDescriptions = await getCitiesDescriptions(
      fetchedCities,
    );
    setCities(citiesWithDescriptions);
  };

  console.log(cities);
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
      </Wrapper>
    </MainTemplate>
  );
};

export default SearchPage;
