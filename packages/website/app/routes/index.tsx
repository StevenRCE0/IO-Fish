import React from 'react';
import Helmet from 'react-helmet';
import type { LinksFunction } from '@remix-run/node';
import type { Course } from '~/documents';
import { useSearchParams } from '@remix-run/react';
import { index } from '~/documents';
import stylesUrl from '~/styles/uic.css';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: stylesUrl }];
};

interface UICProps {
    sectionKey: string;
    section?: string;
    notFound: boolean;
    content: Course[];
}

interface UICParams {
    sectionKey?: string;
    section?: string;
    content: Course[] | undefined | null;
}

interface UICState {
    indexExpanded: Boolean;
    sectionExpanded: Boolean;
}

const card = {
    name: 'UI/UX',
    speaker: '王砚渤',
    caption: '更多课程安排和内容正在准备中...',
};

const flamboyant =
    '人机交互工程站在科技与人文的交叉口，旨在为每个人打造更完美的工具。';

class UIC extends React.Component<UICProps, UICState> {
    constructor(props: UICProps) {
        super(props);

        this.state = {
            indexExpanded: false,
            sectionExpanded: false,
        };
    }

    componentDidMount() {
        console.log(this.props.sectionKey);
        if (this.props.section) {
            this.jumper(this.props.section);
        }
    }

    toggleIndex() {
        this.setState({
            indexExpanded: !this.state.indexExpanded,
            sectionExpanded: false,
        });
    }
    toggleSection() {
        this.setState({
            indexExpanded: false,
            sectionExpanded: !this.state.sectionExpanded,
        });
    }

    getLinesVariable(number: number): React.CSSProperties {
        return { '--lines': number } as React.CSSProperties;
    }

    getIndexLinesVariable(
        nodes: Course[],
        depth: number = 1,
    ): React.CSSProperties {
        function getLines(nodes: Course[], depth: number): number {
            let lines = nodes.length;
            if (depth > 0) {
                nodes.forEach((node) => {
                    if (node.subsections) {
                        lines += getLines(node.subsections, depth - 1);
                    }
                });
            }
            return lines;
        }

        return this.getLinesVariable(getLines(nodes, depth));
    }

    jumper(id: String) {
        document
            .getElementById(id as string)
            ?.scrollIntoView({ behavior: 'smooth' });
    }

    sectionRenderer(
        courseContent: Course[],
        level: Number = 0,
    ): React.ReactNode {
        function getHeader(course: Course) {
            switch (level) {
                case 0:
                    return (
                        <h4>
                            <a
                                className="SectionIndicator"
                                href={`?section=${course.title}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                §
                            </a>
                            {course.title}
                        </h4>
                    );
                case 1:
                    return <h5>{course.title}</h5>;
                case 2:
                    return <h6>{course.title}</h6>;
                default:
                    return <h6>{course.title}</h6>;
            }
        }
        return courseContent.map((course, courseIndex) => {
            return (
                <section
                    id={course.title as string}
                    key={courseIndex}
                    style={{ marginInlineStart: `${(level as number) * 1}em` }}
                >
                    {getHeader(course)}
                    {course.paragraphs.map((paragraph, paragraphIndex) => {
                        return (
                            <React.Fragment key={paragraphIndex}>
                                {paragraph.lines && (
                                    <p>
                                        {paragraph.lines.map(
                                            (line, lineIndex) => {
                                                return (
                                                    <React.Fragment
                                                        key={lineIndex}
                                                    >
                                                        {lineIndex > 0 && (
                                                            <br />
                                                        )}
                                                        {line}
                                                    </React.Fragment>
                                                );
                                            },
                                        )}
                                    </p>
                                )}

                                <p>
                                    {paragraph.links && (
                                        <span className="LinkSection">
                                            {paragraph.links.map(
                                                (link, linkIndex) => {
                                                    return (
                                                        <a
                                                            key={linkIndex}
                                                            target="_blank"
                                                            href={
                                                                link.source as string
                                                            }
                                                        >
                                                            {link.name}
                                                        </a>
                                                    );
                                                },
                                            )}
                                        </span>
                                    )}
                                </p>
                            </React.Fragment>
                        );
                    })}
                    {course.subsections &&
                        this.sectionRenderer(
                            course.subsections,
                            (level as number) + 1,
                        )}
                </section>
            );
        });
    }

    indexRenderer(courseContent: Course[]): React.ReactNode {
        return (
            <ol>
                {courseContent.map((course, index) => {
                    return (
                        <li key={index}>
                            <a onClick={() => this.jumper(course.title)}>
                                {course.title}
                            </a>
                            {course.subsections && (
                                <ol>
                                    {course.subsections.map((sub, subIndex) => {
                                        return (
                                            <li key={subIndex}>
                                                <a
                                                    onClick={() =>
                                                        this.jumper(sub.title)
                                                    }
                                                >
                                                    {sub.title}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ol>
                            )}
                        </li>
                    );
                })}
            </ol>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{card.name}</title>
                </Helmet>
                <main>
                    <h1 className="IOBadge">I/O Lab</h1>
                    <h1 className="Head">
                        <span>{card.name}</span>
                        <span className="BigButtons">
                            <a
                                className={`IndexSwitch ${
                                    this.state.indexExpanded ? 'On' : 'Off'
                                }`}
                                onClick={() => this.toggleIndex()}
                            >
                                Index
                            </a>
                            <a
                                className={`IndexSwitch ${
                                    this.state.sectionExpanded ? 'On' : 'Off'
                                }`}
                                onClick={() => this.toggleSection()}
                            >
                                Sections
                            </a>
                        </span>
                    </h1>
                    <h3>{flamboyant}</h3>
                    <h6 style={{ fontWeight: 400, marginInlineStart: '5px' }}>
                        分享者: {card.speaker}
                        <span
                            style={{
                                margin: '0 10px',
                                border: 'solid 1px',
                                opacity: 0.2,
                            }}
                        ></span>
                        <span style={{ opacity: 0.6 }}>{card.caption}</span>
                    </h6>
                    <div
                        className={`Index ${
                            this.state.indexExpanded ? 'Expanded' : 'Fold'
                        }`}
                        style={this.getIndexLinesVariable(this.props.content)}
                    >
                        {this.indexRenderer(this.props.content)}
                    </div>
                    <div
                        className={`Index ${
                            this.state.sectionExpanded ? 'Expanded' : 'Fold'
                        }`}
                        style={this.getLinesVariable(Object.keys(index).length)}
                    >
                        <ol>
                            {Object.entries(index).map(([name, v]) => {
                                return (
                                    <li key={name}>
                                        <a
                                            href={name}
                                            onClick={(e) => {
                                                if (
                                                    this.props.sectionKey &&
                                                    this.props.sectionKey == name
                                                ) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            {this.props.sectionKey &&
                                            this.props.sectionKey == name ? (
                                                <b>{name}</b>
                                            ) : (
                                                <React.Fragment>
                                                    {name}
                                                </React.Fragment>
                                            )}
                                        </a>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                    <hr className="Major" />
                    {this.sectionRenderer(this.props.content)}
                </main>
            </React.Fragment>
        );
    }
}

export default function UICWrapper(params: UICParams) {
    const [searchParams, setSearchParams] = useSearchParams();

    const props: UICProps = {
        sectionKey: params.sectionKey ?? 'overture',
        content: params.content ?? index['overture'],
        notFound: !!params.content,
        section: searchParams.get('section') as string,
    };

    return <UIC {...props} />;
}
