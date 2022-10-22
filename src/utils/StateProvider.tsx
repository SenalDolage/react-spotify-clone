import { createContext, useContext, useReducer } from "react";

type StateProviderPropTypes = {
    initialState: any;
    reducer: any;
    children: JSX.Element;
}

export const StateContext = createContext<any>('');

export const StateProvider = ({ initialState, reducer, children }: StateProviderPropTypes) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
