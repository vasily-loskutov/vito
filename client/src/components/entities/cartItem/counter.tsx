import {FC,useState} from "react"
import {PlusOutlined,MinusOutlined } from "@ant-design/icons"
import { Button } from "antd";
import {useActions}from "@hooks"
import { ICartItem } from "@models";
type PropTypes={
    cartItem:ICartItem
}
const Counter:FC<PropTypes> = ({cartItem}) => {
    const [itemsCount,setItemsCount] = useState(cartItem.count)
        const {incrementCartCount,decrementCartCount} = useActions()
    const increment = ()=>{
        setItemsCount(prev=>prev+1)
        console.log(cartItem.name)
        incrementCartCount(cartItem.name)
        
    }
    const decrement = ()=>{
        setItemsCount(prev=>prev-1)
        decrementCartCount(cartItem.name)
    }
    return ( <div className="flex gap-x-3 items-center">
        <Button  icon={<PlusOutlined/>} onClick={increment}/>
        {itemsCount}
        <Button icon={<MinusOutlined/>} onClick={decrement} disabled={itemsCount > 1?false:true}/>
    </div> );
}
 
export default Counter;

