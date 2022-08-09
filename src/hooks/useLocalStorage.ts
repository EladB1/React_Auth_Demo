import { useState, useEffect } from 'react';

const getStoredValue = (key: string, defaultValue: any) => {
    const stored = localStorage.getItem(key);
    let value = stored === null ? null : JSON.parse(stored);
    return value !== null ? value : defaultValue;
};

export const useLocalStorage = (key: string, defaultValue: any) => {
    const [value, setValue ] = useState(() => {
        return getStoredValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

