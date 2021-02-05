import React, { useReducer, createContext, createRef } from 'react';
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
    mapRef: createRef(),
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
        const { queryId } = action.payload;
        // If action.payload ('to') exists in payload then make sure we set the correct field
        const item = `selectedStation${queryId}`;
        const query = `query${queryId}`;
        const station = state.selectedStations[queryId];

        // Find related group in svg map
        if (station) {
          const svgGroup =
            state.mapRef.current.querySelector(`[data-name="${station.stopName}"]`) ||
            state.mapRef.current.querySelector(`#${station.stopName}`);

          // If group found remove text background from svg map
          if (svgGroup) {
            svgGroup.removeChild(svgGroup.querySelector(`#${station.id}_text_bg`));

            // Find related zone in svg map
            const inThisZone = state.selectedStations.filter(
              (item) => item.railZone === station.railZone
            );

            // If this is the only one of thiszone in selected stations then remove the highlight class from svg map
            if (inThisZone.length < 2) {
              const zone = state.mapRef.current.querySelector(`#Zone_${station.railZone}`);

              if (zone) {
                zone.classList.remove(...zone.classList);
              }
            }
          }
        }

        // Delete correct things from URL
        delSearchParam(item);
        delSearchParam(query);

        // Update queries array in state
        let newQueries = state.queries;
        let newSelectedStations = state.selectedStations;

        newQueries[queryId] = '';
        newSelectedStations[queryId] = { id: null };

        // function to remove the last array value if it's empty (and not our inital 2 default values)
        const removeLastValues = (array) => {
          let newArray = array;
          const lastItem = newArray[newArray.length - 1];
          const valueToRemove =
            typeof lastItem === 'object' ? lastItem.id === null : lastItem === '';
          if (valueToRemove && newArray.length > 2) {
            newArray.pop();
            removeLastValues(newArray);
          }
          return newArray;
        };

        newQueries = removeLastValues(newQueries);
        newSelectedStations = removeLastValues(newSelectedStations);

        // Update state with deleted/cancelled service/item
        return {
          ...state,
          // queries: [...newQueries],
          // selectedStations: [...newSelectedStations],
        };
      }

      // Used to reset everything
      case 'RESET_SELECTED_SERVICES':
        // clear map highlights
        state.selectedStations.forEach((station) => {
          const textBg = state.mapRef.current.querySelector(`#${station.id}_text_bg`);
          const zone = state.mapRef.current.querySelector(`#Zone_${station.railZone}`);
          if (textBg) {
            textBg.parentNode.removeChild(textBg);
          }
          if (zone) {
            zone.classList.remove(...zone.classList);
          }
        });
        getAllSearchParams().forEach((param) => {
          delSearchParam(param.name);
        });
        return {
          queries: initialState.queries,
          selectedStations: initialState.selectedStations,
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
