
type subcategories = {
    subcategoryName:string;
    subcategoryTag:string;
}
export interface ICategory {
    id?:number
    name: string;
    tag: string;
    subcategories:subcategories | subcategories[]
}
export interface ICategoryResponse {
    id?:number
    name: string;
    tag: string;
    subcategories:[string[]]
}
