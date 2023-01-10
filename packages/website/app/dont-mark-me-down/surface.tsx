import { ReactDOM } from 'react'
import MarkMe from './machine'
import { passage, h1 } from './extensions'

interface SurfaceProps {
	string: string
}

export default function Surface(props: SurfaceProps) {
	const machine = new MarkMe([passage, h1])
	return machine.down(props.string)
}
