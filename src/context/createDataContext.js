import React, { useReducer, useState } from 'react';

export default (reducer, actions, initialState) => {
    const Context = React.createContext();
    
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);
        const [localState, setLocalState] = useState([]);

        const boundActions = {};
        for(let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return <Context.Provider value={{ state, ...boundActions, localState, setLocalState }}>
                    { children }
               </Context.Provider>
    };

    return { Context, Provider };
}