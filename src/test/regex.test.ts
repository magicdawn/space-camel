import * as assert from "node:assert/strict"
import { regularExpression } from "../regex"

const replacer = (match: string) => `~${match}` // `~` for inspection
const decorate = (str: string) => str.replace(regularExpression, replacer)

suite("regex for matching", () => {
	test("supports normal input: camelCase & PascalCase", () => {
		assert.equal(decorate("camelCase"), "camel~Case")
		assert.equal(decorate("PascalCase"), "Pascal~Case")
	})

	test("should skip ALLCAPS", () => {
		assert.equal(decorate("ALLCAPS"), "ALLCAPS")
	})

	test("should skip CONSTANT_CASE", () => {
		assert.equal(decorate("CONSTANT_CASE"), "CONSTANT_CASE")
	})

	test("supports abbreviation", () => {
		// lowerUpper -> lower~Upper
		assert.equal(decorate("NodeJS.Timeout"), "Node~JS.Timeout")
		assert.equal(decorate("NodeJS"), "Node~JS")
		assert.equal(decorate("const userID = 1"), "const user~ID = 1")

		// UUl -> U~Ul
		assert.equal(decorate("const XMLHttpRequest = 1"), "const XML~Http~Request = 1")
		assert.equal(decorate("const HTTPServer = 1"), "const HTTP~Server = 1")
		assert.equal(decorate("const ACollection = 1"), "const A~Collection = 1")
		assert.equal(decorate("const version2API = 1"), "const version2~API = 1")
		assert.equal(decorate("const ApiV2Endpoint = 1"), "const Api~V2~Endpoint = 1")
	})

	test("should skip \\u200A or #aBc", () => {
		assert.equal(decorate("\\u200A"), "\\u200A")
		assert.equal(decorate("$color: #aBc"), "$color: #aBc")
	})
	test("should skip 1080P or 4K", () => {
		assert.equal(decorate("1080P"), "1080P")
		assert.equal(decorate("4K"), "4K")
	})
	test("should skip base64 data url", () => {
		assert.equal(decorate("data:image/gif;base64,aBc"), "data:image/gif;base64,aBc")
	})
})
