import React from 'react';
import Helmet from 'react-helmet';
import type { LinksFunction } from '@remix-run/node';
import stylesUrl from '~/styles/uic.css';
import { useSearchParams } from '@remix-run/react';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: stylesUrl }];
};

interface ParagraphLink {
    name: String;
    source: String;
}

interface Paragraph {
    lines?: String[];
    links?: ParagraphLink[];
}

interface Course {
    title: String;
    paragraphs: Paragraph[];
    subsections?: Course[];
}

interface UICProps {
    section?: String;
}

interface UICState {
    indexExpanded: Boolean;
}

const card = {
    name: 'UI/UX',
    speaker: '王砚渤',
    caption: '更多课程安排和内容正在准备中...'
};

const courseContent: Course[] = [
    {
        title: '资源',
        paragraphs: [],
        subsections: [
            {
                title: '工具',
                paragraphs: [
                    {
                        lines: [
                            'Figma 是当今最泛用的原型设计工具，协作功能强大。已遭 Adobe 收购。',
                        ],
                        links: [
                            {
                                name: 'Figma',
                                source: 'https://www.figma.com/',
                            },
                        ],
                    },
                ],
            },
            {
                title: '设计规范参考',
                paragraphs: [
                    {
                        lines: [
                            'Apple Human Interface Guidelines',
                            '苹果的人机界面指南，涵盖了应用在旗下各种平台的人机交互理念和设计规范。',
                        ],
                        links: [
                            {
                                name: 'Apple HIG',
                                source: 'https://developer.apple.com/design/human-interface-guidelines/guidelines/overview',
                            },
                            {
                                name: 'Apple Design Overview',
                                source: 'https://developer.apple.com/design/',
                            },
                            {
                                name: 'Resources',
                                source: 'https://developer.apple.com/design/resources/',
                            },
                        ],
                    },
                    {
                        lines: ['Google Design', '谷歌设计主页，Material Design 设计规范，还有字体、图标、配色等资源。'],
                        links: [
                            {
                                name: 'Google Design',
                                source: 'https://design.google/',
                            },
                            {
                                name: 'Google Fonts',
                                source: 'https://fonts.google.com/',
                            }
                        ],
                    },
                ],
            },
            {
                title: '更多课程',
                paragraphs: [
                    {
                        links: [
                            {
                                name: 'Google UX Series Course @Coursera',
                                source: 'https://www.coursera.org/learn/foundations-user-experience-design/home',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: '课程内容',
        paragraphs: [
            {
                lines: [
                    '排版布局基础',
                    '字体分类和常识',
                    '配色基础',
                    '优化故事线',
                    '原型工具的使用',
                ],
            },
        ],
    },
];

const flamboyant =
    '人机交互工程站在科技与人文的交叉口，旨在为每个人打造更完美的工具。';

class UIC extends React.Component<UICProps, UICState> {
    constructor(props: UICProps) {
        super(props);

        this.state = {
            indexExpanded: false,
        };
    }

    componentDidMount() {
        if (this.props.section) {
            this.jumper(this.props.section);
        }
    }

    toggleIndex() {
        this.setState({ indexExpanded: !this.state.indexExpanded });
    }

    getLinesVariable(nodes: Course[], depth: number = 1): React.CSSProperties {
        function getLines(nodes: Course[], depth: number): number {
            let lines = nodes.length
            if (depth > 0) {
                nodes.forEach((node) => {
                    if (node.subsections) {
                        lines += getLines(node.subsections, depth - 1);
                    }
                });
            }
            return lines;
        }
        
        return { '--lines': getLines(nodes, depth)} as React.CSSProperties;
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
                                                <a onClick={() => this.jumper(sub.title)}>
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
                            <a className="Died">Sections</a>
                        </span>
                    </h1>
                    <h3>{flamboyant}</h3>
                    <h6 style={{ fontWeight: 400, marginInlineStart: '5px' }}>
                        分享者: {card.speaker}
                        <span style={{ margin: '0 10px', border: 'solid 1px', opacity: 0.2 }}></span>
                        <span style={{ opacity: 0.6 }}>{card.caption}</span>
                    </h6>
                    <div
                        className={`Index ${
                            this.state.indexExpanded ? 'Expanded' : 'Fold'
                        }`}
                        style={this.getLinesVariable(courseContent)}
                    >
                        {this.indexRenderer(courseContent)}
                    </div>
                    <hr className="Major" />
                    {this.sectionRenderer(courseContent)}
                </main>
            </React.Fragment>
        );
    }
}

export default function UICWrapper(props: UICProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const params: UICProps = {
        ...props,
        section: searchParams.get('section') as string,
    };

    return <UIC {...params} />;
}
