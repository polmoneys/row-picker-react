import Disclosure from './PopOver';
import { AvailableClassNames, DefaultComponent } from './types';
import { clxs, isObjectEmpty, identity, capitalize } from '../utils';

interface Props extends DefaultComponent {
    position: number;
    width: string;
    align: string;
    selected: boolean;
    role: string;
    editable: boolean;
    expandable?: boolean;
    disclosee?: { [key: string]: string | boolean | Array<string> } | null;
    /** a cell might be referenced by other #selector, extend to Array<string> ? */
    labelledBy?: string;
    /** or be itself the reference #id*/
    classes?: {
        [key in keyof typeof AvailableClassNames]?: string;
    };
}

function Cell(props: Props) {
    const {
        position,
        classes,
        children,
        width,
        align,
        role,
        selected,
        editable = false,
        labelledBy,
        // id,
        className,
        expandable = false,
        disclosee,
    } = props;
    const isExpandable = expandable && identity(disclosee) && !isObjectEmpty(disclosee);

    return (
        <div
            className={clxs('rp-cell', className)}
            role={role}
            aria-colindex={position + 1}
            aria-selected={selected}
            style={{
                width,
                justifyContent: align,
            }}
            aria-readonly={editable ? 'true' : 'false'}
            {...(labelledBy && { 'aria-labelledby': labelledBy })}
            // {...(id && { id })}
        >
            {isExpandable ? (
                <Disclosure
                    label={children}
                    icon="chevron"
                    classes={{
                        popoverRoot: classes?.popoverRootExpandable ?? 'rp-root-expandable',
                        popoverButton: classes?.popoverButtonExpandable ?? 'rp-expandable',
                        popoverContent: classes?.popoverContentExpandable ?? 'rp-popContent',
                    }}
                >
                    {Object.entries(disclosee!).map(([k, v]) => {
                        const isBoolean = typeof v === 'boolean';
                        const isArray = Array.isArray(v);
                        const value = isBoolean ? (
                            <p>{capitalize(v.toString())}</p>
                        ) : isArray ? (
                            <div className="rp-colGap rp-rowGapGrid">
                                {(v as Array<string>).map((record, pos) => (
                                    <p key={`expando-content${pos}`}> {record} </p>
                                ))}
                            </div>
                        ) : (
                            v
                        );
                        return (
                            <div className="rp-colGap rp-rowGapGrid" key={k}>
                                <p>
                                    <b>{capitalize(k.toString())}</b>:
                                </p>{' '}
                                {value}
                            </div>
                        );
                    })}
                </Disclosure>
            ) : (
                children
            )}
        </div>
    );
}

export default Cell;
