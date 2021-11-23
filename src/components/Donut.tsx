import { useMemo } from 'react';
import useStyles from '../utils/useStyles';
import styles from './Donut.module.css';

type CSSProps = {
    [key: string]: string;
};

interface Props {
    value?: string;
    fill?: string;
    border?: string;
    size?: string;
    label?: string;
}

const Donut = (props: Props) => {
    const { value = '90', fill = 'var(--accent-200)', label = '', border = '6px', size = '40px' } = props;
    const { output } = useStyles('fx-hue', styles.pie, styles.animated);
    const gridConfig: CSSProps = useMemo(() => {
        return { '--p': value, '--c': fill, '--b': border, '--w': size };
    }, [value, fill]);

    return (
        <div className={output} style={{ ...gridConfig }} data-donut="">
            {label}
        </div>
    );
};

export default Donut;
