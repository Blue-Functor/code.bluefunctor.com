import React, { useReducer } from 'react';

import { Provider } from './defaultContext';

const withModel = ({
  reducer,
  reducerInitState,
  ModelProvider = Provider,
}) => Component => props => {
  const [state, dispatch] = useReducer(reducer, reducerInitState);

  return (
    <ModelProvider value={{ state, dispatch }}>
      <Component {...props}/>
    </ModelProvider>
  );
};

export default withModel;
