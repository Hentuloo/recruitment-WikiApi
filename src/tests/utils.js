import React from 'react';

import { ThemeProvider } from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

import mainTheme from 'themes/mainTheme';

export const renderWithThemes = ui => {
  // eslint-disable-next-line react/prop-types
  const utils = render(
    <ThemeProvider theme={mainTheme}>{ui}</ThemeProvider>,
  );

  return utils;
};
