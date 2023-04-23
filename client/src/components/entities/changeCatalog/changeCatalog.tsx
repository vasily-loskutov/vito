import CreateCategory from "./createCategory"
import ChangeCatalogList from "./changeCatalogList"
const ChangeCatalog = () => {

    return (
        <div className="flex flex-col overflow-scroll overflow-x-hidden h-[450px] w-full gap-y-5">
            <CreateCategory />
            <ChangeCatalogList />
        </div>

    );
}

export default ChangeCatalog
