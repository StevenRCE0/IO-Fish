import { createElement } from 'react'

export interface Tokenizer {
	tag: string
	matchingString?: string
	leaf?: boolean
	defaultChildren?: Tokenizer[]
}

export interface Token {
	type: Tokenizer
	string?: string
	children?: Token[]
}

export interface Options {
	indentUsing?: string
	endSymbol?: string
	rootTokenizer: Tokenizer
}

const defaultRootTokenizer: Tokenizer = {
	tag: 'article',
	defaultChildren: [
		{
			tag: 'p',
		},
	],
}

export default class MarkMe {
	indentUsing: string
	endSymbol: string
	extensions: Tokenizer[] = []
	tokenizerStack: Tokenizer[] = []
	tokenIdentifiers: string[] = []
	rootTokenizer: Tokenizer

	constructor(extensions: Tokenizer[], options?: Options) {
		this.indentUsing = options?.indentUsing ?? '\t'
		this.endSymbol = options?.endSymbol ?? '  '
		this.rootTokenizer = options?.rootTokenizer ?? defaultRootTokenizer
		this.extensions = extensions
		this.tokenIdentifiers = extensions.map(
			(token) => token.matchingString ?? token.tag
		)
	}

	tokenize(line: string): Token {
		// regex to match token before endSymbol
		const regex = new RegExp(
			`(${this.tokenIdentifiers.join('|')})${this.endSymbol}`
		)
		const match = line.match(regex)
		const text = line.replace(regex, '')
		if (!match) {
			const r = {
				type: this.tokenizerStack.at(-1)!.defaultChildren[0]!,
				string: text,
			}
			console.log('nomatch', r)
			return r
		}
		const token = this.extensions.find(
			(extension) => extension.matchingString === match[1]
		) ?? { tag: match[1] }
		return {
			type: token,
			string: text,
		}
	}

	down(string: string) {
		const lines = string.split('\n')

		// create root token
		this.tokenizerStack.push(this.rootTokenizer)
		const rootToken: Token = {
			type: this.rootTokenizer,
		}

		// push to tokenizerStack by indent
		const indentStack: number[] = []
		const tokens = lines.map((line) => {
			let token = this.tokenize(line)
			const indentRegExp = new RegExp(`^(${this.indentUsing})*`)
			const indent = line.match(indentRegExp)?.length ?? 0
			if (indent > (indentStack.at(-1) ?? 0)) {
				console.log('pushed')
				indentStack.push(indent)
				this.tokenizerStack.push(token.type)
			} else if (indent < (indentStack.at(-1) ?? 0)) {
				console.log('popped')
				indentStack.pop()
				this.tokenizerStack.pop()
			}

			return token
		})
		rootToken.children = tokens

		// create react elements recursively
		const createReactElement = (token: Token): JSX.Element => {
			const children =
				token.type.leaf || !token.children
					? token.string
					: tokens.map(createReactElement)
			console.log('children', children)
			return createElement(token.type.tag, {}, children)
		}

		console.log(tokens)

		return createReactElement(rootToken)
	}
}
