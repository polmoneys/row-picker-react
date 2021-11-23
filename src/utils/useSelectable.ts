import { useCallback, useState, useEffect, useMemo } from 'react';
import { identity } from '../utils';
import { StringsArray, Id } from '../RowPicker/types';

/**
 *
 * Hook for picking from a items, allowing multiple selections.
 * Use it to control a group of Buttons or Radios (any items...)
 *
 * @param items
 * @param initial
 * @param allowUnselected
 * @param allowMultiple
 *
 */

function useSelectable(
    items: StringsArray = [],
    initial: Id | null = null,
    onChange?: (cols: StringsArray) => void,
    allowUnselected = false,
    allowMultiple = false
): [
    StringsArray,
    {
        updateSelection: (id: Id) => void;
        matchSelection: (id: Id) => boolean;
        resetSelection: () => void;
        selectAll: () => void;
        selectAllBut: (id: Id) => void;
    }
] {
    const [selection, setSelection] = useState<StringsArray>(() => (identity(initial) ? ([initial] as StringsArray) : []));

    const updateSelection = useCallback(
        (id: Id) => {
            if (selection.includes(id)) {
                if (allowUnselected) {
                    setSelection((previousSelection) => previousSelection.filter((inSelection) => id !== inSelection));
                } else {
                    console.warn('allowUnselected is false. Cannot unselect item');
                }
            } else {
                if (allowMultiple) {
                    setSelection((previousSelection) => [...previousSelection, id]);
                } else {
                    setSelection([id]);
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [items, allowMultiple, selection]
    );

    const matchSelection = useCallback(
        (id: Id) => {
            return selection.includes(id);
        },
        [selection]
    );

    const resetSelection = () => setSelection([]);
    const selectAll = () => setSelection(items);
    const selectAllBut = (id: Id) => setSelection(items.filter((itm) => itm !== id));

    const output = useMemo(() => selection, [selection]);

    useEffect(() => {
        onChange?.(output);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [output]);

    return [output, { matchSelection, updateSelection, resetSelection, selectAll, selectAllBut }];
}

export default useSelectable;
