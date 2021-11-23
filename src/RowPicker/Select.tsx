import { useState, ReactNode } from 'react';
import { FocusScope } from '@react-aria/focus';
import { useFocusWithin } from '@react-aria/interactions';
import useScrollLock from '../utils/useScrollLock';
import Icon from './Icon';
import { Id } from './types';
import { clxs } from '../utils';
import SelectItem from './SelectItem';

interface Props {
    items?: Array<MenuItem>;
    id: string;
    label: ReactNode;
    activeFocus: boolean;
}

export interface MenuItem {
    colId?: Id;
    children?: ReactNode | Array<ReactNode>;
    /** Hidden to screen readers */
    label: string | ReactNode;
    /** Hidden to non screen readers */
    description: string;
    disabled?: boolean;
    onTap?: () => void;
}

function Select(props: Props) {
    const { items, id, label, activeFocus } = props;

    const [isFocusWithin, setFocusWithin] = useState(activeFocus);

    const { focusWithinProps } = useFocusWithin({
        onBlurWithin: () => setFocusWithin(false),
        onFocusWithinChange: (isFocusWithin) => setFocusWithin(isFocusWithin),
    });

    useScrollLock(isFocusWithin);
    const rootStyles = clxs('rp-select', isFocusWithin && 'rp-focused');

    return (
        <div className={rootStyles} {...focusWithinProps}>
            <span className="rp-offscreen" id={`${id}-extra-label`}>
                Column Actions
            </span>
            <button
                id={id}
                className="rp-button"
                // aria-label={'Column options'}
                aria-labelledby={`${id} ${id}-extra-label`}
                aria-haspopup="true"
                aria-controls={`${id}-controls`}
                aria-expanded={isFocusWithin ? 'true' : 'false'}
            >
                {label}
                <div className="rp-pushLeft">
                    <Icon variant="circle" fill="currentColor" />
                </div>
            </button>
            <div className="rp-menu">
                <div
                    role="menu"
                    id={`${id}-controls`}
                    aria-labelledby={id}
                    aria-orientation="vertical"
                    className="rp-menuItems"
                    // aria-label={`Column name: ${id}`}
                >
                    {isFocusWithin ? (
                        <FocusScope autoFocus>
                            {items?.map((item, position) => (
                                <SelectItem key={`select-item-${position}`} {...item} colId={`${id}-${item.colId}`} />
                            ))}
                        </FocusScope>
                    ) : (
                        items?.map((item, position) => <SelectItem key={`select-item-${position}`} {...item} />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default Select;
