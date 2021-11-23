import { Fragment, SVGAttributes } from 'react';
import {
    FiArrowDown,
    FiArrowUp,
    FiChevronDown,
    FiCheck,
    FiChevronUp,
    FiMenu,
    FiEye,
    FiEyeOff,
    FiLock,
    FiHash,
    FiLink,
    FiMoreVertical,
    FiBookmark,
    FiMinus,
    FiX,
    FiCloud,
    FiColumns,
    FiFilter,
    FiGitBranch,
    FiDownload,
    FiHexagon,
    FiCopy,
    FiShare,
    FiFolder,
    FiCircle,
} from 'react-icons/fi';

export type IconVariants =
    | 'circle'
    | 'lock'
    | 'filters'
    | 'columns'
    | 'folder'
    | 'hash'
    | 'link'
    | 'down'
    | 'up'
    | 'chevron'
    | 'chevronUp'
    | 'checkbox'
    | 'checkboxMixed'
    | 'close';
//

interface Props extends SVGAttributes<SVGElement> {
    /** Instead of .offscreen technique */
    title?: string;
    /** Icon fill */
    fill?: string;
    /** Icon name */
    variant: IconVariants;
}

const Icon = (props: Props) => {
    const { fill = 'var(--accent)', variant, title } = props;
    return (
        <Fragment>
            {
                {
                    circle: <FiCircle size={16} color={fill} title="Column options" />,
                    lock: <FiLock size={20} color="var(--accent)" title={'Locked row'} />,
                    menu: <FiMenu size={48} color="var(--accent)" title={'Navigation options'} />,
                    folder: <FiFolder size={18} color="var(--accent)" title={title} />,
                    hash: <FiHash size={16} color={fill} title={title} />,
                    link: <FiLink size={16} color={fill} title={title} className="fx-brightness" />,
                    up: <FiArrowUp size={18} color={fill} title={title} />,
                    down: <FiArrowDown size={18} color={fill} title={title} />,
                    chevron: <FiChevronDown size={20} color={fill} title="Disclose" />,
                    chevronUp: <FiChevronUp size={20} color={fill} title="Undisclose" />,
                    close: <FiX size={32} color={fill} title="Reset options" className="fx-brightness" />,
                    checkbox: <FiCheck size={28} color={fill} title="Checked" className="fx-brightness" />,
                    checkboxMixed: <FiMinus size={28} color={fill} title="Indeterminate" className="fx-brightness" />,
                    columns: <FiColumns size={22} color={fill} title="Visible columns" />,
                    filters: <FiFilter size={22} color={fill} title="Filter rows" />,
                }[variant]
            }
        </Fragment>
    );
};

export default Icon;
