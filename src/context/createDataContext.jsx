import React, { useReducer, createContext, useMemo } from "react";

export default (reducer, actions, defaultValue) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = useMemo(() => {
      const bound = {};
      for (let key in actions) {
        bound[key] = actions[key](dispatch);
      }
      return bound;
    }, []);

    const contextValue = useMemo(
      () => ({ state, ...boundActions }),
      [state, boundActions],
    );

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
