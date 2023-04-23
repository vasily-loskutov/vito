import { useGetGoodsQuery, useLazySearchQuery } from "@redux"
import ChangeGoodItem from "./changeGoodItem"
import { IGood } from "@models"
import { Input } from 'antd';
import { useState } from "react"
const ChangeGoods = () => {
    const [search] = useLazySearchQuery()
    const { data, isLoading } = useGetGoodsQuery(null)
    const [goods, setGoods] = useState(data)
    const handleChange = async (e) => {
        const { data } = await search(e.target.value);
        setGoods(data)
    }
    console.log(data)
    return (
        <div className="flex flex-col items-center overflow-scroll overflow-x-hidden h-[450px] w-full ">
            <Input size="large" onChange={handleChange} placeholder="Введите название товара" className="max-w-[600px] mb-6" />
            {!isLoading ? goods?.map((item: IGood) => {
                return <ChangeGoodItem good={item} key={item.id} />
            }) : <h1>Loading</h1>}
        </div>

    );
}

export default ChangeGoods
