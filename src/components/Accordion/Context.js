import { createContext } from 'react';

export default createContext({
  activeSection: null,
  onChangeSection: () => {},
});
