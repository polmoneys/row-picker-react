import { MouseEventHandler, ReactNode } from 'react';

/**
 * T
 */

export interface BaseT extends UnknownObject {
    id: string;
}

/**
 *  Unknowns
 */

export interface DefaultComponent {
    id?: string;
    children: ReactNode;
    className?: string;
}

export type Id = string;
export type UnknownObject = Record<string, unknown>;
export type UnknownArray = Array<Record<string, unknown>>;
export type StringsArray = Array<Id>;

/**
 * Customize with classNames.
 */

export enum AvailableClassNames {
    root = 'rp-root',
    loading = 'rp-loading',
    popoverRoot = 'rp-popover-root',
    popoverButton = 'rp-popover-button',
    popoverContent = 'rp-popover-content',
    popoverAction = 'rp-popover-action',
    popoverActionSelected = 'rp-popover-action-selected',
    popoverRootExpandable = 'rp-popover-root-expandable',
    popoverButtonExpandable = 'rp-popover-button-expandable',
    popoverContentExpandable = 'rp-popover-content-expandable',
    switchOn = 'rp-switch-on',
}

/**
 * RowPicker component props
 */

export interface Props<T> {
    classes?: {
        [key in keyof typeof AvailableClassNames]?: string;
    };
    /** #selector that explains datum */
    label: string;
    /** #selector that adds description to datum */
    description: string;
    id: string;
    /** Headers */
    columns: RowPickerColumns;
    allColumns: RowPickerColumns;
    expandableColumn: number;
    totalCols: number;
    /** Content */
    rows: Array<T>;
    totalRows: number;
    /** Callbacks */
    onFilter: (filters: FilterState) => void;
    onSort: (sort: SortState) => void;
    onReset: (withActiveCols?: boolean) => void;
    onColChange: (cols: StringsArray) => void;
    onRowChange: (rows: Array<T>) => void;
    onCellChange: (newCell: T) => void;
    /** State of user actions */
    activeSorter: SortState;
    /** Slot */
    toolbar?: ReactNode;
    loading: boolean;
}

/**
 * RowPicker column item
 */
export interface RowPickerColumn {
    id: string;
    label: string | HTMLSpanElement;
    /** Cell content */
    value: string;
    formatter?: (input: any, extra?: any) => string | ReactNode;
    /** Cell styles */
    width: string;
    align: string; // 'flex-start' | 'center' | 'flex-end';
    /** Is cell editable ? */
    variant?: 'default' | 'isEditable' | 'isUnsortable';
    /** Cell interactivity */
    disabled?: boolean;
    onTap?: (event?: MouseEvent | MouseEventHandler<HTMLSpanElement>) => void;
}

export interface RowPickerColumns extends Array<RowPickerColumn> {}

/**
 * Main operations, sort, filter.
 */

export type FilterState = Array<{ property: string; isTruthyPicked: boolean }>;

export type SortState = {
    property: string;
    isDescending: boolean;
};
