import { forwardRef, DetailedHTMLProps, InputHTMLAttributes, ChangeEvent, Fragment } from 'react';
import { clxs } from '../utils';

type BaseProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export interface Props {
    label: string;
    className?: string;
    /** Field config */
    autofocus?: boolean;
    autocomplete?:
        | 'off'
        | 'on'
        | 'honorific-prefix'
        | 'new-password'
        | 'current-password'
        | 'one-time-code'
        | 'cc-name'
        | 'cc-number'
        | 'cc-exp'
        | 'cc-exp-month'
        | 'cc-exp-year'
        | 'cc-csc';
    inputmode?: 'text' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    required?: boolean;
    enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    autocapitalize?: 'none' | 'characters' | 'sentences' | 'words';
    /** Styles */
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    /** Initial value */
    value?: string | number;
    name: string;
    /** Defaults to text */
    type?: string;
}

const Field = forwardRef<HTMLInputElement, Props & BaseProps>((props: Props & BaseProps, ref) => {
    const {
        className,
        value,
        label,
        placeholder = null,
        name,
        autocapitalize = 'none',
        autocomplete = 'off',
        inputmode = 'text',
        enterkeyhint,
        autofocus = false,
        required = true,
        type = 'text',
        onBlur,
        onChange,
    } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange?.(event);
        }
    };
    const rootStyles = clxs('rp-field', className);
    return (
        <Fragment>
            <label htmlFor="row-picker-field" className="rp-offscreen">
                {label}
            </label>
            <input
                id="row-picker-field"
                className={rootStyles}
                ref={ref}
                defaultValue={value}
                name={name}
                autoComplete={autocomplete}
                aria-required={!!required}
                aria-label={label}
                // Todo: validation && aria-describedby={`${name}-errors`}
                autoFocus={autofocus}
                enterKeyHint={enterkeyhint}
                inputMode={inputmode}
                type={type}
                onChange={handleChange}
                onBlur={onBlur}
                autoCapitalize={autocapitalize}
                {...(placeholder && { placeholder })}
                dir="auto"
            />
        </Fragment>
    );
});

export default Field;
