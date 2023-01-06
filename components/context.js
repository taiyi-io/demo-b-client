'use client';
import { createContext, useContext } from 'react';

const langChinese = 'cn';
const langEnglish = 'en';

const defaultContext = {
    lang: langChinese,
    user: 'demo',
    version: '0.0.0',
};

const AppContext = createContext(defaultContext);

export function useAppContext(){
    return useContext(AppContext);
}

export function getCurrentyFormatter(){
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

export function ContextProvider({value, children}){    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

