import React, { useReducer, createContext } from 'react';
// Import Helper functions
import { getSearchParam, setSearchParam } from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)

export const MapContext = createContext(); // Create context

export const MapContextProvider = (props) => {
  const { children } = props || {};

  // Set intial state
  const initialState = {
    mapRef: null,
    mapContainer: null,
    mapView: getSearchParam('mapView') !== 'false',
    mapSize: {
      width: 500,
      height: 500,
    },
    highlightedZones: {
      zone1: false,
      zone2: false,
      zone3: false,
      zone4: false,
      zone5: false,
      zone6: false,
      zone7: false,
    },
    accessVisibility: {
      full: false,
      partial: false,
      parking: false,
    },
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    switch (action.type) {
      // Update view
      case 'UPDATE_VIEW': {
        setSearchParam('mapView', action.payload);
        return {
          ...state,
          mapView: action.payload,
        };
      }

      // Add map ref
      case 'ADD_MAP': {
        return {
          ...state,
          mapRef: action.payload,
        };
      }

      // Add map container ref
      case 'ADD_MAP_CONTAINER': {
        return {
          ...state,
          mapContainer: action.payload,
        };
      }

      // Update map size
      case 'UPDATE_MAP_SIZE': {
        return {
          ...state,
          mapSize: action.payload,
        };
      }

      // Update highlighted zone on map
      case 'UPDATE_ZONE_HIGHLIGHT': {
        return {
          ...state,
          highlightedZones: { ...state.highlightedZones, ...action.payload },
        };
      }

      // Update highlighted zone on map
      case 'CLEAR_HIGHLIGHTED_ZONES': {
        return {
          ...state,
          highlightedZones: { ...initialState.highlightedZones },
        };
      }

      // Update highlighted zone on map
      case 'TOGGLE_ACCESS_VISIBILITY': {
        return {
          ...state,
          accessVisibility: { ...action.payload },
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
