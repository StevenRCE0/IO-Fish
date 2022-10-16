import type { Course } from '.';

export const overture: Course[] = [
    {
        title: '课程内容',
        paragraphs: [
            {
                lines: [
                    '选用工具',
                    '排版布局基础',
                    '响应式设计',
                    '配色基础',
                    '字体分类和常识',
                    '动效和动画',
                    '优化故事线',
                    '原型工具的使用',
                    '与开发工程师对接',
                    '',
                    '点击 [Sections] 查看已有课程',
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
                            'Figma 是当今最泛用的原型设计工具，协作功能强大。已遭 Adobe 收购。如果使用 Mac，你可试试 Sketch 看。',
                            '除了这些专用的原型设计软件，如果不要求可互动和协作，也可以使用更通用的软件来设计原型，比如 Affinity Designer, Adobe Illustrator 甚至是 Photoshop 和演示文稿。',
                            '有更多细化的工具需要，或者想尝试更换工作流，了解新动向，可以看看 UI tools 网站。',
                        ],
                        links: [
                            {
                                name: 'Figma',
                                source: 'https://www.figma.com/',
                            },
                            {
                                name: 'Sketch',
                                source: 'https://www.sketch.com/',
                            },
                            {
                                name: 'Affinity Designer',
                                source: 'https://affinity.serif.com/en-us/designer/',
                            },
                            {
                                name: 'UX tools',
                                source: 'https://uxtools.co/',
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
                        lines: ['一些适合入门的资源，属于是基础内容'],
                        links: [
                            {
                                name: 'oooooohmygosh',
                                source: 'https://space.bilibili.com/38053181',
                            },
                        ],
                    },
                    {
                        lines: ['体系课程'],
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
                    '这里放一些我欣赏的实现，包括完善的 UI/UX 应用和有创意、引人深思的设计。',
                    '会持续更新。',
                ],
                links: [
                    {
                        name: 'Anyway.fm',
                        source: 'https://anyway.fm/',
                    },
                    {
                        name: 'Apple Design Awards',
                        source: 'https://developer.apple.com/design/awards/',
                    },
                    {
                        name: 'underline.js',
                        source: 'https://underlinejs.wentin.net/',
                    },
                    {
                        name: 'Typogram',
                        source: 'https://typogram.co',
                    },
                ],
            },
        ],
        subsections: [
            {
                title: '社区',
                paragraphs: [
                    {
                        links: [
                            {
                                name: 'Dribbble',
                                source: 'https://dribbble.com/',
                            },
                            {
                                name: 'Behance',
                                source: 'https://www.behance.net/',
                            },
                            {
                                name: 'DeviantArt',
                                source: 'https://www.deviantart.com/',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: '课程归档',
        paragraphs: [
            {
                lines: [
                    '这里是线下课程的录屏回放。链接可能会失效，如有需要可通过邮箱联系。',
                ],
                links: [
                    {
                        name: '1 - 工具使用和布局基础',
                        source: 'https://www.icloud.com/iclouddrive/074R5zVCXLsX5K_OfjSoOaLNw#UIX_Course-1',
                    },
                ],
            },
        ],
    },
];
