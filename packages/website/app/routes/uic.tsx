import React from 'react';
import Helmet from 'react-helmet';
import type { LinksFunction } from '@remix-run/node';
import stylesUrl from '~/styles/uic.css';

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

interface UICProps {}

interface UICState {
    indexExpanded: Boolean;
}

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
                        lines: ['Google Design', '谷歌设计'],
                        links: [
                            {
                                name: ' Google Design',
                                source: 'https://design.google/',
                            },
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

export default class UIC extends React.Component<UICProps, UICState> {
    constructor(props: UICProps) {
        super(props);

        this.state = {
            indexExpanded: false,
        };
    }

    toggleIndex() {
        this.setState({ indexExpanded: !this.state.indexExpanded });
    }

    getLinesVariable(n: Number) {
        return { '--lines': n } as React.CSSProperties;
    }

    sectionRenderer(
        courseContent: Course[],
        level: Number = 0,
    ): React.ReactNode {
        function getHeader(course: Course) {
            switch (level) {
                case 0:
                    return <h4>{course.title}</h4>;
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
                        <a
                            key={index}
                            onClick={() => {
                                document
                                    .getElementById(course.title as string)
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <li>{course.title}</li>
                        </a>
                    );
                })}
            </ol>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>UI/UX</title>
                </Helmet>
                <main>
                    <h1 className='Head'>
                        <span>UI/UX 课程</span>
                        <span className='BigButtons'>
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
                    <div
                        className={`Index ${
                            this.state.indexExpanded ? 'Expanded' : 'Fold'
                        }`}
                        style={this.getLinesVariable(courseContent.length)}
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
