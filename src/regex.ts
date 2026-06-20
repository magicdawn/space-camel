const raw = String.raw

const letter = raw`\p{Letter}`
const lower = raw`\p{Lowercase_Letter}`
const upper = raw`\p{Uppercase_Letter}`

const identifier = raw`[${letter}\d]`
const lowerIdentifier = raw`[${lower}\d]`

const skipPrefix = raw`(?<!(?:\\u|#)${identifier}*)`
const skipNumberOnlyPrefix = raw`(?<!\b\d+)`
const skipBase64Prefix = raw`(?<!data:${letter}+\/${letter}+;base64,[a-zA-Z0-9+\/=]+)` // data:image/gif;base64,
const lU = raw`(?<=\b${identifier}*${lowerIdentifier})${upper}`
const UUl = raw`(?<=\b${identifier}*${upper})${upper}${lower}`
const suffixGuard = raw`(?=${identifier}*\b)`

/**I'm a regular expression to match capital letters, provided they are placed after any letter.
 *
 * Will match these cases:
 *
 * 1. Lower[U]pper
 * 2. [U][U]per
 */
export const regularExpression = new RegExp(raw`${skipPrefix}${skipNumberOnlyPrefix}${skipBase64Prefix}(?:${lU}|${UUl})${suffixGuard}`, "gv")
