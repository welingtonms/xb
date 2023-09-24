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

/**
 * @typedef {import('./xb-element').default} XBElement
 */

/**
 * Based on https://www.typescriptlang.org/play?ssl=8&ssc=4&pln=5&pc=1&filetype=js#code/PQKhCgAIUgBAXAngBwKYBNUDNIG8B2qA7pABQB0lAhgE4DmAzgFyRX6IDaAugJSQC8APjwBfEZADCAe3wN4NAK4BjeFQBGAG1RQQwcOFARoceKgC2yDVVN5ps+ctWbU4gCo64tOpABCVBqh4riI6elgK+CoAljKQAOKo+Jg0ALJRAB5R+KR+ATy4UJBFNKjwCjT4kEpWDAzxicmQqOmmSXW5qAVF3d10pQlJqDSk+SE9ISGGHgjmltaBuHZyiirqWm7TXr7+C8Gh4OGR8DGVAHJUZqhpmdkd+YXFpeWV1f5155dNLQ3tO109vVKH1QI1wY26EwMYGmpgsVhsixky0caxckHcxlgWw6QTGugOEWisQAgn1rlkcjt7j0SmUKlUanVSYFmq10L8Av8AZA+vBmaDwUVIeBXrVIABlMqYfDwL5splkjIU4Hk7IDZKq0iiupgnh6rk80qQcAiIA
 * @template {{}} T
 * @typedef {new (...args: any[]) => T} Constructor<T>
 */

export default function noop() {}
