export interface Book {
    id:number;
    description:string;
    iconUrl: string;
    longDescription: string;
    category:string;
    date: string;
}

export class BookClass implements Book {
    constructor(
        public id: number,
        public description: string,
        public iconUrl: string,
        public longDescription: string,
        public category: string,
        public date: string
    ) {}
}