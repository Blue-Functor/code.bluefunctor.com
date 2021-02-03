import React, {
  useReducer,
  useMemo,
  useEffect,
} from 'react';

import { Subject, BehaviorSubject } from 'rxjs';

import { combineEpics } from 'redux-observable';

import { Provider } from './defaultContext';

const consoleError = console.error.bind(console);

const epicEnablingReducer = (reducer, reducerInitState) =>
  (state, action) => ({
    lastStateAction: action,
    state: reducer(state.state, action),
  });

const withEpicsEnabledModel = ({
  reducer,
  reducerInitState,
  epics,
  epicsDependencies,
  ModelProvider = Provider,
  modelProps,
}) => Component => props => {
  const [{ lastStateAction, state }, dispatch] = useReducer(
    epicEnablingReducer(reducer, reducerInitState),
    { state: reducerInitState },
  );

  const rootEpic = combineEpics(
    epics,
  );

  const [action$, state$] = useMemo(() => {
    const action$ = new Subject();
    const state$ = new BehaviorSubject();

    state$.next(state);

    rootEpic(
      action$,
      state$,
      epicsDependencies,
    ).subscribe(
      dispatch,
      consoleError,
    );

    return [action$, state$];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    state$.next(state);
  }, [state, state$]);

  useEffect(() => {
    if (typeof lastStateAction !== 'undefined') {
      action$.next(lastStateAction);
    }
  }, [lastStateAction, action$]);

  return (
    <ModelProvider value={{ state, dispatch }}>
      <Component {...modelProps} {...props}/>
    </ModelProvider>
  );
};

export default withEpicsEnabledModel;
