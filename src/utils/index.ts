/**
 * isNil like
 */

export const identity = (input: unknown): boolean => input !== undefined && input !== null;
export function isObjectEmpty(object: any) {
    for (const prop in object) {
        if (Object.prototype.hasOwnProperty.call(object, prop)) return false;
    }

    return true;
}
/**
 * Utility to save few key strokes when testing for equality
 */

export function same(key: string, thing: string): boolean;
export function same(key: number, thing: number): boolean;
export function same(key: string | number, thing: string | number): boolean {
    return key === thing;
}

/**
 * Utility for sorting strings, numbers (+ dates).
 */

export interface Sorter<T> {
    property: Extract<keyof T, string | number | Date>;
    isDescending: boolean;
}

export function genericSort<T>(objectA: T, objectB: T, sorter: Sorter<T>) {
    const result = () => {
        if (objectA[sorter.property] > objectB[sorter.property]) {
            return 1;
        } else if (objectA[sorter.property] < objectB[sorter.property]) {
            return -1;
        } else {
            return 0;
        }
    };

    return sorter.isDescending ? result() * -1 : result();
}

/**
 * Utility filter n properties for truthy or falsy...
 * ...values on type T (no effect if no filter selected)
 */

export interface Filter<T> {
    property: keyof T;
    isTruthyPicked: boolean;
}

export function genericFilter<T>(object: T, filters: Array<Filter<T>>) {
    if (same(filters.length, 0)) {
        return true;
    }

    return filters.every((filter) => {
        return filter.isTruthyPicked ? object[filter.property] : !object[filter.property];
    });
}

/**
 * Utility to merge multiple classNames (be it *.module.css or string)
 */

export function clxs(...predicate: Array<unknown>) {
    return predicate.filter(Boolean).join(' ');
}

/**
 * Utility to save few key strokes when testing for array length
 */

export function has<T>(items: Array<T>): boolean;
export function has(query: string): boolean;
export function has<T>(prop: string | Array<T>): boolean {
    if (typeof prop === 'string') {
        return prop.trim() !== '';
    }
    if (Array.isArray(prop)) {
        return prop.length > 0;
    } else return false;
}

/**
 * Utility to format a Date according to a locale
 */

export const formatDate = (date: Date, locale = 'es-ES') => new Intl.DateTimeFormat(locale).format(new Date(date));

/**
 * Capitalizes a string
 */
export const capitalize = (s: any) => {
    if (typeof s !== 'string') {
        return '';
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
};

