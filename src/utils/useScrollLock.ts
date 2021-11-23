import { useEffect, useRef } from 'react';

/* touch devices do not support overflow: hidden on body element
 instead we need to prevent default for touchmove event:
 https://stackoverflow.com/a/49853392
 
 update: https://raw.githubusercontent.com/adobe/react-spectrum/main/packages/%40react-aria/overlays/src/usePreventScroll.ts
 */
const preventDefault = (event: TouchEvent) => {
    event.preventDefault();
};

const useScrollLock = (lock: boolean, options = { disableTouchEvents: false }) => {
    // value is stored to prevent body overflow styles override with initial useScrollLock(false)
    const locked = useRef(false);

    // after scroll is unlocked body overflow style returns to the previous known value
    const bodyOverflow = useRef<React.CSSProperties['overflow']>(null);

    const unlockScroll = () => {
        if (locked.current) {
            locked.current = false;
            document.body.style.overflow = bodyOverflow.current || '';

            if (options.disableTouchEvents) {
                document.body.removeEventListener('touchmove', preventDefault);
            }
        }
    };

    const lockScroll = () => {
        locked.current = true;
        // @ts-expect-error
        bodyOverflow.current = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        if (options.disableTouchEvents) {
            document.body.addEventListener('touchmove', preventDefault, {
                passive: false,
            });
        }
    };

    useEffect(() => {
        if (lock) {
            lockScroll();
        } else {
            unlockScroll();
        }

        return unlockScroll;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lock]);
};

export default useScrollLock;
