/**
 *
 * May the gods bless @reach 🙏🏽
 * https://reach.tech/
 *
 */

import { ChangeEvent, ReactElement, ReactNode } from 'react';
import { CustomCheckbox } from '@reach/checkbox';
import Icon from './Icon';

interface Props {
    name: string;
    label: string;
    value: string | number;
    id?: string;
    /** Can be null */
    children?: ((...args: any[]) => ReactElement | null) | HTMLElement | ReactElement | ReactNode | string | null;
    /** State */
    checked?: boolean | 'mixed';
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const CheckBox = (props: Props) => {
    const { children, checked = false, onChange, value, name, label, id, disabled } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // const target = event.target;
        // const isChecked = target.checked as boolean;
        onChange?.(event);
    };

    return (
        <div className="rp-checkbox">
            {checked && checked !== 'mixed' && <Icon variant="checkbox" fill="var(--accent)" />}
            {checked && checked === 'mixed' && <Icon variant="checkboxMixed" />}
            <label htmlFor={name}>
                <CustomCheckbox
                    value={value}
                    name={name}
                    checked={checked}
                    onChange={handleChange}
                    aria-label={label}
                    {...(id && { id })}
                    {...(disabled && { disabled })}
                />
                {children}
            </label>
        </div>
    );
};

export default CheckBox;
