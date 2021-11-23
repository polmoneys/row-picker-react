import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

function Body(props: Props) {
    return (
        <div className="rp-body" role="rowgroup">
            {props.children}
        </div>
    );
}

export default Body;
