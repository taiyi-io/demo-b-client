'use client';
import { createContext, useContext } from 'react';

const defaultContext = {
    lang: 'cn',
    user: 'demo',
    version: '0.0.0',
};

const AppContext = createContext(defaultContext);

export function useAppContext(){
    return useContext(AppContext);
}

export function ContextProvider({value, children}){    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}