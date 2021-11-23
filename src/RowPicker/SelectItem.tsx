import { KeyboardEvent } from 'react';
import { useFocusManager } from '@react-aria/focus';
import { MenuItem } from './Select';
import { clxs } from '../utils';

interface Props extends MenuItem {}

function SelectItem(props: Props) {
    const { onTap, description, label, colId } = props;
    const focusManager = useFocusManager();
    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        const closeKeys = ['Escape', 'c'];
        if (closeKeys.includes(event.key)) {
        }
        switch (event.key) {
            case 'ArrowDown':
                focusManager.focusNext({ wrap: true });
                break;
            case 'ArrowUp':
                focusManager.focusPrevious({ wrap: true });
                break;
        }
    };

    return (
        <button
            role="menuitem"
            {...(colId && { id: colId })}
            className={clxs('rp-button', 'action')}
            onClick={onTap !== undefined ? onTap : () => ({})}
            onKeyDown={onKeyDown}
        >
            <span aria-hidden="true"> {label} </span>
            <span className="rp-offscreen"> {description}</span>
        </button>
    );
}

export default SelectItem;
