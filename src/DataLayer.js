import React, { createContext, useContext, useReducer } from 'react';

export const DataLayerContext = createContext(); // This is preparing the data layer

// We are preparing the actual data layer which we are about to use
export const DataLayer = ({ initialState, reducer, children }) => ( // this is the actual data layer that wraps around the app component
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}> 
        {children}
    </DataLayerContext.Provider>
)

export const useDataLayerValue = () => useContext(DataLayerContext); // a way to push and pull to data layer 