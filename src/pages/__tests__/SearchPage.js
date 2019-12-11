import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import axios from 'axios';

import SearchPage from 'pages/SearchPage';
import { renderWithThemes } from 'tests/utils';

jest.mock('axios');

beforeEach(() => {
  jest.resetModules();
});

const setup = () => {
  const utils = renderWithThemes(<SearchPage />);
  const input = utils.getByPlaceholderText('Szukaj miast w...');
  return {
    ...utils,
    input,
  };
};

describe('Search - page', () => {
  it('fetches and displays data', async () => {
    axios.get
      .mockResolvedValueOnce({
        data: {
          results: [
            {
              city: 'Warsaw',
              count: 378397,
              country: 'PL',
              locations: 13,
              name: 'Warsaw',
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          query: {
            pages: [
              {
                extract: 'Warsaw is the capital',
                ns: 0,
                pageid: 32908,
                title: 'Warsaw',
              },
            ],
          },
        },
      });

    const { input, getByText } = setup();
    fireEvent.change(input, { target: { value: 'Poland' } });

    // Click on list item and check fetch
    const listItem = getByText('Poland');
    expect(listItem).toBeInTheDocument();
    fireEvent.click(listItem);

    const fetchedData = await waitForElement(() =>
      getByText('Warsaw is the capital'),
    );

    expect(fetchedData).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(2);
  });
});
