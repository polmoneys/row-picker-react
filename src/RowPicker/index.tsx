import { useState, useEffect, useMemo, ReactNode } from 'react';
import { identity, genericSort, genericFilter, has } from '../utils';
import { BaseT, StringsArray } from './types';
import Timer from '../utils/Timer';
import RowPicker from './RowPicker';
import { RowPickerColumns, SortState, FilterState, AvailableClassNames } from './types';

const initialSortState: SortState = {
    property: 'id',
    isDescending: false,
};
const initialFilterState: FilterState = [];

interface Props<T> {
    id: string;
    /** #selector that explains datum */
    label: string;
    /** #selector that adds description to datum */
    description: string;
    classes?: {
        [key in keyof typeof AvailableClassNames]?: string;
    };
    /** Headers */
    columns: RowPickerColumns;
    /** Index of the column allowed to expand (only 1 per RowPicker)*/
    expandableColumn?: number;
    /** Content */
    rows: Array<T>;
    /** Initial State*/
    filters?: FilterState;
    sorters?: SortState;
    /** Slot */
    toolbar?: ReactNode;
    loading: boolean;
}

function useRowPicker<T extends BaseT>(
    props: Props<T>
): {
    component: ReactNode;
    results: Array<T>;
    resultsFilters: FilterState;
    resultsSorters: SortState;
    resultsSelectedRows: Array<T>;
    resultsNewCell: T | null;
} {
    const {
        id,
        label,
        description,
        classes,
        columns = [],
        // by default a number we'll never reach
        expandableColumn = 99,
        rows = [],
        filters = initialFilterState,
        sorters = initialSortState,
        toolbar,
        loading = false,
    } = props;

    if (process.env.NODE_ENV === 'development' && classes === undefined) {
        console.warn('[useRowPicker] no styles added so defaults to theme');
    }

    /**
     * Rows to render. Memoized.
     */
    const [searchResults, setResults] = useState<Array<T>>(rows);

    const gridRows = useMemo(() => {
        return searchResults;
    }, [searchResults]);

    /**
     * State.
     */
    const [activeSorter, setActiveSorter] = useState<SortState>(sorters);
    const [activeFilters, setActiveFilters] = useState<FilterState>(filters);
    const [activeCols, setCols] = useState<StringsArray>([]);
    const [selectedRows, setRows] = useState<Array<T>>([]);
    const [newCellContent, setNewCell] = useState<T | null>(null);

    /**
     * SideFx user selection.
     */
    useEffect(() => {
        const results = rows
            .filter((widget) => genericFilter<any>(widget, activeFilters))
            .sort((widgetA, widgetB) => genericSort<any>(widgetA, widgetB, activeSorter));
        setResults(results);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSorter, activeFilters, rows]);

    const visibleColumns = useMemo(() => {
        let picked = [columns[0]];
        if (has(activeCols)) {
            // eslint-disable-next-line array-callback-return
            columns.filter((col) => {
                if (activeCols.includes(col.id)) {
                    picked.push(col);
                }
            });
            return picked;
        }

        return columns;
    }, [columns, activeCols]);

    /**
     * SideFx user edits a cell.
     */
    useEffect(() => {
        if (identity(newCellContent)) {
            // Reset state
            new Timer(() => setNewCell(null), 200);
        }
    }, [newCellContent]);

    /**
     * Actions.
     */

    const onFilter = (filters: FilterState) => setActiveFilters(filters);
    const onSort = (sort: SortState) => setActiveSorter(sort);
    const onColChange = (cols: Array<string>) => setCols(cols);
    const onRowChange = (rows: Array<T>) => setRows(rows);
    const onChangeCell = (newCell: T) => setNewCell(newCell);
    const onReset = () => {
        setActiveFilters(initialFilterState);
        setActiveSorter(initialSortState);
        setRows([]);
        setResults(rows);
        setCols([]);
    };

    const component = (
        <RowPicker
            columns={visibleColumns}
            allColumns={columns}
            expandableColumn={expandableColumn}
            rows={gridRows}
            totalRows={rows.length}
            totalCols={columns.length}
            activeSorter={activeSorter}
            onFilter={onFilter}
            onReset={onReset}
            onSort={onSort}
            onColChange={onColChange}
            onRowChange={onRowChange}
            onCellChange={onChangeCell}
            classes={classes}
            loading={loading}
            id={id}
            label={label}
            description={description}
            toolbar={toolbar}
        />
    );
    return {
        component,
        results: searchResults,
        resultsFilters: activeFilters,
        resultsSorters: activeSorter,
        resultsSelectedRows: selectedRows,
        resultsNewCell: newCellContent,
    };
}

export default useRowPicker;

export type { RowPickerColumns }