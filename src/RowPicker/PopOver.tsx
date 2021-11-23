import { Popover } from '@headlessui/react';
import { cloneElement, Fragment, ReactNode } from 'react';
import Icon, { IconVariants } from './Icon';
import { AvailableClassNames } from './types';
import { clxs } from '../utils';
import { FocusScope } from '@react-aria/focus';

interface Props {
    children: ReactNode;
    label: ReactNode | string;
    disabled?: boolean;
    icon?: IconVariants;
    trap?: boolean;
    classes?: {
        [key in keyof typeof AvailableClassNames]?: string;
    };
}

function Disclosure(props: Props) {
    return (
        <Popover className={clxs('rp-popover', props?.classes?.popoverRoot)}>
            {({ open }) => (
                <>
                    <Popover.Button disabled={props?.disabled ?? false} className={clxs(props?.classes?.popoverButton)}>
                        {props.label}
                        {props.icon && (
                            <span className="rp-iconStable">
                                <Icon
                                    fill="currentColor"
                                    variant={!open ? props.icon : props.icon === 'chevron' ? (`${props.icon}Up` as IconVariants) : props.icon}
                                />
                            </span>
                        )}
                    </Popover.Button>
                    {/* <Popover.Overlay className={clxs(open ? 'overlay-fixed' : 'transparent')} /> */}
                    <Popover.Panel className={clxs('rp-panel', props?.classes?.popoverContent ?? 'rp-panel')}>
                        {({ close }) => (
                            <Fragment>{props.trap !== undefined ? <FocusScope autoFocus> {props.children}</FocusScope> : props.children} </Fragment>
                        )}
                    </Popover.Panel>
                </>
            )}
        </Popover>
    );
}

export default Disclosure;
