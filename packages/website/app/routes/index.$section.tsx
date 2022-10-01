import type { LinksFunction } from '@remix-run/node';
import type { Course} from '~/documents';

import { useParams } from '@remix-run/react';

import { index } from '~/documents';
import stylesUrl from '~/styles/uic.css';

import UICWrapper from '.';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

export default function UICSection() {
	const section: string | undefined | null = useParams().section;
	let content: Course[] | undefined | null = undefined;

	if (section) {
		const test = index[section];
		if (test) {
			content = test;
		} else {
			content = null;
		}
	}

	return <UICWrapper sectionKey={section} content={content} />;
}
