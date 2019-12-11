import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Input from 'components/Input';
import Countries from 'config/Countries';
import { renderWithThemes } from 'tests/utils';

const setup = () => {
  const utils = renderWithThemes(
    <Input
      items={Countries}
      placeholder="find"
      onSelect={() => {}}
    />,
  );
  const input = utils.getByPlaceholderText(/find/i);
  return {
    ...utils,
    input,
  };
};

describe('Search input component', () => {
  it('render', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });
  it('only alphabetic characters with spaces', () => {
    const { input } = setup();

    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'simple words' } });
    expect(input).toHaveValue('simple words');

    fireEvent.change(input, {
      target: { value: 'simple words1233 4' },
    });
    expect(input).toHaveValue('simple words');
  });
  it('autocomplete options', () => {
    const { input, container } = setup();

    fireEvent.change(input, { target: { value: 'pol' } });
    expect(container).toHaveTextContent(/poland/i);
    fireEvent.change(input, { target: { value: 'poland nice' } });
    expect(container).not.toHaveTextContent(/poland/i);
  });
});
