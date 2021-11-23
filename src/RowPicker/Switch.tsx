import { useEffect, useState } from 'react';
import { BaseT } from '../RowPicker/types';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { clxs } from '../utils';
/**
 * Forked https://adrianroselli.com/2019/08/under-engineered-toggles-too.html
 */

interface Props<T> {
    row: T;
    label: string;
    initial: boolean;
    setValue: (row: T) => void;
    className?: string;
}

function Switch<T extends BaseT>(props: Props<T>) {
    const { row, initial, label, setValue, className } = props;
    const [on, setOn] = useState(initial);
    useEffect(() => {
        setValue({
            ...row,
            [label]: on,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [on]);
    return (
        <div className={clxs('rp-switch', on && className ? className : 'rp-switch-on')}>
            <button type="button" aria-pressed={on ? 'true' : 'false'} onClick={() => setOn((prev) => !prev)}>
                <span className="rp-offscreen">{label}</span>
                <FiThumbsDown size={16} className={clxs('rp-switchIcon', on && 'rp-switchIconOn')} />{' '}
            </button>
        </div>
    );
}

export default Switch;
