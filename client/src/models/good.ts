

    export interface IGood {
        id: number;
        name: string;
        description: string;
        price: number;
        photo: string[];
        subcategories: string[];
        categories: string[];
        rate:number,
        count:number,
        createdAt?:string,
        updatedAt?:string,
    }

    export interface RootObject {
        goods: IGood[];
    }

