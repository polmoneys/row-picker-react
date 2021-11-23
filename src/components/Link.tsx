import { ReactNode } from 'react';
import styles from './Link.module.css';

interface Props {
    children: ReactNode;
    to: string;
}

function Link(props: Props) {
    return (
        <a href={props.to} className={styles.link}>
            {props.children}
        </a>
    );
}

export default Link;
