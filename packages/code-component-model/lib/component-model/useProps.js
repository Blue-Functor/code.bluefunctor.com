import { useMemo, useContext } from 'react';

import { createStructuredSelector } from 'reselect';

import { DefaultContext } from './defaultContext';

const EMPTY_OBJ = {};

const createActionProps = actionCreators => dispatch =>
  Object.entries(actionCreators)
    .reduce((
        actionProps,
        [actionCreatorName, actionCreator],
      ) => Object.assign(actionProps, {
        [actionCreatorName]: payload => dispatch(actionCreator(payload)),
      }),
      {},
    );

const useProps = (
    statePropsCreators = EMPTY_OBJ,
    actionPropsCreators = EMPTY_OBJ,
    context = DefaultContext,
  ) => {
  const { state, dispatch } = useContext(context);

  const [actionProps, statePropsCreator] = useMemo(
    () => [
      createActionProps(actionPropsCreators)(dispatch),
      createStructuredSelector(statePropsCreators),
    ],
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const stateProps = statePropsCreator(state);

  return { ...stateProps, ...actionProps };
};

export default useProps;
