import React, { useReducer, createContext } from 'react';

export const FormContext = createContext(); // Create context

export const FormProvider = (props) => {
  const { children } = props || {};

  // Set intial state
  const initialState = {};

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the query to what the user has typed
    switch (action.type) {
      // Default should return intial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [formState, formDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return <FormContext.Provider value={[formState, formDispatch]}>{children}</FormContext.Provider>;
};
