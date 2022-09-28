export interface ParagraphLink {
    name: string;
    source: string;
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

import { overture } from "./overture";

export const index: Index = {
    'overture': overture,
}