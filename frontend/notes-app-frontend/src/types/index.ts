export interface Category {
    id: number;
    name: string;
}

export interface Note {
    id: number;
    title: string;
    content: string;
    archived: boolean;
    category: Category | null;
}