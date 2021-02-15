import React, { useReducer, createContext } from 'react';

export const MapContext = createContext(); // Create context

export const MapContextProvider = (props) => {
  const { children } = props || {};

  // Set intial state
  const initialState = {
    mapRef: null,
    mapContainer: null,
    mapView: true,
    mapSize: {
      width: 500,
      height: 500,
    },
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the query to what the user has typed
    switch (action.type) {
      // Update view
      case 'UPDATE_VIEW': {
        return {
          ...state,
          mapView: action.payload,
        };
      }

      // Update map size
      case 'UPDATE_MAP_SIZE': {
        return {
          ...state,
          mapSize: action.payload,
        };
      }

      // Update view
      case 'ADD_MAP': {
        return {
          ...state,
          mapRef: action.payload,
        };
      }

      // Update view
      case 'ADD_MAP_CONTAINER': {
        return {
          ...state,
          mapContainer: action.payload,
        };
      }

      // Default should return initial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [mapState, mapDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return <MapContext.Provider value={[mapState, mapDispatch]}>{children}</MapContext.Provider>;
};
