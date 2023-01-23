'use client';
import React, { createContext, useContext } from 'react';

const langChinese = 'cn';
const langEnglish = 'en';

const defaultContext = {
    lang: langChinese,
    user: 'demo',
    version: '0.0.0',
};

const AppContext = createContext(defaultContext);

export interface ContextData {
    lang: string,
    user: string,
    version: string,
}

export function useAppContext(): ContextData{
    return useContext(AppContext);
}

export function getCurrentyFormatter(): Intl.NumberFormat{
    const { lang } = useAppContext();
    let formatter;
    if (langEnglish === lang){
        formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }else{
        formatter = new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: 'CNY',
        });
    }
    return formatter;
}

type providerProps = {
    value: ContextData,
    children: React.ReactNode,
}

export function ContextProvider({value, children}: providerProps): JSX.Element{    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}