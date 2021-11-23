import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    rows: number;
    cols: number;
    id: string;
    label: string;
    description: string;
}

/**
 * (*)
 * aria-activedescendant="CELL_ID"
 *
 */
function Container(props: Props) {
    const { children, id, rows, cols, label, description } = props;

    return (
        <div
            id={id}
            role="grid"
            aria-describedby={description}
            aria-labelledby={label}
            aria-rowcount={rows}
            aria-colcount={cols}
            aria-multiselectable="true"
            // (*)
        >
            {children}
        </div>
    );
}

export default Container;
