import {AppProps} from 'next/app'
import Head from "next/head";
import {useRouter} from "next/router";
import '../styles/global.css'
import '../styles/global-medium.css'
import '../styles/global-large.css'

export default function MyApp({Component, pageProps}: AppProps) {
    const AnyComponent = Component as any;
    const router = useRouter();
    const {pathname} = router;
    console.log(pathname);
    const styles: { uic: string, [propType: string]: string } = {
        uic: `
            h1>span {display: inline-block;}
            section {margin-block-end: 2em;}
            p {
               margin-block-start: 0.2em;
               margin-block-end: 1em;
               margin-inline-start: 1em;
               max-width: 768px;
            }
            h1 a {
                display: inline-block;
                transition: .75s cubic-bezier(0.165, 0.84, 0.44, 1);
                font-size: 2.25rem;
                margin-left: 1ch;
                text-decoration: underline;
            }
            body {
                padding: 0 env(safe-area-inset-left) 50px env(safe-area-inset-right);
            }
            hr {
    background: none;
}
hr.Major {
    margin-top: 1ch;
    margin-right: calc(-1 * (var(--base-padding) + env(safe-area-inset-right)));
    border: none;
    border-top: 6px double var(--color-secondary);
}

ol {
    margin-block: 0;
    counter-reset: item;
    width: 100%;
}
ol > li {
    width: 100%;
    counter-increment: item;
}
ol ol {
    padding-inline: 0;
}
ol ol > li {
    display: block;
}
ol ol > li:before {
    content: counters(item, ".") ". ";
}
li > a {
    display: inline-block;
    text-transform: capitalize;
    min-width: calc(100% - 5em);
}

h1.Head {
    margin-block-start: 0;
}

span.BigButtons {
    display: inline-block;
    white-space: wrap;
    max-width: calc(100vw - var(--base-padding));
}
:root {
    --big-button-offset: 50%;
}
        `
    }
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.png"/>
                <title>IO/Lab</title>
                <style>
                    {pathname=='/uix' ? styles.uic:''}
                </style>
            </Head>
            <AnyComponent {...pageProps} />
        </>
    )
}

