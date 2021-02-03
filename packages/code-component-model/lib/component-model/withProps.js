import React from 'react';

import { DefaultContext } from './defaultContext';

import useProps from './useProps';

const EMPTY_OBJ = {};

const propCreatorWithOwnProps = (
  propsCreators = EMPTY_OBJ,
  props,
) => Object.entries(propsCreators).reduce(
  (creatorsOwnProps, [propName, creator]) => Object.assign(creatorsOwnProps, {
    [propName]: arg => creator(arg, props),
  }),
  {},
);

const withProps = (
    statePropsCreators = EMPTY_OBJ,
    actionPropsCreators = EMPTY_OBJ,
    context = DefaultContext,
  ) => 
  Component => 
  props => (
    <Component 
      {...useProps(
        propCreatorWithOwnProps(statePropsCreators, props), 
        propCreatorWithOwnProps(actionPropsCreators, props),
        context,
      )} 
      {...props} />
  );

export default withProps;
