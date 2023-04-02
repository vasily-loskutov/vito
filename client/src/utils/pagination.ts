import { IGood } from "@models"


export default function pagination(pageSize: number, currentPage: number, data: IGood[]) {
    const startIndex = (currentPage - 1) * pageSize;
    return [...data].splice(startIndex, pageSize);
}
