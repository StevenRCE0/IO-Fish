import { createElement } from 'react'

export interface Tokenizer {
	tag: string
	matchingString?: string
	leaf?: boolean
	defaultChildren?: Tokenizer[]
}

interface loggedTokenizer {
	tokenizer: Tokenizer
	indent: number
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

interface RawToken {
	indentLevel: number
	type?: Tokenizer
	class?: string[]
	id?: string
	string?: string
	break: boolean
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
	tokenizerStack: loggedTokenizer[] = []
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

	getRawToken(string: string): RawToken {
		const indentLevel = string.match(new RegExp(`^(${this.indentUsing})*`))
			?.length ?? 0
		const doBreak = string.endsWith("  ")
		const stringWithoutIndent = string.slice(indentLevel * this.indentUsing.length)
		let regex = new RegExp(
			`^(${this.tokenIdentifiers.join('|')})`
		)
		const identifier = stringWithoutIndent.match(regex)
		regex = new RegExp(`^\\.([a-zA-Z0-9_-]+)`)
		const classMatch = stringWithoutIndent.match(regex) ?? []
		regex = new RegExp(`^#([a-zA-Z0-9_-]+)`)
		const id = stringWithoutIndent.match(regex)?.at(0)
		const prefixLength = stringWithoutIndent.split(this.endSymbol)[0].length
		const rawString = stringWithoutIndent.slice(prefixLength)

		return {
			indentLevel,
			type: identifier ? this.extensions.find((extension) => extension.tag === identifier[1]) : undefined,
			class: classMatch,
			id: id,
			string: rawString.trimEnd().length == 0 ? undefined : rawString.trimEnd(),
			break: doBreak
		}
	}

	down(string: string) {
		const lines = string.split('\n')

		// create root token
		this.tokenizerStack.push({tokenizer: this.rootTokenizer, indent: 0})
		const rootToken: RawToken = {
			type: this.rootTokenizer,
			indentLevel: 0,
			break: true
		}

		// create tokens and children recursively according to indent level
		const piTokens = lines.reduce((tokens, line) => {
			const rawToken = this.getRawToken(line)
			if (rawToken.indentLevel > rootToken.indentLevel) {
				const lastToken = tokens[tokens.length - 1]
				lastToken.children = lastToken.children ?? []
				lastToken.children.push(rawToken)
			} else if (rawToken.indentLevel === rootToken.indentLevel) {
				tokens.push(rawToken)
			} else {
				const lastToken = tokens[tokens.length - 1]
				const parentToken = this.tokenizerStack.find(
					(token) => token.indent === rawToken.indentLevel
				)
				if (parentToken) {
					parentToken.tokenizer.defaultChildren?.forEach((child) => {
						lastToken.children = lastToken.children ?? []
						lastToken.children.push({
							type: child,
							indentLevel: rawToken.indentLevel,
							break: true
						})
					})
				}
			}
			return tokens
		}, [rootToken])

		let tokens = lines.map((line) => {
			let rawToken = this.getRawToken(line)
			let doBreak = rawToken.break || (!!rawToken.type && !!rawToken.class && !!rawToken.id && !!rawToken.string)
			const targetTokenizer = rawToken.type ?? this.tokenizerStack.at(-1)!.tokenizer.defaultChildren![rawToken.indentLevel - this.tokenizerStack.at(-1)!.indent - 1] ?? this.tokenizerStack.at(-1)!.tokenizer.defaultChildren!.at(-1)!

			if (rawToken.indentLevel > (this.tokenizerStack.at(-1)?.indent ?? 0)) {
				console.log('pushed')
				this.tokenizerStack.push({tokenizer: targetTokenizer, indent: rawToken.indentLevel})
			} else if (
				rawToken.indentLevel < (this.tokenizerStack.at(-1)?.indent ?? 0)
			) {
				console.log('popped')
				this.tokenizerStack.pop()
			}
		})


		// create react elements recursively
		const createReactElement = (token: RawToken, parent: RawToken): JSX.Element => {
			const children =
				token.type?.leaf ?? false
					? token.string
					: tokens.map(childToken => createReactElement(childToken, token))
			console.log('children', children)
			return createElement(token.type.tag, {}, children)
		}

		console.log(tokens)

		return createReactElement(rootToken)
	}
}
