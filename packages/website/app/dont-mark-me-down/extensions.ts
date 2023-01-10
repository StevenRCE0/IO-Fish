import type { Tokenizer } from './machine'

const passage: Tokenizer = {
	tag: 'p',
}

const h1: Tokenizer = {
	tag: 'h1',
	defaultChildren: [passage],
}

export { passage, h1 }
