import type { Course } from '.';

export const overture: Course[] = [
    {
        title: '课程内容',
        paragraphs: [
            {
                lines: [
                    '排版布局基础',
                    '字体分类和常识',
                    '配色基础',
                    '动效和动画',
                    '优化故事线',
                    '原型工具的使用',
                    '与开发工程师对接',
                ],
            },
        ],
    },
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
                        lines: [
                            'Google Design',
                            '谷歌设计主页，Material Design 设计规范，还有字体、图标、配色等资源。',
                        ],
                        links: [
                            {
                                name: 'Google Design',
                                source: 'https://design.google/',
                            },
                            {
                                name: 'Google Fonts',
                                source: 'https://fonts.google.com/',
                            },
                        ],
                    },
                    {
                        lines: [
                            'IBM Carbon Design System',
                            'IBM 的设计系统。雅。',
                        ],
                        links: [
                            {
                                name: 'IBM Carbon Design System',
                                source: 'https://www.carbondesignsystem.com/',
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
        title: '欣赏',
        paragraphs: [
            {
                lines: [
                    '这里放一些我欣赏的实现，包括完善的 UI/UX 系统和有创意、引人深思的设计。',
                    '会持续更新。',
                ],
                links: [
                    {
                        name: 'Apple Design Awards',
                        source: 'https://developer.apple.com/design/awards/',
                    },
                    {
                        name: 'underline.js',
                        source: 'https://underlinejs.wentin.net/',
                    },
                ],
            },
        ],
    },
];
