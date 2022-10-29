import { createContext, useContext, useReducer } from "react";
import { StateProviderPropTypes } from "../types/state-provider";

export const StateContext = createContext<any>('');

export const StateProvider = ({ initialState, reducer, children }: StateProviderPropTypes) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
