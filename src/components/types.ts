import { CSSProperties, ReactElement, ReactNode, MouseEventHandler } from 'react';

/**
 * Components might want to extend/Pick/Omit from it.
 */

export interface DefaultProps {
    /** subset of HTML tags */
    as?:
        | 'section'
        | 'article'
        | 'nav'
        | 'aside'
        | 'header'
        | 'footer'
        | 'label'
        | 'span'
        | 'p'
        | 'b'
        | 'em'
        | 'strong'
        | 'time'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'wbr'
        | 'div';
    /** Base for composition */
    children: HTMLElement | ReactElement | ReactNode | Array<ReactNode> | string | null;
    /** Accepts utility string css class or styles from *.module.css */
    className?: string;
    /** Available for advanced composition */
    compose?: unknown;
    /** Adds to 'root' element */
    id?: string;
    /** A11y can be multiple id "myBillingId myNameId" */
    ariaLabelledby?: string;
    /** Don't unless you must */
    discouragedStyle?: CSSProperties;
}

/**
 * Components can extend Props with events
 */

export interface EventCbProps {
    /** OnClick callback  */
    onTap?: (event?: MouseEvent | MouseEventHandler<HTMLSpanElement>) => void;
    /** Start callback  */
    onStartHover?: () => void;
    /** End callback   */
    onEndHover?: () => void;
}

/**
 * Types css custom properties, TS complaints if
 * React.CSSProperties unless we broaden the typing.
 */
export type CSSProps = {
    /** */
    [key: string]: string;
};

/**
 * For data-driven components.
 */

export interface ActionItem extends Pick<DefaultProps, 'id' | 'children'>, EventCbProps {
    disabled?: boolean;
    label: string | HTMLSpanElement;
    to?: string;
}

export interface ActionItems extends Array<ActionItem> {}

export interface RenderProp<TChildrenProps, TElement = any> {
    (props: TChildrenProps): ReactElement<TElement>;
}
