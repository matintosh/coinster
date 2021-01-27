import React, { createContext, useState } from "react";

export const CoinsterContext = createContext(null);



export const CoinsterContextProvider = ({ children }) => {
    const [ loading, setLoading ] = useState(false)

    const context = {
        loading,
        setLoading
    };

    return (
        <CoinsterContext.Provider value={context}>
            {children}
        </CoinsterContext.Provider>
    );
};
