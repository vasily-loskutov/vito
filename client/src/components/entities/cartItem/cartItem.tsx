import { CarouselGood } from "@shared";
import { ICartItem } from "@models";
import { FC, memo } from "react"
import { Button } from "antd";
import Counter from "./counter";
import { useActions } from "@hooks";
import Link from "next/link";
import styles from "./cartItem.module.scss"
type PropsTypes = {
    data: ICartItem
}
const CartItem: FC<PropsTypes> = ({ data }) => {
    const { removeCartItem } = useActions()
    const handleDelete = (name: string) => {
        removeCartItem(name)
    }
    return (
        <div className={styles.cartItemContainer}>
            <CarouselGood data={data.photo} size={{ width: 130, height: 130 }} />
            <div className={styles.cartItemInfo}>
                <h1 className={styles.cartItemText}>{data.name}</h1>
                <Button danger type="dashed" onClick={() => handleDelete(data.name)}>Удалить из корзины</Button>
                <Link href={`/${data.linkToGoodPage}`}><Button>Перейти на страницу товара</Button> </Link>
            </div>
            <Counter cartItem={data} />
            <h1 className="font-dold text-xl"> {data.price * data.count} ₽</h1>

        </div>);
}

export default memo(CartItem);
