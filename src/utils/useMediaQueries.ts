import { useState, useEffect } from 'react';

// Use it to run n queries and get n values
const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
    const mediaQueryLists = queries.map((q) => window.matchMedia(q));

    // Function that gets value based on matching media query
    const getValue = () => {
        // Get index of first media query that matches
        const index = mediaQueryLists.findIndex((mql) => mql.matches);
        // Return related value or defaultValue if none
        return values?.[index] || defaultValue;
    };

    const [value, setValue] = useState<T>(getValue);

    useEffect(
        () => {
            if (typeof window === 'undefined') return;
            // Note: By defining getValue outside of useEffect we ensure that it has ...
            // ... current values of hook args (as this hook callback is created once on mount).
            const handler = () => setValue(getValue);
            mediaQueryLists.forEach((mql) => mql.addListener(handler));
            return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
        },
        [] // Empty array ensures effect is only run on mount and unmount
    );

    return value;
};

export default useMedia;
