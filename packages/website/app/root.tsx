import type { LinksFunction, MetaFunction } from '@remix-run/node';

import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react';
import { ExternalScripts } from 'remix-utils';

import fontsUrl from '~/styles/fonts.css';
import globalStylesUrl from './styles/global.css';
import globalLargeStylesUrl from './styles/global-large.css';
import globalMediumStylesUrl from './styles/global-medium.css';

export const links: LinksFunction = () => {
    return [
        {
            rel: 'stylesheet',
            href: fontsUrl,
        },
        {
            rel: 'stylesheet',
            href: globalStylesUrl,
        },
        {
            rel: 'stylesheet',
            href: globalMediumStylesUrl,
            media: 'print, (min-width: 640px)',
        },
        {
            rel: 'stylesheet',
            href: globalLargeStylesUrl,
            media: 'screen and (min-width: 1024px)',
        },
        {
            rel: 'icon',
            href: '/favicon.png',
        },
        {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
        },
    ];
};

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'I/O Lab UI/UX Course',
    viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
});

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <ExternalScripts />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
