/**
 * Types of supported side references.
 * @typedef {('top' | 'right' | 'bottom' | 'left' | 'horizontal' | 'vertical' | 'none')} DirectionPropType
 */

/**
 * Determine borders to be supressed.
 * @typedef {boolean | DirectionPropType | DirectionPropType[]} BorderlessProp
 */

/**
 * Determine paddings to be supressed.
 * @typedef {boolean | DirectionPropType | DirectionPropType[]} PaddinglessProp
 */

/**
 * @typedef { 'ltr' | 'rtl' | 'auto' } DirProp
 */

/**
 * @typedef {keyof HTMLElementTagNameMap} HTMLTag
 */

/**
 * @typedef {'info' | 'success' | 'warn' | 'danger'} StatusProp
 */

export default function noop() {}
