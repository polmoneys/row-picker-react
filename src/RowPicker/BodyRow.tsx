import { Fragment, ReactNode } from 'react';
import { useHover } from '@react-aria/interactions';
import Icon from './Icon';
import { clxs } from '../utils';

interface Props {
    children: ReactNode;
    position: number;
    disabled?: boolean;
    selected?: boolean;
}

function BodyRow(props: Props) {
    const { children, position, disabled, selected } = props;

    const { hoverProps, isHovered } = useHover({
        onHoverStart: () => ({}),
        onHoverEnd: () => ({}),
    });

    return (
        <div
            className={clxs('rp-row', isHovered && 'rp-zebra', disabled && 'rp-rowDisabled', selected && 'rp-rowSelected')}
            role="row"
            aria-rowindex={position + 1}
            {...hoverProps}
        >
            {disabled ? (
                <span className="rp-lock">
                    <Icon variant="lock" />
                </span>
            ) : (
                <Fragment />
            )}

            {children}
        </div>
    );
}

export default BodyRow;
