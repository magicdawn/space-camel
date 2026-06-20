const raw = String.raw

const letter = raw`\p{Letter}`
const lower = raw`\p{Lowercase_Letter}`
const upper = raw`\p{Uppercase_Letter}`

const identifier = raw`[${letter}\d]`
const lowerIdentifier = raw`[${lower}\d]`
const base64AllowedChar = raw`[a-zA-Z0-9+\/=]`

const skipUnicodePrefix = raw`(?<!\\u${identifier}*)`
const skipColorHashPrefix = raw`(?<!#${identifier}*)`
const skipNumberOnlyPrefix = raw`(?<!\b\d+)`
const skipBase64Prefix = raw`(?<!data:${letter}+\/${letter}+;base64,${base64AllowedChar}+)` // data:image/gif;base64,
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
export const regularExpression = new RegExp(raw`${skipUnicodePrefix}${skipColorHashPrefix}${skipNumberOnlyPrefix}${skipBase64Prefix}(?:${lU}|${UUl})${suffixGuard}`, "gv")
