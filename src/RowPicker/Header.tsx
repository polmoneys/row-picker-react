import { ReactNode } from 'react';
import { SortState, UnknownObject } from './types';
import { clxs } from '../utils';

interface Props {
    children: ReactNode;
    width: string;
    align: string;
    className?: string;
    id?: string;
    value?: string;
    activeSorter?: SortState;
}

function Header(props: Props) {
    const { children, width, align, id, value, activeSorter, className } = props;
    /**
     * do not use aria-sort on more than one column
     * header at a time.
     */
    let ariaSortProps: UnknownObject = {};
    if (activeSorter !== undefined) {
        const { property, isDescending } = activeSorter;
        if (activeSorter.property !== undefined && property === value) {
            ariaSortProps = {
                'aria-sort': !isDescending ? 'ascending' : 'descending',
            };
        }
    }
    return (
        <div
            id={id}
            className={clxs('rp-cell', className)}
            role="columnheader"
            style={{
                width,
                justifyContent: align,
            }}
            {...ariaSortProps}
        >
            {children}
        </div>
    );
}

export default Header;
