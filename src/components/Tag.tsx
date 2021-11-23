import { MouseEvent } from 'react';
import { clxs, same, identity } from '../utils';
import { DefaultComponent } from '../RowPicker/types';
import { useKeyboard } from '@react-aria/interactions';
import styles from './Tag.module.css';

const tagVariants = ['pill', 'default', 'traced'] as const;
type Variants = typeof tagVariants[number];

interface Props extends DefaultComponent {
    fill?: string;
    color?: string;
    variant?: Variants;
    onTap?: (event?: MouseEvent<HTMLElement>) => void;
}

const closeKeys = ['enter', 'backspace'];

const Tag = (props: Props) => {
    const { id, children, className, fill = 'var(--accent-000)', color = 'var(--accent-200)', variant = 'default', onTap } = props;
    const rootStyles = clxs(styles.root, className, same(variant, 'pill') && styles.pill);

    const { keyboardProps } = useKeyboard({
        onKeyDown: (event) => {
            const k = event.key.toLowerCase();
            const isSpaceBar = event.code.toLowerCase() === 'space';
            if ((closeKeys.includes(k) && identity(onTap)) || (isSpaceBar && identity(onTap))) {
                onTap?.();
            }
        },
    });
    return (
        <span
            {...(id && { id })}
            className={rootStyles}
            style={{
                backgroundColor: fill,
                color: color,
                ...(same(variant, 'traced') && {
                    border: `var(--row-picker-border-width) solid ${color}`,
                }),
                ...(onTap && {
                    cursor: 'pointer',
                }),
            }}
            {...(onTap && { onClick: onTap })}
            {...(onTap && { role: 'button', tabIndex: 0 })}
            {...keyboardProps}
            // escape hatch to CSS target a Tag in a complex context
            dangerousselector-tag=""
        >
            {children}
        </span>
    );
};

export default Tag;
