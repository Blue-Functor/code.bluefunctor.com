import { createContext } from 'react';

const DefaultContext = createContext();

const { Provider } = DefaultContext;

export {
  Provider,
  DefaultContext,
};
