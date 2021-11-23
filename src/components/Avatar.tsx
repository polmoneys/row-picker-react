import { ImgHTMLAttributes } from 'react';
import { clxs } from '../utils';
import styles from './Avatar.module.css';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    alt?: string;
    url: string;
    className?: string;
}

const Avatar = (props: Props) => {
    const { alt = '', url, className } = props;

    return (
        <div rp-data-avatar="" className={clxs(styles.root, className)}>
            <img className={styles.pic} draggable="false" src={url} alt={alt} />
        </div>
    );
};

export default Avatar;
