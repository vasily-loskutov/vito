import { CarouselGood } from "@shared";
import { ICartItem } from "@models";
import { FC, memo } from "react"
import { Button, Typography } from "antd";
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
    const { Title } = Typography
    return (
        <div className={styles.cartItemContainer}>
            <CarouselGood data={data.photo} size={{ width: 130, height: 130 }} />
            <div className={styles.cartItemInfo}>
                <Title className="max-w-[400px]" level={3}>{data.name}</Title>
                <Button danger type="dashed" onClick={() => handleDelete(data.name)}>Удалить из корзины</Button>
                <Link href={`/${data.linkToGoodPage}`}><Button className="w-full">Перейти на страницу товара</Button> </Link>
            </div>
            <Counter cartItem={data} />
            <Title level={2}> {data.price * data.count} ₽</Title>

        </div>);
}

export default memo(CartItem);
