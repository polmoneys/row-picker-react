import { ReactNode, ButtonHTMLAttributes } from 'react';
import { same, clxs } from '../utils';
import Icon from '../RowPicker/Icon';
import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    children?: ReactNode;
    onTap?: (value?: any) => void;
    variant?: 'default' | 'dialog' | 'close' | 'filled' | 'ghost' | 'icon';
    className?: string;
    id?: string;
}

function Button(props: Props) {
    const { className, children, onTap, variant = 'default', disabled = false, id, ...rest } = props;
    const rootStyles = clxs(
        styles.root,
        className,
        same(variant, 'dialog') && styles.buttonDialog,
        same(variant, 'close') && styles.buttonDialog,
        same(variant, 'close') && styles.buttonClose,
        same(variant, 'filled') && styles.buttonFilled,
        same(variant, 'ghost') && styles.buttonGhost,
        same(variant, 'icon') && styles.buttonIcon
    );
    return (
        <button {...(id && { id })} disabled={disabled} onClick={() => onTap?.()} className={rootStyles} type="button" {...rest}>
            {children}
            {same(variant, 'close') && <Icon variant="close" />}
        </button>
    );
}

export default Button;
