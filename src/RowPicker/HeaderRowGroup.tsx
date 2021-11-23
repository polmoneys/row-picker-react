import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

function HeaderRowGroup(props: Props) {
    return (
        <div className="rp-header" role="rowgroup">
            {props.children}
        </div>
    );
}

export default HeaderRowGroup;
