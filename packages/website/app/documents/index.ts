import { layout } from './layout';
import { overture } from './overture';
import { responsive } from './responsive';

export interface ParagraphLink {
    name: string;
    source: string;
    blank?: boolean;
}

export interface Paragraph {
    lines?: string[];
    links?: ParagraphLink[];
}

export interface Course {
    title: string;
    paragraphs: Paragraph[];
    subsections?: Course[];
}

interface Index {
    [key: string]: Course[];
}

export const index: Index = {
    overture: overture,
    layout: layout,
    responsive: responsive,
};
