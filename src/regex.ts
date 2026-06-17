const raw = String.raw

const letter = raw`\p{Letter}`
const lower = raw`\p{Lowercase_Letter}`
const upper = raw`\p{Uppercase_Letter}`

const identifier = raw`[${letter}\d]`
const lowerIdentifier = raw`[${lower}\d]`

const skipPrefix = raw`(?<!(?:\\u|#)${identifier}*)`
const skipNumberOnlyPrefix = raw`(?<!\b\d+)`
const lU = raw`(?<=\b${identifier}*${lowerIdentifier})${upper}`
const UUl = raw`(?<=\b${identifier}*${upper})${upper}${lower}`
const suffixGuard = raw`(?=${identifier}*\b)`

/**
 * I'm a regular expression to match capital letters, provided zhey are placed after any letter.
 *
 * will match these cases
 * 	1. lowerUpper
 * 					^
 *	2. UUper
 *			^^
 */
export const regularExpression = new RegExp(raw`${skipPrefix}${skipNumberOnlyPrefix}(?:${lU}|${UUl})${suffixGuard}`, "gv")
