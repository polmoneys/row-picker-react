/**
 *
 * Pol Moneys
 * 2021 RowPicker 1.0.0
 *
 */

import { useState, useMemo, useRef, Fragment, useEffect, isValidElement } from 'react';
import { identity, same, clxs, has, isObjectEmpty } from '../utils';
import { BaseT, Props, StringsArray } from './types';
import useSelectable from '../utils/useSelectable';
import Select from './Select';
import Disclosure from './PopOver';
import Icon from './Icon';
import CheckBox from './CheckBox';
import Container from './Container';
import Cell from './Cell';
import CellEditable from './CellEditable';
import Header from './Header';
import Body from './Body';
import BodyRow from './BodyRow';
import HeaderRow from './HeaderRow';
import HeaderRowGroup from './HeaderRowGroup';
import Switch from './Switch';
import './RowPicker.css';
import './theme.css';
// import './RowPickerDark.css';

function RowPicker<T extends BaseT>(props: Props<T>) {
    const {
        classes,
        id,
        label,
        description,
        rows,
        // totalRows,
        columns,
        allColumns,
        expandableColumn,
        totalCols,
        loading,
        activeSorter,
        onFilter,
        onReset,
        onSort,
        onColChange,
        onCellChange,
        onRowChange,
        toolbar,
    } = props;

    /**
     * Pick rows.
     * Check/uncheck all or some, so indeterminate state is necessary.
     */

    const [
        selectedCheckBoxes,
        { matchSelection: matchSelectionCheckBoxes, updateSelection: updateSelectionCheckBoxes, resetSelection: resetSelectionCheckBoxes, selectAll },
    ] = useSelectable(
        rows.map((r) => r.id),
        null,
        undefined,
        true,
        true
    );

    const allCheckBoxesChecked = selectedCheckBoxes.length === rows.length;
    const someCheckBoxesChecked = has(selectedCheckBoxes) && selectedCheckBoxes.length < rows.length;
    const parentIsChecked = allCheckBoxesChecked ? true : someCheckBoxesChecked ? 'mixed' : false;
    const onParentChange = () => {
        if (has(selectedCheckBoxes)) {
            resetSelectionCheckBoxes();
        } else {
            selectAll();
        }
    };
    const onChildChange = (id: string) => {
        updateSelectionCheckBoxes(id);
    };

    const selectedCheckBoxesRows = useMemo(() => {
        let picked: Array<T> = [];
        // eslint-disable-next-line array-callback-return
        rows?.map((row) => {
            if (selectedCheckBoxes.includes(row.id)) {
                picked.push(row);
            }
        });
        return picked;
    }, [selectedCheckBoxes, rows]);

    useEffect(() => {
        onRowChange(selectedCheckBoxesRows);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCheckBoxesRows]);

    /**
     * Find keys that can be filtered by.
     */
    const filterableKeys = useRef<StringsArray>([]);

    useEffect(() => {
        let picked: StringsArray = [];
        if (!isObjectEmpty(rows[0])) {
            // eslint-disable-next-line array-callback-return
            Object.entries(rows[0]).map(([value, state]) => {
                if (typeof state === 'boolean') {
                    picked.push(value);
                }
            });
            filterableKeys.current = picked;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Used to track filters
     */
    const [selectionFilters, { matchSelection: matchSelectionFilters, updateSelection: updateSelectionFilters }] = useSelectable(
        filterableKeys.current,
        null,
        () => onFilter(filters),
        true,
        false
    );

    const filters = useMemo(() => {
        let picked: Array<string> = [];
        // eslint-disable-next-line array-callback-return
        filterableKeys.current?.map((filter, pos) => {
            if (selectionFilters.includes(pos.toString())) {
                picked.push(filter);
            }
        });
        return picked.map((pick) => ({ property: pick, isTruthyPicked: true }));
    }, [selectionFilters]);

    /**
     * Track visible columns
     */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectionVisible, { updateSelection, matchSelection, selectAllBut }] = useSelectable(
        columns?.slice(1, columns.length).map((c) => c.id),
        null,
        (newVisibleCols) => onColChange(newVisibleCols),
        true,
        true
    );

    /**
     * Should a 'reset' button be displayed ?
     */
    const { property, isDescending } = activeSorter;
    const showReset = columns.length < totalCols || has(filters);

    /**
     * Inline editable cells.
     */

    const [rowCellEditing, setNewCell] = useState<T | null>(null);

    const onNewCell = (row: T) => {
        setNewCell(row);
    };
    useEffect(() => {
        if (identity(rowCellEditing)) {
            onCellChange?.(rowCellEditing!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowCellEditing]);

    /**
     * It starts at 60px for the checkbox column is not in columns.
     */
    const rowPickerIdealWidth = useMemo(() => {
        return columns
            .map((col) => Number(col.width.replace('px', '')))
            .reduce((acc, val) => {
                return acc + val;
            }, 60);
    }, [columns]);
    return (
        <div className={clxs(classes?.root, 'rp-outer')}>
            {isValidElement(toolbar) ? (
                toolbar
            ) : (
                <div className="rp-toolbar">
                    <Disclosure
                        icon="chevron"
                        disabled={!has(selectedCheckBoxesRows)}
                        label={`${selectedCheckBoxesRows.length < 10 ? '0' : ''}${selectedCheckBoxesRows.length} Row${
                            selectedCheckBoxesRows.length > 1 ? 's' : ' '
                        } `}
                        classes={{
                            popoverContent: classes?.popoverRoot ?? 'rp-popContent',
                            popoverButton: classes?.popoverButton ?? 'rp-popButton rp-cell-number',
                        }}
                    >
                        <div className="rp-rowGap rp-rowGapGrid rp-space-b">
                            {selectedCheckBoxesRows.map((check) => (
                                <button
                                    type="button"
                                    key={check.id}
                                    className={clxs(classes?.popoverAction)}
                                    onClick={() => (selectedCheckBoxesRows.length > 1 ? updateSelectionCheckBoxes(check.id) : {})}
                                >
                                    {(check?.name as string) ?? (check?.title as string) ?? (check?.instagram as string) ?? (check.id as string)}
                                </button>
                            ))}
                        </div>
                    </Disclosure>
                    <Disclosure
                        label=""
                        icon="columns"
                        classes={{
                            popoverContent: classes?.popoverRoot ?? 'rp-popContent',
                            popoverButton: classes?.popoverButton ?? 'rp-popButton rp-popButtonIcon',
                        }}
                    >
                        <div className="rp-rowGap rp-rowGapGrid rp-space-b">
                            {allColumns?.map((col, pos) =>
                                same(pos, 0) ? (
                                    <Fragment key={pos} />
                                ) : (
                                    <button
                                        type="button"
                                        key={col.value}
                                        className={clxs(matchSelection(col.id) && classes?.popoverActionSelected, classes?.popoverAction)}
                                        onClick={() => updateSelection(col.id)}
                                    >
                                        {col.label}
                                    </button>
                                )
                            )}
                        </div>
                        <p>Select columns to display.</p>
                    </Disclosure>
                    {/* {has(filterableKeys.current) ? (
                        <Disclosure
                            label={''}
                            icon="filters"
                            classes={{
                                popoverContent: classes?.popoverRoot ?? 'rp-popContent',
                                popoverButton: classes?.popoverButton ?? 'rp-popButton rp-popButtonIcon',
                            }}
                        >
                            <div className="rp-rowGap rp-rowGapGrid rp-space-b">
                                {filterableKeys?.current?.map((filter, pos) => (
                                    <button
                                        type="button"
                                        key={filter}
                                        className={clxs(matchSelectionFilters(pos.toString()) && classes?.popoverActionSelected, classes?.popoverAction)}
                                        onClick={() => updateSelectionFilters(pos.toString())}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            <p>Filter by row value if them are boolean.</p>
                        </Disclosure>
                    ) : (
                        <Fragment />
                    )} */}
                    {showReset ? (
                        <button
                            type="button"
                            className="rp-buttonIcon"
                            onClick={() => {
                                resetSelectionCheckBoxes();
                                onReset();
                            }}
                        >
                            <Icon variant="close" fill="var(--accent)" />
                        </button>
                    ) : (
                        <Fragment />
                    )}
                </div>
            )}

            <div
                aria-busy={loading ? 'true' : 'false'}
                className={clxs('rp-root', classes?.root, (loading && classes?.loading) ?? 'rp-row-picker-loading')}
                style={{
                    minWidth: `${rowPickerIdealWidth}px`,
                }}
            >
                <Container
                    id={id}
                    description={description}
                    label={label}
                    rows={rows.length}
                    // vs. totalRows
                    cols={columns.length}
                >
                    {!loading && (
                        <HeaderRowGroup>
                            <HeaderRow>
                                {columns?.map((col) => {
                                    if (same(col.value, 'pick')) {
                                        return (
                                            <Header key={col.value as string} id={col.value as string} width="60px" align="center" className="rp-sticky">
                                                <CheckBox
                                                    id={`${id}-select-all-rows`}
                                                    label="select-all-rows"
                                                    name="select-all-rows"
                                                    value="select-all-rows"
                                                    checked={parentIsChecked}
                                                    onChange={onParentChange}
                                                />
                                            </Header>
                                        );
                                    }
                                    const isUnsortable = col.variant && col.variant !== 'default';
                                    const selectItems = [
                                        {
                                            id: 0,
                                            label: 'Asc',
                                            description: `Set column ${col.value} in ascending sort order.`,
                                            onTap: () =>
                                                onSort({
                                                    isDescending: false,
                                                    property: col.value,
                                                }),
                                        },
                                        {
                                            id: 1,
                                            label: 'Desc',
                                            description: `Set column ${col.value} in descending sort order.`,
                                            onTap: () =>
                                                onSort({
                                                    isDescending: true,
                                                    property: col.value,
                                                }),
                                        },
                                        {
                                            id: 3,
                                            colId: `${id}-${col.value}`,
                                            label: 'Focus',
                                            description: 'Hide other columns',
                                            onTap: () => {
                                                updateSelection(col.id);
                                            },
                                        },
                                        {
                                            id: 4,
                                            colId: `${id}-${col.value}`,
                                            label: 'Hide',
                                            description: 'Hide this column',
                                            onTap: () => {
                                                selectAllBut(col.id);
                                            },
                                        },
                                    ];

                                    return (
                                        <Header key={col.value as string} {...col} activeSorter={activeSorter}>
                                            <Select
                                                activeFocus={false}
                                                // activeFocus={same(dialog.returnRef, col.value)}
                                                id={`${col.value}-${id}`}
                                                label={
                                                    <Fragment>
                                                        {col.label}{' '}
                                                        {same(property, col.value) && (
                                                            <span className="rp-iconStable">
                                                                <Icon variant={same(property, col.value) && isDescending ? 'down' : 'up'} fill="currentColor" />
                                                            </span>
                                                        )}
                                                    </Fragment>
                                                }
                                                items={isUnsortable ? selectItems.slice(2, 4) : selectItems}
                                            />
                                        </Header>
                                    );
                                })}
                            </HeaderRow>
                        </HeaderRowGroup>
                    )}
                    <Body>
                        {!loading &&
                            has(rows) &&
                            rows?.map((row, pos) => (
                                <BodyRow
                                    key={row.id as string}
                                    selected={matchSelectionCheckBoxes(row.id)}
                                    position={pos}
                                    disabled={(row?.locked as boolean) ?? false}
                                >
                                    <Cell
                                        position={pos}
                                        selected={matchSelectionCheckBoxes(row.id)}
                                        role={'gridcell'}
                                        width="60px"
                                        align="center"
                                        editable
                                        labelledBy={`${id}-checkbox-${row.id}`}
                                        className="rp-sticky"
                                    >
                                        <CheckBox
                                            label={`select row ${row.id}`}
                                            name={`select row ${row.id}`}
                                            value={row.id!.toString() as string}
                                            checked={matchSelectionCheckBoxes(row.id) && !row?.locked}
                                            onChange={() => onChildChange(row.id)}
                                            disabled={(row?.locked as boolean) ?? false}
                                        />
                                    </Cell>
                                    {columns
                                        .filter((col) => col.value !== 'pick')
                                        .map((col, posCol) => {
                                            const colContent: string | BaseT = row[col.value] as string | { [key: string]: string } as BaseT;
                                            // output switch for booleans as default
                                            const isBoolean = typeof row[col.value] === 'boolean';
                                            // if formatter fn is present, if not span with text-ellipsis & rtl & if numeric css
                                            const colContentWithFormat = identity(col.formatter) ? (
                                                col.formatter!(colContent)
                                            ) : (
                                                <span dir="auto" className={!/[^0-9]/.test(colContent.toString()) ? 'rp-cell-number' : ''}>
                                                    {colContent.toString()}
                                                </span>
                                            );
                                            // might be editable
                                            const isEditableCol = same(col?.variant ?? 'default', 'isEditable') ?? false;
                                            // might be expandable
                                            const hasChildren = !isObjectEmpty(row?.children);
                                            if (isEditableCol) {
                                                return (
                                                    <Cell
                                                        key={col.value}
                                                        {...col}
                                                        role={same(posCol, 0) ? 'rowheader' : 'gridcell'}
                                                        position={posCol}
                                                        selected={false}
                                                        editable
                                                    >
                                                        <CellEditable
                                                            row={row}
                                                            label={col.value as string}
                                                            value={colContent as unknown as string}
                                                            setValue={onNewCell}
                                                        />
                                                    </Cell>
                                                );
                                            }
                                            if (isBoolean && !identity(col.formatter)) {
                                                const active = same(colContent.toString(), 'true');
                                                return (
                                                    <Cell
                                                        key={col.value}
                                                        {...col}
                                                        role={same(posCol, 0) ? 'rowheader' : 'gridcell'}
                                                        position={posCol}
                                                        selected={false}
                                                        editable={false}
                                                    >
                                                        <Switch
                                                            row={row}
                                                            setValue={onNewCell}
                                                            initial={active}
                                                            label={col.value}
                                                            className={classes?.switchOn}
                                                        />
                                                    </Cell>
                                                );
                                            }

                                            return (
                                                <Cell
                                                    key={col.value}
                                                    {...col}
                                                    role={same(posCol, 0) ? 'rowheader' : 'gridcell'}
                                                    id={same(posCol, 0) ? `${id}-${col.value}-${row.id}-${posCol}` : undefined}
                                                    // labelledBy={same(posCol, 0) ? `${id}-${col.value}-${row.id}-${posCol}` : undefined}
                                                    position={posCol}
                                                    selected={false}
                                                    editable={false}
                                                    classes={classes}
                                                    expandable={same(posCol, expandableColumn)}
                                                    disclosee={hasChildren ? (row?.children as { [key: string]: string | boolean | Array<string> }) : null}
                                                >
                                                    <Fragment>{colContentWithFormat}</Fragment>
                                                </Cell>
                                            );
                                        })}
                                </BodyRow>
                            ))}

                        {!loading && !has(rows) && (
                            <div className="rp-row">
                                <b>No results.</b>
                            </div>
                        )}
                    </Body>
                </Container>
            </div>
        </div>
    );
}

export default RowPicker;
