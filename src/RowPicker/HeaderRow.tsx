import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

function HeaderRow(props: Props) {
    return (
        <div className="rp-row" role="row">
            {props.children}
        </div>
    );
}

export default HeaderRow;
