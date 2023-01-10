import Surface from '~/dont-mark-me-down/surface'

const string = `
h1  Hello

this is awesome
test.

ol  
	one  
	two  

.colourful  hey
`

export default function DMD() {
	return <Surface string={string} />
}
