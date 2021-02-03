const combineReducers = reducers =>
  (state = {}, action) => 
  Object.entries(reducers).reduce(
    (combinedState, [reducerName, reducer]) => Object.assign(combinedState, {
      [reducerName]: reducer(state[reducerName], action)
    }),
    {},
  );

  export default combineReducers;