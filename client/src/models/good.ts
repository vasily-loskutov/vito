

    export interface IGood {
        id: number;
        name: string;
        description: string;
        price: number;
        photo: string[];
        rate:number,
        count:number
    }

    export interface RootObject {
        goods: IGood[];
    }

