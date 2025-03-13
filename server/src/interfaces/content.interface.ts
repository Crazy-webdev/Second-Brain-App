

export interface ContentDTO {
    link: string;
    type: string;
    title: string;
    tags?: string[];
}

export interface UpdateContentDTO {
    link?: string;
    type?: string;
    title?: string;
    tags?: string[];
}