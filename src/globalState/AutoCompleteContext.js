import React, { useReducer, createContext } from 'react';
// Import Helper functions
import {
  setSearchParam,
  getSearchParam,
  delSearchParam,
} from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)

export const AutoCompleteContext = createContext(); // Create when context

export const AutoCompleteProvider = (props) => {
  const { children } = props || {};

  // Set intial state of when
  const initialState = {
    queries: [getSearchParam('query0') || '', getSearchParam('query1') || ''],
    // // The selected service is used to store details when a user has clicked an autocomplete
    selectedStation: {
      id: getSearchParam('selectedStation') || null,
      to: null,
    },
    selectedStationTo: {
      id: getSearchParam('selectedStationTo') || null,
      to: null,
    },
    additionalStations: [],
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the query to what the user has typed
    switch (action.type) {
      case 'UPDATE_QUERY': {
        const query = `query${action.queryId}`; // If 'to' exists then make sure we set the correct field
        setSearchParam(query, action.query);

        return {
          ...state,
          queries: [...state.queries, action.query],
        };
      }
      // Update the state to show item user has selected
      case 'UDPATE_SELECTED_STATION': {
        const item = action.payload.to ? 'selectedStationTo' : 'selectedStation'; // If 'to' exists in payload then make sure we set the correct field
        setSearchParam(item, action.payload.id); // Set URL

        return {
          ...state,
          [item]: action.payload,
        };
      }
      // Add new item for user to select
      case 'ADD_ITEM': {
        const item = { id: null };

        return {
          ...state,
          additionalStations: [...state.additionalStations, item],
        };
      }

      // Used to cancel selected service/station etc. This is mainly used when using from/to stations
      case 'RESET_SELECTED_ITEM': {
        // If action.payload ('to') exists in payload then make sure we set the correct field
        const item = action.payload.to ? 'selectedStationTo' : 'selectedStation';
        const query = action.payload.to ? 'queryTo' : 'query';
        // Delete correct things from URL
        delSearchParam(item);
        delSearchParam(query);

        // Reset the selectedStation.lines if selectedStationTo is reset for trams
        if (action.payload.mode === 'tram' && action.payload.to) {
          return {
            ...state,
            [query]: '',
            [item]: {},
            selectedStation: {
              ...state.selectedStation,
              lines: [],
            },
          };
        }

        // Update state with deleted/cancelled service/item
        return {
          ...state,
          [query]: '',
          [item]: {},
        };
      }

      // Used to reset everything
      case 'RESET_SELECTED_SERVICES':
        delSearchParam('selectedStation');
        delSearchParam('selectedStationTo');
        delSearchParam('query');
        delSearchParam('queryTo');
        return {
          query: '',
          queryTo: '',
          selectedStation: {},
          selectedStationTo: {},
        };
      // Default should return intial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [autoCompleteState, autoCompleteDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return (
    <AutoCompleteContext.Provider value={[autoCompleteState, autoCompleteDispatch]}>
      {children}
    </AutoCompleteContext.Provider>
  );
};
