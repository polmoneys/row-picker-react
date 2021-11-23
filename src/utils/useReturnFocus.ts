import { useCallback } from 'react';

type Id = string;

function useReturnFocus(): (id: Id) => void {
    const moveFocus = useCallback((id: Id) => {
        return window.setTimeout(() => {
            const el = document.getElementById(id) as HTMLElement;
            el?.focus();
        }, 0);
    }, []);

    return moveFocus;
}

export default useReturnFocus;
