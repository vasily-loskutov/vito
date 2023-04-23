import ChangeCatalogItem from "./changeCatalogItem"
import { useGetCategoriesQuery } from "@redux"

const ChangeCatalogList = () => {
    const { data, isLoading } = useGetCategoriesQuery(null)
   
    return (
        <>
            {
                !isLoading ? data.map((elem) => (<ChangeCatalogItem data={elem} key={elem.id} />)) : "Loading"
            }
        </>
    );
}

export default ChangeCatalogList
