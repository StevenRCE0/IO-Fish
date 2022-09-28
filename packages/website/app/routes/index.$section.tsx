import { useParams } from '@remix-run/react';
import { Course, index } from '~/documents';
import { LinksFunction } from '@remix-run/node';
import UICWrapper from '.';
import stylesUrl from '~/styles/uic.css';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: stylesUrl }];
};

export default function UICSection() {
    let section: string | undefined | null = useParams().section;
    let content: Course[] | undefined | null = undefined;

    if (section) {
        const test = index[section];
        if (test) {
            content = test;
        } else {
            content = null;
        }
    }

    return <UICWrapper key={section} content={content} />;
}
