import React, { useReducer, createContext } from 'react';
// Import Helper functions
import {
  getAllSearchParams,
  setSearchParam,
  getSearchParam,
  delSearchParam,
} from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)

export const AutoCompleteContext = createContext(); // Create context

export const AutoCompleteProvider = (props) => {
  const { children } = props || {};

  // Get existing params which begin with 'query' and put them in an array
  let additionalQueries = getAllSearchParams().filter((param) => param.name.match('^query'));
  // Get existing params which begin with 'selectedStation' and put them in an array
  let additionalStations = getAllSearchParams().filter((param) =>
    param.name.match('^selectedStation')
  );

  // Extract values and remove first 2 items as we already have them
  additionalQueries = additionalQueries.slice(2).map((value) => value.id);
  additionalStations = additionalStations.slice(2).map((value) => ({ id: value.id }));

  // Set intial state
  const initialState = {
    queries: [getSearchParam('query0') || '', getSearchParam('query1') || '', ...additionalQueries],
    // // The selected service is used to store details when a user has clicked an autocomplete
    selectedStations: [
      {
        id: getSearchParam('selectedStation0') || null,
      },
      {
        id: getSearchParam('selectedStation1') || null,
      },
      ...additionalStations,
    ],
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the query to what the user has typed
    switch (action.type) {
      case 'UPDATE_QUERY': {
        setSearchParam(`query${action.queryId}`, action.query);

        let newState = state.queries;
        newState[action.queryId] = action.query;

        return {
          ...state,
          queries: [...newState],
        };
      }
      // Update the state to show item user has selected
      case 'UPDATE_SELECTED_STATION': {
        const { id, queryId } = action.payload;
        const item = `selectedStation${queryId}`;
        setSearchParam(item, id); // Set URL

        let newState = state.selectedStations;
        newState[queryId] = action.payload;

        console.log(newState[queryId]);

        return {
          ...state,
          selectedStations: [...newState],
        };
      }
      // Add new item for user to select
      case 'ADD_STATION': {
        const item = { id: null };

        return {
          ...state,
          selectedStations: [...state.selectedStations, item],
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
